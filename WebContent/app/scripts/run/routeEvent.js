/**
 * Created by Administrator on 2016/6/28.
 */
define(['IDS'], function (app) {
    app.run(['$rootScope', '$cookieStore', '$state', '$stateParams','$log','hsUtilsServices' ,function ( $rootScope, $cookieStore, $state, $stateParams,$log,hsUtilsServices) {
        /**
         * 初始化服务，这样就可以在html页面中直接调用
         * @type {$state|*}
         */
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.hsUtilsServices = hsUtilsServices;
        
        $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
        	if(toState.name=='login')return;// 如果是进入登录界面则允许
        	// 如果用户不存在
        	if(!$cookieStore.get("user_id")){
        		event.preventDefault();// 取消默认跳转行为
        		$state.go("login",{from:fromState.name,w:'notLogin'});//跳转到登录界面
        	}
        });
    }])
})
