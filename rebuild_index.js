var fs = require('fs');
var master_list = require('./raw_data/dataFull.json');

var dep_train_idx = [];
var dep_sched_idx = [];
var dep_ar_sched_idx = [];

var temp_filter = {};
master_list.forEach(function(row, index) {
    if (! dep_train_idx[row.departure_station_id] ) {
        dep_train_idx[row.departure_station_id] = {};
    }
    if (! dep_train_idx[row.departure_station_id][row.train_id] ) {
        dep_train_idx[row.departure_station_id][row.train_id] = [];
    }

    if (! dep_sched_idx[row.departure_station_id] ) {
        dep_sched_idx[row.departure_station_id] = [];
    }
    if (! dep_sched_idx[row.departure_station_id][row.schedule_id] ) {
        dep_sched_idx[row.departure_station_id][row.schedule_id] = [];
    }

    if (! dep_ar_sched_idx[row.departure_station_id] ) {
        dep_ar_sched_idx[row.departure_station_id] = [];
    }
    if (! dep_ar_sched_idx[row.departure_station_id][row.arrival_station_id] ) {
        dep_ar_sched_idx[row.departure_station_id][row.arrival_station_id] = [];
    }
    if (! dep_ar_sched_idx[row.departure_station_id][row.arrival_station_id][row.schedule_id] ) {
        dep_ar_sched_idx[row.departure_station_id][row.arrival_station_id][row.schedule_id] = [];
    }

    // attempt to make index as a unique pair
    if (! temp_filter[row.departure_station_id + "_" + row.train_id] ) {
        temp_filter[row.departure_station_id + "_" + row.train_id] = 1;
        dep_train_idx[row.departure_station_id][row.train_id].push(index);
        dep_sched_idx[row.departure_station_id][row.schedule_id].push(index);
    }
    dep_ar_sched_idx[row.departure_station_id][row.arrival_station_id][row.schedule_id].push(index);
});

// save indexes
fs.writeFile("raw_data/dep_train_idx.json", JSON.stringify(dep_train_idx), function(err) {
    if(err) {
      console.log(err);
    } 
    console.log('wrote dep_train_idx.json');
}); 
fs.writeFile("raw_data/dep_sched_idx.json", JSON.stringify(dep_sched_idx), function(err) {
    if(err) {
      console.log(err);
    } 
    console.log('wrote dep_sched_idx.json');
}); 
fs.writeFile("raw_data/dep_ar_sched_idx.json", JSON.stringify(dep_ar_sched_idx), function(err) {
    if(err) {
      console.log(err);
    } 
    console.log('wrote dep_ar_sched_idx.json');
}); 
