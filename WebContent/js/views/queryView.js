define(['app', 'vue'], function (app, Vue) {

    function render(params) {
        new Vue({
            el: '.page-query .result',
            data: params.model,
            methods: {
                cancelSignUp: params.methods
            }
        });

    }

    return {
        render: render

    };
});
