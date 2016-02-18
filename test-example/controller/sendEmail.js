/**
 * Created by shadow on 16/2/6.
 */
'use strict';

const nodemailer = require('nodemailer');


class SendEmail {

    constructor(host, fromUser, password, toUser, mailTitle, mailHtml) {
        this.host = host;           //邮件主机地址
        this.fromUser = fromUser;   //发送人邮箱
        this.password = password;   //发送邮箱密码
        this.toUser = toUser;       //接收邮件地址
        this.mailTitle = mailTitle; //邮件标题
        this.mailHtml = mailHtml;   //邮件html内容

    }

    startSend() {
        let that = this;
        //执行异步任务
        return new Promise(function(resolve, reject){
            //创建smtp连接池,配置信息
            let transporter = nodemailer.createTransport({
                host: that.host,
                secure: true, //use SSL
                auth: {
                    user: that.fromUser,
                    pass: that.password
                }
            });
            transporter.sendMail({
                from: that.fromUser,
                to: that.toUser,
                subject: that.mailTitle,
                html: that.mailHtml
            }, function (err, res) {
                if(err){
                    //return err;
                    reject(err);
                }else{
                    //return res.response;
                    resolve(res.response);
                }
                transporter.close(); //发送完毕,关闭连接池
            });

        });


    }


}


module.exports = SendEmail;

