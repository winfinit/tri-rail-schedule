var data = require('./raw_data/dataFull.json');
var dep_train_idx = require('./raw_data/dep_train_idx.json');
var dep_sched_idx = require('./raw_data/dep_sched_idx.json');
var dep_ar_sched_idx = require('./raw_data/dep_ar_sched_idx.json');


const WEEKDAY = 1;
const WEEKEND = 2;

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

// [lat, lon]
var station_coordinates = [
  [25.795941,-80.258335], // Miami Airport
  [25.811239,-80.258703], // Hialeah Market
  [25.846394,-80.25961699999999], // Metrorail Transfer
  [25.900036,-80.25269399999999], // Opa-Locka
  [25.92155,-80.216917], // Golden Glades
  [26.012411,-80.167658], // Hollywood Street
  [26.032217,-80.168086], // 'Sheridan Street',
  [26.061653,-80.165683], // 'Ft. Lauderdale Airport',
  [26.119942,-80.169808], // 'Ft. Lauderdale',
  [26.201194,-80.150369], // 'Cypress Creek',
  [26.272286,-80.13481399999999], // 'Pompano Beach',
  [26.316863,-80.122553], // 'Deerfield Beach',
  [26.3927,-80.09903299999999], // 'Boca Raton',
  [26.454242,-80.09096699999999], // 'Delray Beach',
  [26.553783,-80.07059699999999], // 'Boynton Beach',
  [26.616142,-80.069133], // 'Lake Worth',
  [26.713299,-80.062539], // 'West Palm Beach',
  [26.758744,-80.076933], // 'Mangonia Park' 
];


function getStationName(station_index) {
    return station_map[station_index-1];
}

function getStationCoordinates(station_index) {
    return station_coordinates[station_index - 1];
}

function listStations() {
    return station_map;
}

function listStationsCoordinates() {
    return station_coordinates;
}

function getByDepartureIdAndTrainId(departure_station_id, train_id) {
    if (!departure_station_id || !train_id) {
        console.error('missing required parameters');
        return [];
    }
    var res = [];
    dep_train_idx[departure_station_id][train_id].forEach( function(master_index) {
        res.push(data[master_index]);
    });
    return res;
}

function getByDepartureIdAndScheduleId(departure_station_id, schedule_id) {
    if (!departure_station_id || !schedule_id) {
        console.error('missing required parameters');
        return [];
    }
    var res = [];
    dep_sched_idx[departure_station_id][schedule_id].forEach( function(master_index) {
        res.push(data[master_index]);
    });
    return res;
}

function getByDepartureIdAndArrivaldAndScheduleId(departure_station_id, arrival_station_id, schedule_id) {
    if (!departure_station_id || !arrival_station_id || !schedule_id) {
        console.error('missing required parameters');
        return [];
    }
    var res = [];
    dep_ar_sched_idx[departure_station_id][arrival_station_id][schedule_id].forEach( function(master_index) {
        res.push(data[master_index]);
    });
    return res;
}

function formatTime(seconds) {
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

module.exports = {
    "getStationName": getStationName,
    "getStationCoordinates": getStationCoordinates,
    "listStations": listStations,
    "listStationsCoordinates": listStationsCoordinates,
    "getByDepartureIdAndTrainId": getByDepartureIdAndTrainId,
    "getByDepartureIdAndScheduleId": getByDepartureIdAndScheduleId,
    "getByDepartureIdAndArrivaldAndScheduleId": getByDepartureIdAndArrivaldAndScheduleId,
    "formatTime": formatTime,   
    "data": data,
    "weekday": WEEKDAY,
    "weekend": WEEKEND
};
