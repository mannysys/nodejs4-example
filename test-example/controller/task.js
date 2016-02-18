/**
 * Created by shadow on 16/2/6.
 */
'use strict';

const later = require('later');




//定时任务
module.exports = function(time, intervalFn){
    var sched = {
        schedules: [time]
    };

    //设定为本地时间
    later.date.localTime();
    later.setInterval(intervalFn, sched)


};

