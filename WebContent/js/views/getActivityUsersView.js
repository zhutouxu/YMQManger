define(['app', 'vue', 'text!popup/get_activity_users.html'], function (app, Vue, usersHtmlTemplate) {

    function render() {
        app.f7.popup(usersHtmlTemplate);
    }

    function reUsers(params) {
        new Vue({
            el: '.list',
            data: {
                time: params.time,
                placeNo: params.placeNo,
                items: params.list
            }
        });
    }

    return {
        render: render,
        reUsers: reUsers

    };
});
