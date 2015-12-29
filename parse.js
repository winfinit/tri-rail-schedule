var fs = require('fs');

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

const station_map = [ 
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

const WEEKDAY = 0;
const WEEKEND = 1;

const NORTH = 0;
const SOUTH = 1;

// southbound odd numbers
// northbound even numbers
// weekend >= 660

const SOUTH_BOUND = 1;
const NORTH_BOUND = 0;
const LAST_WEEK_TRAIN_ID = 60;


fs.readFile('trainsFull.json', function (err, data) {
    if (err) throw err;

    var doc = JSON.parse(data.toString());

    
 // rows.forEach(function(row) {
 //   console.log(row);
 // });

//  console.log(documents);
});

fs.readFile('stationsFull.json', function(err, data) {
    if ( err ) throw err;

    var doc = JSON.parse(data.toString());
    var value = getAllDepartureTimes(doc, 2);
    var n_row = "";
    var s_row = "";
    console.log(value);
    for(var i = NORTH_BOUND; i < LAST_WEEK_TRAIN_ID; i+=2) {
        n_row += value[NORTH_BOUND][i] + "\t";
    }
    for(var i = SOUTH_BOUND; i < LAST_WEEK_TRAIN_ID; i+=2) {
        s_row += value[SOUTH_BOUND][i] + "\t";
    }
    console.log("north:", n_row);
    console.log("south:", s_row);
    

});

function format_time(seconds) {
   var hours = Math.floor(seconds / 60 / 60);
   var minutes = (seconds / 60) - (hours * 60);
   var ampm = hours >= 12 ? "PM" : "AM";
   // convert 24 hour format
   hours = hours > 12 ? hours - 12 : hours
   var hour_string = ("00" + hours).slice(-2);
   var minute_string = ("00" + minutes).slice(-2);
   var string = hour_string + ":" + minute_string + ampm;
   return string;
}

function getAllDepartureTimes(data, station_id, bound) {
    
    if ( bound !== undefined ) {
        return data[station_id][bound];
    } else {
        return data[station_id];
    }
}
