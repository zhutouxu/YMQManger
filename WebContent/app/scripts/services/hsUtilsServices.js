/**
 * Created by Administrator on 2016/6/30.
 * 这个服务封装了一些不存在的工具类
 */
define(["IDS"], function (app) {

    app.factory("hsUtilsServices", ['$q','$timeout',function ($q,$timeout) {
        var hsUtilsServices = {};
        /**
         * 判断是否是json窜,注意，如果是"123"这样的也是一个JSON字符串，所以，这个不能判断JSON是否是一个JSON串对象
         * 这个使用于“A32”，“你好”等这种形式的字符串是否是JSON串
         * @param str
         * @returns {boolean}
         */
        hsUtilsServices.isJson = function (str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }
        hsUtilsServices.notBlackListed =  function (value) {
            var blacklist = ['bad@domain.com', 'verybad@domain.com'];
            return blacklist.indexOf(value) === -1;
        };
        hsUtilsServices.doesNotExist=  function (value) {
            var db = ['john.doe@mail.com', 'jane.doe@mail.com'];
            // Simulates an asyncronous trip to the server.
            return $q(function (resolve, reject) {
                $timeout(function () {
                    if (db.indexOf(value) < 0) {
                        resolve();
                    } else {
                        reject();
                    }
                }, 500);
            });
        };
        /**
         * 判断是否是一个空对象
         * 这个是针对{}这种形式的，可是如果是Number形式的也是不行的，如：123是不能判断这个是不是空对象的
         */
        hsUtilsServices.isEmptyObject = function (obj) {
            var t;
            for (t in obj)
                return !1;
            return !0
        }
        /**
         * 当继承对象中不包含被继承对象的某个值得时候就将被继承的对象的值付给继承对象
         * angular.extend的升级版
         * @param obj 继承对象
         * @param dest 被继承对象
         * @returns {*}
         */
        hsUtilsServices.myExtend = function (obj,dest) {
            for (var keyDest in dest){
                if(!obj[keyDest]){
                    obj[keyDest] = dest[keyDest];
                }
            }
        }
        /**
         * sortBy函数接受两个成员名字符串做为参数
         * 并返回一个可以用来对包含该成员的对象数组进行排序的比较函数
         *@param obj 需要排序的对象数组
         * @param name 首选参数支持排序
         * @param minor 可选参数（如果name相等的情况下，会继续比较minor
         */
        hsUtilsServices.sortBy = function (obj,name,minor) {
            return function (name, minor) {
                return function (o, p) {
                    var  a, b;
                    if (o&& p && typeof o === 'object' && typeof p === 'object') {
                        a = o[name];
                        b = p[name];
                        if (a === b) {
                            return typeof minor === 'function' ? minor(o, p) : 0;
                        }
                        if (typeof a === typeof b) {
                            return a < b ? -1 : 1;
                        }
                        return typeof a < typeof b ? -1 : 1;
                    } else {
                        thro("error");
                    }
                }
            }
        }
        return hsUtilsServices;
    }])

})
