/**
 * Created by shadow on 16/2/6.
 */
'use strict';

var request = require('superagent');
var sendEmail = require('./sendEmail');

//设置请求头部信息
var headers = {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    Origin: 'http://wap.17wo.cn',
    'X-FirePHP-Version': '0.0.6',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded',
    DNT: 1,
    Referer: 'http://wap.17wo.cn/Login.action',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.6,en;q=0.4,sr;q=0.2'
};


//登录url和签到url拼接完整连接
var origin = 'http://17wo.cn';
var urls = {
    login: origin + '/Login!process.action',
    checkIn: origin + '/SignIn.action?checkIn=true'
};


//自动签到
class AutoCheckIn{

    constructor(account){
        this.account = account;
        this.cookie = {
            value: null,
            expires: null
        };
    }

    //登录
    _login(cb){
        var that = this;
        request
            .post(urls.login)
            .set(headers)
            .type('form')
            .send({
                backurl: null,
                backurl2: null,
                chk: null,
                chkType: 'on',
                loginType: 0,
                mobile: that.account.user,
                password: that.account.password
            })
            .redirects(0) //防止页面重定向
            .end(function(result){
                var cookie = result.headers['set-cookie'];
                that.cookie = {
                    value: cookie,
                    expires: cookie.join().match(/Expires=(.*);/)[1]
                };

                cb(that.cookie);

            });


    }


    //签到
    checkIn(cb){
        var that = this;
        that._verify(function (cookie) {
            request
                .get(urls.checkIn)
                .set(headers)
                .set('Cookie', cookie.value)
                .end(cb);
        });
    }




}




module.exports = function(account){

    return new AutoCheckIn(account);

};





















