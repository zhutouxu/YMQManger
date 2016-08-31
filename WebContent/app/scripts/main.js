/**
 * Require配置
 * Created by yejiaming on 2016/4/28.
 *    main.js为require.js的入口文件，在这个文件里面会指定一个模块，用require启动该模块的angular程序，会把所有使用angularjs编写的模块都加载到页面中，
 */
require.config({
    //配置依赖的文件的路径
    paths: {
        //外部依赖
        "angular": "../../bower_components/angular/angular",
        "angularAnimate": "../../bower_components/angular-animate/angular-animate",
        "angularCookies": "../../bower_components/angular-cookies/angular-cookies",
        "angularMessages": "../../bower_components/angular-messages/angular-messages",
        "angularSanitize": "../../bower_components/angular-sanitize/angular-sanitize",
        "uiBootstrap": "../../bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls",
        "uiValidate": "../../bower_components/angular-ui-validate/dist/validate",
        "jquery": "../../bower_components/jquery/dist/jquery",
        "uiRouter":"../../bower_components/ui-router/release/angular-ui-router",
        "hsUI": "lib/hs/hsuf-ui",

        //app
        "IDS": "app",
        //directives指令
        "hsDirective": "directives/hsDirectives",
        //filters过滤器
        "hsFilter": "filters/hsFilter",
        //services服务
        "httpInterceptor":"services/httpInterceptor",
        "hsDialogService":"services/hsDialogService",
        "apiHandler": "services/apiHandler",
        "url": "services/url",
        "ui": "services/ui",
        "hsUtilsServices":"services/hsUtilsServices",
        //values变量
        "loginInfo": "values/loginInfo",
        "modalOptions": "values/modalOptions",
        "operatorInfo": "values/operatorInfo",
        //run执行器
        "routeEvent": "run/routeEvent",
        //constant常量
        "baseUrl": "constants/baseUrl",
        //config所有配置
        "httpConfig": "config/httpConfig",
        "routeConfig": "config/routeConfig",
        //controllers控制器
        'homeCtrl':'controllers/home',
        'resetPwdCtrl':'controllers/resetPwd',
        'loginCtrl':'controllers/login',
        
        'delModalCtrl':'controllers/templet/delModal',
        'addUserCtrl':'controllers/userManager/addUser',
        'editUserCtrl':'controllers/userManager/editUser',
        'userManagerCtrl':'controllers/userManager/userManager',
        'bookQryCtrl':'controllers/bookManager/bookQry',

    },
    //这个配置是你在引入依赖的时候的包名
    shim: {
        "angular": {
            deps: ['jquery'],
            exports: "angular"
        },
        "angularCookies": {
            deps: ['angular'],
            exports: "angularCookies"
        },
        "angularSanitize": {
            deps: ['angular'],
            exports: "angularSanitize"
        },
        "httpConfig": {
            deps: ['httpInterceptor'],
            exports: "httpConfig"
        },
        "httpInterceptor": {
            deps: ['uiBootstrap'],
            exports: "httpInterceptor"
        },
        "apiHandler": {
            deps: ['hsUtilsServices'],
            exports: "apiHandler"
        },
        "angularAnimate": {
            deps: ['angular'],
            exports: "angularAnimate"
        },
        "angularMessages": {
            deps: ['angular'],
            exports: "angularMessages"
        },
        "uiRouter": {
            deps: ['angular'],
            exports: "uiRouter"
        },
        "uiValidate": {
            deps: ['angular'],
            exports: "uiValidate"
        },
        "uiBootstrap": {
            deps: ['angular', 'angularSanitize'],
            exports: "uiBootstrap"
        },
        "hsUI": {
            deps: ['angular'],
            exports: "hsUI"
        }
    }
});

/**
 * 手动启动IFS应用
 * Created by yejiaming on 2016/4/28.
 * require([],object)
 */
require(
    [
        "angular",
        "angularAnimate",
        "angularCookies",
        "angularMessages",
        "angularSanitize",
        "uiRouter",
        "uiBootstrap",
        "uiValidate",
        "jquery",

        "hsUI",
        "IDS",
        "hsDirective",
        "hsFilter",
        "hsUtilsServices",
        "hsDialogService",
        "apiHandler",
        "url",
        "ui",
        "loginInfo",
        "operatorInfo",
        "modalOptions",
        "routeEvent",
        "baseUrl",
        "httpConfig",
        "routeConfig",

        'homeCtrl',
        'resetPwdCtrl',
        'loginCtrl',

        'addUserCtrl',
        'editUserCtrl',
        'userManagerCtrl',
        'bookQryCtrl',
        'delModalCtrl'

    ], function (angular) {
        angular.bootstrap(document, ["IDS"]); //第二个参数为需要启动的模块名
    });