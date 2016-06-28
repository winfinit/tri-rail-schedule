"use strict";

var request = require('request');
var htmlparser = require("htmlparser2");

module.exports = {
    getSchedule: getSchedule
};


var entry_count = 0;
var data = [];
var time_start = false;

function getSchedule(params, callback) {
    request.get({
        url: "http://www.tri-rail.com/train-schedules/TrainSchedule.aspx", 
        qs: {
            dp: params.dp, 
            ar: params.ar,
            dt: params.dt
        }
    }, function(err, res, body) {
        var parser = new htmlparser.Parser({
                onopentag: function(name, attribs){
                    if(name === "tr"){
                        time_start = true;
                        data[entry_count] = [];
                    }
                },
                ontext: function(text){
                    if (time_start === true) {
                        var val = text.replace(/\s/g, '');
                        if (val !== '') {
                            data[entry_count].push(val);
                        }
                    }
                },
                onclosetag: function(tagname){
                    if(tagname === "tr"){
                        time_start = false;
                        entry_count++;
                    }
                }
        }, {decodeEntities: true});
        parser.write(body);
        parser.end();
        callback(data);
    });
};
