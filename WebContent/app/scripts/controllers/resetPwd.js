/**
 * Created by Administrator on 2016/6/29.
 */
define(['IDS'], function (app) {
    app.controller("resetPwdCtrl", [ '$scope', '$cookies', '$state', 'apiHandler', 'url',
        function ( $scope, $cookies, $state, apiHandler, url) {
        $scope.vm = {
            rpParams: {
            	name: $cookies.get("user_id"),
            	oldpwd: "",
            	newpwd: "",
            	newpwd_p: ""
            },
            subOptions: {
                url: url.resetPwd,
                params: {},
                succeCallback: function (response) {
                	$cookies.remove("user_id");
                	alert("修改密码成功！");
                    $state.go("login");
                },
                failCallback: angular.noop(),
                disconnCallback: angular.noop()
            },
            reset: function () {
            	if(this.rpParams.NewPwd != this.rpParams.NewPwd_p){
            		alert("两次密码输入不一致！");
            		$scope.vm.rpParams={};
            	}else{
            		this.subOptions.params = this.rpParams;
                    apiHandler.post(this.subOptions);
            	}
            }
        }
    }])
})
