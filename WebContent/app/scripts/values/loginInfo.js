/**
 * Created by Administrator on 2016/6/27.
 */
/**
 * 用于登录信息的保存的JS
 * Created by Administrator on 2016/5/9.
 */
define(['IDS'], function (app) {
    app.value("loginInfo", {
        user_token: sessionStorage.getItem('access_token'),
    })
})