define(['app', 'views/signUpView', 'services/globalService'], function (app, View, GS) {

	var bindings = [{
        element: '.btn-submit',
        event: 'click',
        handler: signUp
    }];

    function openPopup(state, msg) {
        var popupHTML = '<div class="popup">'+
                '<div class="page-content">'+
                    '<div class="result">'+
                        '<div class="animated state '+ state +'"></div>'+
                        '<p class="content-block">'+ msg + '</p>'+
                        '<p class="content-block"><a href="#" class="button btn-submit close-popup">返回</a></p>'+
                    '</div>'+
                '</div>'+
            '</div>';

        app.f7.popup(popupHTML);
    }

    // 轮滑效果
    function swiperSelect() {
        var swiper = app.f7.swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            effect: 'coverflow',
            grabCursor: true,
            spaceBetween: 40,
            centeredSlides: true,
            loop: true,
            slidesPerView: 'auto',
            loopedSlides: 4,
            coverflow: {
                rotate: 10,
                stretch: 0,
                depth: 100,
                modifier: 3,
                slideShadows : false
            }
        });
    }

    // 获取场馆报名的时间段列表
    function getSignUpTimes() {
        GS.getSignUpTimes({}, function(res) {
            View.reTimes(res.data);
            swiperSelect();
        });
    }

    // 报名
    function signUp() {
        var mobile = $$('#mobile').text();
        var userId = $$('#userId').text();
        var signUpId = $$('.times-box .swiper-slide-active').data('applyType');
        var timing = $$('.times-box .swiper-slide-active .media-heading').text();

        GS.submitSignUp({
            userId: userId,
            phone: mobile,
            signUpId: signUpId
        }, function(res) {
            var state = 'success';
            var msg = res.return_msg;

            if(res.return_code === '0') {
                if (app.utils.regExpParams(msg, app.utils.toUnicode('等待'))) {
                    state = 'wait';
                }

            }
            if(res.return_code !== '0') { // 失败
                state = 'fail';
            }
            openPopup(state, msg);
        });

    }

	function init() {

		View.render({
			bindings: bindings
		});

        getSignUpTimes();

	}

	return {
		init: init
	};
});
