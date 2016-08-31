/**
 * Framework7 1.4.0 - Custom Build
 * Full Featured Mobile HTML Framework For Building iOS & Android Apps
 * 
 * 
 * Included modules: modals,tabs,fast-clicks,swiper,picker,modals
 * 
 * http://www.idangero.us/framework7
 * 
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: February 22, 2016
 */
        (function () {
        

        'use strict';
        /*===========================
        Framework 7
        ===========================*/
        window.Framework7 = function (params) {
            // App
            var app = this;
        
            // Version
            app.version = '1.4.0';
        
            // Default Parameters
            app.params = {
                cache: true,
                cacheIgnore: [],
                cacheIgnoreGetParameters: false,
                cacheDuration: 1000 * 60 * 10, // Ten minutes
                preloadPreviousPage: true,
                uniqueHistory: false,
                uniqueHistoryIgnoreGetParameters: false,
                dynamicPageUrl: 'content-{{index}}',
                allowDuplicateUrls: false,
                router: true,
                // Push State
                pushState: false,
                pushStateRoot: undefined,
                pushStateNoAnimation: false,
                pushStateSeparator: '#!/',
                pushStatePreventOnLoad: true,
                // Fast clicks
                fastClicks: true,
                fastClicksDistanceThreshold: 10,
                fastClicksDelayBetweenClicks: 50,
                // Tap Hold
                tapHold: false,
                tapHoldDelay: 750,
                tapHoldPreventClicks: true,
                // Active State
                activeState: true,
                activeStateElements: 'a, button, label, span',
                // Animate Nav Back Icon
                animateNavBackIcon: false,
                // Swipe Back
                swipeBackPage: true,
                swipeBackPageThreshold: 0,
                swipeBackPageActiveArea: 30,
                swipeBackPageAnimateShadow: true,
                swipeBackPageAnimateOpacity: true,
                // Ajax
                ajaxLinks: undefined, // or CSS selector
                // External Links
                externalLinks: '.external', // CSS selector
                // Sortable
                sortable: true,
                // Scroll toolbars
                hideNavbarOnPageScroll: false,
                hideToolbarOnPageScroll: false,
                hideTabbarOnPageScroll: false,
                showBarsOnPageScrollEnd: true,
                showBarsOnPageScrollTop: true,
                // Swipeout
                swipeout: true,
                swipeoutActionsNoFold: false,
                swipeoutNoFollow: false,
                // Smart Select Back link template
                smartSelectOpenIn: 'page', // or 'popup' or 'picker'
                smartSelectBackText: 'Back',
                smartSelectPopupCloseText: 'Close',
                smartSelectPickerCloseText: 'Done',
                smartSelectSearchbar: false,
                smartSelectBackOnSelect: false,
                // Tap Navbar or Statusbar to scroll to top
                scrollTopOnNavbarClick: false,
                scrollTopOnStatusbarClick: false,
                // Panels
                swipePanel: false, // or 'left' or 'right'
                swipePanelActiveArea: 0,
                swipePanelCloseOpposite: true,
                swipePanelOnlyClose: false,
                swipePanelNoFollow: false,
                swipePanelThreshold: 0,
                panelsCloseByOutside: true,
                // Modals
                modalButtonOk: 'OK',
                modalButtonCancel: 'Cancel',
                modalUsernamePlaceholder: 'Username',
                modalPasswordPlaceholder: 'Password',
                modalTitle: 'Framework7',
                modalCloseByOutside: false,
                actionsCloseByOutside: true,
                popupCloseByOutside: true,
                modalPreloaderTitle: 'Loading... ',
                modalStack: true,
                // Lazy Load
                imagesLazyLoadThreshold: 0,
                imagesLazyLoadSequential: true,
                // Name space
                viewClass: 'view',
                viewMainClass: 'view-main',
                viewsClass: 'views',
                // Notifications defaults
                notificationCloseOnClick: false,
                notificationCloseIcon: true,
                notificationCloseButtonText: 'Close',
                // Animate Pages
                animatePages: true,
                // Template7
                templates: {},
                template7Data: {},
                template7Pages: false,
                precompileTemplates: false,
                // Material
                material: false,
                materialPageLoadDelay: 0,
                materialPreloaderSvg: '<svg xmlns="http://www.w3.org/2000/svg" height="75" width="75" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg>',
                materialPreloaderHtml:
                    '<span class="preloader-inner">' +
                        '<span class="preloader-inner-gap"></span>' +
                        '<span class="preloader-inner-left">' +
                            '<span class="preloader-inner-half-circle"></span>' +
                        '</span>' +
                        '<span class="preloader-inner-right">' +
                            '<span class="preloader-inner-half-circle"></span>' +
                        '</span>' +
                    '</span>',
                materialRipple: true,
                materialRippleElements: '.ripple, a.link, a.item-link, .button, .modal-button, .tab-link, .label-radio, .label-checkbox, .actions-modal-button, a.searchbar-clear, a.floating-button, .floating-button > a, .speed-dial-buttons a',
                // Auto init
                init: true,
            };
        
            // Extend defaults with parameters
            for (var param in params) {
                app.params[param] = params[param];
            }
        
            // DOM lib
            var $ = Dom7;
        
            // Template7 lib
            var t7 = Template7;
            app._compiledTemplates = {};
        
            // Touch events
            app.touchEvents = {
                start: app.support.touch ? 'touchstart' : 'mousedown',
                move: app.support.touch ? 'touchmove' : 'mousemove',
                end: app.support.touch ? 'touchend' : 'mouseup'
            };
        
            // Link to local storage
            app.ls = window.localStorage;
        
            // RTL
            app.rtl = $('body').css('direction') === 'rtl';
            if (app.rtl) $('html').attr('dir', 'rtl');
        
            // Overwrite statusbar overlay
            if (typeof app.params.statusbarOverlay !== 'undefined') {
                if (app.params.statusbarOverlay) $('html').addClass('with-statusbar-overlay');
                else $('html').removeClass('with-statusbar-overlay');
            }
        
            
        

        /*======================================================
        ************   Views   ************
        ======================================================*/
        app.views = [];
        var View = function (selector, params) {
            var defaults = {
                dynamicNavbar: false,
                domCache: false,
                linksView: undefined,
                reloadPages: false,
                uniqueHistory: app.params.uniqueHistory,
                uniqueHistoryIgnoreGetParameters: app.params.uniqueHistoryIgnoreGetParameters,
                allowDuplicateUrls: app.params.allowDuplicateUrls,
                swipeBackPage: app.params.swipeBackPage,
                swipeBackPageAnimateShadow: app.params.swipeBackPageAnimateShadow,
                swipeBackPageAnimateOpacity: app.params.swipeBackPageAnimateOpacity,
                swipeBackPageActiveArea: app.params.swipeBackPageActiveArea,
                swipeBackPageThreshold: app.params.swipeBackPageThreshold,
                animatePages: app.params.animatePages,
                preloadPreviousPage: app.params.preloadPreviousPage
            };
            var i;
        
            // Params
            params = params || {};
        
            // Disable dynamic navbar for material theme
            if (params.dynamicNavbar && app.params.material) params.dynamicNavbar = false;
        
            // Extend params with defaults
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
            // View
            var view = this;
            view.params = params;
        
            // Selector
            view.selector = selector;
        
            // Container
            var container = $(selector);
            view.container = container[0];
        
            // Fix Selector
        
            if (typeof selector !== 'string') {
                // Supposed to be HTMLElement or Dom7
                selector = (container.attr('id') ? '#' + container.attr('id') : '') + (container.attr('class') ? '.' + container.attr('class').replace(/ /g, '.').replace('.active', '') : '');
                view.selector = selector;
            }
        
            // Is main
            view.main = container.hasClass(app.params.viewMainClass);
        
            // Content cache
            view.contentCache = {};
        
            // Pages cache
            view.pagesCache = {};
        
            // Store View in element for easy access
            container[0].f7View = view;
        
            // Pages
            view.pagesContainer = container.find('.pages')[0];
            view.initialPages = [];
            view.initialPagesUrl = [];
            view.initialNavbars = [];
            if (view.params.domCache) {
                var initialPages = container.find('.page');
                for (i = 0; i < initialPages.length; i++) {
                    view.initialPages.push(initialPages[i]);
                    view.initialPagesUrl.push('#' + initialPages.eq(i).attr('data-page'));
                }
                if (view.params.dynamicNavbar) {
                    var initialNavbars = container.find('.navbar-inner');
                    for (i = 0; i < initialNavbars.length; i++) {
                        view.initialNavbars.push(initialNavbars[i]);
                    }
                }
        
            }
        
            view.allowPageChange = true;
        
            // Location
            var docLocation = document.location.href;
        
            // History
            view.history = [];
            var viewURL = docLocation;
            var pushStateSeparator = app.params.pushStateSeparator;
            var pushStateRoot = app.params.pushStateRoot;
            if (app.params.pushState && view.main) {
                if (pushStateRoot) {
                    viewURL = pushStateRoot;
                }
                else {
                    if (viewURL.indexOf(pushStateSeparator) >= 0 && viewURL.indexOf(pushStateSeparator + '#') < 0) viewURL = viewURL.split(pushStateSeparator)[0];
                }
        
            }
        
            // Active Page
            var currentPage, currentPageData;
            if (!view.activePage) {
                currentPage = $(view.pagesContainer).find('.page-on-center');
                if (currentPage.length === 0) {
                    currentPage = $(view.pagesContainer).find('.page:not(.cached)');
                    currentPage = currentPage.eq(currentPage.length - 1);
                }
                if (currentPage.length > 0) {
                    currentPageData = currentPage[0].f7PageData;
                }
            }
        
            // View startup URL
            if (view.params.domCache && currentPage) {
                view.url = container.attr('data-url') || view.params.url || '#' + currentPage.attr('data-page');   
                view.pagesCache[view.url] = currentPage.attr('data-page');
            }
            else view.url = container.attr('data-url') || view.params.url || viewURL;
        
            // Update current page Data
            if (currentPageData) {
                currentPageData.view = view;
                currentPageData.url = view.url;
                if (view.params.domCache && view.params.dynamicNavbar && !currentPageData.navbarInnerContainer) {
                    currentPageData.navbarInnerContainer = view.initialNavbars[view.initialPages.indexOf(currentPageData.container)];
                }
                view.activePage = currentPageData;
                currentPage[0].f7PageData = currentPageData;
            }
        
            // Store to history main view's url
            if (view.url) {
                view.history.push(view.url);
            }
        
            // Touch events
            var isTouched = false,
                isMoved = false,
                touchesStart = {},
                isScrolling,
                activePage = [],
                previousPage = [],
                viewContainerWidth,
                touchesDiff,
                allowViewTouchMove = true,
                touchStartTime,
                activeNavbar = [],
                previousNavbar = [],
                activeNavElements,
                previousNavElements,
                activeNavBackIcon,
                previousNavBackIcon,
                dynamicNavbar,
                pageShadow,
                el;
        
            view.handleTouchStart = function (e) {
                if (!allowViewTouchMove || !view.params.swipeBackPage || isTouched || app.swipeoutOpenedEl || !view.allowPageChange) return;
                isMoved = false;
                isTouched = true;
                isScrolling = undefined;
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                touchStartTime = (new Date()).getTime();
                dynamicNavbar = view.params.dynamicNavbar && container.find('.navbar-inner').length > 1;
            };
        
            view.handleTouchMove = function (e) {
                if (!isTouched) return;
                var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                if (typeof isScrolling === 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
                }
                if (isScrolling || e.f7PreventSwipeBack || app.preventSwipeBack) {
                    isTouched = false;
                    return;
                }
                if (!isMoved) {
                    var cancel = false;
                    // Calc values during first move fired
                    viewContainerWidth = container.width();
                    var target = $(e.target);
                    var swipeout = target.hasClass('swipeout') ? target : target.parents('.swipeout');
                    if (swipeout.length > 0) {
                        if (!app.rtl && swipeout.find('.swipeout-actions-left').length > 0) cancel = true;
                        if (app.rtl && swipeout.find('.swipeout-actions-right').length > 0) cancel = true;
                    }
                    activePage = target.is('.page') ? target : target.parents('.page');
                    if (activePage.hasClass('no-swipeback')) cancel = true;
                    previousPage = container.find('.page-on-left:not(.cached)');
                    var notFromBorder = touchesStart.x - container.offset().left > view.params.swipeBackPageActiveArea;
                    if (app.rtl) {
                        notFromBorder = touchesStart.x < container.offset().left - container[0].scrollLeft + viewContainerWidth - view.params.swipeBackPageActiveArea;
                    }
                    else {
                        notFromBorder = touchesStart.x - container.offset().left > view.params.swipeBackPageActiveArea;
                    }
                    if (notFromBorder) cancel = true;
                    if (previousPage.length === 0 || activePage.length === 0) cancel = true;
                    if (cancel) {
                        isTouched = false;
                        return;
                    }
        
                    if (view.params.swipeBackPageAnimateShadow && !app.device.android) {
                        pageShadow = activePage.find('.swipeback-page-shadow');
                        if (pageShadow.length === 0) {
                            pageShadow = $('<div class="swipeback-page-shadow"></div>');
                            activePage.append(pageShadow);
                        }
                    }
        
                    if (dynamicNavbar) {
                        activeNavbar = container.find('.navbar-on-center:not(.cached)');
                        previousNavbar = container.find('.navbar-on-left:not(.cached)');
                        activeNavElements = activeNavbar.find('.left, .center, .right, .subnavbar, .fading');
                        previousNavElements = previousNavbar.find('.left, .center, .right, .subnavbar, .fading');
                        if (app.params.animateNavBackIcon) {
                            activeNavBackIcon = activeNavbar.find('.left.sliding .back .icon');
                            previousNavBackIcon = previousNavbar.find('.left.sliding .back .icon');
                        }
                    }
        
                    // Close/Hide Any Picker
                    if ($('.picker-modal.modal-in').length > 0) {
                        app.closeModal($('.picker-modal.modal-in'));
                    }
                }
                e.f7PreventPanelSwipe = true;
                isMoved = true;
                e.preventDefault();
        
                // RTL inverter
                var inverter = app.rtl ? -1 : 1;
        
                // Touches diff
                touchesDiff = (pageX - touchesStart.x - view.params.swipeBackPageThreshold) * inverter;
                if (touchesDiff < 0) touchesDiff = 0;
                var percentage = touchesDiff / viewContainerWidth;
        
                // Swipe Back Callback
                var callbackData = {
                    percentage: percentage,
                    activePage: activePage[0],
                    previousPage: previousPage[0],
                    activeNavbar: activeNavbar[0],
                    previousNavbar: previousNavbar[0]
                };
                if (view.params.onSwipeBackMove) {
                    view.params.onSwipeBackMove(callbackData);
                }
                container.trigger('swipeBackMove', callbackData);
        
                // Transform pages
                var activePageTranslate = touchesDiff * inverter;
                var previousPageTranslate = (touchesDiff / 5 - viewContainerWidth / 5) * inverter;
                if (app.device.pixelRatio === 1) {
                    activePageTranslate = Math.round(activePageTranslate);
                    previousPageTranslate = Math.round(previousPageTranslate);
                }
        
                activePage.transform('translate3d(' + activePageTranslate + 'px,0,0)');
                if (view.params.swipeBackPageAnimateShadow && !app.device.android) pageShadow[0].style.opacity = 1 - 1 * percentage;
        
                previousPage.transform('translate3d(' + previousPageTranslate + 'px,0,0)');
                if (view.params.swipeBackPageAnimateOpacity) previousPage[0].style.opacity = 0.9 + 0.1 * percentage;
        
                // Dynamic Navbars Animation
                if (dynamicNavbar) {
                    var i;
                    for (i = 0; i < activeNavElements.length; i++) {
                        el = $(activeNavElements[i]);
                        if (!el.is('.subnavbar.sliding')) el[0].style.opacity = (1 - percentage * 1.3);
                        if (el[0].className.indexOf('sliding') >= 0) {
                            var activeNavTranslate = percentage * el[0].f7NavbarRightOffset;
                            if (app.device.pixelRatio === 1) activeNavTranslate = Math.round(activeNavTranslate);
                            el.transform('translate3d(' + activeNavTranslate + 'px,0,0)');
                            if (app.params.animateNavBackIcon) {
                                if (el[0].className.indexOf('left') >= 0 && activeNavBackIcon.length > 0) {
                                    activeNavBackIcon.transform('translate3d(' + -activeNavTranslate + 'px,0,0)');
                                }
                            }
                        }
                    }
                    for (i = 0; i < previousNavElements.length; i++) {
                        el = $(previousNavElements[i]);
                        if (!el.is('.subnavbar.sliding')) el[0].style.opacity = percentage * 1.3 - 0.3;
                        if (el[0].className.indexOf('sliding') >= 0) {
                            var previousNavTranslate = el[0].f7NavbarLeftOffset * (1 - percentage);
                            if (app.device.pixelRatio === 1) previousNavTranslate = Math.round(previousNavTranslate);
                            el.transform('translate3d(' + previousNavTranslate + 'px,0,0)');
                            if (app.params.animateNavBackIcon) {
                                if (el[0].className.indexOf('left') >= 0 && previousNavBackIcon.length > 0) {
                                    previousNavBackIcon.transform('translate3d(' + -previousNavTranslate + 'px,0,0)');
                                }
                            }
                        }
                    }
                }
            };
        
            view.handleTouchEnd = function (e) {
                if (!isTouched || !isMoved) {
                    isTouched = false;
                    isMoved = false;
                    return;
                }
                isTouched = false;
                isMoved = false;
                if (touchesDiff === 0) {
                    $([activePage[0], previousPage[0]]).transform('').css({opacity: '', boxShadow: ''});
                    if (dynamicNavbar) {
                        activeNavElements.transform('').css({opacity: ''});
                        previousNavElements.transform('').css({opacity: ''});
                        if (activeNavBackIcon && activeNavBackIcon.length > 0) activeNavBackIcon.transform('');
                        if (previousNavBackIcon && activeNavBackIcon.length > 0) previousNavBackIcon.transform('');
                    }
                    return;
                }
                var timeDiff = (new Date()).getTime() - touchStartTime;
                var pageChanged = false;
                // Swipe back to previous page
                if (
                        timeDiff < 300 && touchesDiff > 10 ||
                        timeDiff >= 300 && touchesDiff > viewContainerWidth / 2
                    ) {
                    activePage.removeClass('page-on-center').addClass('page-on-right');
                    previousPage.removeClass('page-on-left').addClass('page-on-center');
                    if (dynamicNavbar) {
                        activeNavbar.removeClass('navbar-on-center').addClass('navbar-on-right');
                        previousNavbar.removeClass('navbar-on-left').addClass('navbar-on-center');
                    }
                    pageChanged = true;
                }
                // Reset custom styles
                // Add transitioning class for transition-duration
                $([activePage[0], previousPage[0]]).transform('').css({opacity: '', boxShadow: ''}).addClass('page-transitioning');
                if (dynamicNavbar) {
                    activeNavElements.css({opacity: ''})
                    .each(function () {
                        var translate = pageChanged ? this.f7NavbarRightOffset : 0;
                        var sliding = $(this);
                        sliding.transform('translate3d(' + translate + 'px,0,0)');
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && activeNavBackIcon.length > 0) {
                                activeNavBackIcon.addClass('page-transitioning').transform('translate3d(' + -translate + 'px,0,0)');
                            }
                        }
        
                    }).addClass('page-transitioning');
        
                    previousNavElements.transform('').css({opacity: ''}).each(function () {
                        var translate = pageChanged ? 0 : this.f7NavbarLeftOffset;
                        var sliding = $(this);
                        sliding.transform('translate3d(' + translate + 'px,0,0)');
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && previousNavBackIcon.length > 0) {
                                previousNavBackIcon.addClass('page-transitioning').transform('translate3d(' + -translate + 'px,0,0)');
                            }
                        }
                    }).addClass('page-transitioning');
                }
                allowViewTouchMove = false;
                view.allowPageChange = false;
                // Swipe Back Callback
                var callbackData = {
                    activePage: activePage[0],
                    previousPage: previousPage[0],
                    activeNavbar: activeNavbar[0],
                    previousNavbar: previousNavbar[0]
                };
                if (pageChanged) {
                    // Update View's URL
                    var url = view.history[view.history.length - 2];
                    view.url = url;
        
                    // Page before animation callback
                    app.pageBackCallback('before', view, {pageContainer: activePage[0], url: url, position: 'center', newPage: previousPage, oldPage: activePage, swipeBack: true});
                    app.pageAnimCallback('before', view, {pageContainer: previousPage[0], url: url, position: 'left', newPage: previousPage, oldPage: activePage, swipeBack: true});
        
                    if (view.params.onSwipeBackBeforeChange) {
                        view.params.onSwipeBackBeforeChange(callbackData);
                    }
                    container.trigger('swipeBackBeforeChange', callbackData);
                }
                else {
                    if (view.params.onSwipeBackBeforeReset) {
                        view.params.onSwipeBackBeforeReset(callbackData);
                    }
                    container.trigger('swipeBackBeforeReset', callbackData);
                }
        
                activePage.transitionEnd(function () {
                    $([activePage[0], previousPage[0]]).removeClass('page-transitioning');
                    if (dynamicNavbar) {
                        activeNavElements.removeClass('page-transitioning').css({opacity: ''});
                        previousNavElements.removeClass('page-transitioning').css({opacity: ''});
                        if (activeNavBackIcon && activeNavBackIcon.length > 0) activeNavBackIcon.removeClass('page-transitioning');
                        if (previousNavBackIcon && previousNavBackIcon.length > 0) previousNavBackIcon.removeClass('page-transitioning');
                    }
                    allowViewTouchMove = true;
                    view.allowPageChange = true;
                    if (pageChanged) {
                        if (app.params.pushState && view.main) history.back();
                        // Page after animation callback
                        app.pageBackCallback('after', view, {pageContainer: activePage[0], url: url, position: 'center', newPage: previousPage, oldPage: activePage, swipeBack: true});
                        app.pageAnimCallback('after', view, {pageContainer: previousPage[0], url: url, position: 'left', newPage: previousPage, oldPage: activePage, swipeBack: true});
                        app.router.afterBack(view, activePage, previousPage);
        
                        if (view.params.onSwipeBackAfterChange) {
                            view.params.onSwipeBackAfterChange(callbackData);
                        }
                        container.trigger('swipeBackAfterChange', callbackData);
                    }
                    else {
                        if (view.params.onSwipeBackAfterReset) {
                            view.params.onSwipeBackAfterReset(callbackData);
                        }
                        container.trigger('swipeBackAfterReset', callbackData);
                    }
                    if (pageShadow && pageShadow.length > 0) pageShadow.remove();
                });
            };
            view.attachEvents = function (detach) {
                var action = detach ? 'off' : 'on';
                container[action](app.touchEvents.start, view.handleTouchStart);
                container[action](app.touchEvents.move, view.handleTouchMove);
                container[action](app.touchEvents.end, view.handleTouchEnd);
            };
            view.detachEvents = function () {
                view.attachEvents(true);
            };
        
            // Init
            if (view.params.swipeBackPage && !app.params.material) {
                view.attachEvents();
            }
        
            // Add view to app
            app.views.push(view);
            if (view.main) app.mainView = view;
        
            // Router 
            view.router = {
                load: function (options) {
                    return app.router.load(view, options);
                },
                back: function (options) {
                    return app.router.back(view, options);  
                },
                // Shortcuts
                loadPage: function (options) {
                    options = options || {};
                    if (typeof options === 'string') {
                        var url = options;
                        options = {};
                        if (url && url.indexOf('#') === 0 && view.params.domCache) {
                            options.pageName = url.split('#')[1];
                        }
                        else options.url = url;
                    }
                    return app.router.load(view, options);
                },
                loadContent: function (content) {
                    return app.router.load(view, {content: content});
                },
                reloadPage: function (url) {
                    return app.router.load(view, {url: url, reload: true});
                },
                reloadContent: function (content) {
                    return app.router.load(view, {content: content, reload: true});
                },
                reloadPreviousPage: function (url) {
                    return app.router.load(view, {url: url, reloadPrevious: true, reload: true});
                },
                reloadPreviousContent: function (content) {
                    return app.router.load(view, {content: content, reloadPrevious: true, reload: true});
                },
                refreshPage: function () {
                    var options = {
                        url: view.url,
                        reload: true,
                        ignoreCache: true
                    };
                    if (options.url && options.url.indexOf('#') === 0) {
                        if (view.params.domCache && view.pagesCache[options.url]) {
                            options.pageName = view.pagesCache[options.url];
                            options.url = undefined;
                            delete options.url;
                        }
                        else if (view.contentCache[options.url]) {
                            options.content = view.contentCache[options.url];
                            options.url = undefined;
                            delete options.url;
                        }
                    }
                    return app.router.load(view, options);
                },
                refreshPreviousPage: function () {
                    var options = {
                        url: view.history[view.history.length - 2],
                        reload: true,
                        reloadPrevious: true,
                        ignoreCache: true
                    };
                    if (options.url && options.url.indexOf('#') === 0 && view.params.domCache && view.pagesCache[options.url]) {
                        options.pageName = view.pagesCache[options.url];
                        options.url = undefined;
                        delete options.url;
                    }
                    return app.router.load(view, options);
                }
            };
        
            // Aliases for temporary backward compatibility
            view.loadPage = view.router.loadPage;
            view.loadContent = view.router.loadContent;
            view.reloadPage = view.router.reloadPage;
            view.reloadContent = view.router.reloadContent;
            view.reloadPreviousPage = view.router.reloadPreviousPage;
            view.reloadPreviousContent = view.router.reloadPreviousContent;
            view.refreshPage = view.router.refreshPage;
            view.refreshPreviousPage = view.router.refreshPreviousPage;
            view.back = view.router.back;
        
            // Bars methods
            view.hideNavbar = function () {
                return app.hideNavbar(container.find('.navbar'));
            };
            view.showNavbar = function () {
                return app.showNavbar(container.find('.navbar'));
            };
            view.hideToolbar = function () {
                return app.hideToolbar(container.find('.toolbar'));
            };
            view.showToolbar = function () {
                return app.showToolbar(container.find('.toolbar'));
            };
        
            // Push State on load
            if (app.params.pushState && view.main) {
                var pushStateUrl;
                var pushStateUrlSplit = docLocation.split(pushStateSeparator)[1];
                if (pushStateRoot) {
                    pushStateUrl = docLocation.split(app.params.pushStateRoot + pushStateSeparator)[1];
                }
                else if (pushStateSeparator && docLocation.indexOf(pushStateSeparator) >= 0 && docLocation.indexOf(pushStateSeparator + '#') < 0) {
                    pushStateUrl = pushStateUrlSplit;
                }
                var pushStateAnimatePages = app.params.pushStateNoAnimation ? false : undefined;
                var historyState = history.state;
                if (pushStateUrl) {
                    if (pushStateUrl.indexOf('#') >= 0 && view.params.domCache && historyState && historyState.pageName && 'viewIndex' in historyState) {
                        app.router.load(view, {pageName: historyState.pageName, url: historyState.url, animatePages: pushStateAnimatePages, pushState: false});
                    }
                    else if (pushStateUrl.indexOf('#') >= 0 && view.params.domCache && view.initialPagesUrl.indexOf(pushStateUrl) >= 0) {
                        app.router.load(view, {pageName: pushStateUrl.replace('#',''), animatePages: pushStateAnimatePages, pushState: false});   
                    }
                    else app.router.load(view, {url: pushStateUrl, animatePages: pushStateAnimatePages, pushState: false});
                }
                else if (view.params.domCache && docLocation.indexOf(pushStateSeparator + '#') >= 0) {
                    if (historyState && historyState.pageName && 'viewIndex' in historyState) {
                        app.router.load(view, {pageName: historyState.pageName, url: historyState.url, animatePages: pushStateAnimatePages, pushState: false});
                    }
                    else if (pushStateSeparator && pushStateUrlSplit.indexOf('#') === 0) {
                        if (view.initialPagesUrl.indexOf(pushStateUrlSplit)) {
                            app.router.load(view, {pageName: pushStateUrlSplit.replace('#', ''), animatePages: pushStateAnimatePages, pushState: false});
                        }
                    }
                }
            }
        
            // Destroy
            view.destroy = function () {
                view.detachEvents();
                view = undefined;
            };
        
            // Plugin hook
            app.pluginHook('addView', view);
        
            // Return view
            return view;
        };
        
        app.addView = function (selector, params) {
            return new View(selector, params);
        };
        
        app.getCurrentView = function (index) {
            var popoverView = $('.popover.modal-in .view');
            var popupView = $('.popup.modal-in .view');
            var panelView = $('.panel.active .view');
            var appViews = $('.views');
            // Find active view as tab
            var appView = appViews.children('.view');
            // Propably in tabs or split view
            if (appView.length > 1) {
                if (appView.hasClass('tab')) {
                    // Tabs
                    appView = appViews.children('.view.active');
                }
                else {
                    // Split View, leave appView intact
                }
            }
            if (popoverView.length > 0 && popoverView[0].f7View) return popoverView[0].f7View;
            if (popupView.length > 0 && popupView[0].f7View) return popupView[0].f7View;
            if (panelView.length > 0 && panelView[0].f7View) return panelView[0].f7View;
            if (appView.length > 0) {
                if (appView.length === 1 && appView[0].f7View) return appView[0].f7View;
                if (appView.length > 1) {
                    var currentViews = [];
                    for (var i = 0; i < appView.length; i++) {
                        if (appView[i].f7View) currentViews.push(appView[i].f7View);
                    }
                    if (currentViews.length > 0 && typeof index !== 'undefined') return currentViews[index];
                    if (currentViews.length > 1) return currentViews;
                    if (currentViews.length === 1) return currentViews[0];
                    return undefined;
                }
            }
            return undefined;
        };
        

        /*======================================================
        ************   Navbars && Toolbars   ************
        ======================================================*/
        // On Navbar Init Callback
        app.navbarInitCallback = function (view, pageContainer, navbarContainer, navbarInnerContainer) {
            if (!navbarContainer && navbarInnerContainer) navbarContainer = $(navbarInnerContainer).parent('.navbar')[0];
            if (navbarInnerContainer.f7NavbarInitialized && view && !view.params.domCache) return;
            var navbarData = {
                container: navbarContainer,
                innerContainer: navbarInnerContainer
            };
            var pageData = pageContainer && pageContainer.f7PageData;
        
            var eventData = {
                page: pageData,
                navbar: navbarData
            };
        
            if (navbarInnerContainer.f7NavbarInitialized && ((view && view.params.domCache) || (!view && $(navbarContainer).parents('.popup, .popover, .login-screen, .modal, .actions-modal, .picker-modal').length > 0))) {
                // Reinit Navbar
                app.reinitNavbar(navbarContainer, navbarInnerContainer);
        
                // Plugin hook
                app.pluginHook('navbarReinit', eventData);
        
                // Event
                $(navbarInnerContainer).trigger('navbarReinit', eventData);
                return;
            }
            navbarInnerContainer.f7NavbarInitialized = true;
            // Before Init
            app.pluginHook('navbarBeforeInit', navbarData, pageData);
            $(navbarInnerContainer).trigger('navbarBeforeInit', eventData);
        
            // Initialize Navbar
            app.initNavbar(navbarContainer, navbarInnerContainer);
        
            // On init
            app.pluginHook('navbarInit', navbarData, pageData);
            $(navbarInnerContainer).trigger('navbarInit', eventData);
        };
        // Navbar Remove Callback
        app.navbarRemoveCallback = function (view, pageContainer, navbarContainer, navbarInnerContainer) {
            if (!navbarContainer && navbarInnerContainer) navbarContainer = $(navbarInnerContainer).parent('.navbar')[0];
            var navbarData = {
                container: navbarContainer,
                innerContainer: navbarInnerContainer
            };
            var pageData = pageContainer.f7PageData;
        
            var eventData = {
                page: pageData,
                navbar: navbarData
            };
            app.pluginHook('navbarBeforeRemove', navbarData, pageData);
            $(navbarInnerContainer).trigger('navbarBeforeRemove', eventData);
        };
        app.initNavbar = function (navbarContainer, navbarInnerContainer) {
            // Init Subnavbar Searchbar
            if (app.initSearchbar) app.initSearchbar(navbarInnerContainer);
        };
        app.reinitNavbar = function (navbarContainer, navbarInnerContainer) {
            // Re init navbar methods
        };
        app.initNavbarWithCallback = function (navbarContainer) {
            navbarContainer = $(navbarContainer);
            var viewContainer = navbarContainer.parents('.' + app.params.viewClass);
            var view;
            if (viewContainer.length === 0) return;
            if (navbarContainer.parents('.navbar-through').length === 0 && viewContainer.find('.navbar-through').length === 0) return;
            view = viewContainer[0].f7View || undefined;
        
            navbarContainer.find('.navbar-inner').each(function () {
                var navbarInnerContainer = this;
                var pageContainer;
                if ($(navbarInnerContainer).attr('data-page')) {
                    // For dom cache
                    pageContainer = viewContainer.find('.page[data-page="' + $(navbarInnerContainer).attr('data-page') + '"]')[0];
                }
                if (!pageContainer) {
                    var pages = viewContainer.find('.page');
                    if (pages.length === 1) {
                        pageContainer = pages[0];
                    }
                    else {
                        viewContainer.find('.page').each(function () {
                            if (this.f7PageData && this.f7PageData.navbarInnerContainer === navbarInnerContainer) {
                                pageContainer = this;
                            }
                        });
                    }
                }
                app.navbarInitCallback(view, pageContainer, navbarContainer[0], navbarInnerContainer);
            });
        };
        
        // Size Navbars
        app.sizeNavbars = function (viewContainer) {
            if (app.params.material) return;
            var navbarInner = viewContainer ? $(viewContainer).find('.navbar .navbar-inner:not(.cached)') : $('.navbar .navbar-inner:not(.cached)');
            navbarInner.each(function () {
                var n = $(this);
                if (n.hasClass('cached')) return;
                var left = app.rtl ? n.find('.right') : n.find('.left'),
                    right = app.rtl ? n.find('.left') : n.find('.right'),
                    center = n.find('.center'),
                    subnavbar = n.find('.subnavbar'),
                    noLeft = left.length === 0,
                    noRight = right.length === 0,
                    leftWidth = noLeft ? 0 : left.outerWidth(true),
                    rightWidth = noRight ? 0 : right.outerWidth(true),
                    centerWidth = center.outerWidth(true),
                    navbarStyles = n.styles(),
                    navbarWidth = n[0].offsetWidth - parseInt(navbarStyles.paddingLeft, 10) - parseInt(navbarStyles.paddingRight, 10),
                    onLeft = n.hasClass('navbar-on-left'),
                    currLeft, diff;
        
                if (noRight) {
                    currLeft = navbarWidth - centerWidth;
                }
                if (noLeft) {
                    currLeft = 0;
                }
                if (!noLeft && !noRight) {
                    currLeft = (navbarWidth - rightWidth - centerWidth + leftWidth) / 2;
                }
                var requiredLeft = (navbarWidth - centerWidth) / 2;
                if (navbarWidth - leftWidth - rightWidth > centerWidth) {
                    if (requiredLeft < leftWidth) {
                        requiredLeft = leftWidth;
                    }
                    if (requiredLeft + centerWidth > navbarWidth - rightWidth) {
                        requiredLeft = navbarWidth - rightWidth - centerWidth;
                    }
                    diff = requiredLeft - currLeft;
                }
                else {
                    diff = 0;
                }
                // RTL inverter
                var inverter = app.rtl ? -1 : 1;
        
                if (center.hasClass('sliding')) {
                    center[0].f7NavbarLeftOffset = -(currLeft + diff) * inverter;
                    center[0].f7NavbarRightOffset = (navbarWidth - currLeft - diff - centerWidth) * inverter;
                    if (onLeft) {
                        if (app.params.animateNavBackIcon) {
                            var activeNavbarBackLink = n.parent().find('.navbar-on-center').find('.left.sliding .back .icon ~ span');
                            if (activeNavbarBackLink.length > 0) {
                                center[0].f7NavbarLeftOffset += activeNavbarBackLink[0].offsetLeft;
                            }
                        }
                        center.transform('translate3d(' + center[0].f7NavbarLeftOffset + 'px, 0, 0)');
                    }
                }
                if (!noLeft && left.hasClass('sliding')) {
                    if (app.rtl) {
                        left[0].f7NavbarLeftOffset = -(navbarWidth - left[0].offsetWidth) / 2 * inverter;
                        left[0].f7NavbarRightOffset = leftWidth * inverter;
                    }
                    else {
                        left[0].f7NavbarLeftOffset = -leftWidth;
                        left[0].f7NavbarRightOffset = (navbarWidth - left[0].offsetWidth) / 2;
                        if (app.params.animateNavBackIcon && left.find('.back .icon').length > 0) {
                            left[0].f7NavbarRightOffset -= left.find('.back .icon')[0].offsetWidth;
                        }
                    }
                    if (onLeft) left.transform('translate3d(' + left[0].f7NavbarLeftOffset + 'px, 0, 0)');
                }
                if (!noRight && right.hasClass('sliding')) {
                    if (app.rtl) {
                        right[0].f7NavbarLeftOffset = -rightWidth * inverter;
                        right[0].f7NavbarRightOffset = (navbarWidth - right[0].offsetWidth) / 2 * inverter;
                    }
                    else {
                        right[0].f7NavbarLeftOffset = -(navbarWidth - right[0].offsetWidth) / 2;
                        right[0].f7NavbarRightOffset = rightWidth;
                    }
                    if (onLeft) right.transform('translate3d(' + right[0].f7NavbarLeftOffset + 'px, 0, 0)');
                }
                if (subnavbar.length && subnavbar.hasClass('sliding')) {
                    subnavbar[0].f7NavbarLeftOffset = app.rtl ? subnavbar[0].offsetWidth : -subnavbar[0].offsetWidth;
                    subnavbar[0].f7NavbarRightOffset = -subnavbar[0].f7NavbarLeftOffset;
                }
        
                // Center left
                var centerLeft = diff;
                if (app.rtl && noLeft && noRight && center.length > 0) centerLeft = -centerLeft;
                center.css({left: centerLeft + 'px'});
                
            });
        };
        
        // Hide/Show Navbars/Toolbars
        app.hideNavbar = function (navbarContainer) {
            $(navbarContainer).addClass('navbar-hidden');
            return true;
        };
        app.showNavbar = function (navbarContainer) {
            var navbar = $(navbarContainer);
            navbar.addClass('navbar-hiding').removeClass('navbar-hidden').transitionEnd(function () {
                navbar.removeClass('navbar-hiding');
            });
            return true;
        };
        app.hideToolbar = function (toolbarContainer) {
            $(toolbarContainer).addClass('toolbar-hidden');
            return true;
        };
        app.showToolbar = function (toolbarContainer) {
            var toolbar = $(toolbarContainer);
            toolbar.addClass('toolbar-hiding').removeClass('toolbar-hidden').transitionEnd(function () {
                toolbar.removeClass('toolbar-hiding');
            });
        };
        

        /*======================================================
        ************   XHR   ************
        ======================================================*/
        // XHR Caching
        app.cache = [];
        app.removeFromCache = function (url) {
            var index = false;
            for (var i = 0; i < app.cache.length; i++) {
                if (app.cache[i].url === url) index = i;
            }
            if (index !== false) app.cache.splice(index, 1);
        };
        
        // XHR
        app.xhr = false;
        app.get = function (url, view, ignoreCache, callback) {
            // should we ignore get params or not
            var _url = url;
            if (app.params.cacheIgnoreGetParameters && url.indexOf('?') >= 0) {
                _url = url.split('?')[0];
            }
            if (app.params.cache && !ignoreCache && url.indexOf('nocache') < 0 && app.params.cacheIgnore.indexOf(_url) < 0) {
                // Check is the url cached
                for (var i = 0; i < app.cache.length; i++) {
                    if (app.cache[i].url === _url) {
                        // Check expiration
                        if ((new Date()).getTime() - app.cache[i].time < app.params.cacheDuration) {
                            // Load from cache
                            callback(app.cache[i].content);
                            return false;
                        }
                    }
                }
            }
        
            app.xhr = $.ajax({
                url: url,
                method: 'GET',
                beforeSend: app.params.onAjaxStart,
                complete: function (xhr) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
                        if (app.params.cache) {
                            app.removeFromCache(_url);
                            app.cache.push({
                                url: _url,
                                time: (new Date()).getTime(),
                                content: xhr.responseText
                            });
                        }
                        callback(xhr.responseText, false);
                    }
                    else {
                        callback(xhr.responseText, true);
                    }
                    if (app.params.onAjaxComplete) app.params.onAjaxComplete(xhr);
                },
                error: function (xhr) {
                    callback(xhr.responseText, true);
                    if (app.params.onAjaxError) app.params.onAjaxError(xhr);
                }
            });
            if (view) view.xhr = app.xhr;
        
            return app.xhr;
        };
        

        /*======================================================
        ************   Pages   ************
        ======================================================*/
        // Page Callbacks API
        app.pageCallbacks = {};
        
        app.onPage = function (callbackName, pageName, callback) {
            if (pageName && pageName.split(' ').length > 1) {
                var pageNames = pageName.split(' ');
                var returnCallbacks = [];
                for (var i = 0; i < pageNames.length; i++) {
                    returnCallbacks.push(app.onPage(callbackName, pageNames[i], callback));
                }
                returnCallbacks.remove = function () {
                    for (var i = 0; i < returnCallbacks.length; i++) {
                        returnCallbacks[i].remove();
                    }
                };
                returnCallbacks.trigger = function () {
                    for (var i = 0; i < returnCallbacks.length; i++) {
                        returnCallbacks[i].trigger();
                    }
                };
                return returnCallbacks;
            }
            var callbacks = app.pageCallbacks[callbackName][pageName];
            if (!callbacks) {
                callbacks = app.pageCallbacks[callbackName][pageName] = [];
            }
            app.pageCallbacks[callbackName][pageName].push(callback);
            return {
                remove: function () {
                    var removeIndex;
                    for (var i = 0; i < callbacks.length; i++) {
                        if (callbacks[i].toString() === callback.toString()) {
                            removeIndex = i;
                        }
                    }
                    if (typeof removeIndex !== 'undefined') callbacks.splice(removeIndex, 1);
                },
                trigger: callback
            };
        };
        
        //Create callbacks methods dynamically
        function createPageCallback(callbackName) {
            var capitalized = callbackName.replace(/^./, function (match) {
                return match.toUpperCase();
            });
            app['onPage' + capitalized] = function (pageName, callback) {
                return app.onPage(callbackName, pageName, callback);
            };
        }
        
        var pageCallbacksNames = ('beforeInit init reinit beforeAnimation afterAnimation back afterBack beforeRemove').split(' ');
        for (var i = 0; i < pageCallbacksNames.length; i++) {
            app.pageCallbacks[pageCallbacksNames[i]] = {};
            createPageCallback(pageCallbacksNames[i]);
        }
        
        app.triggerPageCallbacks = function (callbackName, pageName, pageData) {
            var allPagesCallbacks = app.pageCallbacks[callbackName]['*'];
            if (allPagesCallbacks) {
                for (var j = 0; j < allPagesCallbacks.length; j++) {
                    allPagesCallbacks[j](pageData);
                }
            }
            var callbacks = app.pageCallbacks[callbackName][pageName];
            if (!callbacks || callbacks.length === 0) return;
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i](pageData);
            }
        };
        
        // On Page Init Callback
        app.pageInitCallback = function (view, params) {
            var pageContainer = params.pageContainer;
            if (pageContainer.f7PageInitialized && view && !view.params.domCache) return;
        
            var pageQuery = params.query;
            if (!pageQuery) {
                if (params.url && params.url.indexOf('?') > 0) {
                    pageQuery = $.parseUrlQuery(params.url || '');
                }
                else if (pageContainer.f7PageData && pageContainer.f7PageData.query) {
                    pageQuery = pageContainer.f7PageData.query;
                }
                else {
                    pageQuery = {};
                }
            }
        
            // Page Data
            var pageData = {
                container: pageContainer,
                url: params.url,
                query: pageQuery,
                name: $(pageContainer).attr('data-page'),
                view: view,
                from: params.position,
                context: params.context,
                navbarInnerContainer: params.navbarInnerContainer,
                fromPage: params.fromPage
            };
            if (params.fromPage && !params.fromPage.navbarInnerContainer && params.oldNavbarInnerContainer) {
                params.fromPage.navbarInnerContainer = params.oldNavbarInnerContainer;
            }
        
            if (pageContainer.f7PageInitialized && ((view && view.params.domCache) || (!view && $(pageContainer).parents('.popup, .popover, .login-screen, .modal, .actions-modal, .picker-modal').length > 0))) {
                // Reinit Page
                app.reinitPage(pageContainer);
        
                // Callbacks
                app.pluginHook('pageReinit', pageData);
                if (app.params.onPageReinit) app.params.onPageReinit(app, pageData);
                app.triggerPageCallbacks('reinit', pageData.name, pageData);
                $(pageData.container).trigger('pageReinit', {page: pageData});
                return;
            }
            pageContainer.f7PageInitialized = true;
        
            // Store pagedata in page
            pageContainer.f7PageData = pageData;
        
            // Update View's activePage
            if (view && !params.preloadOnly && !params.reloadPrevious) {
                // Add data-page on view
                $(view.container).attr('data-page', pageData.name);
                // Update View active page data
                view.activePage = pageData;
            }
        
            // Before Init Callbacks
            app.pluginHook('pageBeforeInit', pageData);
            if (app.params.onPageBeforeInit) app.params.onPageBeforeInit(app, pageData);
            app.triggerPageCallbacks('beforeInit', pageData.name, pageData);
            $(pageData.container).trigger('pageBeforeInit', {page: pageData});
        
            // Init page
            app.initPage(pageContainer);
        
            // Init Callback
            app.pluginHook('pageInit', pageData);
            if (app.params.onPageInit) app.params.onPageInit(app, pageData);
            app.triggerPageCallbacks('init', pageData.name, pageData);
            $(pageData.container).trigger('pageInit', {page: pageData});
        };
        app.pageRemoveCallback = function (view, pageContainer, position) {
            var pageContext;
            if (pageContainer.f7PageData) pageContext = pageContainer.f7PageData.context;
            // Page Data
            var pageData = {
                container: pageContainer,
                name: $(pageContainer).attr('data-page'),
                view: view,
                url: pageContainer.f7PageData && pageContainer.f7PageData.url,
                query: pageContainer.f7PageData && pageContainer.f7PageData.query,
                navbarInnerContainer: pageContainer.f7PageData && pageContainer.f7PageData.navbarInnerContainer,
                from: position,
                context: pageContext
            };
            // Before Init Callback
            app.pluginHook('pageBeforeRemove', pageData);
            if (app.params.onPageBeforeRemove) app.params.onPageBeforeRemove(app, pageData);
            app.triggerPageCallbacks('beforeRemove', pageData.name, pageData);
            $(pageData.container).trigger('pageBeforeRemove', {page: pageData});
        };
        app.pageBackCallback = function (callback, view, params) {
            // Page Data
            var pageContainer = params.pageContainer;
            var pageContext;
            if (pageContainer.f7PageData) pageContext = pageContainer.f7PageData.context;
        
            var pageData = {
                container: pageContainer,
                name: $(pageContainer).attr('data-page'),
                url: pageContainer.f7PageData && pageContainer.f7PageData.url,
                query: pageContainer.f7PageData && pageContainer.f7PageData.query,
                view: view,
                from: params.position,
                context: pageContext,
                navbarInnerContainer: pageContainer.f7PageData && pageContainer.f7PageData.navbarInnerContainer,
                swipeBack: params.swipeBack
            };
        
            if (callback === 'after') {
                app.pluginHook('pageAfterBack', pageData);
                if (app.params.onPageAfterBack) app.params.onPageAfterBack(app, pageData);
                app.triggerPageCallbacks('afterBack', pageData.name, pageData);
                $(pageContainer).trigger('pageAfterBack', {page: pageData});
        
            }
            if (callback === 'before') {
                app.pluginHook('pageBack', pageData);
                if (app.params.onPageBack) app.params.onPageBack(app, pageData);
                app.triggerPageCallbacks('back', pageData.name, pageData);
                $(pageData.container).trigger('pageBack', {page: pageData});
            }
        };
        app.pageAnimCallback = function (callback, view, params) {
            var pageContainer = params.pageContainer;
            var pageContext;
            if (pageContainer.f7PageData) pageContext = pageContainer.f7PageData.context;
        
            var pageQuery = params.query;
            if (!pageQuery) {
                if (params.url && params.url.indexOf('?') > 0) {
                    pageQuery = $.parseUrlQuery(params.url || '');
                }
                else if (pageContainer.f7PageData && pageContainer.f7PageData.query) {
                    pageQuery = pageContainer.f7PageData.query;
                }
                else {
                    pageQuery = {};
                }
            }
            // Page Data
            var pageData = {
                container: pageContainer,
                url: params.url,
                query: pageQuery,
                name: $(pageContainer).attr('data-page'),
                view: view,
                from: params.position,
                context: pageContext,
                swipeBack: params.swipeBack,
                navbarInnerContainer: pageContainer.f7PageData && pageContainer.f7PageData.navbarInnerContainer,
                fromPage: params.fromPage
            };
            var oldPage = params.oldPage,
                newPage = params.newPage;
        
            // Update page date
            pageContainer.f7PageData = pageData;
        
            if (callback === 'after') {
                app.pluginHook('pageAfterAnimation', pageData);
                if (app.params.onPageAfterAnimation) app.params.onPageAfterAnimation(app, pageData);
                app.triggerPageCallbacks('afterAnimation', pageData.name, pageData);
                $(pageData.container).trigger('pageAfterAnimation', {page: pageData});
        
            }
            if (callback === 'before') {
                // Add data-page on view
                $(view.container).attr('data-page', pageData.name);
        
                // Update View's activePage
                if (view) view.activePage = pageData;
        
                // Hide/show navbar dynamically
                if (newPage.hasClass('no-navbar') && !oldPage.hasClass('no-navbar')) {
                    view.hideNavbar();
                }
                if (!newPage.hasClass('no-navbar') && (oldPage.hasClass('no-navbar') || oldPage.hasClass('no-navbar-by-scroll'))) {
                    view.showNavbar();
                }
                // Hide/show navbar toolbar
                if (newPage.hasClass('no-toolbar') && !oldPage.hasClass('no-toolbar')) {
                    view.hideToolbar();
                }
                if (!newPage.hasClass('no-toolbar') && (oldPage.hasClass('no-toolbar') || oldPage.hasClass('no-toolbar-by-scroll'))) {
                    view.showToolbar();
                }
                // Hide/show tabbar
                var tabBar;
                if (newPage.hasClass('no-tabbar') && !oldPage.hasClass('no-tabbar')) {
                    tabBar = $(view.container).find('.tabbar');
                    if (tabBar.length === 0) tabBar = $(view.container).parents('.' + app.params.viewsClass).find('.tabbar');
                    app.hideToolbar(tabBar);
                }
                if (!newPage.hasClass('no-tabbar') && (oldPage.hasClass('no-tabbar') || oldPage.hasClass('no-tabbar-by-scroll'))) {
                    tabBar = $(view.container).find('.tabbar');
                    if (tabBar.length === 0) tabBar = $(view.container).parents('.' + app.params.viewsClass).find('.tabbar');
                    app.showToolbar(tabBar);
                }
        
                oldPage.removeClass('no-navbar-by-scroll no-toolbar-by-scroll');
                // Callbacks
                app.pluginHook('pageBeforeAnimation', pageData);
                if (app.params.onPageBeforeAnimation) app.params.onPageBeforeAnimation(app, pageData);
                app.triggerPageCallbacks('beforeAnimation', pageData.name, pageData);
                $(pageData.container).trigger('pageBeforeAnimation', {page: pageData});
            }
        };
        
        // Init Page Events and Manipulations
        app.initPage = function (pageContainer) {
            pageContainer = $(pageContainer);
            if (pageContainer.length === 0) return;
            // Size navbars on page load
            if (app.sizeNavbars) app.sizeNavbars(pageContainer.parents('.' + app.params.viewClass)[0]);
            // Init messages
            if (app.initPageMessages) app.initPageMessages(pageContainer);
            // Init forms storage
            if (app.initFormsStorage) app.initFormsStorage(pageContainer);
            // Init smart select
            if (app.initSmartSelects) app.initSmartSelects(pageContainer);
            // Init slider
            if (app.initPageSwiper) app.initPageSwiper(pageContainer);
            // Init pull to refres
            if (app.initPullToRefresh) app.initPullToRefresh(pageContainer);
            // Init infinite scroll
            if (app.initPageInfiniteScroll) app.initPageInfiniteScroll(pageContainer);
            // Init searchbar
            if (app.initSearchbar) app.initSearchbar(pageContainer);
            // Init message bar
            if (app.initPageMessagebar) app.initPageMessagebar(pageContainer);
            // Init scroll toolbars
            if (app.initPageScrollToolbars) app.initPageScrollToolbars(pageContainer);
            // Init lazy images
            if (app.initImagesLazyLoad) app.initImagesLazyLoad(pageContainer);
            // Init progress bars
            if (app.initPageProgressbar) app.initPageProgressbar(pageContainer);
            // Init resizeable textareas
            if (app.initPageResizableTextarea) app.initPageResizableTextarea(pageContainer);
            // Init Material Preloader
            if (app.params.material && app.initPageMaterialPreloader) app.initPageMaterialPreloader(pageContainer);
            // Init Material Inputs
            if (app.params.material && app.initPageMaterialInputs) app.initPageMaterialInputs(pageContainer);
            // Init Material Tabbar
            if (app.params.material && app.initPageMaterialTabbar) app.initPageMaterialTabbar(pageContainer);
        };
        app.reinitPage = function (pageContainer) {
            pageContainer = $(pageContainer);
            if (pageContainer.length === 0) return;
            // Size navbars on page reinit
            if (app.sizeNavbars) app.sizeNavbars(pageContainer.parents('.' + app.params.viewClass)[0]);
            // Reinit slider
            if (app.reinitPageSwiper) app.reinitPageSwiper(pageContainer);
            // Reinit lazy load
            if (app.reinitLazyLoad) app.reinitLazyLoad(pageContainer);
        };
        app.initPageWithCallback = function (pageContainer) {
            pageContainer = $(pageContainer);
            var viewContainer = pageContainer.parents('.' + app.params.viewClass);
            if (viewContainer.length === 0) return;
            var view = viewContainer[0].f7View || undefined;
            var url = view && view.url ? view.url : undefined;
            if (viewContainer && pageContainer.attr('data-page')) {
                viewContainer.attr('data-page', pageContainer.attr('data-page'));
            }
            app.pageInitCallback(view, {pageContainer: pageContainer[0], url: url, position: 'center'});
        };

        /*======================================================
        ************   Navigation / Router   ************
        ======================================================*/
        app.router = {
            // Temporary DOM Element
            temporaryDom: document.createElement('div'),
        
            // Find page or navbar in passed container which are related to View
            findElement: function (selector, container, view, notCached) {
                container = $(container);
                if (notCached) selector = selector + ':not(.cached)';
                var found = container.find(selector);
                if (found.length > 1) {
                    if (typeof view.selector === 'string') {
                        // Search in related view
                        found = container.find(view.selector + ' ' + selector);
                    }
                    if (found.length > 1) {
                        // Search in main view
                        found = container.find('.' + app.params.viewMainClass + ' ' + selector);
                    }
                }
                if (found.length === 1) return found;
                else {
                    // Try to find non cached
                    if (!notCached) found = app.router.findElement(selector, container, view, true);
                    if (found && found.length === 1) return found;
                    else return undefined;
                }
            },
        
            // Set pages classess for animationEnd
            animatePages: function (leftPage, rightPage, direction, view) {
                // Loading new page
                var removeClasses = 'page-on-center page-on-right page-on-left';
                if (direction === 'to-left') {
                    leftPage.removeClass(removeClasses).addClass('page-from-center-to-left');
                    rightPage.removeClass(removeClasses).addClass('page-from-right-to-center');
                }
                // Go back
                if (direction === 'to-right') {
                    leftPage.removeClass(removeClasses).addClass('page-from-left-to-center');
                    rightPage.removeClass(removeClasses).addClass('page-from-center-to-right');
        
                }
            },
        
            // Prepare navbar before animarion
            prepareNavbar: function (newNavbarInner, oldNavbarInner, newNavbarPosition) {
                $(newNavbarInner).find('.sliding').each(function () {
                    var sliding = $(this);
                    var slidingOffset = newNavbarPosition === 'right' ? this.f7NavbarRightOffset : this.f7NavbarLeftOffset;
        
                    if (app.params.animateNavBackIcon) {
                        if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                            sliding.find('.back .icon').transform('translate3d(' + (-slidingOffset) + 'px,0,0)');
                        }
                    }
                    sliding.transform('translate3d(' + slidingOffset + 'px,0,0)');
                });
            },
        
            // Set navbars classess for animation
            animateNavbars: function (leftNavbarInner, rightNavbarInner, direction, view) {
                // Loading new page
                var removeClasses = 'navbar-on-right navbar-on-center navbar-on-left';
                if (direction === 'to-left') {
                    rightNavbarInner.removeClass(removeClasses).addClass('navbar-from-right-to-center');
                    rightNavbarInner.find('.sliding').each(function () {
                        var sliding = $(this);
                        sliding.transform('translate3d(0px,0,0)');
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                                sliding.find('.back .icon').transform('translate3d(0px,0,0)');
                            }
                        }
                    });
        
                    leftNavbarInner.removeClass(removeClasses).addClass('navbar-from-center-to-left');
                    leftNavbarInner.find('.sliding').each(function () {
                        var sliding = $(this);
                        var rightText;
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('center') && rightNavbarInner.find('.sliding.left .back .icon').length > 0) {
                                rightText = rightNavbarInner.find('.sliding.left .back span');
                                if (rightText.length > 0) this.f7NavbarLeftOffset += rightText[0].offsetLeft;
                            }
                            if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                                sliding.find('.back .icon').transform('translate3d(' + (-this.f7NavbarLeftOffset) + 'px,0,0)');
                            }
                        }
                        sliding.transform('translate3d(' + (this.f7NavbarLeftOffset) + 'px,0,0)');
                    });
                }
                // Go back
                if (direction === 'to-right') {
                    leftNavbarInner.removeClass(removeClasses).addClass('navbar-from-left-to-center');
                    leftNavbarInner.find('.sliding').each(function () {
                        var sliding = $(this);
                        sliding.transform('translate3d(0px,0,0)');
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                                sliding.find('.back .icon').transform('translate3d(0px,0,0)');
                            }
                        }
                    });
        
                    rightNavbarInner.removeClass(removeClasses).addClass('navbar-from-center-to-right');
                    rightNavbarInner.find('.sliding').each(function () {
                        var sliding = $(this);
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                                sliding.find('.back .icon').transform('translate3d(' + (-this.f7NavbarRightOffset) + 'px,0,0)');
                            }
                        }
                        sliding.transform('translate3d(' + (this.f7NavbarRightOffset) + 'px,0,0)');
                    });
                }
            },
        
            preprocess: function(view, content, url, next) {
                // Plugin hook
                app.pluginHook('routerPreprocess', view, content, url, next);
        
                // Preprocess by plugin
                content = app.pluginProcess('preprocess', content);
        
                if (view && view.params && view.params.preprocess) {
                    content = view.params.preprocess(content, url, next);
                    if (typeof content !== 'undefined') {
                        next(content);
                    }
                }
                else if (app.params.preprocess) {
                    content = app.params.preprocess(content, url, next);
                    if (typeof content !== 'undefined') {
                        next(content);
                    }
                }
                else {
                    next(content);
                }
            },
            preroute: function(view, options) {
                app.pluginHook('routerPreroute', view, options);
                if ((app.params.preroute && app.params.preroute(view, options) === false) || (view && view.params.preroute && view.params.preroute(view, options) === false)) {
                    return true;
                }
                else {
                    return false;
                }
            },
        
            template7Render: function (view, options) {
                var url = options.url,
                    content = options.content, //initial content
                    t7_rendered_content = options.content, // will be rendered using Template7
                    context = options.context, // Context data for Template7
                    contextName = options.contextName,
                    template = options.template, // Template 7 compiled template
                    pageName = options.pageName;
        
                var t7_ctx, t7_template;
                if (typeof content === 'string') {
                    if (url) {
                        if (app.template7Cache[url] && !options.ignoreCache) t7_template = t7.cache[url];
                        else {
                            t7_template = t7.compile(content);
                            t7.cache[url] = t7_template;
                        }
                    }
                    else t7_template = t7.compile(content);
                }
                else if (template) {
                    t7_template = template;
                }
        
                if (context) t7_ctx = context;
                else {
                    if (contextName) {
                        if (contextName.indexOf('.') >= 0) {
                            var _ctx_path = contextName.split('.');
                            var _ctx = t7.data[_ctx_path[0]];
                            for (var i = 1; i < _ctx_path.length; i++) {
                                if (_ctx_path[i]) _ctx = _ctx[_ctx_path[i]];
                            }
                            t7_ctx = _ctx;
                        }
                        else t7_ctx = t7.data[contextName];
                    }
                    if (!t7_ctx && url) {
                        t7_ctx = t7.data['url:' + url];
                    }
                    if (!t7_ctx && typeof content === 'string' && !template) {
                        //try to find by page name in content
                        var pageNameMatch = content.match(/(data-page=["'][^"^']*["'])/);
                        if (pageNameMatch) {
                            var page = pageNameMatch[0].split('data-page=')[1].replace(/['"]/g, '');
                            if (page) t7_ctx = t7.data['page:' + page];
                        }
                    }
                    if (!t7_ctx && template && t7.templates) {
                        // Try to find matched template name in t7.templates
                        for (var templateName in t7.templates) {
                            if (t7.templates[templateName] === template) t7_ctx = t7.data[templateName];
                        }
                    }
                    if (!t7_ctx) t7_ctx = {};
                }
        
                if (t7_template && t7_ctx) {
                    if (typeof t7_ctx === 'function') t7_ctx = t7_ctx();
                    if (url) {
                        // Extend data with URL query
                        var query = $.parseUrlQuery(url);
                        t7_ctx.url_query = {};
                        for (var key in query) {
                            t7_ctx.url_query[key] = query[key];
                        }
                    }
                    t7_rendered_content = t7_template(t7_ctx);
                }
        
                return {content: t7_rendered_content, context: t7_ctx};
            }
        };
        
        
        app.router._load = function (view, options) {
            options = options || {};
        
            var url = options.url,
                content = options.content, //initial content
                t7_rendered = {content: options.content},
                template = options.template, // Template 7 compiled template
                pageName = options.pageName,
                viewContainer = $(view.container),
                pagesContainer = $(view.pagesContainer),
                animatePages = options.animatePages,
                newPage, oldPage, pagesInView, i, oldNavbarInner, newNavbarInner, navbar, dynamicNavbar, reloadPosition,
                isDynamicPage = typeof url === 'undefined' && content || template,
                pushState = options.pushState;
        
            if (typeof animatePages === 'undefined') animatePages = view.params.animatePages;
        
            // Plugin hook
            app.pluginHook('routerLoad', view, options);
        
            // Render with Template7
            if (app.params.template7Pages && typeof content === 'string' || template) {
                t7_rendered = app.router.template7Render(view, options);
                if (t7_rendered.content && !content) {
                    content = t7_rendered.content;
                }
            }
        
            app.router.temporaryDom.innerHTML = '';
        
            // Parse DOM
            if (!pageName) {
                if ((typeof content === 'string') || (url && (typeof content === 'string'))) {
                    app.router.temporaryDom.innerHTML = t7_rendered.content;
                } else {
                    if ('length' in content && content.length > 1) {
                        for (var ci = 0; ci < content.length; ci++) {
                            $(app.router.temporaryDom).append(content[ci]);
                        }
                    } else {
                        $(app.router.temporaryDom).append(content);
                    }
                }
            }
        
            // Reload position
            reloadPosition = options.reload && (options.reloadPrevious ? 'left' : 'center');
        
            // Find new page
            if (pageName) newPage = pagesContainer.find('.page[data-page="' + pageName + '"]');
            else {
                newPage = app.router.findElement('.page', app.router.temporaryDom, view);
            }
        
            // If page not found exit
            if (!newPage || newPage.length === 0 || (pageName && view.activePage && view.activePage.name === pageName)) {
                view.allowPageChange = true;
                return;
            }
        
            newPage.addClass(options.reload ? 'page-on-' + reloadPosition : 'page-on-right');
        
            // Find old page (should be the last one) and remove older pages
            pagesInView = pagesContainer.children('.page:not(.cached)');
        
            if (options.reload && options.reloadPrevious && pagesInView.length === 1)  {
                view.allowPageChange = true;
                return;
            }
        
            if (options.reload) {
                oldPage = pagesInView.eq(pagesInView.length - 1);
            }
            else {
                if (pagesInView.length > 1) {
                    for (i = 0; i < pagesInView.length - 2; i++) {
                        if (!view.params.domCache) {
                            app.pageRemoveCallback(view, pagesInView[i], 'left');
                            $(pagesInView[i]).remove();
                        }
                        else {
                            $(pagesInView[i]).addClass('cached');
                        }
                    }
                    if (!view.params.domCache) {
                        app.pageRemoveCallback(view, pagesInView[i], 'left');
                        $(pagesInView[i]).remove();
                    }
                    else {
                        $(pagesInView[i]).addClass('cached');
                    }
                }
                oldPage = pagesContainer.children('.page:not(.cached)');
            }
            if(view.params.domCache) newPage.removeClass('cached');
        
            // Dynamic navbar
            if (view.params.dynamicNavbar) {
                dynamicNavbar = true;
                // Find navbar
                if (pageName) {
                    newNavbarInner = viewContainer.find('.navbar-inner[data-page="' + pageName + '"]');
                }
                else {
                    newNavbarInner = app.router.findElement('.navbar-inner', app.router.temporaryDom, view);
                }
                if (!newNavbarInner || newNavbarInner.length === 0) {
                    dynamicNavbar = false;
                }
                navbar = viewContainer.find('.navbar');
                if (options.reload) {
                    oldNavbarInner = navbar.find('.navbar-inner:not(.cached):last-child');
                }
                else {
                    oldNavbarInner = navbar.find('.navbar-inner:not(.cached)');
        
                    if (oldNavbarInner.length > 0) {
                        for (i = 0; i < oldNavbarInner.length - 1; i++) {
                            if (!view.params.domCache) {
                                app.navbarRemoveCallback(view, pagesInView[i], navbar[0], oldNavbarInner[i]);
                                $(oldNavbarInner[i]).remove();
                            }
                            else
                                $(oldNavbarInner[i]).addClass('cached');
                        }
                        if (!newNavbarInner && oldNavbarInner.length === 1) {
                            if (!view.params.domCache) {
                                app.navbarRemoveCallback(view, pagesInView[0], navbar[0], oldNavbarInner[0]);
                                $(oldNavbarInner[0]).remove();
                            }
                            else
                                $(oldNavbarInner[0]).addClass('cached');
                        }
                        oldNavbarInner = navbar.find('.navbar-inner:not(.cached)');
                    }
                }
            }
            if (dynamicNavbar) {
                newNavbarInner.addClass(options.reload ? 'navbar-on-' + reloadPosition : 'navbar-on-right');
                if(view.params.domCache) newNavbarInner.removeClass('cached');
                newPage[0].f7RelatedNavbar = newNavbarInner[0];
                newNavbarInner[0].f7RelatedPage = newPage[0];
            }
        
            // save content areas into view's cache
            if (!url) {
                var newPageName = pageName || newPage.attr('data-page');
                if (isDynamicPage) url = '#' + app.params.dynamicPageUrl.replace(/{{name}}/g, newPageName).replace(/{{index}}/g, view.history.length - (options.reload ? 1 : 0));
                else url = '#' + newPageName;
                if (!view.params.domCache) {
                    view.contentCache[url] = content;
                }
                if (view.params.domCache && pageName) {
                    view.pagesCache[url] = pageName;
                }
            }
        
            // Push State
            if (app.params.pushState && !options.reloadPrevious && view.main)  {
                if (typeof pushState === 'undefined') pushState = true;
                var pushStateRoot = app.params.pushStateRoot || '';
                var method = options.reload ? 'replaceState' : 'pushState';
                if (pushState) {
                    if (!isDynamicPage && !pageName) {
                        history[method]({url: url, viewIndex: app.views.indexOf(view)}, '', pushStateRoot + app.params.pushStateSeparator + url);
                    }
                    else if (isDynamicPage && content) {
                        history[method]({content: typeof content === 'string' ? content : '', url: url, viewIndex: app.views.indexOf(view)}, '', pushStateRoot + app.params.pushStateSeparator + url);
                    }
                    else if (pageName) {
                        history[method]({pageName: pageName, url: url, viewIndex: app.views.indexOf(view)}, '', pushStateRoot + app.params.pushStateSeparator + url);
                    }
                }
            }
        
            // Update View history
            view.url = url;
            if (options.reload) {
                var lastUrl = view.history[view.history.length - (options.reloadPrevious ? 2 : 1)];
                if (lastUrl &&
                    lastUrl.indexOf('#') === 0 &&
                    lastUrl in view.contentCache &&
                    lastUrl !== url &&
                    view.history.indexOf(lastUrl) === -1) {
                    view.contentCache[lastUrl] = null;
                    delete view.contentCache[lastUrl];
                }
                view.history[view.history.length - (options.reloadPrevious ? 2 : 1)] = url;
            }
            else {
                view.history.push(url);
            }
        
            // Unique history
            var historyBecameUnique = false;
            if (view.params.uniqueHistory) {
                var _history = view.history;
                var _url = url;
                if (view.params.uniqueHistoryIgnoreGetParameters) {
                    _history = [];
                    _url = url.split('?')[0];
                    for (i = 0; i < view.history.length; i++) {
                        _history.push(view.history[i].split('?')[0]);
                    }
                }
        
                if (_history.indexOf(_url) !== _history.lastIndexOf(_url)) {
                    view.history = view.history.slice(0, _history.indexOf(_url));
                    view.history.push(url);
                    historyBecameUnique = true;
                }
            }
            // Dom manipulations
            if (options.reloadPrevious) {
                oldPage = oldPage.prev('.page');
                newPage.insertBefore(oldPage);
                if (dynamicNavbar) {
                    oldNavbarInner = oldNavbarInner.prev('.navbar-inner');
                    newNavbarInner.insertAfter(oldNavbarInner);
                }
            }
            else {
                pagesContainer.append(newPage[0]);
                if (dynamicNavbar) navbar.append(newNavbarInner[0]);
            }
            // Remove Old Page And Navbar
            if (options.reload) {
                if (view.params.domCache && view.initialPages.indexOf(oldPage[0]) >= 0) {
                    oldPage.addClass('cached');
                    if (dynamicNavbar) oldNavbarInner.addClass('cached');
                }
                else {
                    app.pageRemoveCallback(view, oldPage[0], reloadPosition);
                    if (dynamicNavbar) app.navbarRemoveCallback(view, oldPage[0], navbar[0], oldNavbarInner[0]);
                    oldPage.remove();
                    if (dynamicNavbar) oldNavbarInner.remove();
                }
            }
        
            // Page Init Events
            app.pageInitCallback(view, {
                pageContainer: newPage[0],
                url: url,
                position: options.reload ? reloadPosition : 'right',
                navbarInnerContainer: dynamicNavbar ? newNavbarInner && newNavbarInner[0] : undefined,
                oldNavbarInnerContainer: dynamicNavbar ? oldNavbarInner && oldNavbarInner[0] : undefined,
                context: t7_rendered.context,
                query: options.query,
                fromPage: oldPage && oldPage.length && oldPage[0].f7PageData,
                reload: options.reload,
                reloadPrevious: options.reloadPrevious
            });
        
            // Navbar init event
            if (dynamicNavbar) {
                app.navbarInitCallback(view, newPage[0], navbar[0], newNavbarInner[0], url, options.reload ? reloadPosition : 'right');
            }
        
            if (options.reload) {
                view.allowPageChange = true;
                if (historyBecameUnique) view.refreshPreviousPage();
                return;
            }
        
            if (dynamicNavbar && animatePages) {
                app.router.prepareNavbar(newNavbarInner, oldNavbarInner, 'right');
            }
            // Force reLayout
            var clientLeft = newPage[0].clientLeft;
        
            // Before Anim Callback
            app.pageAnimCallback('before', view, {
                pageContainer: newPage[0],
                url: url,
                position: 'right',
                oldPage: oldPage,
                newPage: newPage,
                query: options.query,
                fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
            });
        
            function afterAnimation() {
                view.allowPageChange = true;
                newPage.removeClass('page-from-right-to-center page-on-right page-on-left').addClass('page-on-center');
                oldPage.removeClass('page-from-center-to-left page-on-center page-on-right').addClass('page-on-left');
                if (dynamicNavbar) {
                    newNavbarInner.removeClass('navbar-from-right-to-center navbar-on-left navbar-on-right').addClass('navbar-on-center');
                    oldNavbarInner.removeClass('navbar-from-center-to-left navbar-on-center navbar-on-right').addClass('navbar-on-left');
                }
                app.pageAnimCallback('after', view, {
                    pageContainer: newPage[0],
                    url: url,
                    position: 'right',
                    oldPage: oldPage,
                    newPage: newPage,
                    query: options.query,
                    fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
                });
                if (app.params.pushState && view.main) app.pushStateClearQueue();
                if (!(view.params.swipeBackPage || view.params.preloadPreviousPage)) {
                    if (view.params.domCache) {
                        oldPage.addClass('cached');
                        if (dynamicNavbar) oldNavbarInner.addClass('cached');
                    }
                    else {
                        if (!(url.indexOf('#') === 0 && newPage.attr('data-page').indexOf('smart-select-') === 0)) {
                            app.pageRemoveCallback(view, oldPage[0], 'left');
                            if (dynamicNavbar) app.navbarRemoveCallback(view, oldPage[0], navbar[0], oldNavbarInner[0]);
                            oldPage.remove();
                            if (dynamicNavbar) oldNavbarInner.remove();
                        }
                    }
                }
                if (view.params.uniqueHistory && historyBecameUnique) {
                    view.refreshPreviousPage();
                }
            }
            if (animatePages) {
                // Set pages before animation
                if (app.params.material && app.params.materialPageLoadDelay) {
                    setTimeout(function () {
                        app.router.animatePages(oldPage, newPage, 'to-left', view);
                    }, app.params.materialPageLoadDelay);
                }
                else {
                    app.router.animatePages(oldPage, newPage, 'to-left', view);
                }
        
                // Dynamic navbar animation
                if (dynamicNavbar) {
                    setTimeout(function() {
                        app.router.animateNavbars(oldNavbarInner, newNavbarInner, 'to-left', view);
                    }, 0);
                }
                newPage.animationEnd(function (e) {
                    afterAnimation();
                });
            }
            else {
                if (dynamicNavbar) newNavbarInner.find('.sliding, .sliding .back .icon').transform('');
                afterAnimation();
            }
        
        };
        
        app.router.load = function (view, options) {
            if (app.router.preroute(view, options)) {
                return false;
            }
            options = options || {};
            var url = options.url;
            var content = options.content;
            var pageName = options.pageName;
            if (pageName) {
                if (pageName.indexOf('?') > 0) {
                    options.query = $.parseUrlQuery(pageName);
                    options.pageName = pageName = pageName.split('?')[0];
                }
            }
            var template = options.template;
            if (view.params.reloadPages === true) options.reload = true;
        
            if (!view.allowPageChange) return false;
            if (url && view.url === url && !options.reload && !view.params.allowDuplicateUrls) return false;
            view.allowPageChange = false;
            if (app.xhr && view.xhr && view.xhr === app.xhr) {
                app.xhr.abort();
                app.xhr = false;
            }
            function proceed(content) {
                app.router.preprocess(view, content, url, function (content) {
                    options.content = content;
                    app.router._load(view, options);
                });
            }
            if (content || pageName) {
                proceed(content);
                return;
            }
            else if (template) {
                app.router._load(view, options);
                return;
            }
        
            if (!options.url || options.url === '#') {
                view.allowPageChange = true;
                return;
            }
            app.get(options.url, view, options.ignoreCache, function (content, error) {
                if (error) {
                    view.allowPageChange = true;
                    return;
                }
                proceed(content);
            });
        };
        
        app.router._back = function (view, options) {
            options = options || {};
            var url = options.url,
                content = options.content,
                t7_rendered = {content: options.content}, // will be rendered using Template7
                template = options.template, // Template 7 compiled template
                animatePages = options.animatePages,
                preloadOnly = options.preloadOnly,
                pushState = options.pushState,
                ignoreCache = options.ignoreCache,
                force = options.force,
                pageName = options.pageName;
        
            var viewContainer = $(view.container),
                pagesContainer = $(view.pagesContainer),
                pagesInView = pagesContainer.children('.page:not(.cached)'),
                oldPage, newPage, oldNavbarInner, newNavbarInner, navbar, navbarInners, dynamicNavbar, manipulateDom = true;
        
            if (typeof animatePages === 'undefined') animatePages = view.params.animatePages;
        
            app.pluginHook('routerBack', view, options);
        
            // Render with Template7
            if (app.params.template7Pages && typeof content === 'string' || template) {
                t7_rendered = app.router.template7Render(view, options);
                if (t7_rendered.content && !content) {
                    content = t7_rendered.content;
                }
            }
        
            // Animation
            function afterAnimation() {
                app.pageBackCallback('after', view, {
                    pageContainer: oldPage[0],
                    url: url,
                    position: 'center',
                    oldPage: oldPage,
                    newPage: newPage,
                });
                app.pageAnimCallback('after', view, {
                    pageContainer: newPage[0],
                    url: url,
                    position: 'left',
                    oldPage: oldPage,
                    newPage: newPage,
                    query: options.query,
                    fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
                });
                app.router.afterBack(view, oldPage[0], newPage[0]);
            }
            function animateBack() {
                // Page before animation callback
                app.pageBackCallback('before', view, {
                    pageContainer: oldPage[0],
                    url: url,
                    position: 'center',
                    oldPage: oldPage,
                    newPage: newPage,
                });
                app.pageAnimCallback('before', view, {
                    pageContainer: newPage[0],
                    url: url,
                    position: 'left',
                    oldPage: oldPage,
                    newPage: newPage,
                    query: options.query,
                    fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
                });
        
                if (animatePages) {
                    // Set pages before animation
                    app.router.animatePages(newPage, oldPage, 'to-right', view);
        
                    // Dynamic navbar animation
                    if (dynamicNavbar) {
                        setTimeout(function () {
                            app.router.animateNavbars(newNavbarInner, oldNavbarInner, 'to-right', view);
                        }, 0);
                    }
        
                    newPage.animationEnd(function () {
                        afterAnimation();
                    });
                }
                else {
                    if (dynamicNavbar) newNavbarInner.find('.sliding, .sliding .back .icon').transform('');
                    afterAnimation();
                }
            }
        
            function parseNewPage() {
                app.router.temporaryDom.innerHTML = '';
                // Parse DOM
                if ((typeof content === 'string') || (url && (typeof content === 'string'))) {
                    app.router.temporaryDom.innerHTML = t7_rendered.content;
                } else {
                    if ('length' in content && content.length > 1) {
                        for (var ci = 0; ci < content.length; ci++) {
                            $(app.router.temporaryDom).append(content[ci]);
                        }
                    } else {
                        $(app.router.temporaryDom).append(content);
                    }
                }
                newPage = app.router.findElement('.page', app.router.temporaryDom, view);
        
                if (view.params.dynamicNavbar) {
                    // Find navbar
                    newNavbarInner = app.router.findElement('.navbar-inner', app.router.temporaryDom, view);
                }
            }
            function setPages() {
                // If pages not found or there are still more than one, exit
                if (!newPage || newPage.length === 0) {
                    view.allowPageChange = true;
                    return;
                }
                if (view.params.dynamicNavbar && typeof dynamicNavbar === 'undefined') {
                    if (!newNavbarInner || newNavbarInner.length === 0) {
                        dynamicNavbar = false;
                    }
                    else {
                        dynamicNavbar = true;
                    }
                }
        
                newPage.addClass('page-on-left').removeClass('cached');
                if (dynamicNavbar) {
                    navbar = viewContainer.find('.navbar');
                    navbarInners = viewContainer.find('.navbar-inner:not(.cached)');
                    newNavbarInner.addClass('navbar-on-left').removeClass('cached');
                }
                // Remove/hide previous page in force mode
                if (force) {
                    var pageToRemove, navbarToRemove;
                    pageToRemove = $(pagesInView[pagesInView.length - 2]);
        
                    if (dynamicNavbar) navbarToRemove = $(pageToRemove[0] && pageToRemove[0].f7RelatedNavbar || navbarInners[navbarInners.length - 2]);
                    if (view.params.domCache && view.initialPages.indexOf(pageToRemove[0]) >= 0) {
                        if (pageToRemove.length && pageToRemove[0] !== newPage[0]) pageToRemove.addClass('cached');
                        if (dynamicNavbar && navbarToRemove.length && navbarToRemove[0] !== newNavbarInner[0]) {
                            navbarToRemove.addClass('cached');
                        }
                    }
                    else {
                        var removeNavbar = dynamicNavbar && navbarToRemove.length;
                        if (pageToRemove.length) {
                            app.pageRemoveCallback(view, pageToRemove[0], 'right');
                            if (removeNavbar) {
                                app.navbarRemoveCallback(view, pageToRemove[0], navbar[0], navbarToRemove[0]);
                            }
                            pageToRemove.remove();
                            if (removeNavbar) navbarToRemove.remove();
                        }
                        else if (removeNavbar) {
                            app.navbarRemoveCallback(view, pageToRemove[0], navbar[0], navbarToRemove[0]);
                            navbarToRemove.remove();
                        }
                    }
                    pagesInView = pagesContainer.children('.page:not(.cached)');
                    if (dynamicNavbar) {
                        navbarInners = viewContainer.find('.navbar-inner:not(.cached)');
                    }
                    if (view.history.indexOf(url) >= 0) {
                        view.history = view.history.slice(0, view.history.indexOf(url) + 2);
                    }
                    else {
                        if (view.history[[view.history.length - 2]]) {
                            view.history[view.history.length - 2] = url;
                        }
                        else {
                            view.history.unshift(url);
                        }
                    }
                }
        
                oldPage = $(pagesInView[pagesInView.length - 1]);
                if (view.params.domCache) {
                    if (oldPage[0] === newPage[0]) {
                        oldPage = pagesContainer.children('.page.page-on-center');
                        if (oldPage.length === 0 && view.activePage) oldPage = $(view.activePage.container);
                    }
                }
        
                if (dynamicNavbar && !oldNavbarInner) {
                    oldNavbarInner = $(navbarInners[navbarInners.length - 1]);
                    if (view.params.domCache) {
                        if (oldNavbarInner[0] === newNavbarInner[0]) {
                            oldNavbarInner = navbar.children('.navbar-inner.navbar-on-center:not(.cached)');
                        }
                        if (oldNavbarInner.length === 0) {
                            oldNavbarInner = navbar.children('.navbar-inner[data-page="'+oldPage.attr('data-page')+'"]');
                        }
                    }
                    if (oldNavbarInner.length === 0 || newNavbarInner[0] === oldNavbarInner[0]) dynamicNavbar = false;
                }
        
                if (dynamicNavbar) {
                    if (manipulateDom) newNavbarInner.insertBefore(oldNavbarInner);
                    newNavbarInner[0].f7RelatedPage = newPage[0];
                    newPage[0].f7RelatedNavbar = newNavbarInner[0];
                }
                if (manipulateDom) newPage.insertBefore(oldPage);
        
                // Page Init Events
                app.pageInitCallback(view, {
                    pageContainer: newPage[0],
                    url: url,
                    position: 'left',
                    navbarInnerContainer: dynamicNavbar ? newNavbarInner[0] : undefined,
                    oldNavbarInnerContainer: dynamicNavbar ? oldNavbarInner && oldNavbarInner[0] : undefined,
                    context: t7_rendered.context,
                    query: options.query,
                    fromPage: oldPage && oldPage.length && oldPage[0].f7PageData,
                    preloadOnly: preloadOnly
                });
                if (dynamicNavbar) {
                    app.navbarInitCallback(view, newPage[0], navbar[0], newNavbarInner[0], url, 'right');
                }
        
                if (dynamicNavbar && newNavbarInner.hasClass('navbar-on-left') && animatePages) {
                    app.router.prepareNavbar(newNavbarInner,  oldNavbarInner, 'left');
                }
        
                if (preloadOnly) {
                    view.allowPageChange = true;
                    return;
                }
        
                // Update View's URL
                view.url = url;
        
                // Force reLayout
                var clientLeft = newPage[0].clientLeft;
        
                animateBack();
        
                // Push state
                if (app.params.pushState && view.main)  {
                    if (typeof pushState === 'undefined') pushState = true;
                    if (!preloadOnly && history.state && pushState) {
                        history.back();
                    }
                }
                return;
            }
        
            // Simple go back when we have pages on left
            if (pagesInView.length > 1 && !force) {
                // Exit if only preloadOnly
                if (preloadOnly) {
                    view.allowPageChange = true;
                    return;
                }
                // Update View's URL
                view.url = view.history[view.history.length - 2];
                url = view.url;
        
                // Define old and new pages
                newPage = $(pagesInView[pagesInView.length - 2]);
                oldPage = $(pagesInView[pagesInView.length - 1]);
        
                // Dynamic navbar
                if (view.params.dynamicNavbar) {
                    dynamicNavbar = true;
                    // Find navbar
                    navbarInners = viewContainer.find('.navbar-inner:not(.cached)');
                    newNavbarInner = $(navbarInners[0]);
                    oldNavbarInner = $(navbarInners[1]);
                    if (newNavbarInner.length === 0 || oldNavbarInner.length === 0 || oldNavbarInner[0] === newNavbarInner[0]) {
                        dynamicNavbar = false;
                    }
                }
                manipulateDom = false;
                setPages();
                return;
            }
        
            if (!force) {
                // Go back when there is no pages on left
                if (!preloadOnly) {
                    view.url = view.history[view.history.length - 2];
                    url = view.url;
                }
        
                if (content) {
                    parseNewPage();
                    setPages();
                    return;
                }
                else if (pageName) {
                    // Get dom cached pages
                    newPage = $(viewContainer).find('.page[data-page="' + pageName + '"]');
                    if (view.params.dynamicNavbar) {
                        newNavbarInner = $(viewContainer).find('.navbar-inner[data-page="' + pageName + '"]');
                        if (newNavbarInner.length === 0 && newPage[0].f7RelatedNavbar) {
                            newNavbarInner = $(newPage[0].f7RelatedNavbar);
                        }
                        if (newNavbarInner.length === 0 && newPage[0].f7PageData) {
                            newNavbarInner = $(newPage[0].f7PageData.navbarInnerContainer);
                        }
                    }
                    setPages();
                    return;
                }
                else {
                    view.allowPageChange = true;
                    return;
                }
            }
            else {
                if (url && url === view.url || pageName && view.activePage && view.activePage.name === pageName) {
                    view.allowPageChange = true;
                    return;
                }
                // Go back with force url
                if (content) {
                    parseNewPage();
                    setPages();
                    return;
                }
                else if (pageName && view.params.domCache) {
                    if (pageName) url = '#' + pageName;
        
                    newPage = $(viewContainer).find('.page[data-page="' + pageName + '"]');
                    if (newPage[0].f7PageData && newPage[0].f7PageData.url) {
                        url = newPage[0].f7PageData.url;
                    }
                    if (view.params.dynamicNavbar) {
                        newNavbarInner = $(viewContainer).find('.navbar-inner[data-page="' + pageName + '"]');
                        if (newNavbarInner.length === 0 && newPage[0].f7RelatedNavbar) {
                            newNavbarInner = $(newPage[0].f7RelatedNavbar);
                        }
                        if (newNavbarInner.length === 0 && newPage[0].f7PageData) {
                            newNavbarInner = $(newPage[0].f7PageData.navbarInnerContainer);
                        }
                    }
                    setPages();
                    return;
                }
                else {
                    view.allowPageChange = true;
                    return;
                }
            }
        
        };
        app.router.back = function (view, options) {
            if (app.router.preroute(view, options)) {
                return false;
            }
            options = options || {};
            var url = options.url;
            var content = options.content;
            var pageName = options.pageName;
            if (pageName) {
                if (pageName.indexOf('?') > 0) {
                    options.query = $.parseUrlQuery(pageName);
                    options.pageName = pageName = pageName.split('?')[0];
                }
            }
            var force = options.force;
            if (!view.allowPageChange) return false;
            view.allowPageChange = false;
            if (app.xhr && view.xhr && view.xhr === app.xhr) {
                app.xhr.abort();
                app.xhr = false;
            }
            var pagesInView = $(view.pagesContainer).find('.page:not(.cached)');
        
            function proceed(content) {
                app.router.preprocess(view, content, url, function (content) {
                    options.content = content;
                    app.router._back(view, options);
                });
            }
            if (pagesInView.length > 1 && !force) {
                // Simple go back to previos page in view
                app.router._back(view, options);
                return;
            }
            if (!force) {
                url = options.url = view.history[view.history.length - 2];
                if (!url) {
                    view.allowPageChange = true;
                    return;
                }
                if (url.indexOf('#') === 0 && view.contentCache[url]) {
                    proceed(view.contentCache[url]);
                    return;
                }
                else if (url.indexOf('#') === 0 && view.params.domCache) {
                    if (!pageName) options.pageName = url.split('#')[1];
                    proceed();
                    return;
                }
                else if (url.indexOf('#') !== 0) {
                    // Load ajax page
                    app.get(options.url, view, options.ignoreCache, function (content, error) {
                        if (error) {
                            view.allowPageChange = true;
                            return;
                        }
                        proceed(content);
                    });
                    return;
                }
            }
            else {
                // Go back with force url
                if (!url && content) {
                    proceed(content);
                    return;
                }
                else if (!url && pageName) {
                    if (pageName) url = '#' + pageName;
                    proceed();
                    return;
                }
                else if (url) {
                    app.get(options.url, view, options.ignoreCache, function (content, error) {
                        if (error) {
                            view.allowPageChange = true;
                            return;
                        }
                        proceed(content);
                    });
                    return;
                }
            }
            view.allowPageChange = true;
            return;
        };
        
        app.router.afterBack = function (view, oldPage, newPage) {
            // Remove old page and set classes on new one
            oldPage = $(oldPage);
            newPage = $(newPage);
        
            if (view.params.domCache && view.initialPages.indexOf(oldPage[0]) >= 0) {
                oldPage.removeClass('page-from-center-to-right').addClass('cached');
            }
            else {
                app.pageRemoveCallback(view, oldPage[0], 'right');
                oldPage.remove();
            }
        
            newPage.removeClass('page-from-left-to-center page-on-left').addClass('page-on-center');
            view.allowPageChange = true;
        
            // Update View's History
            var previousURL = view.history.pop();
        
            var newNavbar;
        
            // Updated dynamic navbar
            if (view.params.dynamicNavbar) {
                var inners = $(view.container).find('.navbar-inner:not(.cached)');
                var oldNavbar = $(oldPage[0].f7RelatedNavbar || inners[1]);
                if (view.params.domCache && view.initialNavbars.indexOf(oldNavbar[0]) >= 0) {
                    oldNavbar.removeClass('navbar-from-center-to-right').addClass('cached');
                }
                else {
                    app.navbarRemoveCallback(view, oldPage[0], undefined, oldNavbar[0]);
                    oldNavbar.remove();
                }
                newNavbar = $(inners[0]).removeClass('navbar-on-left navbar-from-left-to-center').addClass('navbar-on-center');
            }
        
            // Remove pages in dom cache
            if (view.params.domCache) {
                $(view.container).find('.page.cached').each(function () {
                    var page = $(this);
                    var index = page.index();
                    var pageUrl = page[0].f7PageData && page[0].f7PageData.url;
                    if (pageUrl && view.history.indexOf(pageUrl) < 0 && view.initialPages.indexOf(this) < 0) {
                        app.pageRemoveCallback(view, page[0], 'right');
                        if (page[0].f7RelatedNavbar && view.params.dynamicNavbar) app.navbarRemoveCallback(view, page[0], undefined, page[0].f7RelatedNavbar);
                        page.remove();
                        if (page[0].f7RelatedNavbar && view.params.dynamicNavbar) $(page[0].f7RelatedNavbar).remove();
                    }
                });
            }
        
            // Check previous page is content based only and remove it from content cache
            if (!view.params.domCache &&
                previousURL &&
                previousURL.indexOf('#') > -1 &&
                (previousURL in view.contentCache) &&
                // If the same page is in the history multiple times, don't remove it.
                view.history.indexOf(previousURL) === -1) {
                view.contentCache[previousURL] = null;
                delete view.contentCache[previousURL];
            }
        
            if (app.params.pushState && view.main) app.pushStateClearQueue();
        
            // Preload previous page
            if (view.params.preloadPreviousPage) {
                if (view.params.domCache && view.history.length > 1) {
                    var preloadUrl = view.history[view.history.length - 2];
                    var previousPage;
                    var previousNavbar;
                    if (preloadUrl && view.pagesCache[preloadUrl]) {
                        // Load by page name
                        previousPage = $(view.container).find('.page[data-page="' + view.pagesCache[preloadUrl] + '"]');
                        if (previousPage.next('.page')[0] !== newPage[0]) previousPage.insertBefore(newPage);
                        if (newNavbar) {
                            previousNavbar = $(view.container).find('.navbar-inner[data-page="' + view.pagesCache[preloadUrl] + '"]');
                            if(!previousNavbar || previousNavbar.length === 0) previousNavbar = newNavbar.prev('.navbar-inner.cached');
                            if (previousNavbar.next('.navbar-inner')[0] !== newNavbar[0]) previousNavbar.insertBefore(newNavbar);
                        }
                    }
                    else {
                        // Just load previous page
                        previousPage = newPage.prev('.page.cached');
                        if (newNavbar) previousNavbar = newNavbar.prev('.navbar-inner.cached');
                    }
                    if (previousPage && previousPage.length > 0) previousPage.removeClass('cached page-on-right page-on-center').addClass('page-on-left');
                    if (previousNavbar && previousNavbar.length > 0) previousNavbar.removeClass('cached navbar-on-right navbar-on-center').addClass('navbar-on-left');
                }
                else {
                    app.router.back(view, {preloadOnly: true});
                }
            }
        };
        

        /*===============================================================================
        ************   Handle clicks and make them fast (on tap);   ************
        ===============================================================================*/
        app.initClickEvents = function () {
            function handleScrollTop(e) {
                /*jshint validthis:true */
                var clicked = $(this);
                var target = $(e.target);
                var isLink = clicked[0].nodeName.toLowerCase() === 'a' ||
                             clicked.parents('a').length > 0 ||
                             target[0].nodeName.toLowerCase() === 'a' ||
                             target.parents('a').length > 0;
        
                if (isLink) return;
                var pageContent, page;
                if (app.params.scrollTopOnNavbarClick && clicked.is('.navbar .center')) {
                    // Find active page
                    var navbar = clicked.parents('.navbar');
        
                    // Static Layout
                    pageContent = navbar.parents('.page-content');
        
                    if (pageContent.length === 0) {
                        // Fixed Layout
                        if (navbar.parents('.page').length > 0) {
                            pageContent = navbar.parents('.page').find('.page-content');
                        }
                        // Through Layout
                        if (pageContent.length === 0) {
                            if (navbar.nextAll('.pages').length > 0) {
                                pageContent = navbar.nextAll('.pages').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                            }
                        }
                    }
                }
                if (app.params.scrollTopOnStatusbarClick && clicked.is('.statusbar-overlay')) {
                    if ($('.popup.modal-in').length > 0) {
                        // Check for opened popup
                        pageContent = $('.popup.modal-in').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                    else if ($('.panel.active').length > 0) {
                        // Check for opened panel
                        pageContent = $('.panel.active').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                    else if ($('.views > .view.active').length > 0) {
                        // View in tab bar app layout
                        pageContent = $('.views > .view.active').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                    else {
                        // Usual case
                        pageContent = $('.views').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                }
        
                if (pageContent && pageContent.length > 0) {
                    // Check for tab
                    if (pageContent.hasClass('tab')) {
                        pageContent = pageContent.parent('.tabs').children('.page-content.active');
                    }
                    if (pageContent.length > 0) pageContent.scrollTop(0, 300);
                }
            }
            function handleClicks(e) {
                /*jshint validthis:true */
                var clicked = $(this);
                var url = clicked.attr('href');
                var isLink = clicked[0].nodeName.toLowerCase() === 'a';
        
                // Check if link is external
                if (isLink) {
                    if (clicked.is(app.params.externalLinks) || (url && url.indexOf('javascript:') >= 0)) {
                        if(url && clicked.attr('target') === '_system') {
                            e.preventDefault();
                            window.open(url, '_system');
                        }
                        return;
                    }
                }
        
                // Collect Clicked data- attributes
                var clickedData = clicked.dataset();
        
                // Smart Select
                if (clicked.hasClass('smart-select')) {
                    if (app.smartSelectOpen) app.smartSelectOpen(clicked);
                }
        
                // Open Panel
                if (clicked.hasClass('open-panel')) {
                    if ($('.panel').length === 1) {
                        if ($('.panel').hasClass('panel-left')) app.openPanel('left');
                        else app.openPanel('right');
                    }
                    else {
                        if (clickedData.panel === 'right') app.openPanel('right');
                        else app.openPanel('left');
                    }
                }
                // Close Panel
                if (clicked.hasClass('close-panel')) {
                    app.closePanel();
                }
        
                if (clicked.hasClass('panel-overlay') && app.params.panelsCloseByOutside) {
                    app.closePanel();
                }
                // Popover
                if (clicked.hasClass('open-popover')) {
                    var popover;
                    if (clickedData.popover) {
                        popover = clickedData.popover;
                    }
                    else popover = '.popover';
                    app.popover(popover, clicked);
                }
                if (clicked.hasClass('close-popover')) {
                    app.closeModal('.popover.modal-in');
                }
                // Popup
                var popup;
                if (clicked.hasClass('open-popup')) {
                    if (clickedData.popup) {
                        popup = clickedData.popup;
                    }
                    else popup = '.popup';
                    app.popup(popup);
                }
                if (clicked.hasClass('close-popup')) {
                    if (clickedData.popup) {
                        popup = clickedData.popup;
                    }
                    else popup = '.popup.modal-in';
                    app.closeModal(popup);
                }
                // Login Screen
                var loginScreen;
                if (clicked.hasClass('open-login-screen')) {
                    if (clickedData.loginScreen) {
                        loginScreen = clickedData.loginScreen;
                    }
                    else loginScreen = '.login-screen';
                    app.loginScreen(loginScreen);
                }
                if (clicked.hasClass('close-login-screen')) {
                    app.closeModal('.login-screen.modal-in');
                }
                // Close Modal
                if (clicked.hasClass('modal-overlay')) {
                    if ($('.modal.modal-in').length > 0 && app.params.modalCloseByOutside)
                        app.closeModal('.modal.modal-in');
                    if ($('.actions-modal.modal-in').length > 0 && app.params.actionsCloseByOutside)
                        app.closeModal('.actions-modal.modal-in');
        
                    if ($('.popover.modal-in').length > 0) app.closeModal('.popover.modal-in');
                }
                if (clicked.hasClass('popup-overlay')) {
                    if ($('.popup.modal-in').length > 0 && app.params.popupCloseByOutside)
                        app.closeModal('.popup.modal-in');
                }
                if (clicked.hasClass('picker-modal-overlay')) {
                    if ($('.picker-modal.modal-in').length > 0)
                        app.closeModal('.picker-modal.modal-in');
                }
        
                // Picker
                if (clicked.hasClass('close-picker')) {
                    var pickerToClose = $('.picker-modal.modal-in');
                    if (pickerToClose.length > 0) {
                        app.closeModal(pickerToClose);
                    }
                    else {
                        pickerToClose = $('.popover.modal-in .picker-modal');
                        if (pickerToClose.length > 0) {
                            app.closeModal(pickerToClose.parents('.popover'));
                        }
                    }
                }
                if (clicked.hasClass('open-picker')) {
                    var pickerToOpen;
                    if (clickedData.picker) {
                        pickerToOpen = clickedData.picker;
                    }
                    else pickerToOpen = '.picker-modal';
                    app.pickerModal(pickerToOpen, clicked);
                }
        
                // Tabs
                var isTabLink;
                if (clicked.hasClass('tab-link')) {
                    isTabLink = true;
                    app.showTab(clickedData.tab || clicked.attr('href'), clicked);
                }
                // Swipeout Close
                if (clicked.hasClass('swipeout-close')) {
                    app.swipeoutClose(clicked.parents('.swipeout-opened'));
                }
                // Swipeout Delete
                if (clicked.hasClass('swipeout-delete')) {
                    if (clickedData.confirm) {
                        var text = clickedData.confirm;
                        var title = clickedData.confirmTitle;
                        if (title) {
                            app.confirm(text, title, function () {
                                app.swipeoutDelete(clicked.parents('.swipeout'));
                            }, function () {
                                if (clickedData.closeOnCancel) app.swipeoutClose(clicked.parents('.swipeout'));
                            });
                        }
                        else {
                            app.confirm(text, function () {
                                app.swipeoutDelete(clicked.parents('.swipeout'));
                            }, function () {
                                if (clickedData.closeOnCancel) app.swipeoutClose(clicked.parents('.swipeout'));
                            });
                        }
                    }
                    else {
                        app.swipeoutDelete(clicked.parents('.swipeout'));
                    }
        
                }
                // Sortable
                if (clicked.hasClass('toggle-sortable')) {
                    app.sortableToggle(clickedData.sortable);
                }
                if (clicked.hasClass('open-sortable')) {
                    app.sortableOpen(clickedData.sortable);
                }
                if (clicked.hasClass('close-sortable')) {
                    app.sortableClose(clickedData.sortable);
                }
                // Accordion
                if (clicked.hasClass('accordion-item-toggle') || (clicked.hasClass('item-link') && clicked.parent().hasClass('accordion-item'))) {
                    var accordionItem = clicked.parent('.accordion-item');
                    if (accordionItem.length === 0) accordionItem = clicked.parents('.accordion-item');
                    if (accordionItem.length === 0) accordionItem = clicked.parents('li');
                    app.accordionToggle(accordionItem);
                }
        
                // Speed Dial
                if (app.params.material) {
                    if (clicked.hasClass('floating-button') && clicked.parent().hasClass('speed-dial')) {
                        clicked.parent().toggleClass('speed-dial-opened');
                    }
                    if (clicked.hasClass('close-speed-dial')) {
                        $('.speed-dial-opened').removeClass('speed-dial-opened');
                    }
                }
        
                // Load Page
                if (app.params.ajaxLinks && !clicked.is(app.params.ajaxLinks) || !isLink || !app.params.router) {
                    return;
                }
                if (isLink) {
                    e.preventDefault();
                }
        
                var validUrl = url && url.length > 0 && url !== '#' && !isTabLink;
                var template = clickedData.template;
                if (validUrl || clicked.hasClass('back') || template) {
                    var view;
                    if (clickedData.view) {
                        view = $(clickedData.view)[0].f7View;
                    }
                    else {
                        view = clicked.parents('.' + app.params.viewClass)[0] && clicked.parents('.' + app.params.viewClass)[0].f7View;
                        if (view && view.params.linksView) {
                            if (typeof view.params.linksView === 'string') view = $(view.params.linksView)[0].f7View;
                            else if (view.params.linksView instanceof View) view = view.params.linksView;
                        }
                    }
                    if (!view) {
                        if (app.mainView) view = app.mainView;
                    }
                    if (!view) return;
        
                    var pageName;
                    if (!template) {
                        if (url.indexOf('#') === 0 && url !== '#')  {
                            if (view.params.domCache) {
                                pageName = url.split('#')[1];
                            }
                            else return;
                        }
                        if (url === '#' && !clicked.hasClass('back')) return;
                    }
                    else {
                        url = undefined;
                    }
        
                    var animatePages;
                    if (typeof clickedData.animatePages !== 'undefined') {
                        animatePages = clickedData.animatePages;
                    }
                    else {
                        if (clicked.hasClass('with-animation')) animatePages = true;
                        if (clicked.hasClass('no-animation')) animatePages = false;
                    }
        
                    var options = {
                        animatePages: animatePages,
                        ignoreCache: clickedData.ignoreCache,
                        force: clickedData.force,
                        reload: clickedData.reload,
                        reloadPrevious: clickedData.reloadPrevious,
                        pageName: pageName,
                        pushState: clickedData.pushState,
                        url: url
                    };
        
                    if (app.params.template7Pages) {
                        options.contextName = clickedData.contextName;
                        var context = clickedData.context;
                        if (context) {
                            options.context = JSON.parse(context);
                        }
                    }
                    if (template && template in t7.templates) {
                        options.template = t7.templates[template];
                    }
        
                    if (clicked.hasClass('back')) view.router.back(options);
                    else view.router.load(options);
                }
            }
            $(document).on('click', 'a, .open-panel, .close-panel, .panel-overlay, .modal-overlay, .popup-overlay, .swipeout-delete, .swipeout-close, .close-popup, .open-popup, .open-popover, .open-login-screen, .close-login-screen .smart-select, .toggle-sortable, .open-sortable, .close-sortable, .accordion-item-toggle, .close-picker, .picker-modal-overlay', handleClicks);
            if (app.params.scrollTopOnNavbarClick || app.params.scrollTopOnStatusbarClick) {
                $(document).on('click', '.statusbar-overlay, .navbar .center', handleScrollTop);
            }
        
            // Prevent scrolling on overlays
            function preventScrolling(e) {
                e.preventDefault();
            }
            if (app.support.touch && !app.device.android) {
                $(document).on((app.params.fastClicks ? 'touchstart' : 'touchmove'), '.panel-overlay, .modal-overlay, .preloader-indicator-overlay, .popup-overlay, .searchbar-overlay', preventScrolling);
            }
        };
        

        /*======================================================
        ************   App Resize Actions   ************
        ======================================================*/
        // Prevent iPad horizontal body scrolling when soft keyboard is opened
        function _fixIpadBodyScrolLeft() {
            if (app.device.ipad) {
                document.body.scrollLeft = 0;
                setTimeout(function () {
                    document.body.scrollLeft = 0;
                }, 0);
            }
        }
        app.initResize = function () {
            $(window).on('resize', app.resize);
            $(window).on('orientationchange', app.orientationchange);
        };
        app.resize = function () {
            if (app.sizeNavbars) app.sizeNavbars();
            _fixIpadBodyScrolLeft();
            
        };
        app.orientationchange = function () {
            if (app.device && app.device.minimalUi) {
                if (window.orientation === 90 || window.orientation === -90) document.body.scrollTop = 0;
            }
            _fixIpadBodyScrolLeft();
        };
        

        /*======================================================
        ************   Panels   ************
        ======================================================*/
        app.allowPanelOpen = true;
        app.openPanel = function (panelPosition) {
            if (!app.allowPanelOpen) return false;
            var panel = $('.panel-' + panelPosition);
            if (panel.length === 0 || panel.hasClass('active')) return false;
            app.closePanel(); // Close if some panel is opened
            app.allowPanelOpen = false;
            var effect = panel.hasClass('panel-reveal') ? 'reveal' : 'cover';
            panel.css({display: 'block'}).addClass('active');
            panel.trigger('open');
            if (app.params.material) {
                $('.panel-overlay').show();
            }
            if (panel.find('.' + app.params.viewClass).length > 0) {
                if (app.sizeNavbars) app.sizeNavbars(panel.find('.' + app.params.viewClass)[0]);
            }
        
            // Trigger reLayout
            var clientLeft = panel[0].clientLeft;
            
            // Transition End;
            var transitionEndTarget = effect === 'reveal' ? $('.' + app.params.viewsClass) : panel;
            var openedTriggered = false;
            
            function panelTransitionEnd() {
                transitionEndTarget.transitionEnd(function (e) {
                    if ($(e.target).is(transitionEndTarget)) {
                        if (panel.hasClass('active')) {
                            panel.trigger('opened');
                        }
                        else {
                            panel.trigger('closed');
                        }
                        if (app.params.material) $('.panel-overlay').css({display: ''});
                        app.allowPanelOpen = true;
                    }
                    else panelTransitionEnd();
                });
            }
            panelTransitionEnd();
        
            $('body').addClass('with-panel-' + panelPosition + '-' + effect);
            return true;
        };
        app.closePanel = function () {
            var activePanel = $('.panel.active');
            if (activePanel.length === 0) return false;
            var effect = activePanel.hasClass('panel-reveal') ? 'reveal' : 'cover';
            var panelPosition = activePanel.hasClass('panel-left') ? 'left' : 'right';
            activePanel.removeClass('active');
            var transitionEndTarget = effect === 'reveal' ? $('.' + app.params.viewsClass) : activePanel;
            activePanel.trigger('close');
            app.allowPanelOpen = false;
        
            transitionEndTarget.transitionEnd(function () {
                if (activePanel.hasClass('active')) return;
                activePanel.css({display: ''});
                activePanel.trigger('closed');
                $('body').removeClass('panel-closing');
                app.allowPanelOpen = true;
            });
        
            $('body').addClass('panel-closing').removeClass('with-panel-' + panelPosition + '-' + effect);
        };
        /*======================================================
        ************   Swipe panels   ************
        ======================================================*/
        app.initSwipePanels = function () {
            var panel, side;
            if (app.params.swipePanel) {
                panel = $('.panel.panel-' + app.params.swipePanel);
                side = app.params.swipePanel;
                if (panel.length === 0) return;
            }
            else {
                if (app.params.swipePanelOnlyClose) {
                    if ($('.panel').length === 0) return;
                }
                else return;
            }
            
            var panelOverlay = $('.panel-overlay');
            var isTouched, isMoved, isScrolling, touchesStart = {}, touchStartTime, touchesDiff, translate, overlayOpacity, opened, panelWidth, effect, direction;
            var views = $('.' + app.params.viewsClass);
        
            function handleTouchStart(e) {
                if (!app.allowPanelOpen || (!app.params.swipePanel && !app.params.swipePanelOnlyClose) || isTouched) return;
                if ($('.modal-in, .photo-browser-in').length > 0) return;
                if (!(app.params.swipePanelCloseOpposite || app.params.swipePanelOnlyClose)) {
                    if ($('.panel.active').length > 0 && !panel.hasClass('active')) return;
                }
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                if (app.params.swipePanelCloseOpposite || app.params.swipePanelOnlyClose) {
                    if ($('.panel.active').length > 0) {
                        side = $('.panel.active').hasClass('panel-left') ? 'left' : 'right';
                    }
                    else {
                        if (app.params.swipePanelOnlyClose) return;
                        side = app.params.swipePanel;
                    }
                    if (!side) return;
                }
                panel = $('.panel.panel-' + side);
                opened = panel.hasClass('active');
                if (app.params.swipePanelActiveArea && !opened) {
                    if (side === 'left') {
                        if (touchesStart.x > app.params.swipePanelActiveArea) return;
                    }
                    if (side === 'right') {
                        if (touchesStart.x < window.innerWidth - app.params.swipePanelActiveArea) return;
                    }
                }
                isMoved = false;
                isTouched = true;
                isScrolling = undefined;
                
                touchStartTime = (new Date()).getTime();
                direction = undefined;
            }
            function handleTouchMove(e) {
                if (!isTouched) return;
                if (e.f7PreventPanelSwipe) return;
                var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                if (typeof isScrolling === 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
                }
                if (isScrolling) {
                    isTouched = false;
                    return;
                }
                if (!direction) {
                    if (pageX > touchesStart.x) {
                        direction = 'to-right';
                    }
                    else {
                        direction = 'to-left';
                    }
        
                    if (
                        side === 'left' &&
                        (
                            direction === 'to-left' && !panel.hasClass('active')
                        ) ||
                        side === 'right' &&
                        (
                            direction === 'to-right' && !panel.hasClass('active')
                        )
                    )
                    {
                        isTouched = false;
                        return;
                    }
                }
        
                if (app.params.swipePanelNoFollow) {
                    var timeDiff = (new Date()).getTime() - touchStartTime;
                    if (timeDiff < 300) {
                        if (direction === 'to-left') {
                            if (side === 'right') app.openPanel(side);
                            if (side === 'left' && panel.hasClass('active')) app.closePanel();
                        }
                        if (direction === 'to-right') {
                            if (side === 'left') app.openPanel(side);
                            if (side === 'right' && panel.hasClass('active')) app.closePanel();
                        }
                    }
                    isTouched = false;
                    isMoved = false;
                    return;
                }
        
                if (!isMoved) {
                    effect = panel.hasClass('panel-cover') ? 'cover' : 'reveal';
                    if (!opened) {
                        panel.show();
                        panelOverlay.show();
                    }
                    panelWidth = panel[0].offsetWidth;
                    panel.transition(0);
                    if (panel.find('.' + app.params.viewClass).length > 0) {
                        if (app.sizeNavbars) app.sizeNavbars(panel.find('.' + app.params.viewClass)[0]);
                    }
                }
        
                isMoved = true;
        
                e.preventDefault();
                var threshold = opened ? 0 : -app.params.swipePanelThreshold;
                if (side === 'right') threshold = -threshold;
                
                touchesDiff = pageX - touchesStart.x + threshold;
        
                if (side === 'right') {
                    translate = touchesDiff  - (opened ? panelWidth : 0);
                    if (translate > 0) translate = 0;
                    if (translate < -panelWidth) {
                        translate = -panelWidth;
                    }
                }
                else {
                    translate = touchesDiff  + (opened ? panelWidth : 0);
                    if (translate < 0) translate = 0;
                    if (translate > panelWidth) {
                        translate = panelWidth;
                    }
                }
                if (effect === 'reveal') {
                    views.transform('translate3d(' + translate + 'px,0,0)').transition(0);
                    panelOverlay.transform('translate3d(' + translate + 'px,0,0)').transition(0);
                    
                    app.pluginHook('swipePanelSetTransform', views[0], panel[0], Math.abs(translate / panelWidth));
                }
                else {
                    panel.transform('translate3d(' + translate + 'px,0,0)').transition(0);
                    if (app.params.material) {
                        panelOverlay.transition(0);
                        overlayOpacity = Math.abs(translate/panelWidth);
                        panelOverlay.css({opacity: overlayOpacity});
                    }
                    app.pluginHook('swipePanelSetTransform', views[0], panel[0], Math.abs(translate / panelWidth));
                }
            }
            function handleTouchEnd(e) {
                if (!isTouched || !isMoved) {
                    isTouched = false;
                    isMoved = false;
                    return;
                }
                isTouched = false;
                isMoved = false;
                var timeDiff = (new Date()).getTime() - touchStartTime;
                var action;
                var edge = (translate === 0 || Math.abs(translate) === panelWidth);
        
                if (!opened) {
                    if (translate === 0) {
                        action = 'reset';
                    }
                    else if (
                        timeDiff < 300 && Math.abs(translate) > 0 ||
                        timeDiff >= 300 && (Math.abs(translate) >= panelWidth / 2)
                    ) {
                        action = 'swap';
                    }
                    else {
                        action = 'reset';
                    }
                }
                else {
                    if (translate === -panelWidth) {
                        action = 'reset';
                    }
                    else if (
                        timeDiff < 300 && Math.abs(translate) >= 0 ||
                        timeDiff >= 300 && (Math.abs(translate) <= panelWidth / 2)
                    ) {
                        if (side === 'left' && translate === panelWidth) action = 'reset';
                        else action = 'swap';
                    }
                    else {
                        action = 'reset';
                    }
                }
                if (action === 'swap') {
                    app.allowPanelOpen = true;
                    if (opened) {
                        app.closePanel();
                        if (edge) {
                            panel.css({display: ''});
                            $('body').removeClass('panel-closing');
                        }
                    }
                    else {
                        app.openPanel(side);
                    }
                    if (edge) app.allowPanelOpen = true;
                }
                if (action === 'reset') {
                    if (opened) {
                        app.allowPanelOpen = true;
                        app.openPanel(side);
                    }
                    else {
                        app.closePanel();
                        if (edge) {
                            app.allowPanelOpen = true;
                            panel.css({display: ''});
                        }
                        else {
                            var target = effect === 'reveal' ? views : panel;
                            panel.trigger('close');
                            $('body').addClass('panel-closing');
                            target.transitionEnd(function () {
                                panel.trigger('closed');
                                panel.css({display: ''});
                                $('body').removeClass('panel-closing');
                                app.allowPanelOpen = true;
                            });
                        }
                    }
                }
                if (effect === 'reveal') {
                    views.transition('');
                    views.transform('');
                }
                panel.transition('').transform('');
                panelOverlay.css({display: ''}).transform('').transition('').css('opacity', '');
            }
            $(document).on(app.touchEvents.start, handleTouchStart);
            $(document).on(app.touchEvents.move, handleTouchMove);
            $(document).on(app.touchEvents.end, handleTouchEnd);
        };
        

        /*======================================================
        ************   Image Lazy Loading   ************
        ************   Based on solution by Marc Godard, https://github.com/MarcGodard   ************
        ======================================================*/
        app.initImagesLazyLoad = function (pageContainer) {
            pageContainer = $(pageContainer);
        
            // Lazy images
            var lazyLoadImages;
            if (pageContainer.hasClass('lazy')) {
                lazyLoadImages = pageContainer;
                pageContainer = lazyLoadImages.parents('.page');
            }
            else {
                lazyLoadImages = pageContainer.find('.lazy');
            }
            if (lazyLoadImages.length === 0) return;
        
            // Scrollable page content
            var pageContent;
            if (pageContainer.hasClass('page-content'))  {
                pageContent = pageContainer;
                pageContainer = pageContainer.parents('.page');
            }
            else  {
                pageContent = pageContainer.find('.page-content');
            }
            if (pageContent.length === 0) return;
        
            // Placeholder
            var placeholderSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXCwsK592mkAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
            if (typeof app.params.imagesLazyLoadPlaceholder === 'string') {
                placeholderSrc = app.params.imagesLazyLoadPlaceholder;
            }
            if (app.params.imagesLazyLoadPlaceholder !== false) lazyLoadImages.each(function(){
                if ($(this).attr('data-src')) $(this).attr('src', placeholderSrc);
            });
        
            // load image
            var imagesSequence = [];
            var imageIsLoading = false;
            function loadImage(el) {
                el = $(el);
        
                var bg = el.attr('data-background');
                var src = bg ? bg : el.attr('data-src');
                if (!src) return;
        
                function onLoad() {
                    el.removeClass('lazy').addClass('lazy-loaded');
                    if (bg) {
                        el.css('background-image', 'url(' + src + ')');
                    }
                    else {
                        el.attr('src', src);
                    }
        
                    if (app.params.imagesLazyLoadSequential) {
                        imageIsLoading = false;
                        if (imagesSequence.length > 0) {
                            loadImage(imagesSequence.shift());
                        }
                    }
                }
        
                if (app.params.imagesLazyLoadSequential) {
                    if (imageIsLoading) {
                        if (imagesSequence.indexOf(el[0]) < 0) imagesSequence.push(el[0]);
                        return;
                    }
                }
        
                // Loading flag
                imageIsLoading = true;
                
                var image = new Image();
                image.onload = onLoad;
                image.onerror = onLoad;
                image.src =src;
            }
            function lazyHandler() {
                lazyLoadImages = pageContainer.find('.lazy');
                lazyLoadImages.each(function(index, el) {
                    el = $(el);
                    if (el.parents('.tab:not(.active)').length > 0) {
                        return;
                    }
                    if (isElementInViewport(el[0])) {
                        loadImage(el);
                    }
                });
            }
        
            function isElementInViewport (el) {
                var rect = el.getBoundingClientRect();
                var threshold = app.params.imagesLazyLoadThreshold || 0;
                return (
                    rect.top >= (0 - threshold) &&
                    rect.left >= (0 - threshold) &&
                    rect.top <= (window.innerHeight + threshold) &&
                    rect.left <= (window.innerWidth + threshold)
                );
            }
        
            function attachEvents(destroy) {
                var method = destroy ? 'off' : 'on';
                lazyLoadImages[method]('lazy', lazyHandler);
                lazyLoadImages.parents('.tab')[method]('show', lazyHandler);
                pageContainer[method]('lazy', lazyHandler);
                pageContent[method]('lazy', lazyHandler);
                pageContent[method]('scroll', lazyHandler);
                $(window)[method]('resize', lazyHandler);
            }
            function detachEvents() {
                attachEvents(true);
            }
        
            // Store detach function
            pageContainer[0].f7DestroyImagesLazyLoad = detachEvents;
        
            // Attach events
            attachEvents();
        
            // Destroy on page remove
            if (pageContainer.hasClass('page')) {
                pageContainer.once('pageBeforeRemove', detachEvents);
            }
        
            // Run loader on page load/init
            lazyHandler();
        
            // Run after page animation
            pageContainer.once('pageAfterAnimation', lazyHandler);
        };
        app.destroyImagesLazyLoad = function (pageContainer) {
            pageContainer = $(pageContainer);
            if (pageContainer.length > 0 && pageContainer[0].f7DestroyImagesLazyLoad) {
                pageContainer[0].f7DestroyImagesLazyLoad();
            }
        };
        app.reinitImagesLazyLoad = function (pageContainer) {
            pageContainer = $(pageContainer);
            if (pageContainer.length > 0) {
                pageContainer.trigger('lazy');
            }
        };

        /*======================================================
        ************   Material Preloader   ************
        ======================================================*/
        app.initPageMaterialPreloader = function (pageContainer) {
            $(pageContainer).find('.preloader').each(function () {
                if ($(this).children().length === 0) {
                    $(this).html(app.params.materialPreloaderHtml);
                }
            });
        };

        /*======================================================
        ************   Modals   ************
        ======================================================*/
        var _modalTemplateTempDiv = document.createElement('div');
        app.modalStack = [];
        app.modalStackClearQueue = function () {
            if (app.modalStack.length) {
                (app.modalStack.shift())();
            }
        };
        app.modal = function (params) {
            params = params || {};
            var modalHTML = '';
            if (app.params.modalTemplate) {
                if (!app._compiledTemplates.modal) app._compiledTemplates.modal = t7.compile(app.params.modalTemplate);
                modalHTML = app._compiledTemplates.modal(params);
            }
            else {
                var buttonsHTML = '';
                if (params.buttons && params.buttons.length > 0) {
                    for (var i = 0; i < params.buttons.length; i++) {
                        buttonsHTML += '<span class="modal-button' + (params.buttons[i].bold ? ' modal-button-bold' : '') + '">' + params.buttons[i].text + '</span>';
                    }
                }
                var titleHTML = params.title ? '<div class="modal-title">' + params.title + '</div>' : '';
                var textHTML = params.text ? '<div class="modal-text">' + params.text + '</div>' : '';
                var afterTextHTML = params.afterText ? params.afterText : '';
                var noButtons = !params.buttons || params.buttons.length === 0 ? 'modal-no-buttons' : '';
                var verticalButtons = params.verticalButtons ? 'modal-buttons-vertical': '';
                var modalButtonsHTML = params.buttons && params.buttons.length > 0 ? '<div class="modal-buttons modal-buttons-' + params.buttons.length + ' ' + verticalButtons + '">' + buttonsHTML + '</div>' : '';
                modalHTML = '<div class="modal ' + noButtons + ' ' + (params.cssClass || '') + '"><div class="modal-inner">' + (titleHTML + textHTML + afterTextHTML) + '</div>' + modalButtonsHTML + '</div>';
            }
        
            _modalTemplateTempDiv.innerHTML = modalHTML;
        
            var modal = $(_modalTemplateTempDiv).children();
        
            $('body').append(modal[0]);
        
            // Add events on buttons
            modal.find('.modal-button').each(function (index, el) {
                $(el).on('click', function (e) {
                    if (params.buttons[index].close !== false) app.closeModal(modal);
                    if (params.buttons[index].onClick) params.buttons[index].onClick(modal, e);
                    if (params.onClick) params.onClick(modal, index);
                });
            });
            app.openModal(modal);
            return modal[0];
        };
        app.alert = function (text, title, callbackOk) {
            if (typeof title === 'function') {
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                buttons: [ {text: app.params.modalButtonOk, bold: true, onClick: callbackOk} ]
            });
        };
        app.confirm = function (text, title, callbackOk, callbackCancel) {
            if (typeof title === 'function') {
                callbackCancel = arguments[2];
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                buttons: [
                    {text: app.params.modalButtonCancel, onClick: callbackCancel},
                    {text: app.params.modalButtonOk, bold: true, onClick: callbackOk}
                ]
            });
        };
        app.prompt = function (text, title, callbackOk, callbackCancel) {
            if (typeof title === 'function') {
                callbackCancel = arguments[2];
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                afterText: '<div class="input-field"><input type="text" class="modal-text-input"></div>',
                buttons: [
                    {
                        text: app.params.modalButtonCancel
                    },
                    {
                        text: app.params.modalButtonOk,
                        bold: true
                    }
                ],
                onClick: function (modal, index) {
                    if (index === 0 && callbackCancel) callbackCancel($(modal).find('.modal-text-input').val());
                    if (index === 1 && callbackOk) callbackOk($(modal).find('.modal-text-input').val());
                }
            });
        };
        app.modalLogin = function (text, title, callbackOk, callbackCancel) {
            if (typeof title === 'function') {
                callbackCancel = arguments[2];
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                afterText: '<div class="input-field modal-input-double"><input type="text" name="modal-username" placeholder="' + app.params.modalUsernamePlaceholder + '" class="modal-text-input"></div><div class="input-field modal-input-double"><input type="password" name="modal-password" placeholder="' + app.params.modalPasswordPlaceholder + '" class="modal-text-input"></div>',
                buttons: [
                    {
                        text: app.params.modalButtonCancel
                    },
                    {
                        text: app.params.modalButtonOk,
                        bold: true
                    }
                ],
                onClick: function (modal, index) {
                    var username = $(modal).find('.modal-text-input[name="modal-username"]').val();
                    var password = $(modal).find('.modal-text-input[name="modal-password"]').val();
                    if (index === 0 && callbackCancel) callbackCancel(username, password);
                    if (index === 1 && callbackOk) callbackOk(username, password);
                }
            });
        };
        app.modalPassword = function (text, title, callbackOk, callbackCancel) {
            if (typeof title === 'function') {
                callbackCancel = arguments[2];
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                afterText: '<div class="input-field"><input type="password" name="modal-password" placeholder="' + app.params.modalPasswordPlaceholder + '" class="modal-text-input"></div>',
                buttons: [
                    {
                        text: app.params.modalButtonCancel
                    },
                    {
                        text: app.params.modalButtonOk,
                        bold: true
                    }
                ],
                onClick: function (modal, index) {
                    var password = $(modal).find('.modal-text-input[name="modal-password"]').val();
                    if (index === 0 && callbackCancel) callbackCancel(password);
                    if (index === 1 && callbackOk) callbackOk(password);
                }
            });
        };
        app.showPreloader = function (title) {
            return app.modal({
                title: title || app.params.modalPreloaderTitle,
                text: '<div class="preloader">' + (app.params.material ? app.params.materialPreloaderHtml : '') + '</div>',
                cssClass: 'modal-preloader'
            });
        };
        app.hidePreloader = function () {
            app.closeModal('.modal.modal-in');
        };
        app.showIndicator = function () {
            $('body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white">' + (app.params.material ? app.params.materialPreloaderHtml : '') + '</span></div>');
        };
        app.hideIndicator = function () {
            $('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
        };
        // Action Sheet
        app.actions = function (target, params) {
            var toPopover = false, modal, groupSelector, buttonSelector;
            if (arguments.length === 1) {
                // Actions
                params = target;
            }
            else {
                // Popover
                if (app.device.ios) {
                    if (app.device.ipad) toPopover = true;
                }
                else {
                    if ($(window).width() >= 768) toPopover = true;
                }
            }
            params = params || [];
        
            if (params.length > 0 && !$.isArray(params[0])) {
                params = [params];
            }
            var modalHTML;
            if (toPopover) {
                var actionsToPopoverTemplate = app.params.modalActionsToPopoverTemplate ||
                    '<div class="popover actions-popover">' +
                      '<div class="popover-inner">' +
                        '{{#each this}}' +
                        '<div class="list-block">' +
                          '<ul>' +
                            '{{#each this}}' +
                            '{{#if label}}' +
                            '<li class="actions-popover-label {{#if color}}color-{{color}}{{/if}} {{#if bold}}actions-popover-bold{{/if}}">{{text}}</li>' +
                            '{{else}}' +
                            '<li><a href="#" class="item-link list-button {{#if color}}color-{{color}}{{/if}} {{#if bg}}bg-{{bg}}{{/if}} {{#if bold}}actions-popover-bold{{/if}} {{#if disabled}}disabled{{/if}}">{{text}}</a></li>' +
                            '{{/if}}' +
                            '{{/each}}' +
                          '</ul>' +
                        '</div>' +
                        '{{/each}}' +
                      '</div>' +
                    '</div>';
                if (!app._compiledTemplates.actionsToPopover) {
                    app._compiledTemplates.actionsToPopover = t7.compile(actionsToPopoverTemplate);
                }
                var popoverHTML = app._compiledTemplates.actionsToPopover(params);
                modal = $(app.popover(popoverHTML, target, true));
                groupSelector = '.list-block ul';
                buttonSelector = '.list-button';
            }
            else {
                if (app.params.modalActionsTemplate) {
                    if (!app._compiledTemplates.actions) app._compiledTemplates.actions = t7.compile(app.params.modalActionsTemplate);
                    modalHTML = app._compiledTemplates.actions(params);
                }
                else {
                    var buttonsHTML = '';
                    for (var i = 0; i < params.length; i++) {
                        for (var j = 0; j < params[i].length; j++) {
                            if (j === 0) buttonsHTML += '<div class="actions-modal-group">';
                            var button = params[i][j];
                            var buttonClass = button.label ? 'actions-modal-label' : 'actions-modal-button';
                            if (button.bold) buttonClass += ' actions-modal-button-bold';
                            if (button.color) buttonClass += ' color-' + button.color;
                            if (button.bg) buttonClass += ' bg-' + button.bg;
                            if (button.disabled) buttonClass += ' disabled';
                            buttonsHTML += '<div class="' + buttonClass + '">' + button.text + '</div>';
                            if (j === params[i].length - 1) buttonsHTML += '</div>';
                        }
                    }
                    modalHTML = '<div class="actions-modal">' + buttonsHTML + '</div>';
                }
                _modalTemplateTempDiv.innerHTML = modalHTML;
                modal = $(_modalTemplateTempDiv).children();
                $('body').append(modal[0]);
                groupSelector = '.actions-modal-group';
                buttonSelector = '.actions-modal-button';
            }
        
            var groups = modal.find(groupSelector);
            groups.each(function (index, el) {
                var groupIndex = index;
                $(el).children().each(function (index, el) {
                    var buttonIndex = index;
                    var buttonParams = params[groupIndex][buttonIndex];
                    var clickTarget;
                    if (!toPopover && $(el).is(buttonSelector)) clickTarget = $(el);
                    if (toPopover && $(el).find(buttonSelector).length > 0) clickTarget = $(el).find(buttonSelector);
        
                    if (clickTarget) {
                        clickTarget.on('click', function (e) {
                            if (buttonParams.close !== false) app.closeModal(modal);
                            if (buttonParams.onClick) buttonParams.onClick(modal, e);
                        });
                    }
                });
            });
            if (!toPopover) app.openModal(modal);
            return modal[0];
        };
        app.popover = function (modal, target, removeOnClose) {
            if (typeof removeOnClose === 'undefined') removeOnClose = true;
            if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
                var _modal = document.createElement('div');
                _modal.innerHTML = modal.trim();
                if (_modal.childNodes.length > 0) {
                    modal = _modal.childNodes[0];
                    if (removeOnClose) modal.classList.add('remove-on-close');
                    $('body').append(modal);
                }
                else return false; //nothing found
            }
            modal = $(modal);
            target = $(target);
            if (modal.length === 0 || target.length === 0) return false;
            if (modal.find('.popover-angle').length === 0 && !app.params.material) {
                modal.append('<div class="popover-angle"></div>');
            }
            modal.show();
        
            var material = app.params.material;
        
            function sizePopover() {
                modal.css({left: '', top: ''});
                var modalWidth =  modal.width();
                var modalHeight =  modal.height(); // 13 - height of angle
                var modalAngle, modalAngleSize = 0, modalAngleLeft, modalAngleTop;
                if (!material) {
                    modalAngle = modal.find('.popover-angle');
                    modalAngleSize = modalAngle.width() / 2;
                    modalAngle.removeClass('on-left on-right on-top on-bottom').css({left: '', top: ''});
                }
                else {
                    modal.removeClass('popover-on-left popover-on-right popover-on-top popover-on-bottom').css({left: '', top: ''});
                }
        
                var targetWidth = target.outerWidth();
                var targetHeight = target.outerHeight();
                var targetOffset = target.offset();
                var targetParentPage = target.parents('.page');
                if (targetParentPage.length > 0) {
                    targetOffset.top = targetOffset.top - targetParentPage[0].scrollTop;
                }
        
                var windowHeight = $(window).height();
                var windowWidth = $(window).width();
        
                var modalTop = 0;
                var modalLeft = 0;
                var diff = 0;
                // Top Position
                var modalPosition = material ? 'bottom' : 'top';
                if (material) {
                    if (modalHeight < windowHeight - targetOffset.top - targetHeight) {
                        // On bottom
                        modalPosition = 'bottom';
                        modalTop = targetOffset.top;
                    }
                    else if (modalHeight < targetOffset.top) {
                        // On top
                        modalTop = targetOffset.top - modalHeight + targetHeight;
                        modalPosition = 'top';
                    }
                    else {
                        // On middle
                        modalPosition = 'bottom';
                        modalTop = targetOffset.top;
                    }
        
                    if (modalTop <= 0) {
                        modalTop = 8;
                    }
                    else if (modalTop + modalHeight >= windowHeight) {
                        modalTop = windowHeight - modalHeight - 8;
                    }
        
                    // Horizontal Position
                    modalLeft = targetOffset.left;
                    if (modalLeft + modalWidth >= windowWidth - 8) {
                        modalLeft = targetOffset.left + targetWidth - modalWidth - 8;
                    }
                    if (modalLeft < 8) {
                        modalLeft = 8;
                    }
                    if (modalPosition === 'top') {
                        modal.addClass('popover-on-top');
                    }
                    if (modalPosition === 'bottom') {
                        modal.addClass('popover-on-bottom');
                    }
                    if (target.hasClass('floating-button-to-popover') && !modal.hasClass('modal-in')) {
                        modal.addClass('popover-floating-button');
                        var diffX = (modalLeft + modalWidth / 2) - (targetOffset.left + targetWidth / 2),
                            diffY = (modalTop + modalHeight / 2) - (targetOffset.top + targetHeight / 2);
                        target
                            .addClass('floating-button-to-popover-in')
                            .transform('translate3d(' + diffX + 'px, ' + diffY + 'px,0)')
                            .transitionEnd(function (e) {
                                if (!target.hasClass('floating-button-to-popover-in')) return;
                                target
                                    .addClass('floating-button-to-popover-scale')
                                    .transform('translate3d(' + diffX + 'px, ' + diffY + 'px,0) scale(' + (modalWidth/targetWidth) + ', ' + (modalHeight/targetHeight) + ')');
                            });
        
                        modal.once('close', function () {
                            target
                                .removeClass('floating-button-to-popover-in floating-button-to-popover-scale')
                                .addClass('floating-button-to-popover-out')
                                .transform('')
                                .transitionEnd(function (e) {
                                    target.removeClass('floating-button-to-popover-out');
                                });
                        });
                        modal.once('closed', function () {
                            modal.removeClass('popover-floating-button');
                        });
                    }
        
                }
                else {
                    if ((modalHeight + modalAngleSize) < targetOffset.top) {
                        // On top
                        modalTop = targetOffset.top - modalHeight - modalAngleSize;
                    }
                    else if ((modalHeight + modalAngleSize) < windowHeight - targetOffset.top - targetHeight) {
                        // On bottom
                        modalPosition = 'bottom';
                        modalTop = targetOffset.top + targetHeight + modalAngleSize;
                    }
                    else {
                        // On middle
                        modalPosition = 'middle';
                        modalTop = targetHeight / 2 + targetOffset.top - modalHeight / 2;
                        diff = modalTop;
                        if (modalTop <= 0) {
                            modalTop = 5;
                        }
                        else if (modalTop + modalHeight >= windowHeight) {
                            modalTop = windowHeight - modalHeight - 5;
                        }
                        diff = diff - modalTop;
                    }
        
                    // Horizontal Position
                    if (modalPosition === 'top' || modalPosition === 'bottom') {
                        modalLeft = targetWidth / 2 + targetOffset.left - modalWidth / 2;
                        diff = modalLeft;
                        if (modalLeft < 5) modalLeft = 5;
                        if (modalLeft + modalWidth > windowWidth) modalLeft = windowWidth - modalWidth - 5;
                        if (modalPosition === 'top') {
                            modalAngle.addClass('on-bottom');
                        }
                        if (modalPosition === 'bottom') {
                            modalAngle.addClass('on-top');
                        }
                        diff = diff - modalLeft;
                        modalAngleLeft = (modalWidth / 2 - modalAngleSize + diff);
                        modalAngleLeft = Math.max(Math.min(modalAngleLeft, modalWidth - modalAngleSize * 2 - 13), 13);
                        modalAngle.css({left: modalAngleLeft + 'px'});
        
                    }
                    else if (modalPosition === 'middle') {
                        modalLeft = targetOffset.left - modalWidth - modalAngleSize;
                        modalAngle.addClass('on-right');
                        if (modalLeft < 5 || (modalLeft + modalWidth > windowWidth)) {
                            if (modalLeft < 5) modalLeft = targetOffset.left + targetWidth + modalAngleSize;
                            if (modalLeft + modalWidth > windowWidth) modalLeft = windowWidth - modalWidth - 5;
                            modalAngle.removeClass('on-right').addClass('on-left');
                        }
                        modalAngleTop = (modalHeight / 2 - modalAngleSize + diff);
                        modalAngleTop = Math.max(Math.min(modalAngleTop, modalHeight - modalAngleSize * 2 - 13), 13);
                        modalAngle.css({top: modalAngleTop + 'px'});
                    }
                }
        
        
                // Apply Styles
                modal.css({top: modalTop + 'px', left: modalLeft + 'px'});
            }
        
            sizePopover();
        
            $(window).on('resize', sizePopover);
        
            modal.on('close', function () {
                $(window).off('resize', sizePopover);
            });
        
            app.openModal(modal);
            return modal[0];
        };
        app.popup = function (modal, removeOnClose) {
            if (typeof removeOnClose === 'undefined') removeOnClose = true;
            if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
                var _modal = document.createElement('div');
                _modal.innerHTML = modal.trim();
                if (_modal.childNodes.length > 0) {
                    modal = _modal.childNodes[0];
                    if (removeOnClose) modal.classList.add('remove-on-close');
                    $('body').append(modal);
                }
                else return false; //nothing found
            }
            modal = $(modal);
            if (modal.length === 0) return false;
            modal.show();
        
            app.openModal(modal);
            return modal[0];
        };
        app.pickerModal = function (modal, removeOnClose) {
            if (typeof removeOnClose === 'undefined') removeOnClose = true;
            if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
                modal = $(modal);
                if (modal.length > 0) {
                    if (removeOnClose) modal.addClass('remove-on-close');
                    $('body').append(modal[0]);
                }
                else return false; //nothing found
            }
            modal = $(modal);
            if (modal.length === 0) return false;
            if ($('.picker-modal.modal-in:not(.modal-out)').length > 0 && !modal.hasClass('modal-in')) {
                app.closeModal('.picker-modal.modal-in:not(.modal-out)');
            }
            modal.show();
            app.openModal(modal);
            return modal[0];
        };
        app.loginScreen = function (modal) {
            if (!modal) modal = '.login-screen';
            modal = $(modal);
            if (modal.length === 0) return false;
            if ($('.login-screen.modal-in:not(.modal-out)').length > 0 && !modal.hasClass('modal-in')) {
                app.closeModal('.login-screen.modal-in:not(.modal-out)');
            }
            modal.show();
            
            app.openModal(modal);
            return modal[0];
        };
        app.openModal = function (modal) {
            modal = $(modal);
            var isModal = modal.hasClass('modal');
            if ($('.modal.modal-in:not(.modal-out)').length && app.params.modalStack && isModal) {
                app.modalStack.push(function () {
                    app.openModal(modal);
                });
                return;
            }
            // do nothing if this modal already shown
            if (true === modal.data('f7-modal-shown')) {
                return;
            }
            modal.data('f7-modal-shown', true);
            modal.once('close', function() {
               modal.removeData('f7-modal-shown');
            });
            var isPopover = modal.hasClass('popover');
            var isPopup = modal.hasClass('popup');
            var isLoginScreen = modal.hasClass('login-screen');
            var isPickerModal = modal.hasClass('picker-modal');
            if (isModal) {
                modal.show();
                modal.css({
                    marginTop: - Math.round(modal.outerHeight() / 2) + 'px'
                });
            }
        
            var overlay;
            if (!isLoginScreen && !isPickerModal) {
                if ($('.modal-overlay').length === 0 && !isPopup) {
                    $('body').append('<div class="modal-overlay"></div>');
                }
                if ($('.popup-overlay').length === 0 && isPopup) {
                    $('body').append('<div class="popup-overlay"></div>');
                }
                overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
            }
            if (app.params.material && isPickerModal) {
                if (modal.hasClass('picker-calendar')) {
                    if ($('.picker-modal-overlay').length === 0 && !isPopup) {
                        $('body').append('<div class="picker-modal-overlay"></div>');
                    }
                    overlay = $('.picker-modal-overlay');
                }
            }
        
            //Make sure that styles are applied, trigger relayout;
            var clientLeft = modal[0].clientLeft;
        
            // Trugger open event
            modal.trigger('open');
        
            // Picker modal body class
            if (isPickerModal) {
                $('body').addClass('with-picker-modal');
            }
        
            // Init Pages and Navbars in modal
            if (modal.find('.' + app.params.viewClass).length > 0) {
                modal.find('.page').each(function () {
                    app.initPageWithCallback(this);
                });
                modal.find('.navbar').each(function () {
                    app.initNavbarWithCallback(this); 
                });
            }
        
            // Classes for transition in
            if (!isLoginScreen && !isPickerModal) overlay.addClass('modal-overlay-visible');
            if (app.params.material && isPickerModal && overlay) overlay.addClass('modal-overlay-visible');
            modal.removeClass('modal-out').addClass('modal-in').transitionEnd(function (e) {
                if (modal.hasClass('modal-out')) modal.trigger('closed');
                else modal.trigger('opened');
            });
            return true;
        };
        app.closeModal = function (modal) {
            modal = $(modal || '.modal-in');
            if (typeof modal !== 'undefined' && modal.length === 0) {
                return;
            }
            var isModal = modal.hasClass('modal');
            var isPopover = modal.hasClass('popover');
            var isPopup = modal.hasClass('popup');
            var isLoginScreen = modal.hasClass('login-screen');
            var isPickerModal = modal.hasClass('picker-modal');
        
            var removeOnClose = modal.hasClass('remove-on-close');
        
            var overlay;
            
            if (isPopup) overlay = $('.popup-overlay');
            else {
                if (isPickerModal && app.params.material) overlay = $('.picker-modal-overlay');
                else if (!isPickerModal) overlay = $('.modal-overlay');
            }
        
            if (isPopup){
                if (modal.length === $('.popup.modal-in').length) {
                    overlay.removeClass('modal-overlay-visible');
                }
            }
            else if (overlay && overlay.length > 0) {
                overlay.removeClass('modal-overlay-visible');
            }
        
            modal.trigger('close');
        
            // Picker modal body class
            if (isPickerModal) {
                $('body').removeClass('with-picker-modal');
                $('body').addClass('picker-modal-closing');
            }
        
            if (!(isPopover && !app.params.material)) {
                modal.removeClass('modal-in').addClass('modal-out').transitionEnd(function (e) {
                    if (modal.hasClass('modal-out')) modal.trigger('closed');
                    else {
                        modal.trigger('opened');
                        if (isPopover) return;
                    }
        
                    if (isPickerModal) {
                        $('body').removeClass('picker-modal-closing');
                    }
                    if (isPopup || isLoginScreen || isPickerModal || isPopover) {
                        modal.removeClass('modal-out').hide();
                        if (removeOnClose && modal.length > 0) {
                            modal.remove();
                        }
                    }
                    else {
                        modal.remove();
                    }
                });
                if (isModal && app.params.modalStack) {
                    app.modalStackClearQueue();
                }
            }
            else {
                modal.removeClass('modal-in modal-out').trigger('closed').hide();
                if (removeOnClose) {
                    modal.remove();
                }
            }
            return true;
        };
        

        /*======================================================
        ************   Material Tabbar   ************
        ======================================================*/
        app.materialTabbarSetHighlight = function (tabbar, activeLink) {
            tabbar = $(tabbar);
            activeLink = activeLink || tabbar.find('.tab-link.active');
        
            var tabLinkWidth, highlightTranslate;
            if (tabbar.hasClass('tabbar-scrollable')) {
                tabLinkWidth = activeLink[0].offsetWidth + 'px';
                highlightTranslate = (app.rtl ? - activeLink[0].offsetLeft: activeLink[0].offsetLeft) + 'px';
            }
            else {
                tabLinkWidth = 1 / tabbar.find('.tab-link').length * 100 + '%';
                highlightTranslate = (app.rtl ? - activeLink.index(): activeLink.index()) * 100 + '%';
            }
        
            tabbar.find('.tab-link-highlight')
                .css({width: tabLinkWidth})
                .transform('translate3d(' + highlightTranslate + ',0,0)');
        };
        app.initPageMaterialTabbar = function (pageContainer) {
            pageContainer = $(pageContainer);
            var tabbar = $(pageContainer).find('.tabbar');
        
            function tabbarSetHighlight() {
                app.materialTabbarSetHighlight(tabbar);
            }
            if (tabbar.length > 0) {
                if (tabbar.find('.tab-link-highlight').length === 0) {
                    tabbar.find('.toolbar-inner').append('<span class="tab-link-highlight"></span>');
                }
        
                tabbarSetHighlight();
                $(window).on('resize', tabbarSetHighlight);
                pageContainer.once('pageBeforeRemove', function () {
                    $(window).off('resize', tabbarSetHighlight);
                });
            }
        };

        /* ===============================================================================
        ************   Tabs   ************
        =============================================================================== */
        app.showTab = function (tab, tabLink, force) {
            var newTab = $(tab);
            if (arguments.length === 2) {
                if (typeof tabLink === 'boolean') {
                    force = tabLink;
                }
            }
            if (newTab.length === 0) return false;
            if (newTab.hasClass('active')) {
                if (force) newTab.trigger('show');
                return false;
            }
            var tabs = newTab.parent('.tabs');
            if (tabs.length === 0) return false;
        
            // Return swipeouts in hidden tabs
            app.allowSwipeout = true;
        
            // Animated tabs
            var isAnimatedTabs = tabs.parent().hasClass('tabs-animated-wrap');
            if (isAnimatedTabs) {
                var tabTranslate = (app.rtl ? newTab.index() : -newTab.index()) * 100;
                tabs.transform('translate3d(' + tabTranslate + '%,0,0)');
            }
        
            // Swipeable tabs
            var isSwipeableTabs = tabs.parent().hasClass('tabs-swipeable-wrap'), swiper;
            if (isSwipeableTabs) {
                swiper = tabs.parent()[0].swiper;
                if (swiper.activeIndex !== newTab.index()) swiper.slideTo(newTab.index(), undefined, false);
            }
        
            // Remove active class from old tabs
            var oldTab = tabs.children('.tab.active').removeClass('active');
            // Add active class to new tab
            newTab.addClass('active');
            // Trigger 'show' event on new tab
            newTab.trigger('show');
        
            // Update navbars in new tab
            if (!isAnimatedTabs && !isSwipeableTabs && newTab.find('.navbar').length > 0) {
                // Find tab's view
                var viewContainer;
                if (newTab.hasClass(app.params.viewClass)) viewContainer = newTab[0];
                else viewContainer = newTab.parents('.' + app.params.viewClass)[0];
                app.sizeNavbars(viewContainer);
            }
        
            // Find related link for new tab
            if (tabLink) tabLink = $(tabLink);
            else {
                // Search by id
                if (typeof tab === 'string') tabLink = $('.tab-link[href="' + tab + '"]');
                else tabLink = $('.tab-link[href="#' + newTab.attr('id') + '"]');
                // Search by data-tab
                if (!tabLink || tabLink && tabLink.length === 0) {
                    $('[data-tab]').each(function () {
                        if (newTab.is($(this).attr('data-tab'))) tabLink = $(this);
                    });
                }
            }
            if (tabLink.length === 0) return;
        
            // Find related link for old tab
            var oldTabLink;
            if (oldTab && oldTab.length > 0) {
                // Search by id
                var oldTabId = oldTab.attr('id');
                if (oldTabId) oldTabLink = $('.tab-link[href="#' + oldTabId + '"]');
                // Search by data-tab
                if (!oldTabLink || oldTabLink && oldTabLink.length === 0) {
                    $('[data-tab]').each(function () {
                        if (oldTab.is($(this).attr('data-tab'))) oldTabLink = $(this);
                    });
                }
            }
        
            // Update links' classes
            if (tabLink && tabLink.length > 0) {
                tabLink.addClass('active');
                // Material Highlight
                if (app.params.material) {
                    var tabbar = tabLink.parents('.tabbar');
                    if (tabbar.length > 0) {
                        if (tabbar.find('.tab-link-highlight').length === 0) {
                            tabbar.find('.toolbar-inner').append('<span class="tab-link-highlight"></span>');
                        }
                        app.materialTabbarSetHighlight(tabbar, tabLink);
                    }
                }
            }
            if (oldTabLink && oldTabLink.length > 0) oldTabLink.removeClass('active');
        
            return true;
        };

        /*===============================================================================
        ************   Fast Clicks   ************
        ************   Inspired by https://github.com/ftlabs/fastclick   ************
        ===============================================================================*/
        app.initFastClicks = function () {
            if (app.params.activeState) {
                $('html').addClass('watch-active-state');
            }
            if (app.device.ios && app.device.webView) {
                // Strange hack required for iOS 8 webview to work on inputs
                window.addEventListener('touchstart', function () {});
            }
        
            var touchStartX, touchStartY, touchStartTime, targetElement, trackClick, activeSelection, scrollParent, lastClickTime, isMoved, tapHoldFired, tapHoldTimeout;
            var activableElement, activeTimeout, needsFastClick, needsFastClickTimeOut;
            var rippleWave, rippleTarget, rippleTransform, rippleTimeout;
            function findActivableElement(el) {
                var target = $(el);
                var parents = target.parents(app.params.activeStateElements);
                var activable;
                if (target.is(app.params.activeStateElements)) {
                    activable = target;
                }
                if (parents.length > 0) {
                    activable = activable ? activable.add(parents) : parents;
                }
                return activable ? activable : target;
            }
            function isInsideScrollableView(el) {
                var pageContent = el.parents('.page-content, .panel');
        
                if (pageContent.length === 0) {
                    return false;
                }
        
                // This event handler covers the "tap to stop scrolling".
                if (pageContent.prop('scrollHandlerSet') !== 'yes') {
                    pageContent.on('scroll', function() {
                      clearTimeout(activeTimeout);
                      clearTimeout(rippleTimeout);
                    });
                    pageContent.prop('scrollHandlerSet', 'yes');
                }
        
                return true;
            }
            function addActive() {
                if (!activableElement) return;
                activableElement.addClass('active-state');
            }
            function removeActive(el) {
                if (!activableElement) return;
                activableElement.removeClass('active-state');
                activableElement = null;
            }
            function isFormElement(el) {
                var nodes = ('input select textarea label').split(' ');
                if (el.nodeName && nodes.indexOf(el.nodeName.toLowerCase()) >= 0) return true;
                return false;
            }
            function androidNeedsBlur(el) {
                var noBlur = ('button input textarea select').split(' ');
                if (document.activeElement && el !== document.activeElement && document.activeElement !== document.body) {
                    if (noBlur.indexOf(el.nodeName.toLowerCase()) >= 0) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return false;
                }
            }
            function targetNeedsFastClick(el) {
                var $el = $(el);
                if (el.nodeName.toLowerCase() === 'input' && el.type === 'file') return false;
                if ($el.hasClass('no-fastclick') || $el.parents('.no-fastclick').length > 0) return false;
                return true;
            }
            function targetNeedsFocus(el) {
                if (document.activeElement === el) {
                    return false;
                }
                var tag = el.nodeName.toLowerCase();
                var skipInputs = ('button checkbox file image radio submit').split(' ');
                if (el.disabled || el.readOnly) return false;
                if (tag === 'textarea') return true;
                if (tag === 'select') {
                    if (app.device.android) return false;
                    else return true;
                }
                if (tag === 'input' && skipInputs.indexOf(el.type) < 0) return true;
            }
            function targetNeedsPrevent(el) {
                el = $(el);
                var prevent = true;
                if (el.is('label') || el.parents('label').length > 0) {
                    if (app.device.android) {
                        prevent = false;
                    }
                    else if (app.device.ios && el.is('input')) {
                        prevent = true;
                    }
                    else prevent = false;
                }
                return prevent;
            }
        
            // Mouse Handlers
            function handleMouseDown (e) {
                findActivableElement(e.target).addClass('active-state');
                if ('which' in e && e.which === 3) {
                    setTimeout(function () {
                        $('.active-state').removeClass('active-state');
                    }, 0);
                }
                if (app.params.material && app.params.materialRipple) {
                    touchStartX = e.pageX;
                    touchStartY = e.pageY;
                    rippleTouchStart(e.target, e.pageX, e.pageY);
                }
            }
            function handleMouseMove (e) {
                $('.active-state').removeClass('active-state');
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchMove();
                }
            }
            function handleMouseUp (e) {
                $('.active-state').removeClass('active-state');
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchEnd();
                }
            }
        
            // Material Touch Ripple Effect
            function findRippleElement(el) {
                var needsRipple = app.params.materialRippleElements;
                var $el = $(el);
                if ($el.is(needsRipple)) {
                    if ($el.hasClass('no-ripple')) {
                        return false;
                    }
                    return $el;
                }
                else if ($el.parents(needsRipple).length > 0) {
                    var rippleParent = $el.parents(needsRipple).eq(0);
                    if (rippleParent.hasClass('no-ripple')) {
                        return false;
                    }
                    return rippleParent;
                }
                else return false;
            }
            function createRipple(x, y, el) {
                var box = el[0].getBoundingClientRect();
                var center = {
                    x: x - box.left,
                    y: y - box.top
                },
                    height = box.height,
                    width = box.width;
                var diameter = Math.max(Math.pow((Math.pow(height, 2) + Math.pow(width, 2)), 0.5), 48);
        
                rippleWave = $(
                    '<div class="ripple-wave" style="width: ' + diameter + 'px; height: '+diameter+'px; margin-top:-'+diameter/2+'px; margin-left:-'+diameter/2+'px; left:'+center.x+'px; top:'+center.y+'px;"></div>'
                );
                el.prepend(rippleWave);
                var clientLeft = rippleWave[0].clientLeft;
                rippleTransform = 'translate3d('+(-center.x + width/2)+'px, '+(-center.y + height/2)+'px, 0) scale(1)';
                rippleWave.transform(rippleTransform);
            }
        
            function removeRipple() {
                if (!rippleWave) return;
                var toRemove = rippleWave;
        
                var removeTimeout = setTimeout(function () {
                    toRemove.remove();
                }, 400);
        
                rippleWave
                    .addClass('ripple-wave-fill')
                    .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'))
                    .transitionEnd(function () {
                        clearTimeout(removeTimeout);
        
                        var rippleWave = $(this)
                            .addClass('ripple-wave-out')
                            .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'));
        
                        removeTimeout = setTimeout(function () {
                            rippleWave.remove();
                        }, 700);
        
                        setTimeout(function () {
                            rippleWave.transitionEnd(function(){
                                clearTimeout(removeTimeout);
                                $(this).remove();
                            });
                        }, 0);
                    });
        
                rippleWave = rippleTarget = undefined;
            }
        
            function rippleTouchStart (el, x, y) {
                rippleTarget = findRippleElement(el);
                if (!rippleTarget || rippleTarget.length === 0) {
                    rippleTarget = undefined;
                    return;
                }
                if (!isInsideScrollableView(rippleTarget)) {
                    createRipple(touchStartX, touchStartY, rippleTarget);
                }
                else {
                    rippleTimeout = setTimeout(function () {
                        createRipple(touchStartX, touchStartY, rippleTarget);
                    }, 80);
                }
            }
            function rippleTouchMove() {
                clearTimeout(rippleTimeout);
                removeRipple();
            }
            function rippleTouchEnd() {
                if (rippleWave) {
                    removeRipple();
                }
                else if (rippleTarget && !isMoved) {
                    clearTimeout(rippleTimeout);
                    createRipple(touchStartX, touchStartY, rippleTarget);
                    setTimeout(removeRipple, 0);
                }
                else {
                    removeRipple();
                }
            }
        
            // Send Click
            function sendClick(e) {
                var touch = e.changedTouches[0];
                var evt = document.createEvent('MouseEvents');
                var eventType = 'click';
                if (app.device.android && targetElement.nodeName.toLowerCase() === 'select') {
                    eventType = 'mousedown';
                }
                evt.initMouseEvent(eventType, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
                evt.forwardedTouchEvent = true;
                targetElement.dispatchEvent(evt);
            }
        
            // Touch Handlers
            function handleTouchStart(e) {
                isMoved = false;
                tapHoldFired = false;
                if (e.targetTouches.length > 1) {
                    if (activableElement) removeActive();
                    return true;
                }
                if (e.touches.length > 1 && activableElement) {
                    removeActive();
                }
                if (app.params.tapHold) {
                    if (tapHoldTimeout) clearTimeout(tapHoldTimeout);
                    tapHoldTimeout = setTimeout(function () {
                        if (e && e.touches && e.touches.length > 1) return;
                        tapHoldFired = true;
                        e.preventDefault();
                        $(e.target).trigger('taphold');
                    }, app.params.tapHoldDelay);
                }
                if (needsFastClickTimeOut) clearTimeout(needsFastClickTimeOut);
                needsFastClick = targetNeedsFastClick(e.target);
        
                if (!needsFastClick) {
                    trackClick = false;
                    return true;
                }
                if (app.device.ios) {
                    var selection = window.getSelection();
                    if (selection.rangeCount && selection.focusNode !== document.body && (!selection.isCollapsed || document.activeElement === selection.focusNode)) {
                        activeSelection = true;
                        return true;
                    }
                    else {
                        activeSelection = false;
                    }
                }
                if (app.device.android)  {
                    if (androidNeedsBlur(e.target)) {
                        document.activeElement.blur();
                    }
                }
        
                trackClick = true;
                targetElement = e.target;
                touchStartTime = (new Date()).getTime();
                touchStartX = e.targetTouches[0].pageX;
                touchStartY = e.targetTouches[0].pageY;
        
                // Detect scroll parent
                if (app.device.ios) {
                    scrollParent = undefined;
                    $(targetElement).parents().each(function () {
                        var parent = this;
                        if (parent.scrollHeight > parent.offsetHeight && !scrollParent) {
                            scrollParent = parent;
                            scrollParent.f7ScrollTop = scrollParent.scrollTop;
                        }
                    });
                }
                if ((e.timeStamp - lastClickTime) < app.params.fastClicksDelayBetweenClicks) {
                    e.preventDefault();
                }
        
                if (app.params.activeState) {
                    activableElement = findActivableElement(targetElement);
                    // If it's inside a scrollable view, we don't trigger active-state yet,
                    // because it can be a scroll instead. Based on the link:
                    // http://labnote.beedesk.com/click-scroll-and-pseudo-active-on-mobile-webk
                    if (!isInsideScrollableView(activableElement)) {
                        addActive();
                    } else {
                        activeTimeout = setTimeout(addActive, 80);
                    }
                }
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchStart(targetElement, touchStartX, touchStartY);
                }
            }
            function handleTouchMove(e) {
                if (!trackClick) return;
                var _isMoved = false;
                var distance = app.params.fastClicksDistanceThreshold;
                if (distance) {
                    var pageX = e.targetTouches[0].pageX;
                    var pageY = e.targetTouches[0].pageY;
                    if (Math.abs(pageX - touchStartX) > distance ||  Math.abs(pageY - touchStartY) > distance) {
                        _isMoved = true;
                    }
                }
                else {
                    _isMoved = true;
                }
                if (_isMoved) {
                    trackClick = false;
                    targetElement = null;
                    isMoved = true;
                    if (app.params.tapHold) {
                        clearTimeout(tapHoldTimeout);
                    }
        			if (app.params.activeState) {
        				clearTimeout(activeTimeout);
        				removeActive();
        			}
                    if (app.params.material && app.params.materialRipple) {
                        rippleTouchMove();
                    }
                }
            }
            function handleTouchEnd(e) {
                clearTimeout(activeTimeout);
                clearTimeout(tapHoldTimeout);
        
                if (!trackClick) {
                    if (!activeSelection && needsFastClick) {
                        if (!(app.device.android && !e.cancelable)) {
                            e.preventDefault();
                        }
                    }
                    return true;
                }
        
                if (document.activeElement === e.target) {
                    if (app.params.activeState) removeActive();
                    if (app.params.material && app.params.materialRipple) {
                        rippleTouchEnd();
                    }
                    return true;
                }
        
                if (!activeSelection) {
                    e.preventDefault();
                }
        
                if ((e.timeStamp - lastClickTime) < app.params.fastClicksDelayBetweenClicks) {
                    setTimeout(removeActive, 0);
                    return true;
                }
        
                lastClickTime = e.timeStamp;
        
                trackClick = false;
        
                if (app.device.ios && scrollParent) {
                    if (scrollParent.scrollTop !== scrollParent.f7ScrollTop) {
                        return false;
                    }
                }
        
                // Add active-state here because, in a very fast tap, the timeout didn't
                // have the chance to execute. Removing active-state in a timeout gives
                // the chance to the animation execute.
                if (app.params.activeState) {
                    addActive();
                    setTimeout(removeActive, 0);
                }
                // Remove Ripple
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchEnd();
                }
        
                // Trigger focus when required
                if (targetNeedsFocus(targetElement)) {
                    if (app.device.ios && app.device.webView) {
                        if ((event.timeStamp - touchStartTime) > 159) {
                            targetElement = null;
                            return false;
                        }
                        targetElement.focus();
                        return false;
                    }
                    else {
                        targetElement.focus();
                    }
                }
        
                // Blur active elements
                if (document.activeElement && targetElement !== document.activeElement && document.activeElement !== document.body && targetElement.nodeName.toLowerCase() !== 'label') {
                    document.activeElement.blur();
                }
        
                // Send click
                e.preventDefault();
                sendClick(e);
                return false;
            }
            function handleTouchCancel(e) {
                trackClick = false;
                targetElement = null;
        
                // Remove Active State
                clearTimeout(activeTimeout);
                clearTimeout(tapHoldTimeout);
                if (app.params.activeState) {
                    removeActive();
                }
        
                // Remove Ripple
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchEnd();
                }
            }
        
            function handleClick(e) {
                var allowClick = false;
        
                if (trackClick) {
                    targetElement = null;
                    trackClick = false;
                    return true;
                }
                if (e.target.type === 'submit' && e.detail === 0) {
                    return true;
                }
                if (!targetElement) {
                    if (!isFormElement(e.target)) {
                        allowClick =  true;
                    }
                }
                if (!needsFastClick) {
                    allowClick = true;
                }
                if (document.activeElement === targetElement) {
                    allowClick =  true;
                }
                if (e.forwardedTouchEvent) {
                    allowClick =  true;
                }
                if (!e.cancelable) {
                    allowClick =  true;
                }
                if (app.params.tapHold && app.params.tapHoldPreventClicks && tapHoldFired) {
                    allowClick = false;
                }
                if (!allowClick) {
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    if (targetElement) {
                        if (targetNeedsPrevent(targetElement) || isMoved) {
                            e.preventDefault();
                        }
                    }
                    else {
                        e.preventDefault();
                    }
                    targetElement = null;
                }
                needsFastClickTimeOut = setTimeout(function () {
                    needsFastClick = false;
                }, (app.device.ios || app.device.androidChrome ? 100 : 400));
        
                if (app.params.tapHold) {
                    tapHoldTimeout = setTimeout(function () {
                        tapHoldFired = false;
                    }, (app.device.ios || app.device.androidChrome ? 100 : 400));
                }
        
                return allowClick;
            }
            if (app.support.touch) {
                document.addEventListener('click', handleClick, true);
        
                document.addEventListener('touchstart', handleTouchStart);
                document.addEventListener('touchmove', handleTouchMove);
                document.addEventListener('touchend', handleTouchEnd);
                document.addEventListener('touchcancel', handleTouchCancel);
            }
            else {
                if (app.params.activeState) {
                    document.addEventListener('mousedown', handleMouseDown);
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                }
            }
            if (app.params.material && app.params.materialRipple) {
                document.addEventListener('contextmenu', function (e) {
                    if (activableElement) removeActive();
                    rippleTouchEnd();
                });
            }
        
        };
        

        /*===========================
        Swiper
        ===========================*/
        window.Swiper = function (container, params) {
            if (!(this instanceof Swiper)) return new Swiper(container, params);
            var defaults = {
                direction: 'horizontal',
                touchEventsTarget: 'container',
                initialSlide: 0,
                speed: 300,
                // autoplay
                autoplay: false,
                autoplayDisableOnInteraction: true,
                autoplayStopOnLast: false,
                // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
                iOSEdgeSwipeDetection: false,
                iOSEdgeSwipeThreshold: 20,
                // Free mode
                freeMode: false,
                freeModeMomentum: true,
                freeModeMomentumRatio: 1,
                freeModeMomentumBounce: true,
                freeModeMomentumBounceRatio: 1,
                freeModeSticky: false,
                freeModeMinimumVelocity: 0.02,
                // Autoheight
                autoHeight: false,
                // Set wrapper width
                setWrapperSize: false,
                // Virtual Translate
                virtualTranslate: false,
                // Effects
                effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
                coverflow: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows : true
                },
                flip: {
                    slideShadows : true,
                    limitRotation: true
                },
                cube: {
                    slideShadows: true,
                    shadow: true,
                    shadowOffset: 20,
                    shadowScale: 0.94
                },
                fade: {
                    crossFade: false
                },
                // Parallax
                parallax: false,
                // Scrollbar
                scrollbar: null,
                scrollbarHide: true,
                scrollbarDraggable: false,
                scrollbarSnapOnRelease: false,
                // Keyboard Mousewheel
                keyboardControl: false,
                mousewheelControl: false,
                mousewheelReleaseOnEdges: false,
                mousewheelInvert: false,
                mousewheelForceToAxis: false,
                mousewheelSensitivity: 1,
                // Hash Navigation
                hashnav: false,
                // Breakpoints
                breakpoints: undefined,
                // Slides grid
                spaceBetween: 0,
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerColumnFill: 'column',
                slidesPerGroup: 1,
                centeredSlides: false,
                slidesOffsetBefore: 0, // in px
                slidesOffsetAfter: 0, // in px
                // Round length
                roundLengths: false,
                // Touches
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: true,
                shortSwipes: true,
                longSwipes: true,
                longSwipesRatio: 0.5,
                longSwipesMs: 300,
                followFinger: true,
                onlyExternal: false,
                threshold: 0,
                touchMoveStopPropagation: true,
                // Unique Navigation Elements
                uniqueNavElements: true,
                // Pagination
                pagination: null,
                paginationElement: 'span',
                paginationClickable: false,
                paginationHide: false,
                paginationBulletRender: null,
                paginationProgressRender: null,
                paginationFractionRender: null,
                paginationCustomRender: null,
                paginationType: 'bullets', // 'bullets' or 'progress' or 'fraction' or 'custom'
                // Resistance
                resistance: true,
                resistanceRatio: 0.85,
                // Next/prev buttons
                nextButton: null,
                prevButton: null,
                // Progress
                watchSlidesProgress: false,
                watchSlidesVisibility: false,
                // Cursor
                grabCursor: false,
                // Clicks
                preventClicks: true,
                preventClicksPropagation: true,
                slideToClickedSlide: false,
                // Lazy Loading
                lazyLoading: false,
                lazyLoadingInPrevNext: false,
                lazyLoadingInPrevNextAmount: 1,
                lazyLoadingOnTransitionStart: false,
                // Images
                preloadImages: true,
                updateOnImagesReady: true,
                // loop
                loop: false,
                loopAdditionalSlides: 0,
                loopedSlides: null,
                // Control
                control: undefined,
                controlInverse: false,
                controlBy: 'slide', //or 'container'
                // Swiping/no swiping
                allowSwipeToPrev: true,
                allowSwipeToNext: true,
                swipeHandler: null, //'.swipe-handler',
                noSwiping: true,
                noSwipingClass: 'swiper-no-swiping',
                // NS
                slideClass: 'swiper-slide',
                slideActiveClass: 'swiper-slide-active',
                slideVisibleClass: 'swiper-slide-visible',
                slideDuplicateClass: 'swiper-slide-duplicate',
                slideNextClass: 'swiper-slide-next',
                slidePrevClass: 'swiper-slide-prev',
                wrapperClass: 'swiper-wrapper',
                bulletClass: 'swiper-pagination-bullet',
                bulletActiveClass: 'swiper-pagination-bullet-active',
                buttonDisabledClass: 'swiper-button-disabled',
                paginationCurrentClass: 'swiper-pagination-current',
                paginationTotalClass: 'swiper-pagination-total',
                paginationHiddenClass: 'swiper-pagination-hidden',
                paginationProgressbarClass: 'swiper-pagination-progressbar',
                // Observer
                observer: false,
                observeParents: false,
                // Accessibility
                a11y: false,
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
                firstSlideMessage: 'This is the first slide',
                lastSlideMessage: 'This is the last slide',
                paginationBulletMessage: 'Go to slide {{index}}',
                // Callbacks
                runCallbacksOnInit: true
                /*
                Callbacks:
                onInit: function (swiper)
                onDestroy: function (swiper)
                onClick: function (swiper, e)
                onTap: function (swiper, e)
                onDoubleTap: function (swiper, e)
                onSliderMove: function (swiper, e)
                onSlideChangeStart: function (swiper)
                onSlideChangeEnd: function (swiper)
                onTransitionStart: function (swiper)
                onTransitionEnd: function (swiper)
                onImagesReady: function (swiper)
                onProgress: function (swiper, progress)
                onTouchStart: function (swiper, e)
                onTouchMove: function (swiper, e)
                onTouchMoveOpposite: function (swiper, e)
                onTouchEnd: function (swiper, e)
                onReachBeginning: function (swiper)
                onReachEnd: function (swiper)
                onSetTransition: function (swiper, duration)
                onSetTranslate: function (swiper, translate)
                onAutoplayStart: function (swiper)
                onAutoplayStop: function (swiper),
                onLazyImageLoad: function (swiper, slide, image)
                onLazyImageReady: function (swiper, slide, image)
                */
            
            };
            var initialVirtualTranslate = params && params.virtualTranslate;
            
            params = params || {};
            var originalParams = {};
            for (var param in params) {
                if (typeof params[param] === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || (typeof Dom7 !== 'undefined' && params[param] instanceof Dom7) || (typeof jQuery !== 'undefined' && params[param] instanceof jQuery))) {
                    originalParams[param] = {};
                    for (var deepParam in params[param]) {
                        originalParams[param][deepParam] = params[param][deepParam];
                    }
                }
                else {
                    originalParams[param] = params[param];
                }
            }
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
                else if (typeof params[def] === 'object') {
                    for (var deepDef in defaults[def]) {
                        if (typeof params[def][deepDef] === 'undefined') {
                            params[def][deepDef] = defaults[def][deepDef];
                        }
                    }
                }
            }
            
            // Swiper
            var s = this;
            
            // Params
            s.params = params;
            s.originalParams = originalParams;
            
            // Classname
            s.classNames = [];
            /*=========================
              Dom Library and plugins
              ===========================*/
            if (typeof $ !== 'undefined' && typeof Dom7 !== 'undefined'){
                $ = Dom7;
            }
            if (typeof $ === 'undefined') {
                if (typeof Dom7 === 'undefined') {
                    $ = window.Dom7 || window.Zepto || window.jQuery;
                }
                else {
                    $ = Dom7;
                }
                if (!$) return;
            }
            // Export it to Swiper instance
            s.$ = $;
            
            /*=========================
              Breakpoints
              ===========================*/
            s.currentBreakpoint = undefined;
            s.getActiveBreakpoint = function () {
                //Get breakpoint for window width
                if (!s.params.breakpoints) return false;
                var breakpoint = false;
                var points = [], point;
                for ( point in s.params.breakpoints ) {
                    if (s.params.breakpoints.hasOwnProperty(point)) {
                        points.push(point);
                    }
                }
                points.sort(function (a, b) {
                    return parseInt(a, 10) > parseInt(b, 10);
                });
                for (var i = 0; i < points.length; i++) {
                    point = points[i];
                    if (point >= window.innerWidth && !breakpoint) {
                        breakpoint = point;
                    }
                }
                return breakpoint || 'max';
            };
            s.setBreakpoint = function () {
                //Set breakpoint for window width and update parameters
                var breakpoint = s.getActiveBreakpoint();
                if (breakpoint && s.currentBreakpoint !== breakpoint) {
                    var breakPointsParams = breakpoint in s.params.breakpoints ? s.params.breakpoints[breakpoint] : s.originalParams;
                    var needsReLoop = s.params.loop && (breakPointsParams.slidesPerView !== s.params.slidesPerView);
                    for ( var param in breakPointsParams ) {
                        s.params[param] = breakPointsParams[param];
                    }
                    s.currentBreakpoint = breakpoint;
                    if(needsReLoop && s.destroyLoop) {
                        s.reLoop(true);
                    }
                }
            };
            // Set breakpoint on load
            if (s.params.breakpoints) {
                s.setBreakpoint();
            }
            
            /*=========================
              Preparation - Define Container, Wrapper and Pagination
              ===========================*/
            s.container = $(container);
            if (s.container.length === 0) return;
            if (s.container.length > 1) {
                var swipers = [];
                s.container.each(function () {
                    var container = this;
                    swipers.push(new Swiper(this, params));
                });
                return swipers;
            }
            
            // Save instance in container HTML Element and in data
            s.container[0].swiper = s;
            s.container.data('swiper', s);
            
            s.classNames.push('swiper-container-' + s.params.direction);
            
            if (s.params.freeMode) {
                s.classNames.push('swiper-container-free-mode');
            }
            if (!s.support.flexbox) {
                s.classNames.push('swiper-container-no-flexbox');
                s.params.slidesPerColumn = 1;
            }
            if (s.params.autoHeight) {
                s.classNames.push('swiper-container-autoheight');
            }
            // Enable slides progress when required
            if (s.params.parallax || s.params.watchSlidesVisibility) {
                s.params.watchSlidesProgress = true;
            }
            // Coverflow / 3D
            if (['cube', 'coverflow', 'flip'].indexOf(s.params.effect) >= 0) {
                if (s.support.transforms3d) {
                    s.params.watchSlidesProgress = true;
                    s.classNames.push('swiper-container-3d');
                }
                else {
                    s.params.effect = 'slide';
                }
            }
            if (s.params.effect !== 'slide') {
                s.classNames.push('swiper-container-' + s.params.effect);
            }
            if (s.params.effect === 'cube') {
                s.params.resistanceRatio = 0;
                s.params.slidesPerView = 1;
                s.params.slidesPerColumn = 1;
                s.params.slidesPerGroup = 1;
                s.params.centeredSlides = false;
                s.params.spaceBetween = 0;
                s.params.virtualTranslate = true;
                s.params.setWrapperSize = false;
            }
            if (s.params.effect === 'fade' || s.params.effect === 'flip') {
                s.params.slidesPerView = 1;
                s.params.slidesPerColumn = 1;
                s.params.slidesPerGroup = 1;
                s.params.watchSlidesProgress = true;
                s.params.spaceBetween = 0;
                s.params.setWrapperSize = false;
                if (typeof initialVirtualTranslate === 'undefined') {
                    s.params.virtualTranslate = true;
                }
            }
            
            // Grab Cursor
            if (s.params.grabCursor && s.support.touch) {
                s.params.grabCursor = false;
            }
            
            // Wrapper
            s.wrapper = s.container.children('.' + s.params.wrapperClass);
            
            // Pagination
            if (s.params.pagination) {
                s.paginationContainer = $(s.params.pagination);
                if (s.params.uniqueNavElements && typeof s.params.pagination === 'string' && s.paginationContainer.length > 1 && s.container.find(s.params.pagination).length === 1) {
                    s.paginationContainer = s.container.find(s.params.pagination);
                }
            
                if (s.params.paginationType === 'bullets' && s.params.paginationClickable) {
                    s.paginationContainer.addClass('swiper-pagination-clickable');
                }
                else {
                    s.params.paginationClickable = false;
                }
                s.paginationContainer.addClass('swiper-pagination-' + s.params.paginationType);
            }
            // Next/Prev Buttons
            if (s.params.nextButton || s.params.prevButton) {
                if (s.params.nextButton) {
                    s.nextButton = $(s.params.nextButton);
                    if (s.params.uniqueNavElements && typeof s.params.nextButton === 'string' && s.nextButton.length > 1 && s.container.find(s.params.nextButton).length === 1) {
                        s.nextButton = s.container.find(s.params.nextButton);
                    }
                }
                if (s.params.prevButton) {
                    s.prevButton = $(s.params.prevButton);
                    if (s.params.uniqueNavElements && typeof s.params.prevButton === 'string' && s.prevButton.length > 1 && s.container.find(s.params.prevButton).length === 1) {
                        s.prevButton = s.container.find(s.params.prevButton);
                    }
                }
            }
            
            // Is Horizontal
            s.isHorizontal = function () {
                return s.params.direction === 'horizontal';
            };
            // s.isH = isH;
            
            // RTL
            s.rtl = s.isHorizontal() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
            if (s.rtl) {
                s.classNames.push('swiper-container-rtl');
            }
            
            // Wrong RTL support
            if (s.rtl) {
                s.wrongRTL = s.wrapper.css('display') === '-webkit-box';
            }
            
            // Columns
            if (s.params.slidesPerColumn > 1) {
                s.classNames.push('swiper-container-multirow');
            }
            
            // Check for Android
            if (s.device.android) {
                s.classNames.push('swiper-container-android');
            }
            
            // Add classes
            s.container.addClass(s.classNames.join(' '));
            
            // Translate
            s.translate = 0;
            
            // Progress
            s.progress = 0;
            
            // Velocity
            s.velocity = 0;
            
            /*=========================
              Locks, unlocks
              ===========================*/
            s.lockSwipeToNext = function () {
                s.params.allowSwipeToNext = false;
            };
            s.lockSwipeToPrev = function () {
                s.params.allowSwipeToPrev = false;
            };
            s.lockSwipes = function () {
                s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
            };
            s.unlockSwipeToNext = function () {
                s.params.allowSwipeToNext = true;
            };
            s.unlockSwipeToPrev = function () {
                s.params.allowSwipeToPrev = true;
            };
            s.unlockSwipes = function () {
                s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
            };
            
            /*=========================
              Round helper
              ===========================*/
            function round(a) {
                return Math.floor(a);
            }
            /*=========================
              Set grab cursor
              ===========================*/
            if (s.params.grabCursor) {
                s.container[0].style.cursor = 'move';
                s.container[0].style.cursor = '-webkit-grab';
                s.container[0].style.cursor = '-moz-grab';
                s.container[0].style.cursor = 'grab';
            }
            /*=========================
              Update on Images Ready
              ===========================*/
            s.imagesToLoad = [];
            s.imagesLoaded = 0;
            
            s.loadImage = function (imgElement, src, srcset, checkForComplete, callback) {
                var image;
                function onReady () {
                    if (callback) callback();
                }
                if (!imgElement.complete || !checkForComplete) {
                    if (src) {
                        image = new window.Image();
                        image.onload = onReady;
                        image.onerror = onReady;
                        if (srcset) {
                            image.srcset = srcset;
                        }
                        if (src) {
                            image.src = src;
                        }
                    } else {
                        onReady();
                    }
            
                } else {//image already loaded...
                    onReady();
                }
            };
            s.preloadImages = function () {
                s.imagesToLoad = s.container.find('img');
                function _onReady() {
                    if (typeof s === 'undefined' || s === null) return;
                    if (s.imagesLoaded !== undefined) s.imagesLoaded++;
                    if (s.imagesLoaded === s.imagesToLoad.length) {
                        if (s.params.updateOnImagesReady) s.update();
                        s.emit('onImagesReady', s);
                    }
                }
                for (var i = 0; i < s.imagesToLoad.length; i++) {
                    s.loadImage(s.imagesToLoad[i], (s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src')), (s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute('srcset')), true, _onReady);
                }
            };
            
            /*=========================
              Autoplay
              ===========================*/
            s.autoplayTimeoutId = undefined;
            s.autoplaying = false;
            s.autoplayPaused = false;
            function autoplay() {
                s.autoplayTimeoutId = setTimeout(function () {
                    if (s.params.loop) {
                        s.fixLoop();
                        s._slideNext();
                        s.emit('onAutoplay', s);
                    }
                    else {
                        if (!s.isEnd) {
                            s._slideNext();
                            s.emit('onAutoplay', s);
                        }
                        else {
                            if (!params.autoplayStopOnLast) {
                                s._slideTo(0);
                                s.emit('onAutoplay', s);
                            }
                            else {
                                s.stopAutoplay();
                            }
                        }
                    }
                }, s.params.autoplay);
            }
            s.startAutoplay = function () {
                if (typeof s.autoplayTimeoutId !== 'undefined') return false;
                if (!s.params.autoplay) return false;
                if (s.autoplaying) return false;
                s.autoplaying = true;
                s.emit('onAutoplayStart', s);
                autoplay();
            };
            s.stopAutoplay = function (internal) {
                if (!s.autoplayTimeoutId) return;
                if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
                s.autoplaying = false;
                s.autoplayTimeoutId = undefined;
                s.emit('onAutoplayStop', s);
            };
            s.pauseAutoplay = function (speed) {
                if (s.autoplayPaused) return;
                if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
                s.autoplayPaused = true;
                if (speed === 0) {
                    s.autoplayPaused = false;
                    autoplay();
                }
                else {
                    s.wrapper.transitionEnd(function () {
                        if (!s) return;
                        s.autoplayPaused = false;
                        if (!s.autoplaying) {
                            s.stopAutoplay();
                        }
                        else {
                            autoplay();
                        }
                    });
                }
            };
            /*=========================
              Min/Max Translate
              ===========================*/
            s.minTranslate = function () {
                return (-s.snapGrid[0]);
            };
            s.maxTranslate = function () {
                return (-s.snapGrid[s.snapGrid.length - 1]);
            };
            /*=========================
              Slider/slides sizes
              ===========================*/
            s.updateAutoHeight = function () {
                // Update Height
                var slide = s.slides.eq(s.activeIndex)[0];
                if (typeof slide !== 'undefined') {
                    var newHeight = slide.offsetHeight;
                    if (newHeight) s.wrapper.css('height', newHeight + 'px');
                }
            };
            s.updateContainerSize = function () {
                var width, height;
                if (typeof s.params.width !== 'undefined') {
                    width = s.params.width;
                }
                else {
                    width = s.container[0].clientWidth;
                }
                if (typeof s.params.height !== 'undefined') {
                    height = s.params.height;
                }
                else {
                    height = s.container[0].clientHeight;
                }
                if (width === 0 && s.isHorizontal() || height === 0 && !s.isHorizontal()) {
                    return;
                }
            
                //Subtract paddings
                width = width - parseInt(s.container.css('padding-left'), 10) - parseInt(s.container.css('padding-right'), 10);
                height = height - parseInt(s.container.css('padding-top'), 10) - parseInt(s.container.css('padding-bottom'), 10);
            
                // Store values
                s.width = width;
                s.height = height;
                s.size = s.isHorizontal() ? s.width : s.height;
            };
            
            s.updateSlidesSize = function () {
                s.slides = s.wrapper.children('.' + s.params.slideClass);
                s.snapGrid = [];
                s.slidesGrid = [];
                s.slidesSizesGrid = [];
            
                var spaceBetween = s.params.spaceBetween,
                    slidePosition = -s.params.slidesOffsetBefore,
                    i,
                    prevSlideSize = 0,
                    index = 0;
                if (typeof s.size === 'undefined') return;
                if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
                    spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
                }
            
                s.virtualSize = -spaceBetween;
                // reset margins
                if (s.rtl) s.slides.css({marginLeft: '', marginTop: ''});
                else s.slides.css({marginRight: '', marginBottom: ''});
            
                var slidesNumberEvenToRows;
                if (s.params.slidesPerColumn > 1) {
                    if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
                        slidesNumberEvenToRows = s.slides.length;
                    }
                    else {
                        slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
                    }
                    if (s.params.slidesPerView !== 'auto' && s.params.slidesPerColumnFill === 'row') {
                        slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn);
                    }
                }
            
                // Calc slides
                var slideSize;
                var slidesPerColumn = s.params.slidesPerColumn;
                var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
                var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
                for (i = 0; i < s.slides.length; i++) {
                    slideSize = 0;
                    var slide = s.slides.eq(i);
                    if (s.params.slidesPerColumn > 1) {
                        // Set slides order
                        var newSlideOrderIndex;
                        var column, row;
                        if (s.params.slidesPerColumnFill === 'column') {
                            column = Math.floor(i / slidesPerColumn);
                            row = i - column * slidesPerColumn;
                            if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn-1)) {
                                if (++row >= slidesPerColumn) {
                                    row = 0;
                                    column++;
                                }
                            }
                            newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
                            slide
                                .css({
                                    '-webkit-box-ordinal-group': newSlideOrderIndex,
                                    '-moz-box-ordinal-group': newSlideOrderIndex,
                                    '-ms-flex-order': newSlideOrderIndex,
                                    '-webkit-order': newSlideOrderIndex,
                                    'order': newSlideOrderIndex
                                });
                        }
                        else {
                            row = Math.floor(i / slidesPerRow);
                            column = i - row * slidesPerRow;
                        }
                        slide
                            .css({
                                'margin-top': (row !== 0 && s.params.spaceBetween) && (s.params.spaceBetween + 'px')
                            })
                            .attr('data-swiper-column', column)
                            .attr('data-swiper-row', row);
            
                    }
                    if (slide.css('display') === 'none') continue;
                    if (s.params.slidesPerView === 'auto') {
                        slideSize = s.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
                        if (s.params.roundLengths) slideSize = round(slideSize);
                    }
                    else {
                        slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
                        if (s.params.roundLengths) slideSize = round(slideSize);
            
                        if (s.isHorizontal()) {
                            s.slides[i].style.width = slideSize + 'px';
                        }
                        else {
                            s.slides[i].style.height = slideSize + 'px';
                        }
                    }
                    s.slides[i].swiperSlideSize = slideSize;
                    s.slidesSizesGrid.push(slideSize);
            
            
                    if (s.params.centeredSlides) {
                        slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                        if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                        if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
                        if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                        s.slidesGrid.push(slidePosition);
                    }
                    else {
                        if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                        s.slidesGrid.push(slidePosition);
                        slidePosition = slidePosition + slideSize + spaceBetween;
                    }
            
                    s.virtualSize += slideSize + spaceBetween;
            
                    prevSlideSize = slideSize;
            
                    index ++;
                }
                s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
                var newSlidesGrid;
            
                if (
                    s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
                    s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                }
                if (!s.support.flexbox || s.params.setWrapperSize) {
                    if (s.isHorizontal()) s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                    else s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + 'px'});
                }
            
                if (s.params.slidesPerColumn > 1) {
                    s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
                    s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
                    s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                    if (s.params.centeredSlides) {
                        newSlidesGrid = [];
                        for (i = 0; i < s.snapGrid.length; i++) {
                            if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
                        }
                        s.snapGrid = newSlidesGrid;
                    }
                }
            
                // Remove last grid elements depending on width
                if (!s.params.centeredSlides) {
                    newSlidesGrid = [];
                    for (i = 0; i < s.snapGrid.length; i++) {
                        if (s.snapGrid[i] <= s.virtualSize - s.size) {
                            newSlidesGrid.push(s.snapGrid[i]);
                        }
                    }
                    s.snapGrid = newSlidesGrid;
                    if (Math.floor(s.virtualSize - s.size) - Math.floor(s.snapGrid[s.snapGrid.length - 1]) > 1) {
                        s.snapGrid.push(s.virtualSize - s.size);
                    }
                }
                if (s.snapGrid.length === 0) s.snapGrid = [0];
            
                if (s.params.spaceBetween !== 0) {
                    if (s.isHorizontal()) {
                        if (s.rtl) s.slides.css({marginLeft: spaceBetween + 'px'});
                        else s.slides.css({marginRight: spaceBetween + 'px'});
                    }
                    else s.slides.css({marginBottom: spaceBetween + 'px'});
                }
                if (s.params.watchSlidesProgress) {
                    s.updateSlidesOffset();
                }
            };
            s.updateSlidesOffset = function () {
                for (var i = 0; i < s.slides.length; i++) {
                    s.slides[i].swiperSlideOffset = s.isHorizontal() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
                }
            };
            
            /*=========================
              Slider/slides progress
              ===========================*/
            s.updateSlidesProgress = function (translate) {
                if (typeof translate === 'undefined') {
                    translate = s.translate || 0;
                }
                if (s.slides.length === 0) return;
                if (typeof s.slides[0].swiperSlideOffset === 'undefined') s.updateSlidesOffset();
            
                var offsetCenter = -translate;
                if (s.rtl) offsetCenter = translate;
            
                // Visible Slides
                s.slides.removeClass(s.params.slideVisibleClass);
                for (var i = 0; i < s.slides.length; i++) {
                    var slide = s.slides[i];
                    var slideProgress = (offsetCenter - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
                    if (s.params.watchSlidesVisibility) {
                        var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
                        var slideAfter = slideBefore + s.slidesSizesGrid[i];
                        var isVisible =
                            (slideBefore >= 0 && slideBefore < s.size) ||
                            (slideAfter > 0 && slideAfter <= s.size) ||
                            (slideBefore <= 0 && slideAfter >= s.size);
                        if (isVisible) {
                            s.slides.eq(i).addClass(s.params.slideVisibleClass);
                        }
                    }
                    slide.progress = s.rtl ? -slideProgress : slideProgress;
                }
            };
            s.updateProgress = function (translate) {
                if (typeof translate === 'undefined') {
                    translate = s.translate || 0;
                }
                var translatesDiff = s.maxTranslate() - s.minTranslate();
                var wasBeginning = s.isBeginning;
                var wasEnd = s.isEnd;
                if (translatesDiff === 0) {
                    s.progress = 0;
                    s.isBeginning = s.isEnd = true;
                }
                else {
                    s.progress = (translate - s.minTranslate()) / (translatesDiff);
                    s.isBeginning = s.progress <= 0;
                    s.isEnd = s.progress >= 1;
                }
                if (s.isBeginning && !wasBeginning) s.emit('onReachBeginning', s);
                if (s.isEnd && !wasEnd) s.emit('onReachEnd', s);
            
                if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
                s.emit('onProgress', s, s.progress);
            };
            s.updateActiveIndex = function () {
                var translate = s.rtl ? s.translate : -s.translate;
                var newActiveIndex, i, snapIndex;
                for (i = 0; i < s.slidesGrid.length; i ++) {
                    if (typeof s.slidesGrid[i + 1] !== 'undefined') {
                        if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
                            newActiveIndex = i;
                        }
                        else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
                            newActiveIndex = i + 1;
                        }
                    }
                    else {
                        if (translate >= s.slidesGrid[i]) {
                            newActiveIndex = i;
                        }
                    }
                }
                // Normalize slideIndex
                if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
                // for (i = 0; i < s.slidesGrid.length; i++) {
                    // if (- translate >= s.slidesGrid[i]) {
                        // newActiveIndex = i;
                    // }
                // }
                snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
                if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;
            
                if (newActiveIndex === s.activeIndex) {
                    return;
                }
                s.snapIndex = snapIndex;
                s.previousIndex = s.activeIndex;
                s.activeIndex = newActiveIndex;
                s.updateClasses();
            };
            
            /*=========================
              Classes
              ===========================*/
            s.updateClasses = function () {
                s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass);
                var activeSlide = s.slides.eq(s.activeIndex);
                // Active classes
                activeSlide.addClass(s.params.slideActiveClass);
                // Next Slide
                var nextSlide = activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
                if (s.params.loop && nextSlide.length === 0) {
                    s.slides.eq(0).addClass(s.params.slideNextClass);
                }
                // Prev Slide
                var prevSlide = activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
                if (s.params.loop && prevSlide.length === 0) {
                    s.slides.eq(-1).addClass(s.params.slidePrevClass);
                }
            
                // Pagination
                if (s.paginationContainer && s.paginationContainer.length > 0) {
                    // Current/Total
                    var current,
                        total = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                    if (s.params.loop) {
                        current = Math.ceil((s.activeIndex - s.loopedSlides)/s.params.slidesPerGroup);
                        if (current > s.slides.length - 1 - s.loopedSlides * 2) {
                            current = current - (s.slides.length - s.loopedSlides * 2);
                        }
                        if (current > total - 1) current = current - total;
                        if (current < 0 && s.params.paginationType !== 'bullets') current = total + current;
                    }
                    else {
                        if (typeof s.snapIndex !== 'undefined') {
                            current = s.snapIndex;
                        }
                        else {
                            current = s.activeIndex || 0;
                        }
                    }
                    // Types
                    if (s.params.paginationType === 'bullets' && s.bullets && s.bullets.length > 0) {
                        s.bullets.removeClass(s.params.bulletActiveClass);
                        if (s.paginationContainer.length > 1) {
                            s.bullets.each(function () {
                                if ($(this).index() === current) $(this).addClass(s.params.bulletActiveClass);
                            });
                        }
                        else {
                            s.bullets.eq(current).addClass(s.params.bulletActiveClass);
                        }
                    }
                    if (s.params.paginationType === 'fraction') {
                        s.paginationContainer.find('.' + s.params.paginationCurrentClass).text(current + 1);
                        s.paginationContainer.find('.' + s.params.paginationTotalClass).text(total);
                    }
                    if (s.params.paginationType === 'progress') {
                        var scale = (current + 1) / total,
                            scaleX = scale,
                            scaleY = 1;
                        if (!s.isHorizontal()) {
                            scaleY = scale;
                            scaleX = 1;
                        }
                        s.paginationContainer.find('.' + s.params.paginationProgressbarClass).transform('translate3d(0,0,0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')').transition(s.params.speed);
                    }
                    if (s.params.paginationType === 'custom' && s.params.paginationCustomRender) {
                        s.paginationContainer.html(s.params.paginationCustomRender(s, current + 1, total));
                        s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                    }
                }
            
                // Next/active buttons
                if (!s.params.loop) {
                    if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                        if (s.isBeginning) {
                            s.prevButton.addClass(s.params.buttonDisabledClass);
                            if (s.params.a11y && s.a11y) s.a11y.disable(s.prevButton);
                        }
                        else {
                            s.prevButton.removeClass(s.params.buttonDisabledClass);
                            if (s.params.a11y && s.a11y) s.a11y.enable(s.prevButton);
                        }
                    }
                    if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                        if (s.isEnd) {
                            s.nextButton.addClass(s.params.buttonDisabledClass);
                            if (s.params.a11y && s.a11y) s.a11y.disable(s.nextButton);
                        }
                        else {
                            s.nextButton.removeClass(s.params.buttonDisabledClass);
                            if (s.params.a11y && s.a11y) s.a11y.enable(s.nextButton);
                        }
                    }
                }
            };
            
            /*=========================
              Pagination
              ===========================*/
            s.updatePagination = function () {
                if (!s.params.pagination) return;
                if (s.paginationContainer && s.paginationContainer.length > 0) {
                    var paginationHTML = '';
                    if (s.params.paginationType === 'bullets') {
                        var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                        for (var i = 0; i < numberOfBullets; i++) {
                            if (s.params.paginationBulletRender) {
                                paginationHTML += s.params.paginationBulletRender(i, s.params.bulletClass);
                            }
                            else {
                                paginationHTML += '<' + s.params.paginationElement+' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + '>';
                            }
                        }
                        s.paginationContainer.html(paginationHTML);
                        s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
                        if (s.params.paginationClickable && s.params.a11y && s.a11y) {
                            s.a11y.initPagination();
                        }
                    }
                    if (s.params.paginationType === 'fraction') {
                        if (s.params.paginationFractionRender) {
                            paginationHTML = s.params.paginationFractionRender(s, s.params.paginationCurrentClass, s.params.paginationTotalClass);
                        }
                        else {
                            paginationHTML =
                                '<span class="' + s.params.paginationCurrentClass + '"></span>' +
                                ' / ' +
                                '<span class="' + s.params.paginationTotalClass+'"></span>';
                        }
                        s.paginationContainer.html(paginationHTML);
                    }
                    if (s.params.paginationType === 'progress') {
                        if (s.params.paginationProgressRender) {
                            paginationHTML = s.params.paginationProgressRender(s, s.params.paginationProgressbarClass);
                        }
                        else {
                            paginationHTML = '<span class="' + s.params.paginationProgressbarClass + '"></span>';
                        }
                        s.paginationContainer.html(paginationHTML);
                    }
                    if (s.params.paginationType !== 'custom') {
                        s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                    }
                }
            };
            /*=========================
              Common update method
              ===========================*/
            s.update = function (updateTranslate) {
                s.updateContainerSize();
                s.updateSlidesSize();
                s.updateProgress();
                s.updatePagination();
                s.updateClasses();
                if (s.params.scrollbar && s.scrollbar) {
                    s.scrollbar.set();
                }
                function forceSetTranslate() {
                    newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                    s.setWrapperTranslate(newTranslate);
                    s.updateActiveIndex();
                    s.updateClasses();
                }
                if (updateTranslate) {
                    var translated, newTranslate;
                    if (s.controller && s.controller.spline) {
                        s.controller.spline = undefined;
                    }
                    if (s.params.freeMode) {
                        forceSetTranslate();
                        if (s.params.autoHeight) {
                            s.updateAutoHeight();
                        }
                    }
                    else {
                        if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                            translated = s.slideTo(s.slides.length - 1, 0, false, true);
                        }
                        else {
                            translated = s.slideTo(s.activeIndex, 0, false, true);
                        }
                        if (!translated) {
                            forceSetTranslate();
                        }
                    }
                }
                else if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
            };
            
            /*=========================
              Resize Handler
              ===========================*/
            s.onResize = function (forceUpdatePagination) {
                //Breakpoints
                if (s.params.breakpoints) {
                    s.setBreakpoint();
                }
            
                // Disable locks on resize
                var allowSwipeToPrev = s.params.allowSwipeToPrev;
                var allowSwipeToNext = s.params.allowSwipeToNext;
                s.params.allowSwipeToPrev = s.params.allowSwipeToNext = true;
            
                s.updateContainerSize();
                s.updateSlidesSize();
                if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination) s.updatePagination();
                if (s.params.scrollbar && s.scrollbar) {
                    s.scrollbar.set();
                }
                if (s.controller && s.controller.spline) {
                    s.controller.spline = undefined;
                }
                var slideChangedBySlideTo = false;
                if (s.params.freeMode) {
                    var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                    s.setWrapperTranslate(newTranslate);
                    s.updateActiveIndex();
                    s.updateClasses();
            
                    if (s.params.autoHeight) {
                        s.updateAutoHeight();
                    }
                }
                else {
                    s.updateClasses();
                    if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                        slideChangedBySlideTo = s.slideTo(s.slides.length - 1, 0, false, true);
                    }
                    else {
                        slideChangedBySlideTo = s.slideTo(s.activeIndex, 0, false, true);
                    }
                }
                if (s.params.lazyLoading && !slideChangedBySlideTo && s.lazy) {
                    s.lazy.load();
                }
                // Return locks after resize
                s.params.allowSwipeToPrev = allowSwipeToPrev;
                s.params.allowSwipeToNext = allowSwipeToNext;
            };
            
            /*=========================
              Events
              ===========================*/
            
            //Define Touch Events
            var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
            if (window.navigator.pointerEnabled) desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];
            else if (window.navigator.msPointerEnabled) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
            s.touchEvents = {
                start : s.support.touch || !s.params.simulateTouch  ? 'touchstart' : desktopEvents[0],
                move : s.support.touch || !s.params.simulateTouch ? 'touchmove' : desktopEvents[1],
                end : s.support.touch || !s.params.simulateTouch ? 'touchend' : desktopEvents[2]
            };
            
            
            // WP8 Touch Events Fix
            if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
                (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction);
            }
            
            // Attach/detach events
            s.initEvents = function (detach) {
                var actionDom = detach ? 'off' : 'on';
                var action = detach ? 'removeEventListener' : 'addEventListener';
                var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
                var target = s.support.touch ? touchEventsTarget : document;
            
                var moveCapture = s.params.nested ? true : false;
            
                //Touch Events
                if (s.browser.ie) {
                    touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                    target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                    target[action](s.touchEvents.end, s.onTouchEnd, false);
                }
                else {
                    if (s.support.touch) {
                        touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                        touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                        touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, false);
                    }
                    if (params.simulateTouch && !s.device.ios && !s.device.android) {
                        touchEventsTarget[action]('mousedown', s.onTouchStart, false);
                        document[action]('mousemove', s.onTouchMove, moveCapture);
                        document[action]('mouseup', s.onTouchEnd, false);
                    }
                }
                window[action]('resize', s.onResize);
            
                // Next, Prev, Index
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    s.nextButton[actionDom]('click', s.onClickNext);
                    if (s.params.a11y && s.a11y) s.nextButton[actionDom]('keydown', s.a11y.onEnterKey);
                }
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    s.prevButton[actionDom]('click', s.onClickPrev);
                    if (s.params.a11y && s.a11y) s.prevButton[actionDom]('keydown', s.a11y.onEnterKey);
                }
                if (s.params.pagination && s.params.paginationClickable) {
                    s.paginationContainer[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
                    if (s.params.a11y && s.a11y) s.paginationContainer[actionDom]('keydown', '.' + s.params.bulletClass, s.a11y.onEnterKey);
                }
            
                // Prevent Links Clicks
                if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true);
            };
            s.attachEvents = function () {
                s.initEvents();
            };
            s.detachEvents = function () {
                s.initEvents(true);
            };
            
            /*=========================
              Handle Clicks
              ===========================*/
            // Prevent Clicks
            s.allowClick = true;
            s.preventClicks = function (e) {
                if (!s.allowClick) {
                    if (s.params.preventClicks) e.preventDefault();
                    if (s.params.preventClicksPropagation && s.animating) {
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                    }
                }
            };
            // Clicks
            s.onClickNext = function (e) {
                e.preventDefault();
                if (s.isEnd && !s.params.loop) return;
                s.slideNext();
            };
            s.onClickPrev = function (e) {
                e.preventDefault();
                if (s.isBeginning && !s.params.loop) return;
                s.slidePrev();
            };
            s.onClickIndex = function (e) {
                e.preventDefault();
                var index = $(this).index() * s.params.slidesPerGroup;
                if (s.params.loop) index = index + s.loopedSlides;
                s.slideTo(index);
            };
            
            /*=========================
              Handle Touches
              ===========================*/
            function findElementInEvent(e, selector) {
                var el = $(e.target);
                if (!el.is(selector)) {
                    if (typeof selector === 'string') {
                        el = el.parents(selector);
                    }
                    else if (selector.nodeType) {
                        var found;
                        el.parents().each(function (index, _el) {
                            if (_el === selector) found = selector;
                        });
                        if (!found) return undefined;
                        else return selector;
                    }
                }
                if (el.length === 0) {
                    return undefined;
                }
                return el[0];
            }
            s.updateClickedSlide = function (e) {
                var slide = findElementInEvent(e, '.' + s.params.slideClass);
                var slideFound = false;
                if (slide) {
                    for (var i = 0; i < s.slides.length; i++) {
                        if (s.slides[i] === slide) slideFound = true;
                    }
                }
            
                if (slide && slideFound) {
                    s.clickedSlide = slide;
                    s.clickedIndex = $(slide).index();
                }
                else {
                    s.clickedSlide = undefined;
                    s.clickedIndex = undefined;
                    return;
                }
                if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
                    var slideToIndex = s.clickedIndex,
                        realIndex,
                        duplicatedSlides;
                    if (s.params.loop) {
                        if (s.animating) return;
                        realIndex = $(s.clickedSlide).attr('data-swiper-slide-index');
                        if (s.params.centeredSlides) {
                            if ((slideToIndex < s.loopedSlides - s.params.slidesPerView/2) || (slideToIndex > s.slides.length - s.loopedSlides + s.params.slidesPerView/2)) {
                                s.fixLoop();
                                slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.swiper-slide-duplicate)').eq(0).index();
                                setTimeout(function () {
                                    s.slideTo(slideToIndex);
                                }, 0);
                            }
                            else {
                                s.slideTo(slideToIndex);
                            }
                        }
                        else {
                            if (slideToIndex > s.slides.length - s.params.slidesPerView) {
                                s.fixLoop();
                                slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.swiper-slide-duplicate)').eq(0).index();
                                setTimeout(function () {
                                    s.slideTo(slideToIndex);
                                }, 0);
                            }
                            else {
                                s.slideTo(slideToIndex);
                            }
                        }
                    }
                    else {
                        s.slideTo(slideToIndex);
                    }
                }
            };
            
            var isTouched,
                isMoved,
                allowTouchCallbacks,
                touchStartTime,
                isScrolling,
                currentTranslate,
                startTranslate,
                allowThresholdMove,
                // Form elements to match
                formElements = 'input, select, textarea, button',
                // Last click time
                lastClickTime = Date.now(), clickTimeout,
                //Velocities
                velocities = [],
                allowMomentumBounce;
            
            // Animating Flag
            s.animating = false;
            
            // Touches information
            s.touches = {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            };
            
            // Touch handlers
            var isTouchEvent, startMoving;
            s.onTouchStart = function (e) {
                if (e.originalEvent) e = e.originalEvent;
                isTouchEvent = e.type === 'touchstart';
                if (!isTouchEvent && 'which' in e && e.which === 3) return;
                if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
                    s.allowClick = true;
                    return;
                }
                if (s.params.swipeHandler) {
                    if (!findElementInEvent(e, s.params.swipeHandler)) return;
                }
            
                var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            
                // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
                if(s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
                    return;
                }
            
                isTouched = true;
                isMoved = false;
                allowTouchCallbacks = true;
                isScrolling = undefined;
                startMoving = undefined;
                s.touches.startX = startX;
                s.touches.startY = startY;
                touchStartTime = Date.now();
                s.allowClick = true;
                s.updateContainerSize();
                s.swipeDirection = undefined;
                if (s.params.threshold > 0) allowThresholdMove = false;
                if (e.type !== 'touchstart') {
                    var preventDefault = true;
                    if ($(e.target).is(formElements)) preventDefault = false;
                    if (document.activeElement && $(document.activeElement).is(formElements)) {
                        document.activeElement.blur();
                    }
                    if (preventDefault) {
                        e.preventDefault();
                    }
                }
                s.emit('onTouchStart', s, e);
            };
            
            s.onTouchMove = function (e) {
                if (e.originalEvent) e = e.originalEvent;
                if (isTouchEvent && e.type === 'mousemove') return;
                if (e.preventedByNestedSwiper) {
                    s.touches.startX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                    s.touches.startY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    return;
                }
                if (s.params.onlyExternal) {
                    // isMoved = true;
                    s.allowClick = false;
                    if (isTouched) {
                        s.touches.startX = s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                        s.touches.startY = s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                        touchStartTime = Date.now();
                    }
                    return;
                }
                if (isTouchEvent && document.activeElement) {
                    if (e.target === document.activeElement && $(e.target).is(formElements)) {
                        isMoved = true;
                        s.allowClick = false;
                        return;
                    }
                }
                if (allowTouchCallbacks) {
                    s.emit('onTouchMove', s, e);
                }
                if (e.targetTouches && e.targetTouches.length > 1) return;
            
                s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
            
                if (typeof isScrolling === 'undefined') {
                    var touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
                    isScrolling = s.isHorizontal() ? touchAngle > s.params.touchAngle : (90 - touchAngle > s.params.touchAngle);
                }
                if (isScrolling) {
                    s.emit('onTouchMoveOpposite', s, e);
                }
                if (typeof startMoving === 'undefined' && s.browser.ieTouch) {
                    if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
                        startMoving = true;
                    }
                }
                if (!isTouched) return;
                if (isScrolling)  {
                    isTouched = false;
                    return;
                }
                if (!startMoving && s.browser.ieTouch) {
                    return;
                }
                s.allowClick = false;
                s.emit('onSliderMove', s, e);
                e.preventDefault();
                if (s.params.touchMoveStopPropagation && !s.params.nested) {
                    e.stopPropagation();
                }
            
                if (!isMoved) {
                    if (params.loop) {
                        s.fixLoop();
                    }
                    startTranslate = s.getWrapperTranslate();
                    s.setWrapperTransition(0);
                    if (s.animating) {
                        s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');
                    }
                    if (s.params.autoplay && s.autoplaying) {
                        if (s.params.autoplayDisableOnInteraction) {
                            s.stopAutoplay();
                        }
                        else {
                            s.pauseAutoplay();
                        }
                    }
                    allowMomentumBounce = false;
                    //Grab Cursor
                    if (s.params.grabCursor) {
                        s.container[0].style.cursor = 'move';
                        s.container[0].style.cursor = '-webkit-grabbing';
                        s.container[0].style.cursor = '-moz-grabbin';
                        s.container[0].style.cursor = 'grabbing';
                    }
                }
                isMoved = true;
            
                var diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
            
                diff = diff * s.params.touchRatio;
                if (s.rtl) diff = -diff;
            
                s.swipeDirection = diff > 0 ? 'prev' : 'next';
                currentTranslate = diff + startTranslate;
            
                var disableParentSwiper = true;
                if ((diff > 0 && currentTranslate > s.minTranslate())) {
                    disableParentSwiper = false;
                    if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
                }
                else if (diff < 0 && currentTranslate < s.maxTranslate()) {
                    disableParentSwiper = false;
                    if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
                }
            
                if (disableParentSwiper) {
                    e.preventedByNestedSwiper = true;
                }
            
                // Directions locks
                if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
                    currentTranslate = startTranslate;
                }
                if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
                    currentTranslate = startTranslate;
                }
            
                if (!s.params.followFinger) return;
            
                // Threshold
                if (s.params.threshold > 0) {
                    if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
                        if (!allowThresholdMove) {
                            allowThresholdMove = true;
                            s.touches.startX = s.touches.currentX;
                            s.touches.startY = s.touches.currentY;
                            currentTranslate = startTranslate;
                            s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
                            return;
                        }
                    }
                    else {
                        currentTranslate = startTranslate;
                        return;
                    }
                }
                // Update active index in free mode
                if (s.params.freeMode || s.params.watchSlidesProgress) {
                    s.updateActiveIndex();
                }
                if (s.params.freeMode) {
                    //Velocity
                    if (velocities.length === 0) {
                        velocities.push({
                            position: s.touches[s.isHorizontal() ? 'startX' : 'startY'],
                            time: touchStartTime
                        });
                    }
                    velocities.push({
                        position: s.touches[s.isHorizontal() ? 'currentX' : 'currentY'],
                        time: (new window.Date()).getTime()
                    });
                }
                // Update progress
                s.updateProgress(currentTranslate);
                // Update translate
                s.setWrapperTranslate(currentTranslate);
            };
            s.onTouchEnd = function (e) {
                if (e.originalEvent) e = e.originalEvent;
                if (allowTouchCallbacks) {
                    s.emit('onTouchEnd', s, e);
                }
                allowTouchCallbacks = false;
                if (!isTouched) return;
                //Return Grab Cursor
                if (s.params.grabCursor && isMoved && isTouched) {
                    s.container[0].style.cursor = 'move';
                    s.container[0].style.cursor = '-webkit-grab';
                    s.container[0].style.cursor = '-moz-grab';
                    s.container[0].style.cursor = 'grab';
                }
            
                // Time diff
                var touchEndTime = Date.now();
                var timeDiff = touchEndTime - touchStartTime;
            
                // Tap, doubleTap, Click
                if (s.allowClick) {
                    s.updateClickedSlide(e);
                    s.emit('onTap', s, e);
                    if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
                        if (clickTimeout) clearTimeout(clickTimeout);
                        clickTimeout = setTimeout(function () {
                            if (!s) return;
                            if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
                                s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
                            }
                            s.emit('onClick', s, e);
                        }, 300);
            
                    }
                    if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
                        if (clickTimeout) clearTimeout(clickTimeout);
                        s.emit('onDoubleTap', s, e);
                    }
                }
            
                lastClickTime = Date.now();
                setTimeout(function () {
                    if (s) s.allowClick = true;
                }, 0);
            
                if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
                    isTouched = isMoved = false;
                    return;
                }
                isTouched = isMoved = false;
            
                var currentPos;
                if (s.params.followFinger) {
                    currentPos = s.rtl ? s.translate : -s.translate;
                }
                else {
                    currentPos = -currentTranslate;
                }
                if (s.params.freeMode) {
                    if (currentPos < -s.minTranslate()) {
                        s.slideTo(s.activeIndex);
                        return;
                    }
                    else if (currentPos > -s.maxTranslate()) {
                        if (s.slides.length < s.snapGrid.length) {
                            s.slideTo(s.snapGrid.length - 1);
                        }
                        else {
                            s.slideTo(s.slides.length - 1);
                        }
                        return;
                    }
            
                    if (s.params.freeModeMomentum) {
                        if (velocities.length > 1) {
                            var lastMoveEvent = velocities.pop(), velocityEvent = velocities.pop();
            
                            var distance = lastMoveEvent.position - velocityEvent.position;
                            var time = lastMoveEvent.time - velocityEvent.time;
                            s.velocity = distance / time;
                            s.velocity = s.velocity / 2;
                            if (Math.abs(s.velocity) < s.params.freeModeMinimumVelocity) {
                                s.velocity = 0;
                            }
                            // this implies that the user stopped moving a finger then released.
                            // There would be no events with distance zero, so the last event is stale.
                            if (time > 150 || (new window.Date().getTime() - lastMoveEvent.time) > 300) {
                                s.velocity = 0;
                            }
                        } else {
                            s.velocity = 0;
                        }
            
                        velocities.length = 0;
                        var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
                        var momentumDistance = s.velocity * momentumDuration;
            
                        var newPosition = s.translate + momentumDistance;
                        if (s.rtl) newPosition = - newPosition;
                        var doBounce = false;
                        var afterBouncePosition;
                        var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
                        if (newPosition < s.maxTranslate()) {
                            if (s.params.freeModeMomentumBounce) {
                                if (newPosition + s.maxTranslate() < -bounceAmount) {
                                    newPosition = s.maxTranslate() - bounceAmount;
                                }
                                afterBouncePosition = s.maxTranslate();
                                doBounce = true;
                                allowMomentumBounce = true;
                            }
                            else {
                                newPosition = s.maxTranslate();
                            }
                        }
                        else if (newPosition > s.minTranslate()) {
                            if (s.params.freeModeMomentumBounce) {
                                if (newPosition - s.minTranslate() > bounceAmount) {
                                    newPosition = s.minTranslate() + bounceAmount;
                                }
                                afterBouncePosition = s.minTranslate();
                                doBounce = true;
                                allowMomentumBounce = true;
                            }
                            else {
                                newPosition = s.minTranslate();
                            }
                        }
                        else if (s.params.freeModeSticky) {
                            var j = 0,
                                nextSlide;
                            for (j = 0; j < s.snapGrid.length; j += 1) {
                                if (s.snapGrid[j] > -newPosition) {
                                    nextSlide = j;
                                    break;
                                }
            
                            }
                            if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
                                newPosition = s.snapGrid[nextSlide];
                            } else {
                                newPosition = s.snapGrid[nextSlide - 1];
                            }
                            if (!s.rtl) newPosition = - newPosition;
                        }
                        //Fix duration
                        if (s.velocity !== 0) {
                            if (s.rtl) {
                                momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
                            }
                            else {
                                momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
                            }
                        }
                        else if (s.params.freeModeSticky) {
                            s.slideReset();
                            return;
                        }
            
                        if (s.params.freeModeMomentumBounce && doBounce) {
                            s.updateProgress(afterBouncePosition);
                            s.setWrapperTransition(momentumDuration);
                            s.setWrapperTranslate(newPosition);
                            s.onTransitionStart();
                            s.animating = true;
                            s.wrapper.transitionEnd(function () {
                                if (!s || !allowMomentumBounce) return;
                                s.emit('onMomentumBounce', s);
            
                                s.setWrapperTransition(s.params.speed);
                                s.setWrapperTranslate(afterBouncePosition);
                                s.wrapper.transitionEnd(function () {
                                    if (!s) return;
                                    s.onTransitionEnd();
                                });
                            });
                        } else if (s.velocity) {
                            s.updateProgress(newPosition);
                            s.setWrapperTransition(momentumDuration);
                            s.setWrapperTranslate(newPosition);
                            s.onTransitionStart();
                            if (!s.animating) {
                                s.animating = true;
                                s.wrapper.transitionEnd(function () {
                                    if (!s) return;
                                    s.onTransitionEnd();
                                });
                            }
            
                        } else {
                            s.updateProgress(newPosition);
                        }
            
                        s.updateActiveIndex();
                    }
                    if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
                        s.updateProgress();
                        s.updateActiveIndex();
                    }
                    return;
                }
            
                // Find current slide
                var i, stopIndex = 0, groupSize = s.slidesSizesGrid[0];
                for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
                    if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
                        if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
                            stopIndex = i;
                            groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
                        }
                    }
                    else {
                        if (currentPos >= s.slidesGrid[i]) {
                            stopIndex = i;
                            groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
                        }
                    }
                }
            
                // Find current slide size
                var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
            
                if (timeDiff > s.params.longSwipesMs) {
                    // Long touches
                    if (!s.params.longSwipes) {
                        s.slideTo(s.activeIndex);
                        return;
                    }
                    if (s.swipeDirection === 'next') {
                        if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);
                        else s.slideTo(stopIndex);
            
                    }
                    if (s.swipeDirection === 'prev') {
                        if (ratio > (1 - s.params.longSwipesRatio)) s.slideTo(stopIndex + s.params.slidesPerGroup);
                        else s.slideTo(stopIndex);
                    }
                }
                else {
                    // Short swipes
                    if (!s.params.shortSwipes) {
                        s.slideTo(s.activeIndex);
                        return;
                    }
                    if (s.swipeDirection === 'next') {
                        s.slideTo(stopIndex + s.params.slidesPerGroup);
            
                    }
                    if (s.swipeDirection === 'prev') {
                        s.slideTo(stopIndex);
                    }
                }
            };
            /*=========================
              Transitions
              ===========================*/
            s._slideTo = function (slideIndex, speed) {
                return s.slideTo(slideIndex, speed, true, true);
            };
            s.slideTo = function (slideIndex, speed, runCallbacks, internal) {
                if (typeof runCallbacks === 'undefined') runCallbacks = true;
                if (typeof slideIndex === 'undefined') slideIndex = 0;
                if (slideIndex < 0) slideIndex = 0;
                s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
                if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;
            
                var translate = - s.snapGrid[s.snapIndex];
                // Stop autoplay
                if (s.params.autoplay && s.autoplaying) {
                    if (internal || !s.params.autoplayDisableOnInteraction) {
                        s.pauseAutoplay(speed);
                    }
                    else {
                        s.stopAutoplay();
                    }
                }
                // Update progress
                s.updateProgress(translate);
            
                // Normalize slideIndex
                for (var i = 0; i < s.slidesGrid.length; i++) {
                    if (- Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
                        slideIndex = i;
                    }
                }
            
                // Directions locks
                if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
                    return false;
                }
                if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
                    if ((s.activeIndex || 0) !== slideIndex ) return false;
                }
            
                // Update Index
                if (typeof speed === 'undefined') speed = s.params.speed;
                s.previousIndex = s.activeIndex || 0;
                s.activeIndex = slideIndex;
            
                if ((s.rtl && -translate === s.translate) || (!s.rtl && translate === s.translate)) {
                    // Update Height
                    if (s.params.autoHeight) {
                        s.updateAutoHeight();
                    }
                    s.updateClasses();
                    if (s.params.effect !== 'slide') {
                        s.setWrapperTranslate(translate);
                    }
                    return false;
                }
                s.updateClasses();
                s.onTransitionStart(runCallbacks);
            
                if (speed === 0) {
                    s.setWrapperTranslate(translate);
                    s.setWrapperTransition(0);
                    s.onTransitionEnd(runCallbacks);
                }
                else {
                    s.setWrapperTranslate(translate);
                    s.setWrapperTransition(speed);
                    if (!s.animating) {
                        s.animating = true;
                        s.wrapper.transitionEnd(function () {
                            if (!s) return;
                            s.onTransitionEnd(runCallbacks);
                        });
                    }
            
                }
            
                return true;
            };
            
            s.onTransitionStart = function (runCallbacks) {
                if (typeof runCallbacks === 'undefined') runCallbacks = true;
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
                if (s.lazy) s.lazy.onTransitionStart();
                if (runCallbacks) {
                    s.emit('onTransitionStart', s);
                    if (s.activeIndex !== s.previousIndex) {
                        s.emit('onSlideChangeStart', s);
                        if (s.activeIndex > s.previousIndex) {
                            s.emit('onSlideNextStart', s);
                        }
                        else {
                            s.emit('onSlidePrevStart', s);
                        }
                    }
            
                }
            };
            s.onTransitionEnd = function (runCallbacks) {
                s.animating = false;
                s.setWrapperTransition(0);
                if (typeof runCallbacks === 'undefined') runCallbacks = true;
                if (s.lazy) s.lazy.onTransitionEnd();
                if (runCallbacks) {
                    s.emit('onTransitionEnd', s);
                    if (s.activeIndex !== s.previousIndex) {
                        s.emit('onSlideChangeEnd', s);
                        if (s.activeIndex > s.previousIndex) {
                            s.emit('onSlideNextEnd', s);
                        }
                        else {
                            s.emit('onSlidePrevEnd', s);
                        }
                    }
                }
                if (s.params.hashnav && s.hashnav) {
                    s.hashnav.setHash();
                }
            
            };
            s.slideNext = function (runCallbacks, speed, internal) {
                if (s.params.loop) {
                    if (s.animating) return false;
                    s.fixLoop();
                    var clientLeft = s.container[0].clientLeft;
                    return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
                }
                else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
            };
            s._slideNext = function (speed) {
                return s.slideNext(true, speed, true);
            };
            s.slidePrev = function (runCallbacks, speed, internal) {
                if (s.params.loop) {
                    if (s.animating) return false;
                    s.fixLoop();
                    var clientLeft = s.container[0].clientLeft;
                    return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
                }
                else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
            };
            s._slidePrev = function (speed) {
                return s.slidePrev(true, speed, true);
            };
            s.slideReset = function (runCallbacks, speed, internal) {
                return s.slideTo(s.activeIndex, speed, runCallbacks);
            };
            
            /*=========================
              Translate/transition helpers
              ===========================*/
            s.setWrapperTransition = function (duration, byController) {
                s.wrapper.transition(duration);
                if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                    s.effects[s.params.effect].setTransition(duration);
                }
                if (s.params.parallax && s.parallax) {
                    s.parallax.setTransition(duration);
                }
                if (s.params.scrollbar && s.scrollbar) {
                    s.scrollbar.setTransition(duration);
                }
                if (s.params.control && s.controller) {
                    s.controller.setTransition(duration, byController);
                }
                s.emit('onSetTransition', s, duration);
            };
            s.setWrapperTranslate = function (translate, updateActiveIndex, byController) {
                var x = 0, y = 0, z = 0;
                if (s.isHorizontal()) {
                    x = s.rtl ? -translate : translate;
                }
                else {
                    y = translate;
                }
            
                if (s.params.roundLengths) {
                    x = round(x);
                    y = round(y);
                }
            
                if (!s.params.virtualTranslate) {
                    if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
                    else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
                }
            
                s.translate = s.isHorizontal() ? x : y;
            
                // Check if we need to update progress
                var progress;
                var translatesDiff = s.maxTranslate() - s.minTranslate();
                if (translatesDiff === 0) {
                    progress = 0;
                }
                else {
                    progress = (translate - s.minTranslate()) / (translatesDiff);
                }
                if (progress !== s.progress) {
                    s.updateProgress(translate);
                }
            
                if (updateActiveIndex) s.updateActiveIndex();
                if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                    s.effects[s.params.effect].setTranslate(s.translate);
                }
                if (s.params.parallax && s.parallax) {
                    s.parallax.setTranslate(s.translate);
                }
                if (s.params.scrollbar && s.scrollbar) {
                    s.scrollbar.setTranslate(s.translate);
                }
                if (s.params.control && s.controller) {
                    s.controller.setTranslate(s.translate, byController);
                }
                s.emit('onSetTranslate', s, s.translate);
            };
            
            s.getTranslate = function (el, axis) {
                var matrix, curTransform, curStyle, transformMatrix;
            
                // automatic axis detection
                if (typeof axis === 'undefined') {
                    axis = 'x';
                }
            
                if (s.params.virtualTranslate) {
                    return s.rtl ? -s.translate : s.translate;
                }
            
                curStyle = window.getComputedStyle(el, null);
                if (window.WebKitCSSMatrix) {
                    curTransform = curStyle.transform || curStyle.webkitTransform;
                    if (curTransform.split(',').length > 6) {
                        curTransform = curTransform.split(', ').map(function(a){
                            return a.replace(',','.');
                        }).join(', ');
                    }
                    // Some old versions of Webkit choke when 'none' is passed; pass
                    // empty string instead in this case
                    transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
                }
                else {
                    transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                    matrix = transformMatrix.toString().split(',');
                }
            
                if (axis === 'x') {
                    //Latest Chrome and webkits Fix
                    if (window.WebKitCSSMatrix)
                        curTransform = transformMatrix.m41;
                    //Crazy IE10 Matrix
                    else if (matrix.length === 16)
                        curTransform = parseFloat(matrix[12]);
                    //Normal Browsers
                    else
                        curTransform = parseFloat(matrix[4]);
                }
                if (axis === 'y') {
                    //Latest Chrome and webkits Fix
                    if (window.WebKitCSSMatrix)
                        curTransform = transformMatrix.m42;
                    //Crazy IE10 Matrix
                    else if (matrix.length === 16)
                        curTransform = parseFloat(matrix[13]);
                    //Normal Browsers
                    else
                        curTransform = parseFloat(matrix[5]);
                }
                if (s.rtl && curTransform) curTransform = -curTransform;
                return curTransform || 0;
            };
            s.getWrapperTranslate = function (axis) {
                if (typeof axis === 'undefined') {
                    axis = s.isHorizontal() ? 'x' : 'y';
                }
                return s.getTranslate(s.wrapper[0], axis);
            };
            
            /*=========================
              Observer
              ===========================*/
            s.observers = [];
            function initObserver(target, options) {
                options = options || {};
                // create an observer instance
                var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
                var observer = new ObserverFunc(function (mutations) {
                    mutations.forEach(function (mutation) {
                        s.onResize(true);
                        s.emit('onObserverUpdate', s, mutation);
                    });
                });
            
                observer.observe(target, {
                    attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
                    childList: typeof options.childList === 'undefined' ? true : options.childList,
                    characterData: typeof options.characterData === 'undefined' ? true : options.characterData
                });
            
                s.observers.push(observer);
            }
            s.initObservers = function () {
                if (s.params.observeParents) {
                    var containerParents = s.container.parents();
                    for (var i = 0; i < containerParents.length; i++) {
                        initObserver(containerParents[i]);
                    }
                }
            
                // Observe container
                initObserver(s.container[0], {childList: false});
            
                // Observe wrapper
                initObserver(s.wrapper[0], {attributes: false});
            };
            s.disconnectObservers = function () {
                for (var i = 0; i < s.observers.length; i++) {
                    s.observers[i].disconnect();
                }
                s.observers = [];
            };
            /*=========================
              Loop
              ===========================*/
            // Create looped slides
            s.createLoop = function () {
                // Remove duplicated slides
                s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
            
                var slides = s.wrapper.children('.' + s.params.slideClass);
            
                if(s.params.slidesPerView === 'auto' && !s.params.loopedSlides) s.params.loopedSlides = slides.length;
            
                s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
                s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
                if (s.loopedSlides > slides.length) {
                    s.loopedSlides = slides.length;
                }
            
                var prependSlides = [], appendSlides = [], i;
                slides.each(function (index, el) {
                    var slide = $(this);
                    if (index < s.loopedSlides) appendSlides.push(el);
                    if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
                    slide.attr('data-swiper-slide-index', index);
                });
                for (i = 0; i < appendSlides.length; i++) {
                    s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
                }
                for (i = prependSlides.length - 1; i >= 0; i--) {
                    s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
                }
            };
            s.destroyLoop = function () {
                s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
                s.slides.removeAttr('data-swiper-slide-index');
            };
            s.reLoop = function (updatePosition) {
                var oldIndex = s.activeIndex - s.loopedSlides;
                s.destroyLoop();
                s.createLoop();
                s.updateSlidesSize();
                if (updatePosition) {
                    s.slideTo(oldIndex + s.loopedSlides, 0, false);
                }
            
            };
            s.fixLoop = function () {
                var newIndex;
                //Fix For Negative Oversliding
                if (s.activeIndex < s.loopedSlides) {
                    newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
                    newIndex = newIndex + s.loopedSlides;
                    s.slideTo(newIndex, 0, false, true);
                }
                //Fix For Positive Oversliding
                else if ((s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2) || (s.activeIndex > s.slides.length - s.params.slidesPerView * 2)) {
                    newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
                    newIndex = newIndex + s.loopedSlides;
                    s.slideTo(newIndex, 0, false, true);
                }
            };
            /*=========================
              Append/Prepend/Remove Slides
              ===========================*/
            s.appendSlide = function (slides) {
                if (s.params.loop) {
                    s.destroyLoop();
                }
                if (typeof slides === 'object' && slides.length) {
                    for (var i = 0; i < slides.length; i++) {
                        if (slides[i]) s.wrapper.append(slides[i]);
                    }
                }
                else {
                    s.wrapper.append(slides);
                }
                if (s.params.loop) {
                    s.createLoop();
                }
                if (!(s.params.observer && s.support.observer)) {
                    s.update(true);
                }
            };
            s.prependSlide = function (slides) {
                if (s.params.loop) {
                    s.destroyLoop();
                }
                var newActiveIndex = s.activeIndex + 1;
                if (typeof slides === 'object' && slides.length) {
                    for (var i = 0; i < slides.length; i++) {
                        if (slides[i]) s.wrapper.prepend(slides[i]);
                    }
                    newActiveIndex = s.activeIndex + slides.length;
                }
                else {
                    s.wrapper.prepend(slides);
                }
                if (s.params.loop) {
                    s.createLoop();
                }
                if (!(s.params.observer && s.support.observer)) {
                    s.update(true);
                }
                s.slideTo(newActiveIndex, 0, false);
            };
            s.removeSlide = function (slidesIndexes) {
                if (s.params.loop) {
                    s.destroyLoop();
                    s.slides = s.wrapper.children('.' + s.params.slideClass);
                }
                var newActiveIndex = s.activeIndex,
                    indexToRemove;
                if (typeof slidesIndexes === 'object' && slidesIndexes.length) {
                    for (var i = 0; i < slidesIndexes.length; i++) {
                        indexToRemove = slidesIndexes[i];
                        if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                        if (indexToRemove < newActiveIndex) newActiveIndex--;
                    }
                    newActiveIndex = Math.max(newActiveIndex, 0);
                }
                else {
                    indexToRemove = slidesIndexes;
                    if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                    if (indexToRemove < newActiveIndex) newActiveIndex--;
                    newActiveIndex = Math.max(newActiveIndex, 0);
                }
            
                if (s.params.loop) {
                    s.createLoop();
                }
            
                if (!(s.params.observer && s.support.observer)) {
                    s.update(true);
                }
                if (s.params.loop) {
                    s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
                }
                else {
                    s.slideTo(newActiveIndex, 0, false);
                }
            
            };
            s.removeAllSlides = function () {
                var slidesIndexes = [];
                for (var i = 0; i < s.slides.length; i++) {
                    slidesIndexes.push(i);
                }
                s.removeSlide(slidesIndexes);
            };
            
        
            /*=========================
              Effects
              ===========================*/
            s.effects = {
                fade: {
                    setTranslate: function () {
                        for (var i = 0; i < s.slides.length; i++) {
                            var slide = s.slides.eq(i);
                            var offset = slide[0].swiperSlideOffset;
                            var tx = -offset;
                            if (!s.params.virtualTranslate) tx = tx - s.translate;
                            var ty = 0;
                            if (!s.isHorizontal()) {
                                ty = tx;
                                tx = 0;
                            }
                            var slideOpacity = s.params.fade.crossFade ?
                                    Math.max(1 - Math.abs(slide[0].progress), 0) :
                                    1 + Math.min(Math.max(slide[0].progress, -1), 0);
                            slide
                                .css({
                                    opacity: slideOpacity
                                })
                                .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');
            
                        }
            
                    },
                    setTransition: function (duration) {
                        s.slides.transition(duration);
                        if (s.params.virtualTranslate && duration !== 0) {
                            var eventTriggered = false;
                            s.slides.transitionEnd(function () {
                                if (eventTriggered) return;
                                if (!s) return;
                                eventTriggered = true;
                                s.animating = false;
                                var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                                for (var i = 0; i < triggerEvents.length; i++) {
                                    s.wrapper.trigger(triggerEvents[i]);
                                }
                            });
                        }
                    }
                },
                flip: {
                    setTranslate: function () {
                        for (var i = 0; i < s.slides.length; i++) {
                            var slide = s.slides.eq(i);
                            var progress = slide[0].progress;
                            if (s.params.flip.limitRotation) {
                                progress = Math.max(Math.min(slide[0].progress, 1), -1);
                            }
                            var offset = slide[0].swiperSlideOffset;
                            var rotate = -180 * progress,
                                rotateY = rotate,
                                rotateX = 0,
                                tx = -offset,
                                ty = 0;
                            if (!s.isHorizontal()) {
                                ty = tx;
                                tx = 0;
                                rotateX = -rotateY;
                                rotateY = 0;
                            }
                            else if (s.rtl) {
                                rotateY = -rotateY;
                            }
            
                            slide[0].style.zIndex = -Math.abs(Math.round(progress)) + s.slides.length;
            
                            if (s.params.flip.slideShadows) {
                                //Set shadows
                                var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                                var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                                if (shadowBefore.length === 0) {
                                    shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                    slide.append(shadowBefore);
                                }
                                if (shadowAfter.length === 0) {
                                    shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                    slide.append(shadowAfter);
                                }
                                if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                                if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                            }
            
                            slide
                                .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
                        }
                    },
                    setTransition: function (duration) {
                        s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                        if (s.params.virtualTranslate && duration !== 0) {
                            var eventTriggered = false;
                            s.slides.eq(s.activeIndex).transitionEnd(function () {
                                if (eventTriggered) return;
                                if (!s) return;
                                if (!$(this).hasClass(s.params.slideActiveClass)) return;
                                eventTriggered = true;
                                s.animating = false;
                                var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                                for (var i = 0; i < triggerEvents.length; i++) {
                                    s.wrapper.trigger(triggerEvents[i]);
                                }
                            });
                        }
                    }
                },
                cube: {
                    setTranslate: function () {
                        var wrapperRotate = 0, cubeShadow;
                        if (s.params.cube.shadow) {
                            if (s.isHorizontal()) {
                                cubeShadow = s.wrapper.find('.swiper-cube-shadow');
                                if (cubeShadow.length === 0) {
                                    cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                    s.wrapper.append(cubeShadow);
                                }
                                cubeShadow.css({height: s.width + 'px'});
                            }
                            else {
                                cubeShadow = s.container.find('.swiper-cube-shadow');
                                if (cubeShadow.length === 0) {
                                    cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                    s.container.append(cubeShadow);
                                }
                            }
                        }
                        for (var i = 0; i < s.slides.length; i++) {
                            var slide = s.slides.eq(i);
                            var slideAngle = i * 90;
                            var round = Math.floor(slideAngle / 360);
                            if (s.rtl) {
                                slideAngle = -slideAngle;
                                round = Math.floor(-slideAngle / 360);
                            }
                            var progress = Math.max(Math.min(slide[0].progress, 1), -1);
                            var tx = 0, ty = 0, tz = 0;
                            if (i % 4 === 0) {
                                tx = - round * 4 * s.size;
                                tz = 0;
                            }
                            else if ((i - 1) % 4 === 0) {
                                tx = 0;
                                tz = - round * 4 * s.size;
                            }
                            else if ((i - 2) % 4 === 0) {
                                tx = s.size + round * 4 * s.size;
                                tz = s.size;
                            }
                            else if ((i - 3) % 4 === 0) {
                                tx = - s.size;
                                tz = 3 * s.size + s.size * 4 * round;
                            }
                            if (s.rtl) {
                                tx = -tx;
                            }
            
                            if (!s.isHorizontal()) {
                                ty = tx;
                                tx = 0;
                            }
            
                            var transform = 'rotateX(' + (s.isHorizontal() ? 0 : -slideAngle) + 'deg) rotateY(' + (s.isHorizontal() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
                            if (progress <= 1 && progress > -1) {
                                wrapperRotate = i * 90 + progress * 90;
                                if (s.rtl) wrapperRotate = -i * 90 - progress * 90;
                            }
                            slide.transform(transform);
                            if (s.params.cube.slideShadows) {
                                //Set shadows
                                var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                                var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                                if (shadowBefore.length === 0) {
                                    shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                    slide.append(shadowBefore);
                                }
                                if (shadowAfter.length === 0) {
                                    shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                    slide.append(shadowAfter);
                                }
                                if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                                if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                            }
                        }
                        s.wrapper.css({
                            '-webkit-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                            '-moz-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                            '-ms-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                            'transform-origin': '50% 50% -' + (s.size / 2) + 'px'
                        });
            
                        if (s.params.cube.shadow) {
                            if (s.isHorizontal()) {
                                cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + (-s.width / 2) + 'px) rotateX(90deg) rotateZ(0deg) scale(' + (s.params.cube.shadowScale) + ')');
                            }
                            else {
                                var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
                                var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
                                var scale1 = s.params.cube.shadowScale,
                                    scale2 = s.params.cube.shadowScale / multiplier,
                                    offset = s.params.cube.shadowOffset;
                                cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + (-s.height / 2 / scale2) + 'px) rotateX(-90deg)');
                            }
                        }
                        var zFactor = (s.isSafari || s.isUiWebView) ? (-s.size / 2) : 0;
                        s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (s.isHorizontal() ? 0 : wrapperRotate) + 'deg) rotateY(' + (s.isHorizontal() ? -wrapperRotate : 0) + 'deg)');
                    },
                    setTransition: function (duration) {
                        s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                        if (s.params.cube.shadow && !s.isHorizontal()) {
                            s.container.find('.swiper-cube-shadow').transition(duration);
                        }
                    }
                },
                coverflow: {
                    setTranslate: function () {
                        var transform = s.translate;
                        var center = s.isHorizontal() ? -transform + s.width / 2 : -transform + s.height / 2;
                        var rotate = s.isHorizontal() ? s.params.coverflow.rotate: -s.params.coverflow.rotate;
                        var translate = s.params.coverflow.depth;
                        //Each slide offset from center
                        for (var i = 0, length = s.slides.length; i < length; i++) {
                            var slide = s.slides.eq(i);
                            var slideSize = s.slidesSizesGrid[i];
                            var slideOffset = slide[0].swiperSlideOffset;
                            var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;
            
                            var rotateY = s.isHorizontal() ? rotate * offsetMultiplier : 0;
                            var rotateX = s.isHorizontal() ? 0 : rotate * offsetMultiplier;
                            // var rotateZ = 0
                            var translateZ = -translate * Math.abs(offsetMultiplier);
            
                            var translateY = s.isHorizontal() ? 0 : s.params.coverflow.stretch * (offsetMultiplier);
                            var translateX = s.isHorizontal() ? s.params.coverflow.stretch * (offsetMultiplier) : 0;
            
                            //Fix for ultra small values
                            if (Math.abs(translateX) < 0.001) translateX = 0;
                            if (Math.abs(translateY) < 0.001) translateY = 0;
                            if (Math.abs(translateZ) < 0.001) translateZ = 0;
                            if (Math.abs(rotateY) < 0.001) rotateY = 0;
                            if (Math.abs(rotateX) < 0.001) rotateX = 0;
            
                            var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
            
                            slide.transform(slideTransform);
                            slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
                            if (s.params.coverflow.slideShadows) {
                                //Set shadows
                                var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                                var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                                if (shadowBefore.length === 0) {
                                    shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                    slide.append(shadowBefore);
                                }
                                if (shadowAfter.length === 0) {
                                    shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                    slide.append(shadowAfter);
                                }
                                if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                                if (shadowAfter.length) shadowAfter[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
                            }
                        }
            
                        //Set correct perspective for IE10
                        if (s.browser.ie) {
                            var ws = s.wrapper[0].style;
                            ws.perspectiveOrigin = center + 'px 50%';
                        }
                    },
                    setTransition: function (duration) {
                        s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    }
                }
            };
        
            /*=========================
              Images Lazy Loading
              ===========================*/
            s.lazy = {
                initialImageLoaded: false,
                loadImageInSlide: function (index, loadInDuplicate) {
                    if (typeof index === 'undefined') return;
                    if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
                    if (s.slides.length === 0) return;
            
                    var slide = s.slides.eq(index);
                    var img = slide.find('.swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)');
                    if (slide.hasClass('swiper-lazy') && !slide.hasClass('swiper-lazy-loaded') && !slide.hasClass('swiper-lazy-loading')) {
                        img = img.add(slide[0]);
                    }
                    if (img.length === 0) return;
            
                    img.each(function () {
                        var _img = $(this);
                        _img.addClass('swiper-lazy-loading');
                        var background = _img.attr('data-background');
                        var src = _img.attr('data-src'),
                            srcset = _img.attr('data-srcset');
                        s.loadImage(_img[0], (src || background), srcset, false, function () {
                            if (background) {
                                _img.css('background-image', 'url("' + background + '")');
                                _img.removeAttr('data-background');
                            }
                            else {
                                if (srcset) {
                                    _img.attr('srcset', srcset);
                                    _img.removeAttr('data-srcset');
                                }
                                if (src) {
                                    _img.attr('src', src);
                                    _img.removeAttr('data-src');
                                }
            
                            }
            
                            _img.addClass('swiper-lazy-loaded').removeClass('swiper-lazy-loading');
                            slide.find('.swiper-lazy-preloader, .preloader').remove();
                            if (s.params.loop && loadInDuplicate) {
                                var slideOriginalIndex = slide.attr('data-swiper-slide-index');
                                if (slide.hasClass(s.params.slideDuplicateClass)) {
                                    var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
                                    s.lazy.loadImageInSlide(originalSlide.index(), false);
                                }
                                else {
                                    var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
                                    s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
                                }
                            }
                            s.emit('onLazyImageReady', s, slide[0], _img[0]);
                        });
            
                        s.emit('onLazyImageLoad', s, slide[0], _img[0]);
                    });
            
                },
                load: function () {
                    var i;
                    if (s.params.watchSlidesVisibility) {
                        s.wrapper.children('.' + s.params.slideVisibleClass).each(function () {
                            s.lazy.loadImageInSlide($(this).index());
                        });
                    }
                    else {
                        if (s.params.slidesPerView > 1) {
                            for (i = s.activeIndex; i < s.activeIndex + s.params.slidesPerView ; i++) {
                                if (s.slides[i]) s.lazy.loadImageInSlide(i);
                            }
                        }
                        else {
                            s.lazy.loadImageInSlide(s.activeIndex);
                        }
                    }
                    if (s.params.lazyLoadingInPrevNext) {
                        if (s.params.slidesPerView > 1 || (s.params.lazyLoadingInPrevNextAmount && s.params.lazyLoadingInPrevNextAmount > 1)) {
                            var amount = s.params.lazyLoadingInPrevNextAmount;
                            var spv = s.params.slidesPerView;
                            var maxIndex = Math.min(s.activeIndex + spv + Math.max(amount, spv), s.slides.length);
                            var minIndex = Math.max(s.activeIndex - Math.max(spv, amount), 0);
                            // Next Slides
                            for (i = s.activeIndex + s.params.slidesPerView; i < maxIndex; i++) {
                                if (s.slides[i]) s.lazy.loadImageInSlide(i);
                            }
                            // Prev Slides
                            for (i = minIndex; i < s.activeIndex ; i++) {
                                if (s.slides[i]) s.lazy.loadImageInSlide(i);
                            }
                        }
                        else {
                            var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
                            if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());
            
                            var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
                            if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
                        }
                    }
                },
                onTransitionStart: function () {
                    if (s.params.lazyLoading) {
                        if (s.params.lazyLoadingOnTransitionStart || (!s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded)) {
                            s.lazy.load();
                        }
                    }
                },
                onTransitionEnd: function () {
                    if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
                        s.lazy.load();
                    }
                }
            };
            
        
            /*=========================
              Scrollbar
              ===========================*/
            s.scrollbar = {
                isTouched: false,
                setDragPosition: function (e) {
                    var sb = s.scrollbar;
                    var x = 0, y = 0;
                    var translate;
                    var pointerPosition = s.isHorizontal() ?
                        ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX) :
                        ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY) ;
                    var position = (pointerPosition) - sb.track.offset()[s.isHorizontal() ? 'left' : 'top'] - sb.dragSize / 2;
                    var positionMin = -s.minTranslate() * sb.moveDivider;
                    var positionMax = -s.maxTranslate() * sb.moveDivider;
                    if (position < positionMin) {
                        position = positionMin;
                    }
                    else if (position > positionMax) {
                        position = positionMax;
                    }
                    position = -position / sb.moveDivider;
                    s.updateProgress(position);
                    s.setWrapperTranslate(position, true);
                },
                dragStart: function (e) {
                    var sb = s.scrollbar;
                    sb.isTouched = true;
                    e.preventDefault();
                    e.stopPropagation();
            
                    sb.setDragPosition(e);
                    clearTimeout(sb.dragTimeout);
            
                    sb.track.transition(0);
                    if (s.params.scrollbarHide) {
                        sb.track.css('opacity', 1);
                    }
                    s.wrapper.transition(100);
                    sb.drag.transition(100);
                    s.emit('onScrollbarDragStart', s);
                },
                dragMove: function (e) {
                    var sb = s.scrollbar;
                    if (!sb.isTouched) return;
                    if (e.preventDefault) e.preventDefault();
                    else e.returnValue = false;
                    sb.setDragPosition(e);
                    s.wrapper.transition(0);
                    sb.track.transition(0);
                    sb.drag.transition(0);
                    s.emit('onScrollbarDragMove', s);
                },
                dragEnd: function (e) {
                    var sb = s.scrollbar;
                    if (!sb.isTouched) return;
                    sb.isTouched = false;
                    if (s.params.scrollbarHide) {
                        clearTimeout(sb.dragTimeout);
                        sb.dragTimeout = setTimeout(function () {
                            sb.track.css('opacity', 0);
                            sb.track.transition(400);
                        }, 1000);
            
                    }
                    s.emit('onScrollbarDragEnd', s);
                    if (s.params.scrollbarSnapOnRelease) {
                        s.slideReset();
                    }
                },
                enableDraggable: function () {
                    var sb = s.scrollbar;
                    var target = s.support.touch ? sb.track : document;
                    $(sb.track).on(s.touchEvents.start, sb.dragStart);
                    $(target).on(s.touchEvents.move, sb.dragMove);
                    $(target).on(s.touchEvents.end, sb.dragEnd);
                },
                disableDraggable: function () {
                    var sb = s.scrollbar;
                    var target = s.support.touch ? sb.track : document;
                    $(sb.track).off(s.touchEvents.start, sb.dragStart);
                    $(target).off(s.touchEvents.move, sb.dragMove);
                    $(target).off(s.touchEvents.end, sb.dragEnd);
                },
                set: function () {
                    if (!s.params.scrollbar) return;
                    var sb = s.scrollbar;
                    sb.track = $(s.params.scrollbar);
                    if (s.params.uniqueNavElements && typeof s.params.scrollbar === 'string' && sb.track.length > 1 && s.container.find(s.params.scrollbar).length === 1) {
                        sb.track = s.container.find(s.params.scrollbar);
                    }
                    sb.drag = sb.track.find('.swiper-scrollbar-drag');
                    if (sb.drag.length === 0) {
                        sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
                        sb.track.append(sb.drag);
                    }
                    sb.drag[0].style.width = '';
                    sb.drag[0].style.height = '';
                    sb.trackSize = s.isHorizontal() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;
            
                    sb.divider = s.size / s.virtualSize;
                    sb.moveDivider = sb.divider * (sb.trackSize / s.size);
                    sb.dragSize = sb.trackSize * sb.divider;
            
                    if (s.isHorizontal()) {
                        sb.drag[0].style.width = sb.dragSize + 'px';
                    }
                    else {
                        sb.drag[0].style.height = sb.dragSize + 'px';
                    }
            
                    if (sb.divider >= 1) {
                        sb.track[0].style.display = 'none';
                    }
                    else {
                        sb.track[0].style.display = '';
                    }
                    if (s.params.scrollbarHide) {
                        sb.track[0].style.opacity = 0;
                    }
                },
                setTranslate: function () {
                    if (!s.params.scrollbar) return;
                    var diff;
                    var sb = s.scrollbar;
                    var translate = s.translate || 0;
                    var newPos;
            
                    var newSize = sb.dragSize;
                    newPos = (sb.trackSize - sb.dragSize) * s.progress;
                    if (s.rtl && s.isHorizontal()) {
                        newPos = -newPos;
                        if (newPos > 0) {
                            newSize = sb.dragSize - newPos;
                            newPos = 0;
                        }
                        else if (-newPos + sb.dragSize > sb.trackSize) {
                            newSize = sb.trackSize + newPos;
                        }
                    }
                    else {
                        if (newPos < 0) {
                            newSize = sb.dragSize + newPos;
                            newPos = 0;
                        }
                        else if (newPos + sb.dragSize > sb.trackSize) {
                            newSize = sb.trackSize - newPos;
                        }
                    }
                    if (s.isHorizontal()) {
                        if (s.support.transforms3d) {
                            sb.drag.transform('translate3d(' + (newPos) + 'px, 0, 0)');
                        }
                        else {
                            sb.drag.transform('translateX(' + (newPos) + 'px)');
                        }
                        sb.drag[0].style.width = newSize + 'px';
                    }
                    else {
                        if (s.support.transforms3d) {
                            sb.drag.transform('translate3d(0px, ' + (newPos) + 'px, 0)');
                        }
                        else {
                            sb.drag.transform('translateY(' + (newPos) + 'px)');
                        }
                        sb.drag[0].style.height = newSize + 'px';
                    }
                    if (s.params.scrollbarHide) {
                        clearTimeout(sb.timeout);
                        sb.track[0].style.opacity = 1;
                        sb.timeout = setTimeout(function () {
                            sb.track[0].style.opacity = 0;
                            sb.track.transition(400);
                        }, 1000);
                    }
                },
                setTransition: function (duration) {
                    if (!s.params.scrollbar) return;
                    s.scrollbar.drag.transition(duration);
                }
            };
        
            /*=========================
              Controller
              ===========================*/
            s.controller = {
                LinearSpline: function (x, y) {
                    this.x = x;
                    this.y = y;
                    this.lastIndex = x.length - 1;
                    // Given an x value (x2), return the expected y2 value:
                    // (x1,y1) is the known point before given value,
                    // (x3,y3) is the known point after given value.
                    var i1, i3;
                    var l = this.x.length;
            
                    this.interpolate = function (x2) {
                        if (!x2) return 0;
            
                        // Get the indexes of x1 and x3 (the array indexes before and after given x2):
                        i3 = binarySearch(this.x, x2);
                        i1 = i3 - 1;
            
                        // We have our indexes i1 & i3, so we can calculate already:
                        // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
                        return ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1];
                    };
            
                    var binarySearch = (function() {
                        var maxIndex, minIndex, guess;
                        return function(array, val) {
                            minIndex = -1;
                            maxIndex = array.length;
                            while (maxIndex - minIndex > 1)
                                if (array[guess = maxIndex + minIndex >> 1] <= val) {
                                    minIndex = guess;
                                } else {
                                    maxIndex = guess;
                                }
                            return maxIndex;
                        };
                    })();
                },
                //xxx: for now i will just save one spline function to to
                getInterpolateFunction: function(c){
                    if(!s.controller.spline) s.controller.spline = s.params.loop ?
                        new s.controller.LinearSpline(s.slidesGrid, c.slidesGrid) :
                        new s.controller.LinearSpline(s.snapGrid, c.snapGrid);
                },
                setTranslate: function (translate, byController) {
                   var controlled = s.params.control;
                   var multiplier, controlledTranslate;
                   function setControlledTranslate(c) {
                        // this will create an Interpolate function based on the snapGrids
                        // x is the Grid of the scrolled scroller and y will be the controlled scroller
                        // it makes sense to create this only once and recall it for the interpolation
                        // the function does a lot of value caching for performance
                        translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
                        if (s.params.controlBy === 'slide') {
                            s.controller.getInterpolateFunction(c);
                            // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
                            // but it did not work out
                            controlledTranslate = -s.controller.spline.interpolate(-translate);
                        }
            
                        if(!controlledTranslate || s.params.controlBy === 'container'){
                            multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
                            controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
                        }
            
                        if (s.params.controlInverse) {
                            controlledTranslate = c.maxTranslate() - controlledTranslate;
                        }
                        c.updateProgress(controlledTranslate);
                        c.setWrapperTranslate(controlledTranslate, false, s);
                        c.updateActiveIndex();
                   }
                   if (s.isArray(controlled)) {
                       for (var i = 0; i < controlled.length; i++) {
                           if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                               setControlledTranslate(controlled[i]);
                           }
                       }
                   }
                   else if (controlled instanceof Swiper && byController !== controlled) {
            
                       setControlledTranslate(controlled);
                   }
                },
                setTransition: function (duration, byController) {
                    var controlled = s.params.control;
                    var i;
                    function setControlledTransition(c) {
                        c.setWrapperTransition(duration, s);
                        if (duration !== 0) {
                            c.onTransitionStart();
                            c.wrapper.transitionEnd(function(){
                                if (!controlled) return;
                                if (c.params.loop && s.params.controlBy === 'slide') {
                                    c.fixLoop();
                                }
                                c.onTransitionEnd();
            
                            });
                        }
                    }
                    if (s.isArray(controlled)) {
                        for (i = 0; i < controlled.length; i++) {
                            if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                                setControlledTransition(controlled[i]);
                            }
                        }
                    }
                    else if (controlled instanceof Swiper && byController !== controlled) {
                        setControlledTransition(controlled);
                    }
                }
            };
        
            /*=========================
              Parallax
              ===========================*/
            function setParallaxTransform(el, progress) {
                el = $(el);
                var p, pX, pY;
                var rtlFactor = s.rtl ? -1 : 1;
            
                p = el.attr('data-swiper-parallax') || '0';
                pX = el.attr('data-swiper-parallax-x');
                pY = el.attr('data-swiper-parallax-y');
                if (pX || pY) {
                    pX = pX || '0';
                    pY = pY || '0';
                }
                else {
                    if (s.isHorizontal()) {
                        pX = p;
                        pY = '0';
                    }
                    else {
                        pY = p;
                        pX = '0';
                    }
                }
            
                if ((pX).indexOf('%') >= 0) {
                    pX = parseInt(pX, 10) * progress * rtlFactor + '%';
                }
                else {
                    pX = pX * progress * rtlFactor + 'px' ;
                }
                if ((pY).indexOf('%') >= 0) {
                    pY = parseInt(pY, 10) * progress + '%';
                }
                else {
                    pY = pY * progress + 'px' ;
                }
            
                el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
            }
            s.parallax = {
                setTranslate: function () {
                    s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
                        setParallaxTransform(this, s.progress);
            
                    });
                    s.slides.each(function () {
                        var slide = $(this);
                        slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
                            var progress = Math.min(Math.max(slide[0].progress, -1), 1);
                            setParallaxTransform(this, progress);
                        });
                    });
                },
                setTransition: function (duration) {
                    if (typeof duration === 'undefined') duration = s.params.speed;
                    s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
                        var el = $(this);
                        var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
                        if (duration === 0) parallaxDuration = 0;
                        el.transition(parallaxDuration);
                    });
                }
            };
            
        
            /*=========================
              Plugins API. Collect all and init all plugins
              ===========================*/
            s._plugins = [];
            for (var plugin in s.plugins) {
                var p = s.plugins[plugin](s, s.params[plugin]);
                if (p) s._plugins.push(p);
            }
            // Method to call all plugins event/method
            s.callPlugins = function (eventName) {
                for (var i = 0; i < s._plugins.length; i++) {
                    if (eventName in s._plugins[i]) {
                        s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                    }
                }
            };
        
            /*=========================
              Events/Callbacks/Plugins Emitter
              ===========================*/
            function normalizeEventName (eventName) {
                if (eventName.indexOf('on') !== 0) {
                    if (eventName[0] !== eventName[0].toUpperCase()) {
                        eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
                    }
                    else {
                        eventName = 'on' + eventName;
                    }
                }
                return eventName;
            }
            s.emitterEventListeners = {
            
            };
            s.emit = function (eventName) {
                // Trigger callbacks
                if (s.params[eventName]) {
                    s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
                var i;
                // Trigger events
                if (s.emitterEventListeners[eventName]) {
                    for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                        s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                    }
                }
                // Trigger plugins
                if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            };
            s.on = function (eventName, handler) {
                eventName = normalizeEventName(eventName);
                if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
                s.emitterEventListeners[eventName].push(handler);
                return s;
            };
            s.off = function (eventName, handler) {
                var i;
                eventName = normalizeEventName(eventName);
                if (typeof handler === 'undefined') {
                    // Remove all handlers for such event
                    s.emitterEventListeners[eventName] = [];
                    return s;
                }
                if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
                for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                    if(s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
                }
                return s;
            };
            s.once = function (eventName, handler) {
                eventName = normalizeEventName(eventName);
                var _handler = function () {
                    handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                    s.off(eventName, _handler);
                };
                s.on(eventName, _handler);
                return s;
            };
        
            // Accessibility tools
            s.a11y = {
                makeFocusable: function ($el) {
                    $el.attr('tabIndex', '0');
                    return $el;
                },
                addRole: function ($el, role) {
                    $el.attr('role', role);
                    return $el;
                },
            
                addLabel: function ($el, label) {
                    $el.attr('aria-label', label);
                    return $el;
                },
            
                disable: function ($el) {
                    $el.attr('aria-disabled', true);
                    return $el;
                },
            
                enable: function ($el) {
                    $el.attr('aria-disabled', false);
                    return $el;
                },
            
                onEnterKey: function (event) {
                    if (event.keyCode !== 13) return;
                    if ($(event.target).is(s.params.nextButton)) {
                        s.onClickNext(event);
                        if (s.isEnd) {
                            s.a11y.notify(s.params.lastSlideMessage);
                        }
                        else {
                            s.a11y.notify(s.params.nextSlideMessage);
                        }
                    }
                    else if ($(event.target).is(s.params.prevButton)) {
                        s.onClickPrev(event);
                        if (s.isBeginning) {
                            s.a11y.notify(s.params.firstSlideMessage);
                        }
                        else {
                            s.a11y.notify(s.params.prevSlideMessage);
                        }
                    }
                    if ($(event.target).is('.' + s.params.bulletClass)) {
                        $(event.target)[0].click();
                    }
                },
            
                liveRegion: $('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
            
                notify: function (message) {
                    var notification = s.a11y.liveRegion;
                    if (notification.length === 0) return;
                    notification.html('');
                    notification.html(message);
                },
                init: function () {
                    // Setup accessibility
                    if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                        s.a11y.makeFocusable(s.nextButton);
                        s.a11y.addRole(s.nextButton, 'button');
                        s.a11y.addLabel(s.nextButton, s.params.nextSlideMessage);
                    }
                    if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                        s.a11y.makeFocusable(s.prevButton);
                        s.a11y.addRole(s.prevButton, 'button');
                        s.a11y.addLabel(s.prevButton, s.params.prevSlideMessage);
                    }
            
                    $(s.container).append(s.a11y.liveRegion);
                },
                initPagination: function () {
                    if (s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length) {
                        s.bullets.each(function () {
                            var bullet = $(this);
                            s.a11y.makeFocusable(bullet);
                            s.a11y.addRole(bullet, 'button');
                            s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1));
                        });
                    }
                },
                destroy: function () {
                    if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
                }
            };
            
        
            /*=========================
              Init/Destroy
              ===========================*/
            s.init = function () {
                if (s.params.loop) s.createLoop();
                s.updateContainerSize();
                s.updateSlidesSize();
                s.updatePagination();
                if (s.params.scrollbar && s.scrollbar) {
                    s.scrollbar.set();
                    if (s.params.scrollbarDraggable) {
                        s.scrollbar.enableDraggable();
                    }
                }
                if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                    if (!s.params.loop) s.updateProgress();
                    s.effects[s.params.effect].setTranslate();
                }
                if (s.params.loop) {
                    s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
                }
                else {
                    s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
                    if (s.params.initialSlide === 0) {
                        if (s.parallax && s.params.parallax) s.parallax.setTranslate();
                        if (s.lazy && s.params.lazyLoading) {
                            s.lazy.load();
                            s.lazy.initialImageLoaded = true;
                        }
                    }
                }
                s.attachEvents();
                if (s.params.observer && s.support.observer) {
                    s.initObservers();
                }
                if (s.params.preloadImages && !s.params.lazyLoading) {
                    s.preloadImages();
                }
                if (s.params.autoplay) {
                    s.startAutoplay();
                }
                if (s.params.keyboardControl) {
                    if (s.enableKeyboardControl) s.enableKeyboardControl();
                }
                if (s.params.mousewheelControl) {
                    if (s.enableMousewheelControl) s.enableMousewheelControl();
                }
                if (s.params.hashnav) {
                    if (s.hashnav) s.hashnav.init();
                }
                if (s.params.a11y && s.a11y) s.a11y.init();
                s.emit('onInit', s);
            };
            
            // Cleanup dynamic styles
            s.cleanupStyles = function () {
                // Container
                s.container.removeClass(s.classNames.join(' ')).removeAttr('style');
            
                // Wrapper
                s.wrapper.removeAttr('style');
            
                // Slides
                if (s.slides && s.slides.length) {
                    s.slides
                        .removeClass([
                          s.params.slideVisibleClass,
                          s.params.slideActiveClass,
                          s.params.slideNextClass,
                          s.params.slidePrevClass
                        ].join(' '))
                        .removeAttr('style')
                        .removeAttr('data-swiper-column')
                        .removeAttr('data-swiper-row');
                }
            
                // Pagination/Bullets
                if (s.paginationContainer && s.paginationContainer.length) {
                    s.paginationContainer.removeClass(s.params.paginationHiddenClass);
                }
                if (s.bullets && s.bullets.length) {
                    s.bullets.removeClass(s.params.bulletActiveClass);
                }
            
                // Buttons
                if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
                if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
            
                // Scrollbar
                if (s.params.scrollbar && s.scrollbar) {
                    if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
                    if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style');
                }
            };
            
            // Destroy
            s.destroy = function (deleteInstance, cleanupStyles) {
                // Detach evebts
                s.detachEvents();
                // Stop autoplay
                s.stopAutoplay();
                // Disable draggable
                if (s.params.scrollbar && s.scrollbar) {
                    if (s.params.scrollbarDraggable) {
                        s.scrollbar.disableDraggable();
                    }
                }
                // Destroy loop
                if (s.params.loop) {
                    s.destroyLoop();
                }
                // Cleanup styles
                if (cleanupStyles) {
                    s.cleanupStyles();
                }
                // Disconnect observer
                s.disconnectObservers();
                // Disable keyboard/mousewheel
                if (s.params.keyboardControl) {
                    if (s.disableKeyboardControl) s.disableKeyboardControl();
                }
                if (s.params.mousewheelControl) {
                    if (s.disableMousewheelControl) s.disableMousewheelControl();
                }
                // Disable a11y
                if (s.params.a11y && s.a11y) s.a11y.destroy();
                // Destroy callback
                s.emit('onDestroy');
                // Delete instance
                if (deleteInstance !== false) s = null;
            };
            
            s.init();
            
        
        
            // Return swiper instance
            return s;
        };
        
        /*==================================================
            Prototype
        ====================================================*/
        Swiper.prototype = {
            isSafari: (function () {
                var ua = navigator.userAgent.toLowerCase();
                return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
            })(),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
            isArray: function (arr) {
                return Object.prototype.toString.apply(arr) === '[object Array]';
            },
            /*==================================================
            Browser
            ====================================================*/
            browser: {
                ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
                ieTouch: (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1) || (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1)
            },
            /*==================================================
            Devices
            ====================================================*/
            device: (function () {
                var ua = navigator.userAgent;
                var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
                var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
                var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
                var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
                return {
                    ios: ipad || iphone || ipod,
                    android: android
                };
            })(),
            /*==================================================
            Feature Detection
            ====================================================*/
            support: {
                touch : (window.Modernizr && Modernizr.touch === true) || (function () {
                    return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
                })(),
        
                transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
                    var div = document.createElement('div').style;
                    return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
                })(),
        
                flexbox: (function () {
                    var div = document.createElement('div').style;
                    var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
                    for (var i = 0; i < styles.length; i++) {
                        if (styles[i] in div) return true;
                    }
                })(),
        
                observer: (function () {
                    return ('MutationObserver' in window || 'WebkitMutationObserver' in window);
                })()
            },
            /*==================================================
            Plugins
            ====================================================*/
            plugins: {}
        };

        /*===========================
        Framework7 Swiper Additions
        ===========================*/
        app.swiper = function (container, params) {
            return new Swiper(container, params);
        };
        app.initPageSwiper = function (pageContainer) {
            pageContainer = $(pageContainer);
            var swipers = pageContainer.find('.swiper-init, .tabs-swipeable-wrap');
            if (swipers.length === 0) return;
            function destroySwiperOnRemove(slider) {
                function destroySwiper() {
                    slider.destroy();
                    pageContainer.off('pageBeforeRemove', destroySwiper);
                }
                pageContainer.on('pageBeforeRemove', destroySwiper);
            }
            swipers.each(function () {
                var swiper = $(this);
                if (swiper.hasClass('tabs-swipeable-wrap')) {
                    swiper.addClass('swiper-container').children('.tabs').addClass('swiper-wrapper').children('.tab').addClass('swiper-slide');
                }
                var params;
                if (swiper.data('swiper')) {
                    params = JSON.parse(swiper.data('swiper'));
                }
                else {
                    params = swiper.dataset();
                }
                if (swiper.hasClass('tabs-swipeable-wrap')) {
                    params.onSlideChangeStart = function (s) {
                        app.showTab(s.slides.eq(s.activeIndex));
                    };
                }
                var _slider = app.swiper(swiper[0], params);
                destroySwiperOnRemove(_slider);
            });
        };
        app.reinitPageSwiper = function (pageContainer) {
            pageContainer = $(pageContainer);
            var sliders = pageContainer.find('.swiper-init, .tabs-swipeable-wrap');
            if (sliders.length === 0) return;
            for (var i = 0; i < sliders.length; i++) {
                var sliderInstance = sliders[0].swiper;
                if (sliderInstance) {
                    sliderInstance.update(true);
                }
            }
        };
        

        /*======================================================
        ************   Picker   ************
        ======================================================*/
        var Picker = function (params) {
            var p = this;
            var defaults = {
                updateValuesOnMomentum: false,
                updateValuesOnTouchmove: true,
                rotateEffect: false,
                momentumRatio: 7,
                freeMode: false,
                // Common settings
                closeByOutsideClick: true,
                scrollToInput: true,
                inputReadOnly: true,
                convertToPopover: true,
                onlyInPopover: false,
                toolbar: true,
                toolbarCloseText: 'Done',
                toolbarTemplate: 
                    '<div class="toolbar">' +
                        '<div class="toolbar-inner">' +
                            '<div class="left"></div>' +
                            '<div class="right">' +
                                '<a href="#" class="link close-picker">{{closeText}}</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
            };
            params = params || {};
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
            p.params = params;
            p.cols = [];
            p.initialized = false;
            
            // Inline flag
            p.inline = p.params.container ? true : false;
        
            // 3D Transforms origin bug, only on safari
            var originBug = app.device.ios || (navigator.userAgent.toLowerCase().indexOf('safari') >= 0 && navigator.userAgent.toLowerCase().indexOf('chrome') < 0) && !app.device.android;
        
            // Should be converted to popover
            function isPopover() {
                var toPopover = false;
                if (!p.params.convertToPopover && !p.params.onlyInPopover) return toPopover;
                if (!p.inline && p.params.input) {
                    if (p.params.onlyInPopover) toPopover = true;
                    else {
                        if (app.device.ios) {
                            toPopover = app.device.ipad ? true : false;
                        }
                        else {
                            if ($(window).width() >= 768) toPopover = true;
                        }
                    }
                } 
                return toPopover; 
            }
            function inPopover() {
                if (p.opened && p.container && p.container.length > 0 && p.container.parents('.popover').length > 0) return true;
                else return false;
            }
        
            // Value
            p.setValue = function (arrValues, transition) {
                var valueIndex = 0;
                if (p.cols.length === 0) {
                    p.value = arrValues;
                    p.updateValue(arrValues);
                    return;
                }
                for (var i = 0; i < p.cols.length; i++) {
                    if (p.cols[i] && !p.cols[i].divider) {
                        p.cols[i].setValue(arrValues[valueIndex], transition);
                        valueIndex++;
                    }
                }
            };
            p.updateValue = function (forceValues) {
                var newValue = forceValues || [];
                var newDisplayValue = [];
                for (var i = 0; i < p.cols.length; i++) {
                    if (!p.cols[i].divider) {
                        newValue.push(p.cols[i].value);
                        newDisplayValue.push(p.cols[i].displayValue);
                    }
                }
                if (newValue.indexOf(undefined) >= 0) {
                    return;
                }
                p.value = newValue;
                p.displayValue = newDisplayValue;
                if (p.params.onChange) {
                    p.params.onChange(p, p.value, p.displayValue);
                }
                if (p.input && p.input.length > 0) {
                    $(p.input).val(p.params.formatValue ? p.params.formatValue(p, p.value, p.displayValue) : p.value.join(' '));
                    $(p.input).trigger('change');
                }
            };
        
            // Columns Handlers
            p.initPickerCol = function (colElement, updateItems) {
                var colContainer = $(colElement);
                var colIndex = colContainer.index();
                var col = p.cols[colIndex];
                if (col.divider) return;
                col.container = colContainer;
                col.wrapper = col.container.find('.picker-items-col-wrapper');
                col.items = col.wrapper.find('.picker-item');
                
                var i, j;
                var wrapperHeight, itemHeight, itemsHeight, minTranslate, maxTranslate;
                col.replaceValues = function (values, displayValues) {
                    col.destroyEvents();
                    col.values = values;
                    col.displayValues = displayValues;
                    var newItemsHTML = p.columnHTML(col, true);
                    col.wrapper.html(newItemsHTML);
                    col.items = col.wrapper.find('.picker-item');
                    col.calcSize();
                    col.setValue(col.values[0], 0, true);
                    col.initEvents();
                };
                col.calcSize = function () {
                    if (p.params.rotateEffect) {
                        col.container.removeClass('picker-items-col-absolute');
                        if (!col.width) col.container.css({width:''});
                    }
                    var colWidth, colHeight;
                    colWidth = 0;
                    colHeight = col.container[0].offsetHeight;
                    wrapperHeight = col.wrapper[0].offsetHeight;
                    itemHeight = col.items[0].offsetHeight;
                    itemsHeight = itemHeight * col.items.length;
                    minTranslate = colHeight / 2 - itemsHeight + itemHeight / 2;
                    maxTranslate = colHeight / 2 - itemHeight / 2;    
                    if (col.width) {
                        colWidth = col.width;
                        if (parseInt(colWidth, 10) === colWidth) colWidth = colWidth + 'px';
                        col.container.css({width: colWidth});
                    }
                    if (p.params.rotateEffect) {
                        if (!col.width) {
                            col.items.each(function () {
                                var item = $(this);
                                item.css({width:'auto'});
                                colWidth = Math.max(colWidth, item[0].offsetWidth);
                                item.css({width:''});
                            });
                            col.container.css({width: (colWidth + 2) + 'px'});
                        }
                        col.container.addClass('picker-items-col-absolute');
                    }
                };
                col.calcSize();
                
                col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)').transition(0);
        
        
                var activeIndex = 0;
                var animationFrameId;
        
                // Set Value Function
                col.setValue = function (newValue, transition, valueCallbacks) {
                    if (typeof transition === 'undefined') transition = '';
                    var newActiveIndex = col.wrapper.find('.picker-item[data-picker-value="' + newValue + '"]').index();
                    if(typeof newActiveIndex === 'undefined' || newActiveIndex === -1) {
                        return;
                    }
                    var newTranslate = -newActiveIndex * itemHeight + maxTranslate;
                    // Update wrapper
                    col.wrapper.transition(transition);
                    col.wrapper.transform('translate3d(0,' + (newTranslate) + 'px,0)');
                        
                    // Watch items
                    if (p.params.updateValuesOnMomentum && col.activeIndex && col.activeIndex !== newActiveIndex ) {
                        $.cancelAnimationFrame(animationFrameId);
                        col.wrapper.transitionEnd(function(){
                            $.cancelAnimationFrame(animationFrameId);
                        });
                        updateDuringScroll();
                    }
        
                    // Update items
                    col.updateItems(newActiveIndex, newTranslate, transition, valueCallbacks);
                };
        
                col.updateItems = function (activeIndex, translate, transition, valueCallbacks) {
                    if (typeof translate === 'undefined') {
                        translate = $.getTranslate(col.wrapper[0], 'y');
                    }
                    if(typeof activeIndex === 'undefined') activeIndex = -Math.round((translate - maxTranslate)/itemHeight);
                    if (activeIndex < 0) activeIndex = 0;
                    if (activeIndex >= col.items.length) activeIndex = col.items.length - 1;
                    var previousActiveIndex = col.activeIndex;
                    col.activeIndex = activeIndex;
                    col.wrapper.find('.picker-selected').removeClass('picker-selected');
        
                    col.items.transition(transition);
                    
                    var selectedItem = col.items.eq(activeIndex).addClass('picker-selected').transform('');
                        
                    // Set 3D rotate effect
                    if (p.params.rotateEffect) {
                        var percentage = (translate - (Math.floor((translate - maxTranslate)/itemHeight) * itemHeight + maxTranslate)) / itemHeight;
                        
                        col.items.each(function () {
                            var item = $(this);
                            var itemOffsetTop = item.index() * itemHeight;
                            var translateOffset = maxTranslate - translate;
                            var itemOffset = itemOffsetTop - translateOffset;
                            var percentage = itemOffset / itemHeight;
        
                            var itemsFit = Math.ceil(col.height / itemHeight / 2) + 1;
                            
                            var angle = (-18*percentage);
                            if (angle > 180) angle = 180;
                            if (angle < -180) angle = -180;
                            // Far class
                            if (Math.abs(percentage) > itemsFit) item.addClass('picker-item-far');
                            else item.removeClass('picker-item-far');
                            // Set transform
                            item.transform('translate3d(0, ' + (-translate + maxTranslate) + 'px, ' + (originBug ? -110 : 0) + 'px) rotateX(' + angle + 'deg)');
                        });
                    }
        
                    if (valueCallbacks || typeof valueCallbacks === 'undefined') {
                        // Update values
                        col.value = selectedItem.attr('data-picker-value');
                        col.displayValue = col.displayValues ? col.displayValues[activeIndex] : col.value;
                        // On change callback
                        if (previousActiveIndex !== activeIndex) {
                            if (col.onChange) {
                                col.onChange(p, col.value, col.displayValue);
                            }
                            p.updateValue();
                        }
                    }
                };
        
                function updateDuringScroll() {
                    animationFrameId = $.requestAnimationFrame(function () {
                        col.updateItems(undefined, undefined, 0);
                        updateDuringScroll();
                    });
                }
        
                // Update items on init
                if (updateItems) col.updateItems(0, maxTranslate, 0);
        
                var allowItemClick = true;
                var isTouched, isMoved, touchStartY, touchCurrentY, touchStartTime, touchEndTime, startTranslate, returnTo, currentTranslate, prevTranslate, velocityTranslate, velocityTime;
                function handleTouchStart (e) {
                    if (isMoved || isTouched) return;
                    e.preventDefault();
                    isTouched = true;
                    touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = (new Date()).getTime();
                    
                    allowItemClick = true;
                    startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
                }
                function handleTouchMove (e) {
                    if (!isTouched) return;
                    e.preventDefault();
                    allowItemClick = false;
                    touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    if (!isMoved) {
                        // First move
                        $.cancelAnimationFrame(animationFrameId);
                        isMoved = true;
                        startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
                        col.wrapper.transition(0);
                    }
                    e.preventDefault();
        
                    var diff = touchCurrentY - touchStartY;
                    currentTranslate = startTranslate + diff;
                    returnTo = undefined;
        
                    // Normalize translate
                    if (currentTranslate < minTranslate) {
                        currentTranslate = minTranslate - Math.pow(minTranslate - currentTranslate, 0.8);
                        returnTo = 'min';
                    }
                    if (currentTranslate > maxTranslate) {
                        currentTranslate = maxTranslate + Math.pow(currentTranslate - maxTranslate, 0.8);
                        returnTo = 'max';
                    }
                    // Transform wrapper
                    col.wrapper.transform('translate3d(0,' + currentTranslate + 'px,0)');
        
                    // Update items
                    col.updateItems(undefined, currentTranslate, 0, p.params.updateValuesOnTouchmove);
                    
                    // Calc velocity
                    velocityTranslate = currentTranslate - prevTranslate || currentTranslate;
                    velocityTime = (new Date()).getTime();
                    prevTranslate = currentTranslate;
                }
                function handleTouchEnd (e) {
                    if (!isTouched || !isMoved) {
                        isTouched = isMoved = false;
                        return;
                    }
                    isTouched = isMoved = false;
                    col.wrapper.transition('');
                    if (returnTo) {
                        if (returnTo === 'min') {
                            col.wrapper.transform('translate3d(0,' + minTranslate + 'px,0)');
                        }
                        else col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)');
                    }
                    touchEndTime = new Date().getTime();
                    var velocity, newTranslate;
                    if (touchEndTime - touchStartTime > 300) {
                        newTranslate = currentTranslate;
                    }
                    else {
                        velocity = Math.abs(velocityTranslate / (touchEndTime - velocityTime));
                        newTranslate = currentTranslate + velocityTranslate * p.params.momentumRatio;
                    }
        
                    newTranslate = Math.max(Math.min(newTranslate, maxTranslate), minTranslate);
        
                    // Active Index
                    var activeIndex = -Math.floor((newTranslate - maxTranslate)/itemHeight);
        
                    // Normalize translate
                    if (!p.params.freeMode) newTranslate = -activeIndex * itemHeight + maxTranslate;
        
                    // Transform wrapper
                    col.wrapper.transform('translate3d(0,' + (parseInt(newTranslate,10)) + 'px,0)');
        
                    // Update items
                    col.updateItems(activeIndex, newTranslate, '', true);
        
                    // Watch items
                    if (p.params.updateValuesOnMomentum) {
                        updateDuringScroll();
                        col.wrapper.transitionEnd(function(){
                            $.cancelAnimationFrame(animationFrameId);
                        });
                    }
        
                    // Allow click
                    setTimeout(function () {
                        allowItemClick = true;
                    }, 100);
                }
        
                function handleClick(e) {
                    if (!allowItemClick) return;
                    $.cancelAnimationFrame(animationFrameId);
                    /*jshint validthis:true */
                    var value = $(this).attr('data-picker-value');
                    col.setValue(value);
                }
        
                col.initEvents = function (detach) {
                    var method = detach ? 'off' : 'on';
                    col.container[method](app.touchEvents.start, handleTouchStart);
                    col.container[method](app.touchEvents.move, handleTouchMove);
                    col.container[method](app.touchEvents.end, handleTouchEnd);
                    col.items[method]('click', handleClick);
                };
                col.destroyEvents = function () {
                    col.initEvents(true);
                };
        
                col.container[0].f7DestroyPickerCol = function () {
                    col.destroyEvents();
                };
        
                col.initEvents();
        
            };
            p.destroyPickerCol = function (colContainer) {
                colContainer = $(colContainer);
                if ('f7DestroyPickerCol' in colContainer[0]) colContainer[0].f7DestroyPickerCol();
            };
            // Resize cols
            function resizeCols() {
                if (!p.opened) return;
                for (var i = 0; i < p.cols.length; i++) {
                    if (!p.cols[i].divider) {
                        p.cols[i].calcSize();
                        p.cols[i].setValue(p.cols[i].value, 0, false);
                    }
                }
            }
            $(window).on('resize', resizeCols);
        
            // HTML Layout
            p.columnHTML = function (col, onlyItems) {
                var columnItemsHTML = '';
                var columnHTML = '';
                if (col.divider) {
                    columnHTML += '<div class="picker-items-col picker-items-col-divider ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '">' + col.content + '</div>';
                }
                else {
                    for (var j = 0; j < col.values.length; j++) {
                        columnItemsHTML += '<div class="picker-item" data-picker-value="' + col.values[j] + '">' + (col.displayValues ? col.displayValues[j] : col.values[j]) + '</div>';
                    }
                    columnHTML += '<div class="picker-items-col ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '"><div class="picker-items-col-wrapper">' + columnItemsHTML + '</div></div>';
                }
                return onlyItems ? columnItemsHTML : columnHTML;
            };
            p.layout = function () {
                var pickerHTML = '';
                var pickerClass = '';
                var i;
                p.cols = [];
                var colsHTML = '';
                for (i = 0; i < p.params.cols.length; i++) {
                    var col = p.params.cols[i];
                    colsHTML += p.columnHTML(p.params.cols[i]);
                    p.cols.push(col);
                }
                pickerClass = 'picker-modal picker-columns ' + (p.params.cssClass || '') + (p.params.rotateEffect ? ' picker-3d' : '');
                pickerHTML =
                    '<div class="' + (pickerClass) + '">' +
                        (p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '') +
                        '<div class="picker-modal-inner picker-items">' +
                            colsHTML +
                            '<div class="picker-center-highlight"></div>' +
                        '</div>' +
                    '</div>';
                    
                p.pickerHTML = pickerHTML;    
            };
        
            // Input Events
            function openOnInput(e) {
                e.preventDefault();
                if (p.opened) return;
                p.open();
                if (p.params.scrollToInput && !isPopover()) {
                    var pageContent = p.input.parents('.page-content');
                    if (pageContent.length === 0) return;
        
                    var paddingTop = parseInt(pageContent.css('padding-top'), 10),
                        paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
                        pageHeight = pageContent[0].offsetHeight - paddingTop - p.container.height(),
                        pageScrollHeight = pageContent[0].scrollHeight - paddingTop - p.container.height(),
                        newPaddingBottom;
                    var inputTop = p.input.offset().top - paddingTop + p.input[0].offsetHeight;
                    if (inputTop > pageHeight) {
                        var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
                        if (scrollTop + pageHeight > pageScrollHeight) {
                            newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
                            if (pageHeight === pageScrollHeight) {
                                newPaddingBottom = p.container.height();
                            }
                            pageContent.css({'padding-bottom': (newPaddingBottom) + 'px'});
                        }
                        pageContent.scrollTop(scrollTop, 300);
                    }
                }
            }
            function closeOnHTMLClick(e) {
                if (inPopover()) return;
                if (p.input && p.input.length > 0) {
                    if (e.target !== p.input[0] && $(e.target).parents('.picker-modal').length === 0) p.close();
                }
                else {
                    if ($(e.target).parents('.picker-modal').length === 0) p.close();   
                }
            }
        
            if (p.params.input) {
                p.input = $(p.params.input);
                if (p.input.length > 0) {
                    if (p.params.inputReadOnly) p.input.prop('readOnly', true);
                    if (!p.inline) {
                        p.input.on('click', openOnInput);    
                    }
                    if (p.params.inputReadOnly) {
                        p.input.on('focus mousedown', function (e) {
                            e.preventDefault();
                        });
                    }
                }
                    
            }
            
            if (!p.inline && p.params.closeByOutsideClick) $('html').on('click', closeOnHTMLClick);
        
            // Open
            function onPickerClose() {
                p.opened = false;
                if (p.input && p.input.length > 0) {
                    p.input.parents('.page-content').css({'padding-bottom': ''});
                    if (app.params.material) p.input.trigger('blur');
                }
                if (p.params.onClose) p.params.onClose(p);
        
                // Destroy events
                p.container.find('.picker-items-col').each(function () {
                    p.destroyPickerCol(this);
                });
            }
        
            p.opened = false;
            p.open = function () {
                var toPopover = isPopover();
        
                if (!p.opened) {
        
                    // Layout
                    p.layout();
        
                    // Append
                    if (toPopover) {
                        p.pickerHTML = '<div class="popover popover-picker-columns"><div class="popover-inner">' + p.pickerHTML + '</div></div>';
                        p.popover = app.popover(p.pickerHTML, p.params.input, true);
                        p.container = $(p.popover).find('.picker-modal');
                        $(p.popover).on('close', function () {
                            onPickerClose();
                        });
                    }
                    else if (p.inline) {
                        p.container = $(p.pickerHTML);
                        p.container.addClass('picker-modal-inline');
                        $(p.params.container).append(p.container);
                    }
                    else {
                        p.container = $(app.pickerModal(p.pickerHTML));
                        $(p.container)
                        .on('close', function () {
                            onPickerClose();
                        });
                    }
        
                    // Store picker instance
                    p.container[0].f7Picker = p;
        
                    // Init Events
                    p.container.find('.picker-items-col').each(function () {
                        var updateItems = true;
                        if ((!p.initialized && p.params.value) || (p.initialized && p.value)) updateItems = false;
                        p.initPickerCol(this, updateItems);
                    });
                    
                    // Set value
                    if (!p.initialized) {
                        if (p.value) p.setValue(p.value, 0);
                        else if (p.params.value) {
                            p.setValue(p.params.value, 0);
                        }
                    }
                    else {
                        if (p.value) p.setValue(p.value, 0);
                    }
        
                    // Material Focus
                    if (p.input && p.input.length > 0 && app.params.material) {
                        p.input.trigger('focus');
                    }
                }
        
                // Set flag
                p.opened = true;
                p.initialized = true;
        
                if (p.params.onOpen) p.params.onOpen(p);
            };
        
            // Close
            p.close = function () {
                if (!p.opened || p.inline) return;
                if (inPopover()) {
                    app.closeModal(p.popover);
                    return;
                }
                else {
                    app.closeModal(p.container);
                    return;
                }
            };
        
            // Destroy
            p.destroy = function () {
                p.close();
                if (p.params.input && p.input.length > 0) {
                    p.input.off('click focus', openOnInput);
                }
                $('html').off('click', closeOnHTMLClick);
                $(window).off('resize', resizeCols);
            };
        
            if (p.inline) {
                p.open();
            }
            else {
                if (!p.initialized && p.params.value) p.setValue(p.params.value);
            }
        
            return p;
        };
        app.picker = function (params) {
            return new Picker(params);
        };

        /*===========================
        Compile Template7 Templates On App Init
        ===========================*/
        app.initTemplate7Templates = function () {
            if (!window.Template7) return;
            Template7.templates = Template7.templates || app.params.templates || {};
            Template7.data = Template7.data || app.params.template7Data || {};
            Template7.cache = Template7.cache || {};
        
            app.templates = Template7.templates;
            app.template7Data = Template7.data;
            app.template7Cache = Template7.cache;
        
            // Precompile templates on app init
            if (!app.params.precompileTemplates) return;
            $('script[type="text/template7"]').each(function () {
                var id = $(this).attr('id');
                if (!id) return;
                Template7.templates[id] = Template7.compile($(this).html());
            });
        };
        

        /*=======================================
        ************   Plugins API   ************
        =======================================*/
        var _plugins = [];
        app.initPlugins = function () {
            // Initialize plugins
            for (var plugin in app.plugins) {
                var p = app.plugins[plugin](app, app.params[plugin]);
                if (p) _plugins.push(p);
            }
        };
        // Plugin Hooks
        app.pluginHook = function (hook) {
            for (var i = 0; i < _plugins.length; i++) {
                if (_plugins[i].hooks && hook in _plugins[i].hooks) {
                    _plugins[i].hooks[hook](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
        };
        // Prevented by plugin
        app.pluginPrevent = function (action) {
            var prevent = false;
            for (var i = 0; i < _plugins.length; i++) {
                if (_plugins[i].prevents && action in _plugins[i].prevents) {
                    if (_plugins[i].prevents[action](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])) prevent = true;
                }
            }
            return prevent;
        };
        // Preprocess content by plugin
        app.pluginProcess = function (process, data) {
            var processed = data;
            for (var i = 0; i < _plugins.length; i++) {
                if (_plugins[i].preprocess && process in _plugins[i].preprocess) {
                    processed = _plugins[i].preprocess[process](data, arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
                }
            }
            return processed;
        };
        
        

        /*======================================================
        ************   App Init   ************
        ======================================================*/
        app.init = function () {
            // Compile Template7 templates on app load
            if (app.initTemplate7Templates) app.initTemplate7Templates();
            
            // Init Plugins
            if (app.initPlugins) app.initPlugins();
            
            // Init Device
            if (app.getDeviceInfo) app.getDeviceInfo();
            
            // Init Click events
            if (app.initFastClicks && app.params.fastClicks) app.initFastClicks();
            if (app.initClickEvents) app.initClickEvents();
        
            // Init each page callbacks
            $('.page:not(.cached)').each(function () {
                app.initPageWithCallback(this);
            });
        
            // Init each navbar callbacks
            $('.navbar:not(.cached)').each(function () {
                app.initNavbarWithCallback(this); 
            });
            
            // Init resize events
            if (app.initResize) app.initResize();
        
            // Init push state
            if (app.initPushState && app.params.pushState) app.initPushState();
        
            // Init Live Swipeouts events
            if (app.initSwipeout && app.params.swipeout) app.initSwipeout();
        
            // Init Live Sortable events
            if (app.initSortable && app.params.sortable) app.initSortable();
        
            // Init Live Swipe Panels
            if (app.initSwipePanels && (app.params.swipePanel || app.params.swipePanelOnlyClose)) app.initSwipePanels();
            
            // Init Material Inputs
            if (app.params.material && app.initMaterialWatchInputs) app.initMaterialWatchInputs();
            
            // App Init callback
            if (app.params.onAppInit) app.params.onAppInit();
        
            // Plugin app init hook
            app.pluginHook('appInit');
        };
        if (app.params.init) app.init();
        

            //Return instance        
            return app;
        };
        

        /*===========================
        Dom7 Library
        ===========================*/
        var Dom7 = (function () {
            var Dom7 = function (arr) {
                var _this = this, i = 0;
                // Create array-like object
                for (i = 0; i < arr.length; i++) {
                    _this[i] = arr[i];
                }
                _this.length = arr.length;
                // Return collection with methods
                return this;
            };
            var $ = function (selector, context) {
                var arr = [], i = 0;
                if (selector && !context) {
                    if (selector instanceof Dom7) {
                        return selector;
                    }
                }
                if (selector) {
                    // String
                    if (typeof selector === 'string') {
                        var els, tempParent, html;
                        selector = html = selector.trim();
                        if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                            var toCreate = 'div';
                            if (html.indexOf('<li') === 0) toCreate = 'ul';
                            if (html.indexOf('<tr') === 0) toCreate = 'tbody';
                            if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
                            if (html.indexOf('<tbody') === 0) toCreate = 'table';
                            if (html.indexOf('<option') === 0) toCreate = 'select';
                            tempParent = document.createElement(toCreate);
                            tempParent.innerHTML = html;
                            for (i = 0; i < tempParent.childNodes.length; i++) {
                                arr.push(tempParent.childNodes[i]);
                            }
                        }
                        else {
                            if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                                // Pure ID selector
                                els = [document.getElementById(selector.split('#')[1])];
                            }
                            else {
                                // Other selectors
                                els = (context || document).querySelectorAll(selector);
                            }
                            for (i = 0; i < els.length; i++) {
                                if (els[i]) arr.push(els[i]);
                            }
                        }
                    }
                    // Node/element
                    else if (selector.nodeType || selector === window || selector === document) {
                        arr.push(selector);
                    }
                    //Array of elements or instance of Dom
                    else if (selector.length > 0 && selector[0].nodeType) {
                        for (i = 0; i < selector.length; i++) {
                            arr.push(selector[i]);
                        }
                    }
                }
                return new Dom7(arr);
            };

        Dom7.prototype = {
            // Classes and attriutes
            addClass: function (className) {
                if (typeof className === 'undefined') {
                    return this;
                }
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof this[j].classList !== 'undefined') this[j].classList.add(classes[i]);
                    }
                }
                return this;
            },
            removeClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof this[j].classList !== 'undefined') this[j].classList.remove(classes[i]);
                    }
                }
                return this;
            },
            hasClass: function (className) {
                if (!this[0]) return false;
                else return this[0].classList.contains(className);
            },
            toggleClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof this[j].classList !== 'undefined') this[j].classList.toggle(classes[i]);
                    }
                }
                return this;
            },
            attr: function (attrs, value) {
                if (arguments.length === 1 && typeof attrs === 'string') {
                    // Get attr
                    if (this[0]) return this[0].getAttribute(attrs);
                    else return undefined;
                }
                else {
                    // Set attrs
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i].setAttribute(attrs, value);
                        }
                        else {
                            // Object
                            for (var attrName in attrs) {
                                this[i][attrName] = attrs[attrName];
                                this[i].setAttribute(attrName, attrs[attrName]);
                            }
                        }
                    }
                    return this;
                }
            },
            removeAttr: function (attr) {
                for (var i = 0; i < this.length; i++) {
                    this[i].removeAttribute(attr);
                }
                return this;
            },
            prop: function (props, value) {
                if (arguments.length === 1 && typeof props === 'string') {
                    // Get prop
                    if (this[0]) return this[0][props];
                    else return undefined;
                }
                else {
                    // Set props
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i][props] = value;
                        }
                        else {
                            // Object
                            for (var propName in props) {
                                this[i][propName] = props[propName];
                            }
                        }
                    }
                    return this;
                }
            },
            data: function (key, value) {
                if (typeof value === 'undefined') {
                    // Get value
                    if (this[0]) {
                        if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage)) {
                            return this[0].dom7ElementDataStorage[key];
                        }
                        else {
                            var dataKey = this[0].getAttribute('data-' + key);    
                            if (dataKey) {
                                return dataKey;
                            }
                            else return undefined;
                        }
                    }
                    else return undefined;
                }
                else {
                    // Set value
                    for (var i = 0; i < this.length; i++) {
                        var el = this[i];
                        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
                        el.dom7ElementDataStorage[key] = value;
                    }
                    return this;
                }
            },
            removeData: function(key) {
                for (var i = 0; i < this.length; i++) {
                    var el = this[i];
                    if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
                        el.dom7ElementDataStorage[key] = null;
                        delete el.dom7ElementDataStorage[key];
                    }
                }
            },
            dataset: function () {
                var el = this[0];
                if (el) {
                    var dataset = {};
                    if (el.dataset) {
                        for (var dataKey in el.dataset) {
                            dataset[dataKey] = el.dataset[dataKey];
                        }
                    }
                    else {
                        for (var i = 0; i < el.attributes.length; i++) {
                            var attr = el.attributes[i];
                            if (attr.name.indexOf('data-') >= 0) {
                                dataset[$.toCamelCase(attr.name.split('data-')[1])] = attr.value;
                            }
                        }
                    }
                    for (var key in dataset) {
                        if (dataset[key] === 'false') dataset[key] = false;
                        else if (dataset[key] === 'true') dataset[key] = true;
                        else if (parseFloat(dataset[key]) === dataset[key] * 1) dataset[key] = dataset[key] * 1;
                    }
                    return dataset;
                }
                else return undefined;
            },
            val: function (value) {
                if (typeof value === 'undefined') {
                    if (this[0]) return this[0].value;
                    else return undefined;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].value = value;
                    }
                    return this;
                }
            },
            // Transforms
            transform : function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            },
            transition: function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            },
            //Events
            on: function (eventName, targetSelector, listener, capture) {
                function handleLiveEvent(e) {
                    var target = e.target;
                    if ($(target).is(targetSelector)) listener.call(target, e);
                    else {
                        var parents = $(target).parents();
                        for (var k = 0; k < parents.length; k++) {
                            if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
                        }
                    }
                }
                var events = eventName.split(' ');
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof targetSelector === 'function' || targetSelector === false) {
                        // Usual events
                        if (typeof targetSelector === 'function') {
                            listener = arguments[1];
                            capture = arguments[2] || false;
                        }
                        for (j = 0; j < events.length; j++) {
                            this[i].addEventListener(events[j], listener, capture);
                        }
                    }
                    else {
                        //Live events
                        for (j = 0; j < events.length; j++) {
                            if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
                            this[i].dom7LiveListeners.push({listener: listener, liveListener: handleLiveEvent});
                            this[i].addEventListener(events[j], handleLiveEvent, capture);
                        }
                    }
                }
        
                return this;
            },
            off: function (eventName, targetSelector, listener, capture) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof targetSelector === 'function' || targetSelector === false) {
                            // Usual events
                            if (typeof targetSelector === 'function') {
                                listener = arguments[1];
                                capture = arguments[2] || false;
                            }
                            this[j].removeEventListener(events[i], listener, capture);
                        }
                        else {
                            // Live event
                            if (this[j].dom7LiveListeners) {
                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
                                    if (this[j].dom7LiveListeners[k].listener === listener) {
                                        this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                                    }
                                }
                            }
                        }
                    }
                }
                return this;
            },
            once: function (eventName, targetSelector, listener, capture) {
                var dom = this;
                if (typeof targetSelector === 'function') {
                    listener = arguments[1];
                    capture = arguments[2];
                    targetSelector = false;
                }
                function proxy(e) {
                    listener.call(e.target, e);
                    dom.off(eventName, targetSelector, proxy, capture);
                }
                return dom.on(eventName, targetSelector, proxy, capture);
            },
            trigger: function (eventName, eventData) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        var evt;
                        try {
                            evt = new CustomEvent(events[i], {detail: eventData, bubbles: true, cancelable: true});
                        }
                        catch (e) {
                            evt = document.createEvent('Event');
                            evt.initEvent(events[i], true, true);
                            evt.detail = eventData;
                        }
                        this[j].dispatchEvent(evt);
                    }
                }
                return this;
            },
            transitionEnd: function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            animationEnd: function (callback) {
                var events = ['webkitAnimationEnd', 'OAnimationEnd', 'MSAnimationEnd', 'animationend'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    callback(e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            // Sizing/Styles
            width: function () {
                if (this[0] === window) {
                    return window.innerWidth;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('width'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerWidth: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins) {
                        var styles = this.styles();
                        return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));    
                    }
                    else
                        return this[0].offsetWidth;
                }
                else return null;
            },
            height: function () {
                if (this[0] === window) {
                    return window.innerHeight;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('height'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerHeight: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins) {
                        var styles = this.styles();
                        return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));    
                    }
                    else
                        return this[0].offsetHeight;
                }
                else return null;
            },
            offset: function () {
                if (this.length > 0) {
                    var el = this[0];
                    var box = el.getBoundingClientRect();
                    var body = document.body;
                    var clientTop  = el.clientTop  || body.clientTop  || 0;
                    var clientLeft = el.clientLeft || body.clientLeft || 0;
                    var scrollTop  = window.pageYOffset || el.scrollTop;
                    var scrollLeft = window.pageXOffset || el.scrollLeft;
                    return {
                        top: box.top  + scrollTop  - clientTop,
                        left: box.left + scrollLeft - clientLeft
                    };
                }
                else {
                    return null;
                }
            },
            hide: function () {
                for (var i = 0; i < this.length; i++) {
                    this[i].style.display = 'none';
                }
                return this;
            },
            show: function () {
                for (var i = 0; i < this.length; i++) {
                    this[i].style.display = 'block';
                }
                return this;
            },
            styles: function () {
                var i, styles;
                if (this[0]) return window.getComputedStyle(this[0], null);
                else return undefined;
            },
            css: function (props, value) {
                var i;
                if (arguments.length === 1) {
                    if (typeof props === 'string') {
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
                    }
                    else {
                        for (i = 0; i < this.length; i++) {
                            for (var prop in props) {
                                this[i].style[prop] = props[prop];
                            }
                        }
                        return this;
                    }
                }
                if (arguments.length === 2 && typeof props === 'string') {
                    for (i = 0; i < this.length; i++) {
                        this[i].style[props] = value;
                    }
                    return this;
                }
                return this;
            },
        
            //Dom manipulation
            each: function (callback) {
                for (var i = 0; i < this.length; i++) {
                    callback.call(this[i], i, this[i]);
                }
                return this;
            },
            filter: function (callback) {
                var matchedItems = [];
                var dom = this;
                for (var i = 0; i < dom.length; i++) {
                    if (callback.call(dom[i], i, dom[i])) matchedItems.push(dom[i]);
                }
                return new Dom7(matchedItems);
            },
            html: function (html) {
                if (typeof html === 'undefined') {
                    return this[0] ? this[0].innerHTML : undefined;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].innerHTML = html;
                    }
                    return this;
                }
            },
            text: function (text) {
                if (typeof text === 'undefined') {
                    if (this[0]) {
                        return this[0].textContent.trim();
                    }
                    else return null;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].textContent = text;
                    }
                    return this;
                }
            },
            is: function (selector) {
                if (!this[0] || typeof selector === 'undefined') return false;
                var compareWith, i;
                if (typeof selector === 'string') {
                    var el = this[0];
                    if (el === document) return selector === document;
                    if (el === window) return selector === window;
        
                    if (el.matches) return el.matches(selector);
                    else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                    else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
                    else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                    else {
                        compareWith = $(selector);
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                }
                else if (selector === document) return this[0] === document;
                else if (selector === window) return this[0] === window;
                else {
                    if (selector.nodeType || selector instanceof Dom7) {
                        compareWith = selector.nodeType ? [selector] : selector;
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                    return false;
                }
        
            },
            indexOf: function (el) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] === el) return i;
                }
            },
            index: function () {
                if (this[0]) {
                    var child = this[0];
                    var i = 0;
                    while ((child = child.previousSibling) !== null) {
                        if (child.nodeType === 1) i++;
                    }
                    return i;
                }
                else return undefined;
            },
            eq: function (index) {
                if (typeof index === 'undefined') return this;
                var length = this.length;
                var returnIndex;
                if (index > length - 1) {
                    return new Dom7([]);
                }
                if (index < 0) {
                    returnIndex = length + index;
                    if (returnIndex < 0) return new Dom7([]);
                    else return new Dom7([this[returnIndex]]);
                }
                return new Dom7([this[index]]);
            },
            append: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        while (tempDiv.firstChild) {
                            this[i].appendChild(tempDiv.firstChild);
                        }
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].appendChild(newChild[j]);
                        }
                    }
                    else {
                        this[i].appendChild(newChild);
                    }
                }
                return this;
            },
            appendTo: function (parent) {
                $(parent).append(this);
                return this;
            },
            prepend: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                        }
                        // this[i].insertAdjacentHTML('afterbegin', newChild);
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
                        }
                    }
                    else {
                        this[i].insertBefore(newChild, this[i].childNodes[0]);
                    }
                }
                return this;
            },
            prependTo: function (parent) {
                $(parent).prepend(this);
                return this;
            },
            insertBefore: function (selector) {
                var before = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (before.length === 1) {
                        before[0].parentNode.insertBefore(this[i], before[0]);
                    }
                    else if (before.length > 1) {
                        for (var j = 0; j < before.length; j++) {
                            before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                        }
                    }
                }
            },
            insertAfter: function (selector) {
                var after = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (after.length === 1) {
                        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
                    }
                    else if (after.length > 1) {
                        for (var j = 0; j < after.length; j++) {
                            after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                        }
                    }
                }
            },
            next: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            nextAll: function (selector) {
                var nextEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.nextElementSibling) {
                    var next = el.nextElementSibling;
                    if (selector) {
                        if($(next).is(selector)) nextEls.push(next);
                    }
                    else nextEls.push(next);
                    el = next;
                }
                return new Dom7(nextEls);
            },
            prev: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            prevAll: function (selector) {
                var prevEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.previousElementSibling) {
                    var prev = el.previousElementSibling;
                    if (selector) {
                        if($(prev).is(selector)) prevEls.push(prev);
                    }
                    else prevEls.push(prev);
                    el = prev;
                }
                return new Dom7(prevEls);
            },
            parent: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    if (this[i].parentNode !== null) {
                        if (selector) {
                            if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
                        }
                        else {
                           parents.push(this[i].parentNode);
                        }
                    }
                }
                return $($.unique(parents));
            },
            parents: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    var parent = this[i].parentNode;
                    while (parent) {
                        if (selector) {
                            if ($(parent).is(selector)) parents.push(parent);
                        }
                        else {
                            parents.push(parent);
                        }
                        parent = parent.parentNode;
                    }
                }
                return $($.unique(parents));
            },
            closest: function (selector) {
                var closest = this;
                if (typeof selector === 'undefined') {
                    return new Dom7([]);
                }
                if (!closest.is(selector)) {
                    closest = closest.parents(selector).eq(0);
                }
                return closest;
            },
            find : function (selector) {
                var foundElements = [];
                for (var i = 0; i < this.length; i++) {
                    var found = this[i].querySelectorAll(selector);
                    for (var j = 0; j < found.length; j++) {
                        foundElements.push(found[j]);
                    }
                }
                return new Dom7(foundElements);
            },
            children: function (selector) {
                var children = [];
                for (var i = 0; i < this.length; i++) {
                    var childNodes = this[i].childNodes;
        
                    for (var j = 0; j < childNodes.length; j++) {
                        if (!selector) {
                            if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
                        }
                        else {
                            if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
                        }
                    }
                }
                return new Dom7($.unique(children));
            },
            remove: function () {
                for (var i = 0; i < this.length; i++) {
                    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
                }
                return this;
            },
            detach: function () {
                return this.remove();
            },
            add: function () {
                var dom = this;
                var i, j;
                for (i = 0; i < arguments.length; i++) {
                    var toAdd = $(arguments[i]);
                    for (j = 0; j < toAdd.length; j++) {
                        dom[dom.length] = toAdd[j];
                        dom.length++;
                    }
                }
                return dom;
            }
        };
        
        // Shortcuts
        (function () {
            var shortcuts = ('click blur focus focusin focusout keyup keydown keypress submit change mousedown mousemove mouseup mouseenter mouseleave mouseout mouseover touchstart touchend touchmove resize scroll').split(' ');
            var notTrigger = ('resize scroll').split(' ');
            function createMethod(name) {
                Dom7.prototype[name] = function (targetSelector, listener, capture) {
                    var i;
                    if (typeof targetSelector === 'undefined') {
                        for (i = 0; i < this.length; i++) {
                            if (notTrigger.indexOf(name) < 0) {
                                if (name in this[i]) this[i][name]();
                                else {
                                    $(this[i]).trigger(name);
                                }
                            }
                        }
                        return this;
                    }
                    else {
                        return this.on(name, targetSelector, listener, capture);
                    }
                };
            }
            for (var i = 0; i < shortcuts.length; i++) {
                createMethod(shortcuts[i]);
            }
        })();
        

        // DOM Library Utilites
        $.parseUrlQuery = function (url) {
            var query = {}, i, params, param;
            if (url.indexOf('?') >= 0) url = url.split('?')[1];
            else return query;
            params = url.split('&');
            for (i = 0; i < params.length; i++) {
                param = params[i].split('=');
                query[param[0]] = param[1];
            }
            return query;
        };
        $.isArray = function (arr) {
            if (Object.prototype.toString.apply(arr) === '[object Array]') return true;
            else return false;
        };
        $.each = function (obj, callback) {
            if (typeof obj !== 'object') return;
            if (!callback) return;
            var i, prop;
            if ($.isArray(obj) || obj instanceof Dom7) {
                // Array
                for (i = 0; i < obj.length; i++) {
                    callback(i, obj[i]);
                }
            }
            else {
                // Object
                for (prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        callback(prop, obj[prop]);
                    }
                }
            }
        };
        $.unique = function (arr) {
            var unique = [];
            for (var i = 0; i < arr.length; i++) {
                if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
            }
            return unique;
        };
        $.serializeObject = $.param = function (obj, parents) {
            if (typeof obj === 'string') return obj;
            var resultArray = [];
            var separator = '&';
            parents = parents || [];
            var newParents;
            function var_name(name) {
                if (parents.length > 0) {
                    var _parents = '';
                    for (var j = 0; j < parents.length; j++) {
                        if (j === 0) _parents += parents[j];
                        else _parents += '[' + encodeURIComponent(parents[j]) + ']';
                    }
                    return _parents + '[' + encodeURIComponent(name) + ']';
                }
                else {
                    return encodeURIComponent(name);
                }
            }
            function var_value(value) {
                return encodeURIComponent(value);
            }
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    var toPush;
                    if ($.isArray(obj[prop])) {
                        toPush = [];
                        for (var i = 0; i < obj[prop].length; i ++) {
                            if (!$.isArray(obj[prop][i]) && typeof obj[prop][i] === 'object') {
                                newParents = parents.slice();
                                newParents.push(prop);
                                newParents.push(i + '');
                                toPush.push($.serializeObject(obj[prop][i], newParents));
                            }
                            else {
                                toPush.push(var_name(prop) + '[]=' + var_value(obj[prop][i]));
                            }
                            
                        }
                        if (toPush.length > 0) resultArray.push(toPush.join(separator));
                    }
                    else if (typeof obj[prop] === 'object') {
                        // Object, convert to named array
                        newParents = parents.slice();
                        newParents.push(prop);
                        toPush = $.serializeObject(obj[prop], newParents);
                        if (toPush !== '') resultArray.push(toPush);
                    }
                    else if (typeof obj[prop] !== 'undefined' && obj[prop] !== '') {
                        // Should be string or plain value
                        resultArray.push(var_name(prop) + '=' + var_value(obj[prop]));
                    }
                }
            }
            return resultArray.join(separator);
        };
        $.toCamelCase = function (string) {
            return string.toLowerCase().replace(/-(.)/g, function(match, group1) {
                return group1.toUpperCase();
            });
        };
        $.dataset = function (el) {
            return $(el).dataset();
        };
        $.getTranslate = function (el, axis) {
            var matrix, curTransform, curStyle, transformMatrix;
        
            // automatic axis detection
            if (typeof axis === 'undefined') {
                axis = 'x';
            }
        
            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(',').length > 6) {
                    curTransform = curTransform.split(', ').map(function(a){
                        return a.replace(',','.');
                    }).join(', ');
                }
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
            }
            else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }
        
            if (axis === 'x') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m41;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[12]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[4]);
            }
            if (axis === 'y') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m42;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[13]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[5]);
            }
            
            return curTransform || 0;
        };
        
        $.requestAnimationFrame = function (callback) {
            if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
            else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
            else if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame(callback);
            else {
                return window.setTimeout(callback, 1000 / 60);
            }
        };
        $.cancelAnimationFrame = function (id) {
            if (window.cancelAnimationFrame) return window.cancelAnimationFrame(id);
            else if (window.webkitCancelAnimationFrame) return window.webkitCancelAnimationFrame(id);
            else if (window.mozCancelAnimationFrame) return window.mozCancelAnimationFrame(id);
            else {
                return window.clearTimeout(id);
            }  
        };
        $.supportTouch = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
        
        // Link to prototype
        $.fn = Dom7.prototype;
        
        // Plugins
        $.fn.scrollTo = function (left, top, duration, easing, callback) {
            if (arguments.length === 4 && typeof easing === 'function') {
                callback = easing;
                easing = undefined;
            }
            return this.each(function () {
                var el = this;
                var currentTop, currentLeft, maxTop, maxLeft, newTop, newLeft, scrollTop, scrollLeft;
                var animateTop = top > 0 || top === 0;
                var animateLeft = left > 0 || left === 0;
                if (typeof easing === 'undefined') {
                    easing = 'swing';
                }
                if (animateTop) {
                    currentTop = el.scrollTop;
                    if (!duration) {
                        el.scrollTop = top;
                    }
                }
                if (animateLeft) {
                    currentLeft = el.scrollLeft;
                    if (!duration) {
                        el.scrollLeft = left;
                    }
                }
                if (!duration) return;
                if (animateTop) {
                    maxTop = el.scrollHeight - el.offsetHeight;
                    newTop = Math.max(Math.min(top, maxTop), 0);
                }
                if (animateLeft) {
                    maxLeft = el.scrollWidth - el.offsetWidth;
                    newLeft = Math.max(Math.min(left, maxLeft), 0);
                }
                var startTime = null;
                if (animateTop && newTop === currentTop) animateTop = false;
                if (animateLeft && newLeft === currentLeft) animateLeft = false;
                function render(time) {
                    if (time === undefined) {
                        time = new Date().getTime();
                    }
                    if (startTime === null) {
                        startTime = time;
                    }
                    var doneLeft, doneTop, done;
                    var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
                    var easeProgress = easing === 'linear' ? progress : (0.5 - Math.cos( progress * Math.PI ) / 2);
                    if (animateTop) scrollTop = currentTop + (easeProgress * (newTop - currentTop));
                    if (animateLeft) scrollLeft = currentLeft + (easeProgress * (newLeft - currentLeft));
                    if (animateTop && newTop > currentTop && scrollTop >= newTop)  {
                        el.scrollTop = newTop;
                        done = true;
                    }
                    if (animateTop && newTop < currentTop && scrollTop <= newTop)  {
                        el.scrollTop = newTop;
                        done = true;
                    }
        
                    if (animateLeft && newLeft > currentLeft && scrollLeft >= newLeft)  {
                        el.scrollLeft = newLeft;
                        done = true;
                    }
                    if (animateLeft && newLeft < currentLeft && scrollLeft <= newLeft)  {
                        el.scrollLeft = newLeft;
                        done = true;
                    }
        
                    if (done) {
                        if (callback) callback();
                        return;
                    }
                    if (animateTop) el.scrollTop = scrollTop;
                    if (animateLeft) el.scrollLeft = scrollLeft;
                    $.requestAnimationFrame(render);
                }
                $.requestAnimationFrame(render);
            });
        };
        $.fn.scrollTop = function (top, duration, easing, callback) {
            if (arguments.length === 3 && typeof easing === 'function') {
                callback = easing;
                easing = undefined;
            }
            var dom = this;
            if (typeof top === 'undefined') {
                if (dom.length > 0) return dom[0].scrollTop;
                else return null;
            }
            return dom.scrollTo(undefined, top, duration, easing, callback);
        };
        $.fn.scrollLeft = function (left, duration, easing, callback) {
            if (arguments.length === 3 && typeof easing === 'function') {
                callback = easing;
                easing = undefined;
            }
            var dom = this;
            if (typeof left === 'undefined') {
                if (dom.length > 0) return dom[0].scrollLeft;
                else return null;
            }
            return dom.scrollTo(left, undefined, duration, easing, callback);
        };

        // Global Ajax Setup
        var globalAjaxOptions = {};
        $.ajaxSetup = function (options) {
            if (options.type) options.method = options.type;
            $.each(options, function (optionName, optionValue) {
                globalAjaxOptions[optionName]  = optionValue;
            });
        };
        
        // Ajax
        var _jsonpRequests = 0;
        $.ajax = function (options) {
            var defaults = {
                method: 'GET',
                data: false,
                async: true,
                cache: true,
                user: '',
                password: '',
                headers: {},
                xhrFields: {},
                statusCode: {},
                processData: true,
                dataType: 'text',
                contentType: 'application/x-www-form-urlencoded',
                timeout: 0
            };
            var callbacks = ['beforeSend', 'error', 'complete', 'success', 'statusCode'];
        
        
            //For jQuery guys
            if (options.type) options.method = options.type;
        
            // Merge global and defaults
            $.each(globalAjaxOptions, function (globalOptionName, globalOptionValue) {
                if (callbacks.indexOf(globalOptionName) < 0) defaults[globalOptionName] = globalOptionValue;
            });
        
            // Function to run XHR callbacks and events
            function fireAjaxCallback (eventName, eventData, callbackName) {
                var a = arguments;
                if (eventName) $(document).trigger(eventName, eventData);
                if (callbackName) {
                    // Global callback
                    if (callbackName in globalAjaxOptions) globalAjaxOptions[callbackName](a[3], a[4], a[5], a[6]);
                    // Options callback
                    if (options[callbackName]) options[callbackName](a[3], a[4], a[5], a[6]);
                }
            }
        
            // Merge options and defaults
            $.each(defaults, function (prop, defaultValue) {
                if (!(prop in options)) options[prop] = defaultValue;
            });
        
            // Default URL
            if (!options.url) {
                options.url = window.location.toString();
            }
            // Parameters Prefix
            var paramsPrefix = options.url.indexOf('?') >= 0 ? '&' : '?';
        
            // UC method
            var _method = options.method.toUpperCase();
            // Data to modify GET URL
            if ((_method === 'GET' || _method === 'HEAD' || _method === 'OPTIONS' || _method === 'DELETE') && options.data) {
                var stringData;
                if (typeof options.data === 'string') {
                    // Should be key=value string
                    if (options.data.indexOf('?') >= 0) stringData = options.data.split('?')[1];
                    else stringData = options.data;
                }
                else {
                    // Should be key=value object
                    stringData = $.serializeObject(options.data);
                }
                if (stringData.length) {
                    options.url += paramsPrefix + stringData;
                    if (paramsPrefix === '?') paramsPrefix = '&';
                }
            }
            // JSONP
            if (options.dataType === 'json' && options.url.indexOf('callback=') >= 0) {
        
                var callbackName = 'f7jsonp_' + Date.now() + (_jsonpRequests++);
                var abortTimeout;
                var callbackSplit = options.url.split('callback=');
                var requestUrl = callbackSplit[0] + 'callback=' + callbackName;
                if (callbackSplit[1].indexOf('&') >= 0) {
                    var addVars = callbackSplit[1].split('&').filter(function (el) { return el.indexOf('=') > 0; }).join('&');
                    if (addVars.length > 0) requestUrl += '&' + addVars;
                }
        
                // Create script
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.onerror = function() {
                    clearTimeout(abortTimeout);
                    fireAjaxCallback(undefined, undefined, 'error', null, 'scripterror');
                };
                script.src = requestUrl;
        
                // Handler
                window[callbackName] = function (data) {
                    clearTimeout(abortTimeout);
                    fireAjaxCallback(undefined, undefined, 'success', data);
                    script.parentNode.removeChild(script);
                    script = null;
                    delete window[callbackName];
                };
                document.querySelector('head').appendChild(script);
        
                if (options.timeout > 0) {
                    abortTimeout = setTimeout(function () {
                        script.parentNode.removeChild(script);
                        script = null;
                        fireAjaxCallback(undefined, undefined, 'error', null, 'timeout');
                    }, options.timeout);
                }
        
                return;
            }
        
            // Cache for GET/HEAD requests
            if (_method === 'GET' || _method === 'HEAD' || _method === 'OPTIONS' || _method === 'DELETE') {
                if (options.cache === false) {
                    options.url += (paramsPrefix + '_nocache=' + Date.now());
                }
            }
        
            // Create XHR
            var xhr = new XMLHttpRequest();
        
            // Save Request URL
            xhr.requestUrl = options.url;
            xhr.requestParameters = options;
        
            // Open XHR
            xhr.open(_method, options.url, options.async, options.user, options.password);
        
            // Create POST Data
            var postData = null;
        
            if ((_method === 'POST' || _method === 'PUT' || _method === 'PATCH') && options.data) {
                if (options.processData) {
                    var postDataInstances = [ArrayBuffer, Blob, Document, FormData];
                    // Post Data
                    if (postDataInstances.indexOf(options.data.constructor) >= 0) {
                        postData = options.data;
                    }
                    else {
                        // POST Headers
                        var boundary = '---------------------------' + Date.now().toString(16);
        
                        if (options.contentType === 'multipart\/form-data') {
                            xhr.setRequestHeader('Content-Type', 'multipart\/form-data; boundary=' + boundary);
                        }
                        else {
                            xhr.setRequestHeader('Content-Type', options.contentType);
                        }
                        postData = '';
                        var _data = $.serializeObject(options.data);
                        if (options.contentType === 'multipart\/form-data') {
                            boundary = '---------------------------' + Date.now().toString(16);
                            _data = _data.split('&');
                            var _newData = [];
                            for (var i = 0; i < _data.length; i++) {
                                _newData.push('Content-Disposition: form-data; name="' + _data[i].split('=')[0] + '"\r\n\r\n' + _data[i].split('=')[1] + '\r\n');
                            }
                            postData = '--' + boundary + '\r\n' + _newData.join('--' + boundary + '\r\n') + '--' + boundary + '--\r\n';
                        }
                        else {
                            postData = options.contentType === 'application/x-www-form-urlencoded' ? _data : _data.replace(/&/g, '\r\n');
                        }
                    }
                }
                else {
                    postData = options.data;
                }
        
            }
        
            // Additional headers
            if (options.headers) {
                $.each(options.headers, function (headerName, headerCallback) {
                    xhr.setRequestHeader(headerName, headerCallback);
                });
            }
        
            // Check for crossDomain
            if (typeof options.crossDomain === 'undefined') {
                options.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(options.url) && RegExp.$2 !== window.location.host;
            }
        
            if (!options.crossDomain) {
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            }
        
            if (options.xhrFields) {
                $.each(options.xhrFields, function (fieldName, fieldValue) {
                    xhr[fieldName] = fieldValue;
                });
            }
        
            var xhrTimeout;
            // Handle XHR
            xhr.onload = function (e) {
                if (xhrTimeout) clearTimeout(xhrTimeout);
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
                    var responseData;
                    if (options.dataType === 'json') {
                        try {
                            responseData = JSON.parse(xhr.responseText);
                            fireAjaxCallback('ajaxSuccess', {xhr: xhr}, 'success', responseData, xhr.status, xhr);
                        }
                        catch (err) {
                            fireAjaxCallback('ajaxError', {xhr: xhr, parseerror: true}, 'error', xhr, 'parseerror');
                        }
                    }
                    else {
                        responseData = xhr.responseType === 'text' || xhr.responseType === '' ? xhr.responseText : xhr.response;
                        fireAjaxCallback('ajaxSuccess', {xhr: xhr}, 'success', responseData, xhr.status, xhr);
                    }
                }
                else {
                    fireAjaxCallback('ajaxError', {xhr: xhr}, 'error', xhr, xhr.status);
                }
                if (options.statusCode) {
                    if (globalAjaxOptions.statusCode && globalAjaxOptions.statusCode[xhr.status]) globalAjaxOptions.statusCode[xhr.status](xhr);
                    if (options.statusCode[xhr.status]) options.statusCode[xhr.status](xhr);
                }
                fireAjaxCallback('ajaxComplete', {xhr: xhr}, 'complete', xhr, xhr.status);
            };
        
            xhr.onerror = function (e) {
                if (xhrTimeout) clearTimeout(xhrTimeout);
                fireAjaxCallback('ajaxError', {xhr: xhr}, 'error', xhr, xhr.status);
            };
        
            // Ajax start callback
            fireAjaxCallback('ajaxStart', {xhr: xhr}, 'start', xhr);
            fireAjaxCallback(undefined, undefined, 'beforeSend', xhr);
        
        
            // Send XHR
            xhr.send(postData);
        
            // Timeout
            if (options.timeout > 0) {
                xhr.onabort = function () {
                    if (xhrTimeout) clearTimeout(xhrTimeout);
                };
                xhrTimeout = setTimeout(function () {
                    xhr.abort();
                    fireAjaxCallback('ajaxError', {xhr: xhr, timeout: true}, 'error', xhr, 'timeout');
                    fireAjaxCallback('ajaxComplete', {xhr: xhr, timeout: true}, 'complete', xhr, 'timeout');
                }, options.timeout);
            }
        
            // Return XHR object
            return xhr;
        };
        // Shrotcuts
        (function () {
            var methods = ('get post getJSON').split(' ');
            function createMethod(method) {
                $[method] = function (url, data, success) {
                    return $.ajax({
                        url: url,
                        method: method === 'post' ? 'POST' : 'GET',
                        data: typeof data === 'function' ? undefined : data,
                        success: typeof data === 'function' ? data : success,
                        dataType: method === 'getJSON' ? 'json' : undefined
                    });
                };
            }
            for (var i = 0; i < methods.length; i++) {
                createMethod(methods[i]);
            }
        })();
        

            return $;
        })();
        
        // Export Dom7 to Framework7
        Framework7.$ = Dom7;
        
        // Export to local scope
        var $ = Dom7;
        
        // Export to Window
        window.Dom7 = Dom7;
        

        /*===========================
        Features Support Detection
        ===========================*/
        Framework7.prototype.support = (function () {
            var support = {
                touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
            };
        
            // Export object
            return support;
        })();
        

        /*===========================
        Device/OS Detection
        ===========================*/
        Framework7.prototype.device = (function () {
            var device = {};
            var ua = navigator.userAgent;
            var $ = Dom7;
        
            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
        
            device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
            
            // Android
            if (android) {
                device.os = 'android';
                device.osVersion = android[2];
                device.android = true;
                device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
            }
            if (ipad || iphone || ipod) {
                device.os = 'ios';
                device.ios = true;
            }
            // iOS
            if (iphone && !ipod) {
                device.osVersion = iphone[2].replace(/_/g, '.');
                device.iphone = true;
            }
            if (ipad) {
                device.osVersion = ipad[2].replace(/_/g, '.');
                device.ipad = true;
            }
            if (ipod) {
                device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
                device.iphone = true;
            }
            // iOS 8+ changed UA
            if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
                if (device.osVersion.split('.')[0] === '10') {
                    device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
                }
            }
        
            // Webview
            device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
                
            // Minimal UI
            if (device.os && device.os === 'ios') {
                var osVersionArr = device.osVersion.split('.');
                device.minimalUi = !device.webView &&
                                    (ipod || iphone) &&
                                    (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
                                    $('meta[name="viewport"]').length > 0 && $('meta[name="viewport"]').attr('content').indexOf('minimal-ui') >= 0;
            }
        
            // Check for status bar and fullscreen app mode
            var windowWidth = $(window).width();
            var windowHeight = $(window).height();
            device.statusBar = false;
            if (device.webView && (windowWidth * windowHeight === screen.width * screen.height)) {
                device.statusBar = true;
            }
            else {
                device.statusBar = false;
            }
        
            // Classes
            var classNames = [];
        
            // Pixel Ratio
            device.pixelRatio = window.devicePixelRatio || 1;
            classNames.push('pixel-ratio-' + Math.floor(device.pixelRatio));
            if (device.pixelRatio >= 2) {
                classNames.push('retina');
            }
        
            // OS classes
            if (device.os) {
                classNames.push(device.os, device.os + '-' + device.osVersion.split('.')[0], device.os + '-' + device.osVersion.replace(/\./g, '-'));
                if (device.os === 'ios') {
                    var major = parseInt(device.osVersion.split('.')[0], 10);
                    for (var i = major - 1; i >= 6; i--) {
                        classNames.push('ios-gt-' + i);
                    }
                }
                
            }
            // Status bar classes
            if (device.statusBar) {
                classNames.push('with-statusbar-overlay');
            }
            else {
                $('html').removeClass('with-statusbar-overlay');
            }
        
            // Add html classes
            if (classNames.length > 0) $('html').addClass(classNames.join(' '));
        
            // Export object
            return device;
        })();
        

        /*===========================
        Plugins prototype
        ===========================*/
        Framework7.prototype.plugins = {};
        

        /*===========================
        Template7 Template engine
        ===========================*/
        window.Template7 = (function () {
            function isArray(arr) {
                return Object.prototype.toString.apply(arr) === '[object Array]';
            }
            function isObject(obj) {
                return obj instanceof Object;
            }
            function isFunction(func) {
                return typeof func === 'function';
            }
            var cache = {};
            function helperToSlices(string) {
                var helperParts = string.replace(/[{}#}]/g, '').split(' ');
                var slices = [];
                var shiftIndex, i, j;
                for (i = 0; i < helperParts.length; i++) {
                    var part = helperParts[i];
                    if (i === 0) slices.push(part);
                    else {
                        if (part.indexOf('"') === 0) {
                            // Plain String
                            if (part.match(/"/g).length === 2) {
                                // One word string
                                slices.push(part);
                            }
                            else {
                                // Find closed Index
                                shiftIndex = 0;
                                for (j = i + 1; j < helperParts.length; j++) {
                                    part += ' ' + helperParts[j];
                                    if (helperParts[j].indexOf('"') >= 0) {
                                        shiftIndex = j;
                                        slices.push(part);
                                        break;
                                    }
                                }
                                if (shiftIndex) i = shiftIndex;
                            }
                        }
                        else {
                            if (part.indexOf('=') > 0) {
                                // Hash
                                var hashParts = part.split('=');
                                var hashName = hashParts[0];
                                var hashContent = hashParts[1];
                                if (hashContent.match(/"/g).length !== 2) {
                                    shiftIndex = 0;
                                    for (j = i + 1; j < helperParts.length; j++) {
                                        hashContent += ' ' + helperParts[j];
                                        if (helperParts[j].indexOf('"') >= 0) {
                                            shiftIndex = j;
                                            break;
                                        }
                                    }
                                    if (shiftIndex) i = shiftIndex;
                                }
                                var hash = [hashName, hashContent.replace(/"/g,'')];
                                slices.push(hash);
                            }
                            else {
                                // Plain variable
                                slices.push(part);
                            }
                        }
                    }
                }
                return slices;
            }
            function stringToBlocks(string) {
                var blocks = [], i, j, k;
                if (!string) return [];
                var _blocks = string.split(/({{[^{^}]*}})/);
                for (i = 0; i < _blocks.length; i++) {
                    var block = _blocks[i];
                    if (block === '') continue;
                    if (block.indexOf('{{') < 0) {
                        blocks.push({
                            type: 'plain',
                            content: block
                        });
                    }
                    else {
                        if (block.indexOf('{/') >= 0) {
                            continue;
                        }
                        if (block.indexOf('{#') < 0 && block.indexOf(' ') < 0 && block.indexOf('else') < 0) {
                            // Simple variable
                            blocks.push({
                                type: 'variable',
                                contextName: block.replace(/[{}]/g, '')
                            });
                            continue;
                        }
                        // Helpers
                        var helperSlices = helperToSlices(block);
                        var helperName = helperSlices[0];
                        var isPartial = helperName === '>';
                        var helperContext = [];
                        var helperHash = {};
                        for (j = 1; j < helperSlices.length; j++) {
                            var slice = helperSlices[j];
                            if (isArray(slice)) {
                                // Hash
                                helperHash[slice[0]] = slice[1] === 'false' ? false : slice[1];
                            }
                            else {
                                helperContext.push(slice);
                            }
                        }
                        
                        if (block.indexOf('{#') >= 0) {
                            // Condition/Helper
                            var helperStartIndex = i;
                            var helperContent = '';
                            var elseContent = '';
                            var toSkip = 0;
                            var shiftIndex;
                            var foundClosed = false, foundElse = false, foundClosedElse = false, depth = 0;
                            for (j = i + 1; j < _blocks.length; j++) {
                                if (_blocks[j].indexOf('{{#') >= 0) {
                                    depth ++;
                                }
                                if (_blocks[j].indexOf('{{/') >= 0) {
                                    depth --;
                                }
                                if (_blocks[j].indexOf('{{#' + helperName) >= 0) {
                                    helperContent += _blocks[j];
                                    if (foundElse) elseContent += _blocks[j];
                                    toSkip ++;
                                }
                                else if (_blocks[j].indexOf('{{/' + helperName) >= 0) {
                                    if (toSkip > 0) {
                                        toSkip--;
                                        helperContent += _blocks[j];
                                        if (foundElse) elseContent += _blocks[j];
                                    }
                                    else {
                                        shiftIndex = j;
                                        foundClosed = true;
                                        break;
                                    }
                                }
                                else if (_blocks[j].indexOf('else') >= 0 && depth === 0) {
                                    foundElse = true;
                                }
                                else {
                                    if (!foundElse) helperContent += _blocks[j];
                                    if (foundElse) elseContent += _blocks[j];
                                }
        
                            }
                            if (foundClosed) {
                                if (shiftIndex) i = shiftIndex;
                                blocks.push({
                                    type: 'helper',
                                    helperName: helperName,
                                    contextName: helperContext,
                                    content: helperContent,
                                    inverseContent: elseContent,
                                    hash: helperHash
                                });
                            }
                        }
                        else if (block.indexOf(' ') > 0) {
                            if (isPartial) {
                                helperName = '_partial';
                                if (helperContext[0]) helperContext[0] = '"' + helperContext[0].replace(/"|'/g, '') + '"';
                            }
                            blocks.push({
                                type: 'helper',
                                helperName: helperName,
                                contextName: helperContext,
                                hash: helperHash
                            });
                        }
                    }
                }
                return blocks;
            }
            var Template7 = function (template) {
                var t = this;
                t.template = template;
                
                function getCompileFn(block, depth) {
                    if (block.content) return compile(block.content, depth);
                    else return function () {return ''; };
                }
                function getCompileInverse(block, depth) {
                    if (block.inverseContent) return compile(block.inverseContent, depth);
                    else return function () {return ''; };
                }
                function getCompileVar(name, ctx) {
                    var variable, parts, levelsUp = 0, initialCtx = ctx;
                    if (name.indexOf('../') === 0) {
                        levelsUp = name.split('../').length - 1;
                        var newDepth = ctx.split('_')[1] - levelsUp;
                        ctx = 'ctx_' + (newDepth >= 1 ? newDepth : 1);
                        parts = name.split('../')[levelsUp].split('.');
                    }
                    else if (name.indexOf('@global') === 0) {
                        ctx = 'Template7.global';
                        parts = name.split('@global.')[1].split('.');
                    }
                    else if (name.indexOf('@root') === 0) {
                        ctx = 'root';
                        parts = name.split('@root.')[1].split('.');
                    }
                    else {
                        parts = name.split('.');
                    }
                    variable = ctx;
                    for (var i = 0; i < parts.length; i++) {
                        var part = parts[i];
                        if (part.indexOf('@') === 0) {
                            if (i > 0) {
                                variable += '[(data && data.' + part.replace('@', '') + ')]';
                            }
                            else {
                                variable = '(data && data.' + name.replace('@', '') + ')';
                            }
                        }
                        else {
                            if (isFinite(part)) {
                                variable += '[' + part + ']';
                            }
                            else {
                                if (part.indexOf('this') === 0) {
                                    variable = part.replace('this', ctx);
                                }
                                else {
                                    variable += '.' + part;       
                                }
                            }
                        }
                    }
        
                    return variable;
                }
                function getCompiledArguments(contextArray, ctx) {
                    var arr = [];
                    for (var i = 0; i < contextArray.length; i++) {
                        if (contextArray[i].indexOf('"') === 0) arr.push(contextArray[i]);
                        else {
                            arr.push(getCompileVar(contextArray[i], ctx));
                        }
                    }
        
                    return arr.join(', ');
                }
                function compile(template, depth) {
                    depth = depth || 1;
                    template = template || t.template;
                    if (typeof template !== 'string') {
                        throw new Error('Template7: Template must be a string');
                    }
                    var blocks = stringToBlocks(template);
                    if (blocks.length === 0) {
                        return function () { return ''; };
                    }
                    var ctx = 'ctx_' + depth;
                    var resultString = '';
                    if (depth === 1) {
                        resultString += '(function (' + ctx + ', data, root) {\n';
                    }
                    else {
                        resultString += '(function (' + ctx + ', data) {\n';
                    }
                    if (depth === 1) {
                        resultString += 'function isArray(arr){return Object.prototype.toString.apply(arr) === \'[object Array]\';}\n';
                        resultString += 'function isFunction(func){return (typeof func === \'function\');}\n';
                        resultString += 'function c(val, ctx) {if (typeof val !== "undefined" && val !== null) {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n';
                        resultString += 'root = root || ctx_1 || {};\n';
                    }
                    resultString += 'var r = \'\';\n';
                    var i, j, context;
                    for (i = 0; i < blocks.length; i++) {
                        var block = blocks[i];
                        // Plain block
                        if (block.type === 'plain') {
                            resultString += 'r +=\'' + (block.content).replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/'/g, '\\' + '\'') + '\';';
                            continue;
                        }
                        var variable, compiledArguments;
                        // Variable block
                        if (block.type === 'variable') {
                            variable = getCompileVar(block.contextName, ctx);
                            resultString += 'r += c(' + variable + ', ' + ctx + ');';
                        }
                        // Helpers block
                        if (block.type === 'helper') {
                            if (block.helperName in t.helpers) {
                                compiledArguments = getCompiledArguments(block.contextName, ctx);
                                
                                resultString += 'r += (Template7.helpers.' + block.helperName + ').call(' + ctx + ', ' + (compiledArguments && (compiledArguments + ', ')) +'{hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth + 1) + ', inverse: ' + getCompileInverse(block, depth + 1) + ', root: root});';
                                
                            }
                            else {
                                if (block.contextName.length > 0) {
                                    throw new Error('Template7: Missing helper: "' + block.helperName + '"');
                                }
                                else {
                                    variable = getCompileVar(block.helperName, ctx);
                                    resultString += 'if (' + variable + ') {';
                                    resultString += 'if (isArray(' + variable + ')) {';
                                    resultString += 'r += (Template7.helpers.each).call(' + ctx + ', ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth+1) + ', inverse: ' + getCompileInverse(block, depth+1) + ', root: root});';
                                    resultString += '}else {';
                                    resultString += 'r += (Template7.helpers.with).call(' + ctx + ', ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth+1) + ', inverse: ' + getCompileInverse(block, depth+1) + ', root: root});';
                                    resultString += '}}';
                                }
                            }
                        }
                    }
                    resultString += '\nreturn r;})';
                    return eval.call(window, resultString);
                }
                t.compile = function (template) {
                    if (!t.compiled) {
                        t.compiled = compile(template);
                    }
                    return t.compiled;
                };
            };
            Template7.prototype = {
                options: {},
                partials: {},
                helpers: {
                    '_partial' : function (partialName, options) {
                        var p = Template7.prototype.partials[partialName];
                        if (!p || (p && !p.template)) return '';
                        if (!p.compiled) {
                            p.compiled = t7.compile(p.template);
                        }
                        var ctx = this;
                        for (var hashName in options.hash) {
                            ctx[hashName] = options.hash[hashName];
                        }
                        return p.compiled(ctx, options.data, options.root);
                    },
                    'escape': function (context, options) {
                        if (typeof context !== 'string') {
                            throw new Error('Template7: Passed context to "escape" helper should be a string');
                        }
                        return context
                                .replace(/&/g, '&amp;')
                                .replace(/</g, '&lt;')
                                .replace(/>/g, '&gt;')
                                .replace(/"/g, '&quot;');
                    },
                    'if': function (context, options) {
                        if (isFunction(context)) { context = context.call(this); }
                        if (context) {
                            return options.fn(this, options.data);
                        }
                        else {
                            return options.inverse(this, options.data);
                        }
                    },
                    'unless': function (context, options) {
                        if (isFunction(context)) { context = context.call(this); }
                        if (!context) {
                            return options.fn(this, options.data);
                        }
                        else {
                            return options.inverse(this, options.data);
                        }
                    },
                    'each': function (context, options) {
                        var ret = '', i = 0;
                        if (isFunction(context)) { context = context.call(this); }
                        if (isArray(context)) {
                            if (options.hash.reverse) {
                                context = context.reverse();
                            }
                            for (i = 0; i < context.length; i++) {
                                ret += options.fn(context[i], {first: i === 0, last: i === context.length - 1, index: i});
                            }
                            if (options.hash.reverse) {
                                context = context.reverse();
                            }
                        }
                        else {
                            for (var key in context) {
                                i++;
                                ret += options.fn(context[key], {key: key});
                            }
                        }
                        if (i > 0) return ret;
                        else return options.inverse(this);
                    },
                    'with': function (context, options) {
                        if (isFunction(context)) { context = context.call(this); }
                        return options.fn(context);
                    },
                    'join': function (context, options) {
                        if (isFunction(context)) { context = context.call(this); }
                        return context.join(options.hash.delimiter || options.hash.delimeter);
                    },
                    'js': function (expression, options) {
                        var func;
                        if (expression.indexOf('return')>=0) {
                            func = '(function(){'+expression+'})';
                        }
                        else {
                            func = '(function(){return ('+expression+')})';
                        }
                        return eval.call(this, func).call(this);
                    },
                    'js_compare': function (expression, options) {
                        var func;
                        if (expression.indexOf('return')>=0) {
                            func = '(function(){'+expression+'})';
                        }
                        else {
                            func = '(function(){return ('+expression+')})';
                        }
                        var condition = eval.call(this, func).call(this);
                        if (condition) {
                            return options.fn(this, options.data);
                        }
                        else {
                            return options.inverse(this, options.data);   
                        }
                    }
                }
            };
            var t7 = function (template, data) {
                if (arguments.length === 2) {
                    var instance = new Template7(template);
                    var rendered = instance.compile()(data);
                    instance = null;
                    return (rendered);
                }
                else return new Template7(template);
            };
            t7.registerHelper = function (name, fn) {
                Template7.prototype.helpers[name] = fn;
            };
            t7.unregisterHelper = function (name) {
                Template7.prototype.helpers[name] = undefined;  
                delete Template7.prototype.helpers[name];
            };
            t7.registerPartial = function (name, template) {
                Template7.prototype.partials[name] = {template: template};
            };
            t7.unregisterPartial = function (name, template) {
                if (Template7.prototype.partials[name]) {
                    Template7.prototype.partials[name] = undefined;
                    delete Template7.prototype.partials[name];
                }
            };
            
            t7.compile = function (template, options) {
                var instance = new Template7(template, options);
                return instance.compile();
            };
            
            t7.options = Template7.prototype.options;
            t7.helpers = Template7.prototype.helpers;
            t7.partials = Template7.prototype.partials;
            return t7;
        })();

        })();
        
