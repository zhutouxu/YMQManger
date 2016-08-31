define(['app', 'views/queryView', 'services/globalService'], function (app, View, GS) {

    function searchSignUpList() {
        GS.searchSignUp(function(res) {
            var state = 'success',
                msg = res.return_msg,
                isShowCancel = true,
                isCanclick = true;

            if(res.return_code === '0') { // 已摇号并且报名成功
                if(app.utils.isCanSignUp()) { // 16点后
                    isCanclick = false;
                }
            } else if(res.return_code === '1000') {
                if(app.utils.regExpParams(msg, app.utils.toUnicode('没有报名'))) {  // 您已取消报名 or 今天您没有报名
                    state = 'fail';
                    isShowCancel = false;
                } else if(app.utils.regExpParams(msg, app.utils.toUnicode('突发原因'))) {  // 由于突发原因，今天的活动时间取消
                    state = 'accident';
                    isShowCancel = false;
                } else if(app.utils.regExpParams(msg, app.utils.toUnicode('报名成功'))) {  // 您已报名成功，报名时间为：xxxxxx
                    if(app.utils.isCanSignUp()) { // 16点后
                        isCanclick = false;
                    }
                } else { // 您的报名已提交，请在16点后再查询结果
                    state = 'wait';
                }
            }

            View.render({methods: cancelSignUp, model: {msg: msg, state: state, isShowCancel: isShowCancel, isCanclick: isCanclick ? '' : 'disabled'}});

        });
    }

    function cancelSignUp() {
        var that = this;  // ci, not button

        app.f7.confirm('您确定要取消报名吗？', function() {
            GS.cancelSignUp(function(res) {
                var state = 'success';
                if(res.return_code === '0') { // 成功
                    that.msg = res.return_msg;
                    that.state = state;
                    that.isShowCancel = false;
                }
            });

        });
    }

    function pickerPlace() {
        app.f7.picker({
            input: '.button-blue',
            toolbarCloseText: '',
            toolbarTemplate: '<div class="toolbar">' +
                '<div class="toolbar-inner">' +
                    '<div class="left">' +
                        '<span>请选择场地</span>' +
                    '</div>' +
                    '<div class="right">' +
                        '<a href="#" class="link close-picker">完成</a>' +
                    '</div>' +
                '</div>' +
            '</div>',
            cols: [{
                textAlign: 'center',
                values: ['1号场地', '2号场地', '3号场地', '4号场地']
            }],
            onClose: function(picker, value, displayValue) {
                var _index = picker.cols[0].activeIndex;

                app.router.load('getActivityUsers', {placeNo: (_index + 1)});

            }
        });

    }

    function init() {
        pickerPlace();
        searchSignUpList();
    }

    return {
        init: init
    };
});
