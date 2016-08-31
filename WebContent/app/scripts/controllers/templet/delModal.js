/**
 * Created by Administrator on 2016/7/1.
 * 删除的controller
 */
"use strict";
define(['IDS'], function (app) {
    app.controller("delModalCtrl", ['$scope', '$uibModalInstance', '$timeout', 'modalTitle', 'modalInfo', 'modalType', 'modalTime', function ($scope, $uibModalInstance, $timeout, modalTitle, modalInfo, modalType, modalTime) {
        var vm = $scope.vm = {
            form: {
                modalInfo: modalInfo,
                modalTitle: modalTitle,
            },
            submit: function () {
                $uibModalInstance.close();
            },
            cancel: function () {
                $uibModalInstance.dismiss('cancel');
            },
            timeOut: function (_modalTime) {
                //当timeout被定义时，它返回一个promise对象
                var timer = $timeout(
                    function () {
                        vm.cancel();
                    },
                    _modalTime
                );
                //将resolve/reject处理函数绑定到timer promise上以确保我们的cancel方法能正常运行
                timer.then(
                    function () {
                        console.log("Timer resolved!", Date.now());
                    },
                    function () {
                        console.log("Timer rejected!", Date.now());
                    }
                );
            }
        }
        /**
         * 初始化，自动关闭
         */
        if(angular.isNumber(modalTime) && modalTime > 0 )
            vm.timeOut(modalTime);
    }])
})