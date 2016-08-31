/**
 * Created by Administrator on 2016/7/1.
 * HTTP请求错误的统一处理
 */
define(["IDS"], function (app) {
    app.factory("hsDialogService" ,['$q','$injector',function ($q,$injector) {
        var hsDialogService = {};

        /**
         * 设置需要传递的参数
         * @param options
         * @returns {{modalTitle: httpInterceptor.modalTitle, modalInfo: httpInterceptor.modalInfo, modalType: httpInterceptor.modalType, modalTime: httpInterceptor.modalTime}}
         */
        var setResulve = function (options) {
            return {
                modalTitle: function () {   //错误标题
                    return options.modalTitle|| '警告';
                },
                modalInfo: function () {    //错误信息
                    return options.modalInfo|| '操作失败';
                },
                modalType: function () {    //错误类别
                    return options.modalType ||'';
                },
                modalParams: function () {    //错误类别
                    return options.modalParams ||'';
                },
                modalTime: function () {    //显示错误停留的时间
                    return options.modalTime|| '';
                }
            }
        }
        /**
         *打开弹窗(普通弹窗）
         */
        hsDialogService.modalOpen = function (options) {
            var resolve = setResulve(options);
            var $uibModal = $injector.get('$uibModal');

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: options.templateUrl,
                controller: options.controller,
                size: "sm",
                resolve: resolve
            });

            modalInstance.result.then(function (selectedItem) {
                console.log('Modal confirmed at: ' + new Date());
                options.confirmCallback(selectedItem);
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
                options.cancelCallback();
            });
        }
        return hsDialogService;
    }])
})
