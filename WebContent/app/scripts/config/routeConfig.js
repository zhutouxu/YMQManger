/**
 * Created by Administrator on 2016/6/28.
 */
"use strict";
define(['IDS'], function (app) {
    app.config(['$stateProvider','$urlRouterProvider' ,function ($stateProvider,$urlRouterProvider) {
        /**
         * 配置默认路由
         */
        $urlRouterProvider.when('','home');
        $urlRouterProvider.otherwise('home');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            })
            .state('resetPwd', {
                url: '/resetPwd',
                templateUrl: 'views/resetPwd.html',
                controller: 'resetPwdCtrl'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'homeCtrl'
            })

            .state('home.addUser', {
                url: '/addUser',
                templateUrl: 'views/userManager/addUser.html',
                controller: 'addUserCtrl'
            })
            .state('home.editUser', {
                url: '/editUser',
                templateUrl: 'views/userManager/editUser.html',
                controller: 'editUserCtrl'
            })
            .state('home.userManager',{
                url: '/userManager',
                templateUrl: 'views/userManager/userManager.html',
                controller: 'userManagerCtrl'
            })
            .state('home.bookQry', {
                url: '/bookQry',
                templateUrl: 'views/bookManager/bookQry.html',
                controller: 'bookQryCtrl'
            })

    }])
})