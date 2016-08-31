require.config({
    baseUrl: 'js',
    urlArgs: 'v=' + Date.now(),  // 定义请求js文件版本号
    paths: {
        Framework7: 'libs/framework7.custom.min',
        vue: "libs/vue.min",
        text: 'libs/text',
        popup: '../popup'
    },
    shim: {
        Framework7: {
            exports: 'Framework7'
        }
    }
});

define('app', ['Framework7', 'router', 'utils', 'service'], function(Framework7, Router, Utils, Service) {
    $$ = window.Dom7;
    var f7 = new Framework7({
        cache: false,
        pushState: false,
        swipePanel: 'left',
        modalTitle: '系统消息',
        modalButtonOk: '确定',
        modalButtonCancel: '取消',
        smartSelectBackText: '完成',
        activeState: false,
        preloadPreviousPage: false,
        swipeBackPage: false, // 返回执行init事件
        animateNavBackIcon: true,
        // Hide and show indicator during ajax requests
        onAjaxStart: function (xhr) {
            f7.showIndicator();
        },
        onAjaxComplete: function (xhr) {
            f7.hideIndicator();
        }
    });
    var mainView = f7.addView('.view-main', {
        dynamicNavbar: true
    });

    return {
        f7: f7,
        mainView: mainView,
        router: Router,
        utils: Utils,
        service: Service
    };
});

// 初始化,载入主程序
require(['app', 'config'], function(app, CT) {
    // toolbar 切换
    $$(".toolbar a").on("click",function(){
        $$(".toolbar a").removeClass("active");
        $$(this).addClass("active");
    });

    var urlArgs = app.utils.getQueryStringArgs();
    if(urlArgs) {
        CT.WX_ID = urlArgs.appid ? urlArgs.appid : CT.WX_ID;
        CT.USER_ID = urlArgs.userid ? urlArgs.userid : CT.USER_ID;
        CT.MOBILE = urlArgs.mobile ? urlArgs.mobile : CT.MOBILE;
    }

    app.router.init();
    app.mainView.router.load({url: 'pages/sign_up.html', animatePages: false});
});

