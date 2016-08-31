define(['app', 'config', 'vue'], function (app, CT, Vue) {

	function render(params) {
        $$('.time-title .time').html(app.utils.formatDate('yyyy-MM-dd EE'));
        $$('#userId').html(CT.USER_ID);
        $$('#mobile').html(CT.MOBILE);
        if(app.utils.isCanSignUp()) {  // 16点后
            $$('.icon-select').hide();
            isDisabled(true);
        }
        app.utils.bindEvents(params.bindings);
	}

    function isDisabled(disabled) {
        if(disabled) {
            $$('.btn-submit').addClass('disabled').html('已过报名时间');
        } else {
            $$('.btn-submit').removeClass('disabled').html('报名');
        }

    }

    function reTimes(params) {
        var timesVM = new Vue({
            el: '.times-box',
            data: {
                items: params
            }
        });

        if(!timesVM.items.length) {
            $$('.btn-submit').addClass('disabled');
        }

    }

    function isEditable(editable) {
        if(editable) {
            $$('.icon-edit').addClass('active');
        } else {
            $$('.icon-edit').removeClass('active');
        }

    }

	return {
		render: render,
        isDisabled: isDisabled,
        reTimes: reTimes,
        isEditable: isEditable
	};

});
