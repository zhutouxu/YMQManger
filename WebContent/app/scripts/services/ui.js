/**
 * 视图UI定制化服务
 */
define(['IDS'], function (app) {
    app.factory("ui", ['apiHandler','hsHttpService','hsUtilsServices' ,function (apiHandler,hsHttpService,hsUtilsServices) {
        var fn = function (bll) {
            var pagesize;
            var pageno;
            pagesize = bll.params.pagesize;
            pageno = bll.params.pageno;

             var ui = {
                /**
                 * 查询方法
                 */
                qry: function () {
                
                    hsHttpService.postRequest(bll.url, bll.params)
                        .then(function (response) {
                        	ui.pagination.totalcount = response[0].totalcount;
                            //成功回调
                            if(!response.error_code || (response.error_code == 0)){
                                bll.succeCallback(response);
                            }
                            else
                                //失败回调
                                bll.failCallback(response);
                        }, function (response) {
                            //404等错，一般不考虑，直接在拦截器里面统一做拦截处理
                            bll.disconnCallback(response);
                        });
                },

                /**
                 * 当前操作信息实体
                 */
                currentInfo: {},
                //获取需要修改或者删除的对象
                setCurrentInfo: function (index) {
                    if (!angular.isNumber(index)) {
                        ui.currentInfo = undefined;
                    }
                    else {
                        //深度复制一份数据，为了使修改的时候不会修改掉原始数据
                        ui.currentInfo = angular.copy(bll.result[index]);
                    }
                },
                /**
                 * 分页控件定制
                 */
                pagination: {
                    pagesize: pagesize,    //页面大小
                    pageno: pageno,      //当前页
                    totalcount: "6",   //总条数
                    /**
                     * 翻页方法
                     */
                    pageChange: function () {
                        bll.params.pageno = ui.pagination.pageno;
                        ui.qry();
                    }
                }
            };
            return ui;
        }
        return fn;
    }]);
});