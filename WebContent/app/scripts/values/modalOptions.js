/**
 * Created by Administrator on 2016/6/27.
 */
/**
 * 用于弹出框的参数设置
 * Created by Administrator on 2016/5/9.
 */
define(['IDS'], function (app) {
    /**
     * @param modalTitle:模态框的标题
     * @param modalInfo:模态框的显示的信息
     * @param modalInfo:模态框的显示类型
     * @param modalTime:模态框出现的时长
     */
    app.value("modalOptions", {
        modalTitle:"",
        modalInfo:"",
        modalParams:{},
        modalType:"",
        modalTime:"",
        templateUrl:"",
        controller:"",
        cancelCallback:angular.noop,
        confirmCallback:angular.noop
    })
})