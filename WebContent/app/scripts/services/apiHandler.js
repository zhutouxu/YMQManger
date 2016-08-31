/**
 * 构建生成地址URL服务
 * Created by Administrator on 2016/5/9.
 */
define(['IDS'], function (app) {
    /**
     * baseInfo是一个全局变量，里面包含了登录之后的一些信息
     */
    app.factory('apiHandler', ['hsHttpService','hsUtilsServices' ,function (hsHttpService,hsUtilsServices) {
        var apiHandler = {};
        /**
         * 默认传过来的参数
         * @type {{url: string, params: string, successCallback: *, failCallback: (jQuery.noop|noop|A), disconnectCallback: *}}
         */
        var paramOptions = {
            succeCallback: function (response) {
                console.log(response)
            },
            failCallback: function (response) {
                alert(response.error_info);
            },
            disconnCallback: function (response) {
                console.log(response)
            }
        }
        /**
         * 判断是否成功
         * @param response
         */
        var isSuccess = function (response) {
            /**
             * 这个是针对不同项目判断方式不同
             */
            if (!response.error_code || (response.error_code == 0))
                return true;
            else
                return false;
        }
        /**
         * 初始化参数
         */
        var initParam = function (options) {
            //angular.extend(options,paramOptions);
            hsUtilsServices.myExtend(options,paramOptions);
        }
        
        /**
         * 针对post请求
         * @param options
         */
        apiHandler.post = function (options) {
            initParam(options);
            hsHttpService.postRequest(options.url, options.params)
                .then(function (response) {
                    //成功回调
                    if(isSuccess(response))
                        options.succeCallback(response);
                    else
                        //失败回调
                        options.failCallback(response);
                }, function (response) {
                    //404等错，一般不考虑，直接在拦截器里面统一做拦截处理
                    options.disconnCallback(response);
                });
        }
        /**
         * 针对get请求
         * @param options
         */
        apiHandler.get = function (options) {
            initParam(options);
            hsHttpService.getRequest(options.url, options.params)
                .then(function (response) {
                    if(isSuccess(response))
                        options.succeCallback(response);
                    else
                        options.failCallback(response);
                }, function (response) {
                    options.disconnCallback(response);
                });
        }
        
        return apiHandler;
    }]);
});