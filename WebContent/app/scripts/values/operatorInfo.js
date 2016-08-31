/**
 * Created by Administrator on 2016/6/27.
 */
/**
 * 用于弹出框的参数设置
 * Created by Administrator on 2016/5/9.
 */
define(['IDS'], function (app) {
    /**
     * 操作员的一些信息，只需要在登录，注册，修改密码这三个接口需要传
     */
    app.value("operatorInfo", {
        op_branch_no:"",    //操作分支机构
        op_entrust_way:"",  //委托方式
        op_station:"",      //站点地址
        branch_no:"",       //分支机构
        company_id:"",      //机构编码
        user_token:"",      //用户口令
    })
})