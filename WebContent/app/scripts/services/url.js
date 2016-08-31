/**
 * 构建生成地址URL服务
 */
define(["IDS"], function (app) {
    app.factory("url", ["baseUrl",function (baseUrl) {
        var url = {};
        url.viewpointmsgSearch ="scripts/json/viewpointmsgSearch.json";
        url.viewpointmsgSave = "scripts/json/viewpointmsgSave.json";
        url.error404 = 'http://www.discuz.net/thread-3494292-1-1.html%E3%80%81123';
        url.login = "http://192.168.156.153:8080/YMQManager/login.do";
        url.resetPwd = "http://192.168.156.153:8080/YMQManager/changePwd.do";
        url.addUser = 'http://192.168.156.153:8080/YMQManager/addvipuser.do';
        url.editUser = 'http://192.168.156.153:8080/YMQManager/updatevipuser.do';
        url.userManager = 'http://192.168.156.153:8080/YMQManager/qryvipuser.do';
        url.bookQry = 'http://192.168.156.153:8080/YMQManager/getapplyinfo.do';
        url.delUser = 'http://192.168.156.153:8080/YMQManager/delvipuser.do';
        url.timeQry = 'http://192.168.156.153:8080/YMQManager/getSignUpTimes.do';
        url.fieldQry = 'http://192.168.156.153:8080/YMQManager/getSignUpFields.do';
        return url;
    }]);
});