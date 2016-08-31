/**
 *
 * @authors Administrator (you@example.org)
 * @date    2015/11/7 18:31
 * @version $ IIFE
 */

/* name module */
define(['app', 'config'], function(app, CT) {

    // 获取场馆报名时间段列表
    function getSignUpTimes(data, callback) {
        data.weixinId = CT.WX_ID;
        sendRequest('getSignUpTimes.do', data, function(res) {

            callback(res);
        });

    }

    // 报名
    function submitSignUp(data, callback) {
        data.weixinId = CT.WX_ID;
        sendRequest('submitSignUp.do', data, function(res) {

            callback(res);
        });

    }

    // 取消报名
    function cancelSignUp(callback) {
        sendRequest('cancelSignUp.do', {
            userId: CT.USER_ID
        }, function(res) {
            callback(res);
        });

    }

    // 签到
    function submitSignIn(callback) {
        sendRequest('submitSignIn.do', {
            userId: CT.USER_ID
        }, function(res) {
            callback(res);
        });

    }

    //	报名结果查询
    function searchSignUp(callback) {
        sendRequest('searchSignUp.do', {
            userId: CT.USER_ID
        }, function(res) {
            callback(res);
        });

    }

    //	活动人员名单查询
    function getActivitieUsers(data, callback) {
        sendRequest('getActivitieUsers.do', data, function(res) {

            callback(res);
        });

    }

    function sendRequest(url, data, successFn, params) {

        var req = {
            url: url,
            data: data || {},
            success: function(res) {
                var jsonData = res;

                if(jsonData.return_code && jsonData.return_code !== "0" && jsonData.return_code !== "1000") {
                    app.f7.alert(jsonData.return_msg, '系统消息');
                } else {
                    successFn(jsonData);
                }
            },
            error: function() {
                app.f7.alert('请求异常！', '系统消息');
            }
        }
        // 可选参数
        if(app.utils.isObject(params)) {
            // 同步
            if(params.async === false) {
                req.async = false;
            }
        }

        app.service.loadWeb(req);
    }

    return {
        getSignUpTimes: getSignUpTimes,
        submitSignUp: submitSignUp,
        cancelSignUp: cancelSignUp,
        submitSignIn: submitSignIn,
        searchSignUp: searchSignUp,
        getActivitieUsers: getActivitieUsers
    };

});