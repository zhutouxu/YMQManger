define(function() {

    // 得到url查询字符串参数
    function getQueryStringArgs() {
        var qs = (location.search.length > 0 ? location.search.substring(1) : ''),
            args = {},
            items = qs.length ? qs.split('&') : [],
            item = null,
            name = null,
            value = null,
            i = 0,
            len = items.length;

        for(i = 0; i < len; i += 1) {
            item = items[i].split('=');
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);

            if(name.length) {
                args[name] = value;
            }
        }

        return args;
    }

    /**
     * Bind DOM event to some handler function in controller
     * @param  {Array} bindings
     */
    function bindEvents(bindings) {
        if ($$.isArray(bindings) && bindings.length > 0) {
            for (var i in bindings) {
                $$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
            }
        }
    }

    /**
     * Bind DOM event to some handler function in controller by agency  （只需加载一次，否则造成重复绑定）
     * @param  {Array} bindings
     */
    function bindEventsByAgency(bindings) {
        if ($$.isArray(bindings) && bindings.length > 0) {
            for (var i in bindings) {
                $$(document).on(bindings[i].event, bindings[i].element, bindings[i].handler);
            }
        }

    }

    /** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
     可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
     Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
     * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
     * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
     * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
     * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
     */
     function formatDate(pattern, timestamp) {
        var that = timestamp ? new Date(parseInt(timestamp) * 1000) : new Date();
        var o = {
            "M+" : that.getMonth()+1, //月份
            "d+" : that.getDate(), //日
            "h+" : that.getHours()%12 === 0 ? 12 : that.getHours()%12, //小时
            "H+" : that.getHours(), //小时
            "m+" : that.getMinutes(), //分
            "s+" : that.getSeconds(), //秒
            "q+" : Math.floor((that.getMonth()+3)/3), //季度
            "S" :  that.getMilliseconds() //毫秒
        };
        var week = {
            "0" : "\u65e5",
            "1" : "\u4e00",
            "2" : "\u4e8c",
            "3" : "\u4e09",
            "4" : "\u56db",
            "5" : "\u4e94",
            "6" : "\u516d"
        };
        if(/(y+)/.test(pattern)){
            pattern=pattern.replace(RegExp.$1, (that.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        if(/(E+)/.test(pattern)){
            pattern=pattern.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[that.getDay()+""]);
        }
        for(var k in o){
            if(new RegExp("("+ k +")").test(pattern)){
                pattern = pattern.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return pattern;
    }

    // 获取日期
    function getDateStr(pattern, time) {
        var dd = time ? new Date(time) : new Date();
        var year = dd.getFullYear() - '0';
        var month = dd.getMonth() + 1;
        month = month.toFixed(0);
        month = month > 9 ? month : '0' + month;

        var day = dd.getDate() - '0';
        day = day > 9 ? day : '0' + day;

        return year + pattern + month + pattern + day;

    }

    function isNum(str) {
        return (!isNaN(str)) ? true : false;
    }

    /**
     * Quick object check - this is primarily used to tell
     * Objects from primitive values when we know the value
     * is a JSON-compliant type.
     *
     * @param {*} obj
     * @return {Boolean}
     */

    function isObject(obj) {
        return obj !== null && typeof obj === 'object';
    }

    function isChar(str) {
        var l = str.length;
        for (var i = 0; i < l; i++) {
            var asc = str[i].charCodeAt();
            if (asc > 122 || asc < 65) {
                return false;
            }
        }
        if (i == l)
            return true;
    }

    function isWin(obj){
        return /Window|global/.test({}.toString.call(obj))||obj==obj.document&&obj.document!=obj;
    }

    function isInteger(num) {
        var regInt = /^\d+$/;
        return regInt.test(num);

    }

    function isFloat(fl) {
        //正浮点数 + 整数(pass)
        var regFl = /^((\d+\.\d*[1-9]\d*)|(\d*[1-9]\d*\.\d+)|(\d*[1-9]\d*))$/;
        return regFl.test(fl);
    }

    function jsonpcallback(data) {
        return data;
    }

    // 小数转换为百分数
    function toPercent(decimals){
        if(!isNaN(decimals)) {
            return (Math.round(decimals * 10000)/100).toFixed(2) + '%';
        }
    }

    /**
     * Manual indexOf because it's slightly faster than
     * native.
     *
     * @param {Array} arr
     * @param {*} obj
     */
    function indexOf(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) return i;
        }
        return -1;
    }

    /**
     * 获取unix时间戳
     * @param time '20160126 12:00:00', '2016-01-26 12:00:00', '2016.01.26 12:00:00', '20160126'
     */
    function getUnixTimeStamp(time) {
        if(typeof time !== 'string') return;
        var pattern = /\-|\./g;

        if(pattern.test(time)) {
            time = time.replace(pattern, '/');
        } else if(time.length <= 8)  { // '20160126' 不包含时分秒
            var y, m, d;
            y = time.slice(0, 4);
            m = time.slice(4, 6);
            d = time.slice(6, 8);
            time = y + '/' + m + '/' + d;
        }

        return Math.round(Date.parse(time));
    }

    function formatTime(time, pattern) {
        if(typeof time !== 'string') return;
        pattern = pattern || '.';
        var y, m, d;
        if(time.length === 8) { //年月日
            y = time.slice(0, 4);
            m = time.slice(4, 6);
            d = time.slice(6, 8);
        } else { // 时分秒
            y = time.slice(0, 2);
            m = time.slice(2, 4);
            d = time.slice(4, 6);
        }

        return y + pattern + m + pattern + d;
    }

    function toUnicode(str) {
        return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
    }

    function toChinese(str) {
        return unescape(str.replace(/\\u/gi, '%u'));
    }

    function regExpParams(k, reg) {
        var t = new RegExp(reg, 'g');
        return t.test(k);
    }

    // 活动允许报名时间为当日下午16点前
    function isCanSignUp() {     // 16点后
        var currentUnixTime = Math.round(Date.now());
        var endUnixTime = getUnixTimeStamp(getDateStr('/') + ' 16:00:00');

        return currentUnixTime > endUnixTime;
    }


    return {
        bindEvents: bindEvents,
        bindEventsByAgency: bindEventsByAgency,
        getQueryStringArgs: getQueryStringArgs,
        formatDate: formatDate,
        getDateStr: getDateStr,
        isNum: isNum,
        isObject: isObject,
        isChar: isChar,
        isWin: isWin,
        isInteger: isInteger,
        isFloat: isFloat,
        callback: jsonpcallback,
        toPercent: toPercent,
        indexOf: indexOf,
        getUnixTimeStamp: getUnixTimeStamp,
        formatTime: formatTime,
        toUnicode: toUnicode,
        regExpParams: regExpParams,
        isCanSignUp: isCanSignUp

    };

});