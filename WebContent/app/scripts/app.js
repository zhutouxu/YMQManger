/**
 * 应用启动模块定义
 * Created by yejiaming on 2016/4/28.
 *用于生成模块名称，以及加载模块生成所需要的配置信息
 */
define(
    [
        "angular",
        "uiBootstrap",
        "angularCookies",
        "angularSanitize",
        "angularMessages",
        'uiRouter',
        "uiValidate"
    ], function (angular) {
        /**
         * angular.module(name, [requires], [configFn]);
         * name：字符串类型，代表模块的名称；
         * requires：字符串的数组，代表该模块依赖的其他模块列表，如果不依赖其他用空数组，
         * configFn：用来对该模块进行一些配置对模块中的组件进行实例化对象实例之前的特定配置
         */
        return angular.module("IDS",
            [
                "ngCookies",
                "ngSanitize",
                "ngMessages",
                "hs",
                "ui.bootstrap",
                "ngAnimate",
                "ui.validate",
                "ui.router",
            ])
    });