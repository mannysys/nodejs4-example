/**
 * Created by shadow on 16/2/6.
 */

var async = require('async');

//moment,twix时间工具
var moment = require('moment')
var twix = require('twix');


//判断程序启动时间
function isTime(){
    var hms = 'HHmmss';
    return moment("091500",hms).twix(moment("160000",hms)).contains(moment());
}

//打印日志
if(isTime()){
    console.log("===============Working time===================");
}

//日志时间格式化
function now() {
    return moment().format("HH:mm:ss");
}

//全局变量G
var G = 0;

//模拟程序A
function A() {
    console.log(now() + " A(s1)=> {G:" + (G++) + "} Cache G");
}

//模拟程序B
function B() {
    console.log(now() + " B(s10)=> {B:10} TO client");
}

//模拟程序C
function C() {
    console.log(now() + " C(s5)=> {G:" + (G / 5) + "} TO client");
    G = 0;
}






var arr = [
    {fun: A, delay: 1000, test: isTime},
    {fun: B, delay: 10 * 1000, test: isTime},
    {fun: C, delay: 5 * 1000, test: isTime}
];

async.each(arr, function(item, callback){
    async.whilst(item.test, function(cb){
        item.fun();
        setTimeout(cb, item.delay);
    },function(err){
        console.log('Not working time!');
    });


}, function(err){
    log('Error: ' + err);
});