/**
 *
 * @authors Administrator (you@example.org)
 * @date    2015/10/10 10:29
 * @version $ IIFE
 * @description 定义全局服务
 */

define(['config'],function (CT) {

    /**
     * Mix properties into target object.
     *
     * @param {Object} to
     * @param {Object} from
     */

    function extend(to, from) {
        var keys = Object.keys(from);
        var i = keys.length;
        while (i--) {
            to[keys[i]] = from[keys[i]];
        }
        return to;
    }

    /**
     * ajax
     * @param url
     * @param data
     * @param method
     * @param successfn
     * @param errorfn
     * @param async
     */

    function loadAjax(params) {
        // jquery
        if (params.type) params.method = params.type;
        params.async = (params.async === null || params.async === "" || typeof(params.async) === "undefined") ? "true" : params.async;  // 默认异步
        params.method = (params.method === null || params.method === "" || typeof(params.method) === "undefined") ? "get" : params.method;     // 默认get请求
        params.data = (params.data === null || params.data === "" || typeof(params.data) === "undefined") ? {"date": new Date().getTime()} : params.data;

        $$.ajax({
            url: params.url,
            async: params.async,
            data: params.data,
            method: params.method,
            dataType: params.dataType || "json",
            headers: params.headers || null,
            beforeSend: params.beforeSend || null,
            complete: params.complete || null,
            success: params.success || null,
            error: params.error || null,
        });
    }

    /**
     * 加载 web接口
     * @param params
     */
    function loadWeb(params) {
        params = params || {};
        params.url = CT.URL.WEB + params.url;
        params.method = 'post';
        var options = {
            authUserId: CT.AUTHUSER_ID
        };

        params.data = extend(params.data, options);

        loadAjax(params);

    }

    return {
        loadAjax: loadAjax,
        loadWeb: loadWeb
    };

});
