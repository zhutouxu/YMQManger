/**
 * Created by Administrator on 2016/5/9.
 */
define(['IDS'], function (app) {
    /**
     * 格式化时间（只适用于20121212格式化成2012年12月12日这种形式）
     */
    app.filter("formatToDateChina", function () {
            return function (strTime) {
                var strTime = strTime + "";
                if (strTime.length != 8) {
                    return strTime;
                }
                return strTime.substring(0, 4) + "年" + strTime.substring(4, 6) + "月" + strTime.substring(6, 8) + '日';
            }
        }
    );
})
