define(['app', 'vue'], function (app, Vue) {

    function render(params) {
        new Vue({
            el: '.result',
            data: params
        });
    }

    return {
        render: render

    };
});
