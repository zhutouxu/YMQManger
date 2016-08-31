/**
 * Created by Administrator on 2016/6/29.
 */
define(['IDS'], function (app) {
    app.controller("bookQryCtrl", ['$rootScope', '$scope', '$state', 'apiHandler', 'url', 'ui', 'operatorInfo',
        function ($rootScope, $scope, $state, apiHandler, url, ui, operatorInfo) {
            $scope.lg = {
                form: {
                	pageno:"1",
                	pagesize:"5",
                	applystatus: "",
                	signstatus: "",
                	timeno: "",
                	fieldno: ""
                },
                timeReturn: {},
                fieldReturn: {},
                options: {
                    url: url.bookQry,
                    params: {},
                    succeCallback: function (response) {
                    	$scope.lg.resp = response;
                    },
                    failCallback: angular.noop(),
                    disconnCallback: angular.noop()
                },
                times: {
                	url: url.timeQry,
                	params: {},
                	succeCallback: function (response) {
                		$scope.lg.timeReturn = response.data;
                    }
                },
                fields: {
                	url: url.fieldQry,
                	params: {},
                	succeCallback: function (response) {
                		$scope.lg.fieldReturn = response.data;
                    }
                },
                //应答
                resp: {},
                submit: function (form) {
                	this.options.params = this.form;
                    apiHandler.post(this.options);
                },
                init: function () {
                	apiHandler.post(this.times);
                	apiHandler.post(this.fields);
                }
            };
            
            $scope.lg.init();
            
            $scope.lg.submit();
            
            $scope.ui = ui($scope.lg.options);
            
        }])
})
