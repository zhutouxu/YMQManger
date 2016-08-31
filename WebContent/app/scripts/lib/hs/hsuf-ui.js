/**
 * UI框架聚合
 * Created by dinghx14714 on 2016/5/11.
 */
angular.module('hs', ['hs.utils', 'hs.ui.button']);
/**
 * button组件
 * Created by dinghx14714 on 2016/5/11.
 */
angular.module('hs.ui.button', []);
/**
 * http服务定制
 * Created by dinghx14714 on 2016/5/12.
 */
angular.module('hs.utils', [])
    .factory('hsHttpService', ['$q', '$http', function ($q, $http) {
        var hsHttpService = {};
        hsHttpService.getRequest = function (url, params) {
            var deffered = $q.defer();
            $http({
                method: 'GET',
                params: params,
                url: url,
            }).success(function (data) {
                deffered.resolve(data);
            }).error(function (data) {
                deffered.reject(data);
            });
            return deffered.promise;
        };
        hsHttpService.postRequest = function (url, params) {
            var deffered = $q.defer();
            $http({
                method: 'POST',
                data: params,
                url: url,
            }).success(function (data) {
                deffered.resolve(data);
            }).error(function (data) {
                deffered.reject(data);
            });
            return deffered.promise;
        };
        return hsHttpService;
    }]);