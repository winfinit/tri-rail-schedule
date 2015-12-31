var fs = require('fs');
var master_list = require('./raw_data/dataFull.json');

module.exports = function() {
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
        console.log('wrote raw_data/dep_train_idx.json');
    }); 
    fs.writeFile("raw_data/dep_sched_idx.json", JSON.stringify(dep_sched_idx), function(err) {
        if(err) {
          console.log(err);
        } 
        console.log('wrote raw_data/dep_sched_idx.json');
    }); 
    fs.writeFile("raw_data/dep_ar_sched_idx.json", JSON.stringify(dep_ar_sched_idx), function(err) {
        if(err) {
          console.log(err);
        } 
        console.log('wrote raw_data/dep_ar_sched_idx.json');
    }); 
    
    
    // build plist with full data for NSArray
    var string = 
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n' +
    '<plist version="1.0">\n' +
    '<array>\n';
    
    master_list.forEach(function(value, index) {
        string += "\t<array>\n" +
        "\t\t<string>" + value.train_id + "</string>\n" +
        "\t\t<string>" + value.departure_time + "</string>\n" +
        "\t\t<string>" + value.arrival_time + "</string>\n" +
        "\t\t<string>" + value.schedule_id + "</string>\n" +
        "\t\t<string>" + value.departure_station_id + "</string>\n" +
        "\t\t<string>" + value.arrival_station_id + "</string>\n" +
        "\t\t<string>" + value.direction + "</string>\n" +
        "\t</array>\n"
    });
    string += '</array>';
    fs.writeFile("plist/dataFull.plist", string, function(err) {
        if (err) {
            console.log(err);
        }
        console.log('wrote plist/dataFull.plist');
    });
}
