/**
 * Created by Administrator on 2016/6/29.
 */
define(['IDS'], function (app) {
    app.controller("editUserCtrl", ['$rootScope', '$scope', '$state', 'apiHandler', 'url', 'operatorInfo',
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
                    url: url.editUser,
                    params: {},
                    succeCallback: function (response) {
                    	alert("修改成功！");
                        $state.go("home.userManager");
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
            //初始化数据
            if(sessionStorage.getItem('view') != 'undefined'){
                var view = JSON.parse(sessionStorage.getItem('view'));
                $scope.lg.form.employno = view.employno;
                $scope.lg.form.employname = view.employname;
                $scope.lg.form.startdate = view.startdate;
                $scope.lg.form.telephone = view.telephone;
                $scope.lg.form.mail = view.mail;
                $scope.lg.form.department = view.department;
            }
        }])
})
