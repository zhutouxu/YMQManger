/**
 * Created by Administrator on 2016/6/29.
 */
define(['IDS'], function (app) {
    app.controller("addUserCtrl", ['$rootScope', '$scope', '$state', 'apiHandler', 'url', 'operatorInfo',
        function ($rootScope, $scope, $state, apiHandler, url, operatorInfo) {
            $scope.lg = {
                form: {
                	employno: "",
                	employname: "",
                	startdate: "",
                	telephone: "",
                	mail: "",
                	department: ""
                },
                options: {
                    url: url.addUser,
                    params: {},
                    succeCallback: function (response) {
                    	alert("新增成功！");
                    	$scope.lg.form={};
                        $state.go("home.addUser");
                    },
                    failCallback: function (response) {
                    	alert(response.error_info);
                    	location.reload();
                    },
                    disconnCallback: angular.noop()
                },
                submit: function (form) {
                	this.options.params = this.form;
                    apiHandler.post(this.options);
                }
            }
        }])
})
