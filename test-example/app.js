/**
 * Created by shadow on 16/2/6.
 */
'use strict';
const SendEmail = require('./controller/sendEmail');

//let mail = new SendEmail();
//mail.host = 'smtp.163.com';             //邮件主机地址
//mail.fromUser = 'mannysys@163.com';     //发送人邮箱
//mail.password = 'mudanhua5280';         //发送邮箱密码
//mail.toUser = '724475200@qq.com';       //接收邮件地址
//mail.mailTitle = '一封测试邮件标题';        //邮件标题
//mail.mailHtml = '<h2>邮件内容...</h2>'; //邮件html内容
//
////开始发送邮件
//mail.startSend()
//    .then(function(result){
//        console.log(result);
//    },function(err){
//        console.log(err);
//    });

const later = require('later');

let sched = later.parse.text('every 5 mins'),
    occurrences = later.schedule(sched).next(10);

for(var i=0;i<10;i++){
    console.log(occurrences[i]);
}
