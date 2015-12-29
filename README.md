# tri-rail-schedule

**tri-rail-schedule** is a library that allows one to query SFRTA Tri-Rail schedule offline. They dont have web services onfurtunatly (or they are hiding it well...), so there is a parser that does ugly scraping.

**This is not an official library from SFRTA or Tri Rail, please do not contact them for support, however you can always open bugs against this project on github**

official TriRail schedule URI <http://www.tri-rail.com/train-schedules/TrainSchedule.aspx>

## Synopsis

```javascript
var TriRailSchedule = require('tri-rail-schedule');

var times = TriRailSchedule.getByDepartureIdAndArrivaldAndScheduleId(14, 6, TriRailSchedule.weekday);

console.log("total records:", times.length);
times.forEach(function(row, index) {
    console.log('------');
    console.log("station name:", TriRailSchedule.getStationName(row.departure_station_id));
    console.log("departure time:", TriRailSchedule.formatTime(row.departure_time));
    console.log("arrival time:", TriRailSchedule.formatTime(row.arrival_time));
});
```

## Methods
# .getStationName(returned_station_id)
return station name from station ID

```javascript
TriRailSchedule.getStationName(1); // Miami Airport 
```

# .formatTime(returned_time)
return formatted time

```javascript
TriRailSchedule.formatTime(79260); // 10:01PM
```


# .getByDepartureIdAndTrainId(departure_station_id, train_id)
returns array of objects matching departure station id, and train id passed

```javascript
TriRailSchedule.getByDepartureIdAndTrainId(1, "P600")
```

# .getByDepartureIdAndScheduleId(departure_station_id, schedule_id)
returns array of objects matching departure station id, and schedule id

```javascript
TriRailSchedule.getByDepartureIdAndScheduleId(1, TriRailSchedule.weekday)
```

# .getByDepartureIdAndArrivaldAndScheduleId(departure_station_id, arrival_station_id, schedule_id_
returns array of objects matching departure, arrival, and schedule ids

```javascript
TriRailSchedule.getByDepartureIdAndArrivaldAndScheduleId(1, 2, TriRailSchedule.weekday)
```

## Helpers

# .getStations
returns array of ordered stations where index is offset by one from real station id

```javascript
TriRailSchedule.getStations; // ["Miami Airport", ...]
```

# .weekday
returns weekday id

# .weekend
returns weekend id

# .data
returns complete list of schedule premutations

## Sample object structure

```javascript
{ 
    train_id: 'P649',           // unique train identifier
    departure_time: 76260,      // departure time in seconds
    arrival_time: 79260,        // arrival time in seconds
    schedule_id: 1,             // schedule id (1 weekday, 2 weekend)
    departure_station_id: 14,   // departure station identifier
    arrival_station_id: 6,      // arrival station identifier
    direction: 's'              // direction, s for southbound, n for northbound
}
```
