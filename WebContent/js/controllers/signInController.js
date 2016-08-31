define(['app', 'views/signInView', 'services/globalService'], function (app, View, GS) {

    function signIn() {

        GS.submitSignIn(function(res) {
            var state = 'sign-success';
            if(res.return_code === '0') { // 成功

            } else if(res.return_code === '1000') {  // 失败
                state = 'fail';
            }

            View.render({msg: res.return_msg, state: state});


        });
    }

	function init() {

        signIn();


	}

	return {
		init: init
	};
});
