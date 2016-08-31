define(['IDS'], function (app) {    
    app.controller("userManagerCtrl", ['$rootScope', '$scope', '$state', 'apiHandler', 'url', 'ui', 'modalOptions','hsDialogService',
        function ($rootScope, $scope, $state, apiHandler, url, ui, modalOptions, hsDialogService) {
            $scope.lg = {
                form: {
                	pageno:"1",
                	pagesize:"5",
                	employno: ""
                },
                options: {
                	//totalcount: 0,
                    url: url.userManager,
                    params: {},
                    succeCallback: function (response) {
                    	$scope.lg.resp = response;
                    },
                    failCallback: angular.noop(),
                    disconnCallback: angular.noop()
                },
                modUser: function (item) {
                    sessionStorage.setItem('view',JSON.stringify(item));
                    $state.go('home.editUser');
                },
                //应答
                resp: {},
                submit: function (form) {
                	this.options.params = this.form;
                	//$scope.ui.qry();
                    apiHandler.post(this.options);
                },
                delOptions:{
                	url: url.delUser,
                    params: {},
                    succeCallback: function (response) {
                    	$scope.lg.resp = response;
                    	apiHandler.post($scope.lg.options);
                    },
                    failCallback: angular.noop(),
                    disconnCallback: angular.noop()
                },
                del: function(item){
                	modalOptions.modalTitle = "注销会员";
                	modalOptions.templateUrl = "views/template/del.html";
                    modalOptions.controller = "delModalCtrl"
                    modalOptions.modalInfo = '确定要注销该会员吗';
                    modalOptions.modalParams = item;
                    modalOptions.confirmCallback = function(result){
                    	$scope.lg.delOptions.params.employno = item.employno;
                    	apiHandler.post($scope.lg.delOptions);
                    };
                    hsDialogService.modalOpen(modalOptions);
                }
            };
            
            $scope.lg.submit();
            
            $scope.ui = ui($scope.lg.options);
            
        }])
})
