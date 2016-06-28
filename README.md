# tri-rail-schedule

**tri-rail-schedule** is a library that allows one to query SFRTA Tri-Rail schedule. They dont have web services unfurtunatly (or they are hiding it well...), so there is a parser that does ugly scraping.

**This is not an official library from SFRTA or Tri Rail, please do not contact them for support, however you can always open bugs against this project on github**

official TriRail schedule URI <http://www.tri-rail.com/train-schedules/TrainSchedule.aspx>

## Synopsis

```javascript
var TriRailSchedule = require('tri-rail-schedule');

TriRailSchedule.getSchedule({
    dp: 14,
    ar: 6,
    dt: 1
}, function(data) {
    console.log(data);
});

```
