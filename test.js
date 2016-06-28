var TriRailSchedule = require('./index');

TriRailSchedule.getSchedule({
    dp: 14,
    ar: 6,
    dt: 1
}, function(data) {
    console.log(data);
});

