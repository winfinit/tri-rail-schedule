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


function getStationName(station_index) {
    return station_map[station_index-1];
}

function listStations() {
    return station_map;
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
    "getStations": listStations,
    "getByDepartureIdAndTrainId": getByDepartureIdAndTrainId,
    "getByDepartureIdAndScheduleId": getByDepartureIdAndScheduleId,
    "getByDepartureIdAndArrivaldAndScheduleId": getByDepartureIdAndArrivaldAndScheduleId,
    "formatTime": formatTime,   
    "data": data,
    "weekday": WEEKDAY,
    "weekend": WEEKEND
};
