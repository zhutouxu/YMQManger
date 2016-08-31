define(function() {

	/**
	 * Init router, that handle page events
	 */
    function init() {
		$$(document).on('pageBeforeInit', function (e) {
			var page = e.detail.page;
			load(page.name, page.query);
		});

    }

    /**
	 * Load (or reload) controller from js code (another controller) - call it's init function
	 * @param controllerName
	 * @param query
     * @param type 事件类型 init(默认) cancel取消定时器任务
	 */
	function load(controllerName, query) {
        if (!controllerName) {
            return;
        }
        if (controllerName.indexOf('smart-select') !== -1) {
            return;
        }

        require(['controllers/' + controllerName + 'Controller'], function(controller) {
            controller.init(query);
        });

	}

	return {
        init: init,
		load: load
    };
});