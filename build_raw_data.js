var request = require('request');
var async = require('async');
var fs = require('fs');
var build_index = require('./build_index');

var url = "http://www.tri-rail.com/train-schedules/TrainSchedule.aspx";

/*
    18 Mangonia Park
    17 West Palm Beach
    16 Lake Worth
    15 Boynton Beach
    14 Delray Beach
    13 Boca Raton
    12 Deerfield Beach
    11 Pompano Beach
    10 Cypress Creek
    9 Ft. Lauderdale
    8 Ft. Lauderdale Airport
    7 Sheridan Street
    6 Hollywood Street
    5 Golden Glades
    4 Opa-Locka
    3 Metrorail Transfer
    2 Hialeah Market
    1 Miami Airport
*/

var station_map = [
  'Miami Airport',
  'Hialeah Market',
  'Metrorail Transfer',
  'Opa-Locka',
  'Golden Glades',
  'Hollywood Street',
  'Sheridan Street',
  'Ft. Lauderdale Airport',
  'Ft. Lauderdale',
  'Cypress Creek',
  'Pompano Beach',
  'Deerfield Beach',
  'Boca Raton',
  'Delray Beach',
  'Boynton Beach',
  'Lake Worth',
  'West Palm Beach',
  'Mangonia Park' 
];

const LAST_STATION_INDEX = 18;
const FIRST_STATION_INDEX = 1;
const NORTH = "n";
const SOUTH = "s";
const WEEKDAY = 1;
const WEEKEND = 2;

var master_list = [];
var possibilities = [];
var dep_train_idx = [];
var dep_sched_idx = [];
var dep_ar_sched_idx = [];

// departure from 1 to 18 and backwards for both weekdays and weekends
for ( var time = WEEKDAY; time <= WEEKEND; time++) {
    for ( var x = FIRST_STATION_INDEX; x <= LAST_STATION_INDEX; x++ ) {
        for (var y = x+1; y <= LAST_STATION_INDEX; y++) {
            // northbound
            possibilities.push({dp: x, ar: y, time: time, direction: NORTH});
            // southbound
            possibilities.push({dp: y, ar: x, time: time, direction: SOUTH});
        }
    }
}

async.each(possibilities, function(data, next) {
//async.eachLimit(possibilities, 1, function(data, next) {
    getTime(data.dp, data.ar, data.time, data.direction, function(times) {
        if ( times ) {
            times.forEach(function(row) {
                master_list.push(row);
            });
        }
        next();
    });
}, function(err) {
    try {
        fs.mkdirSync("raw_data");
    } catch(e) {
        // do nothing if already exists
    }

    fs.writeFile("raw_data/dataFull.json", JSON.stringify(master_list), function(err) {
        if(err) {
          console.log(err);
        } 
    }); 
    // lets build indexes now
    build_index();
});


function getTime(dp, ar, dt, direction, cb) {
    var returned_data = [];
    request.get(url, {
        "qs": {
            "dp": dp,
            "dt": dt,
            "ar": ar 
        }
    }, function(err, response, body) {
        if ( err ) {
            console.error(err, response, body);
            return cb();
        }
        if ( response.statusCode != 200 ) {
            console.error(response, body);
            return cb();
        }
        var a = body.replace(/\r?\n|\r/g, '');
        var data = a.match(/\<table(.*)\<\/table\>/);
        if (! data ) {
            return cb();
        }
        var elements = data[0].split('</tr>');
        elements.forEach(function(element, index) {
            if ( element.match(/^<tr/) ) {
                var parsed = element.match(/\<td\>(\w{4})<.*?<td>(\d{1,2}:\d{1,2}(?:AM|PM)).*?<td>(\d{1,2}:\d{1,2}(?:AM|PM))/);
                var departure_time = parsed[2].match(/(\d{1,2}):(\d{1,2})(AM|PM)/);
                var arrival_time = parsed[3].match(/(\d{1,2}):(\d{1,2})(AM|PM)/);
                if ( departure_time[1] == 12 && departure_time[3] === "AM" ) {
                    departure_time[1] = 00;
                }
                if ( arrival_time[1] == 12 && arrival_time[3] === "AM" ) {
                    arrival_time[1] = 00;
                }

                if ( departure_time[3] == "PM" ) {
                    if ( departure_time[1] == 12 ) {
                        departure_time[1] = 12;
                    } else {
                        departure_time[1] = Number(departure_time[1]) + 12;
                    }
                }

                if ( arrival_time[3] == "PM" ) {
                    if ( arrival_time[1] == 12 ) {
                        arrival_time[1] = 12;
                    } else {
                        arrival_time[1] = Number(arrival_time[1]) + 12;
                    }
                }

                var arrival_in_seconds = (Number(arrival_time[1]) * 60 * 60) + (Number(arrival_time[2]) * 60);
                var departure_in_seconds = (Number(departure_time[1]) * 60 * 60) + (Number(departure_time[2]) * 60);

                returned_data.push({
                    train_id: parsed[1],
                    departure_time: departure_in_seconds,
                    arrival_time: arrival_in_seconds,
                    schedule_id: dt,
                    departure_station_id: dp,
                    arrival_station_id: ar,
                    direction: direction
                });
            }
        });
        cb(returned_data);
    });
}
