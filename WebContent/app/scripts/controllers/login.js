/**
 * Created by Administrator on 2016/6/29.
 */
define(['IDS'], function (app) {
    app.controller("loginCtrl", ['$rootScope', '$scope', '$cookies','$state', 'apiHandler', 'url', 'modalOptions',
        function ($rootScope, $scope, $cookies, $state, apiHandler, url, modalOptions) {
            $scope.lg = {
                form: {
                	username: "",
                	userpwd: "",
                },
                options: {
                    url: url.login,
                    params: {},
                    succeCallback: function (response) {
                    	$cookies.put("user_id",response.user_id);
                        $state.go("home");
                    },
                    failCallback: angular.noop(),
                    disconnCallback: angular.noop()
                },
                submit: function () {
                	this.options.params = this.form;
                    apiHandler.post(this.options);
                }
            }
        }])
})
