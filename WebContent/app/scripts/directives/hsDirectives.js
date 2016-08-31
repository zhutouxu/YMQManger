/**
 * Created by Administrator on 2016/5/9.
 */
define(['IDS'], function (app) {
    /**
     * 树形指令
     */
    app.directive('treeView', [function () {
        return {
            restrict: 'E',
            templateUrl: function (){
                return "template/treeView.html";
            },
            scope: {
                treeData: '=',
                textField: '@',
                itemTemplateUrl: '@',
                itemClicked: '&'
            },
            controller: ['$scope', function ($scope) {
                var preItem;

                $scope.itemExpended = function (item, $event) {
                    if (preItem && item.children && !angular.equals(preItem, item)) {
                        preItem.isExpend = false;
                    }

                    item.isExpend = !item.isExpend;
                    $event.stopPropagation();
                    preItem = item;

                };

                $scope.getItemIcon = function (item) {
                    var isLeaf = $scope.isLeaf(item);

                    if (isLeaf) {
                        return 'fa fa-leaf';
                    }

                    return item.isExpend ? 'glyphicon glyphicon-minus-sign' : 'glyphicon glyphicon-plus-sign';
                };

                $scope.isLeaf = function (item) {
                    return !item.children || !item.children.length;
                };

                $scope.qryParams = {
                    exchange_type: "",
                    stock_type: "",
                    parent: ""
                };

                $scope.warpCallback = function (callback, item, $event) {

                    if (item.children) {
                        //$scope.itemExpended($scope.qryParams.parent, $event);
                        $scope.qryParams.exchange_type = item.exchange_type;
                        $scope.itemExpended(item, $event);
                        // $scope.qryParams.parent = item;
                    } else {
                        $scope.qryParams.stock_type = item.stock_type;
                        //该函数调用了外部函数callback,并使用angular.noop，防止外部函数不存在的情况
                        ($scope[callback] || angular.noop)({
                            item: $scope.qryParams,
                            $event: $event
                        });
                    }
                };
            }]
        };
    }]);
})