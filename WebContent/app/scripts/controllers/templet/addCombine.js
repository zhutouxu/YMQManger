/**
 * Created by Administrator on 2016/7/1.
 * 删除的controller
 */
"use strict";
define(['IDS'], function (app) {
    app.controller("addCombineCtrl", ['$scope', '$uibModalInstance', 'modalOptions', '$timeout', 'modalTitle', 'url', 'hsDialogService',
        function ($scope, $uibModalInstance, modalOptions, $timeout, modalTitle, url, hsDialogService) {
            $scope.ac = {
                modalTitle: modalTitle,
                combines: [
                    {
                        name: "常胜将军",
                        dailyIncome: "10%",
                        fouses: "5000"
                    },
                    {
                        name: "常胜将军1",
                        dailyIncome: "10%",
                        fouses: "5000"
                    },
                    {
                        name: "常胜将军2",
                        dailyIncome: "10%",
                        fouses: "5000"
                    },
                    {
                        name: "常胜将军3",
                        dailyIncome: "10%",
                        fouses: "5000"
                    },
                ],
                selectedCombine: [],
                allSelected: false,
                showDetail: function (item) {
                    modalOptions.modalTitle = "组合详情";
                    modalOptions.templateUrl = "views/template/combineDetail.html";
                    modalOptions.controller = "combineDetailCtrl";
                    modalOptions.modalParams.src = url.combineDetailUrl;    //需要组装URL地址
                    hsDialogService.modalOpen(modalOptions);
                },
                addCombine: function (item, index) {
                    if (arguments.length) {   //单选
                        if (item.$select) {
                            item.$select = false;
                            var i = this.selectedCombine.indexOf(index);
                            this.selectedCombine.splice(i, 1);
                        } else {
                            item.$select = true;
                            this.selectedCombine.push(index);
                        }
                        if(this.combines.length != this.selectedCombine.length){
                            this.allSelected = false;
                        }else {
                            this.allSelected = true;
                        }
                    } else {        //全选
                        if (this.allSelected) {
                            $scope.ac.selectedCombine = [];
                            angular.forEach(this.combines, function (item, index) {
                                item.$select = true;
                                $scope.ac.selectedCombine.push(index);
                            })
                        } else {
                            angular.forEach(this.combines, function (item) {
                                item.$select = false;
                                $scope.ac.selectedCombine.splice(index, 1);
                            })
                        }
                    }
                },
                submit: function () {
                    var selectedCombine = [];
                    angular.forEach(this.selectedCombine, function (item) {
                        selectedCombine.push($scope.ac.combines[item]);
                    })
                    $uibModalInstance.close(selectedCombine);
                },
                cancel: function () {
                    $uibModalInstance.dismiss('cancel');
                },
            }
        }])
})