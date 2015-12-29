var TriRailSchedule = require('./');

var times = TriRailSchedule.getByDepartureIdAndArrivaldAndScheduleId(14, 6, TriRailSchedule.weekday);


console.log("total records:", times.length);
times.forEach(function(row, index) {
    console.log('------');
    console.log("%d:", index+1, "station name:", TriRailSchedule.getStationName(row.departure_station_id));
    console.log("%d:", index+1, "departure time:", TriRailSchedule.formatTime(row.departure_time));
    console.log("%d:", index+1, "arrival time:", TriRailSchedule.formatTime(row.arrival_time), row.arrival_time);
});
