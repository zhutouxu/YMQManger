/**
 * Created by Administrator on 2016/6/30.
 */
"use strict";
define(['IDS'], function (app) {
    app.controller("homeCtrl", ['$scope', '$cookies', '$state', function ($scope, $cookies, $state) {
        $scope.vm = {
            exit: function () {
            	$cookies.remove("user_id");
                $state.go("login");
            }
        }
    }])
})