/**
 * Created by Administrator on 2016/7/1.
 * HTTP请求错误的统一处理
 */
define(["IDS"], function (app) {
    //这里说明一下为什么使用$injector.get的方式去获取$uibModal，而不选直接注入的方式，是因为在该JS启动加载之前ui.bootstrap应该还没加载，所以会报依赖找不到
    //需要我们使用$injector的方式去动态加载
    app.factory("httpInterceptor" ,['$q','hsDialogService','modalOptions' ,function ($q,hsDialogService,modalOptions) {
        var httpInterceptor = {};
        /**
         * 接收一个参数，它是 $http 中的标准 config 对象，同时也需要返回一个标准 config ，
         * 此时可以添加各类身份验证信息，同时也可在此启动进度条
         * @param config
         * @returns {*}
         */
        httpInterceptor.request = function (config) {
            return config;
        };
        /**
         * 当有多个 Interceptor 的时候， requestError 会在前一个 Interceptor
         * 抛出错误或者执行 $q.reject() 时执行，接收的参数就对应的错误
         * @param err
         * @returns {Promise}
         */
        httpInterceptor.requestError = function (err) {
            return $q.reject(err);
        };
        /**
         * 接受一个请求对象参数，可以不处理就直接返回，此时也可以将进度条显示为成功完成，当然，
         * 如果后端 API 返回自定义错误时，HTTP 的状态码仍然是 200 得话，
         * 便在这里处理自定义错误，也可以对返回数据做一些处理，注意要将进度条置为完成
         * @param res
         * @returns {*}
         */
        httpInterceptor.response = function (res) {
            return res;
        };

        httpInterceptor.responseError = function (err) {
            //弹窗延迟显示3秒后自动关闭
            modalOptions.templateUrl = "views/template/del.html";
            modalOptions.controller = "delModalCtrl"
            switch (err.status){
                case -1:
                    modalOptions.modalInfo = '-1：远程服务服务响应失败';
                    break;
                case 500:{
                    modalOptions.modalInfo = '500：访问服务失败';
                    break;
                }
                case 404:{
                    modalOptions.modalInfo = '404：资源不存在';
                    break;
                }
                case 501:{
                    modalOptions.modalInfo = '501：未实现';
                    break;
                }
            }
            hsDialogService.modalOpen(modalOptions);
            return $q.reject(err);
        };
        return httpInterceptor;
    }])
})
