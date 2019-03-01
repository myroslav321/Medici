(function ($, root, undefined) {
	
	$(function () {
		
		$(window).on('load', function () {
            App.init()
            $('body').addClass('_loaded');
            if ($('section').length) {
                $('section').each(function () {
                    var that = $(this)
                    $(this).waypoint(function () {
                        that.addClass('_animate')
                    }, { offset: '100%'})
                })
            }
        })
        
        var App = {
        
            init: function () {
                this.isTouch()
                this.heroSlider()
                this.mobileNav()
                this.collapsibleItem()
                this.parallaxImage()
                this.aboutUsToggler()
                this.teamFilter()
                this.map()
                this.pageScroll()
                this.counter();
            },
        
            isInViewport: function () {
                var scrollTop = $(window).scrollTop();
                $('section').each(function () {
                    if (!$(this).hasClass('_is-visible')) {
                        if (scrollTop + $(window).height() >= $(this).offset().top) {
                            $(this).addClass('_is-visible')
                        }
                    }
                })
            },
        
            counter: function () {
                var isReached = false;
                var $section = $('.counter-wrp')
                var offset = $section.offset().top
                var vh = $(window).height()
                var istArr = []
                var $elem = document.querySelectorAll('.counter-item__number');
                $elem.forEach(function ($item, i) {
                    var counterInst = new Odometer({
                      el: $item,
                      value: i,
                      duration: 5000,
                      format: 'd.ddd'
                    });
                    istArr.push(counterInst)
                })
        
                $(window).on('scroll', function () {
                    if (!isReached) {
                        if ($(window).scrollTop() >= offset - (vh - vh/3)) {
                            isReached = true
                            $('.counter-item__number').each(function (i) {
                                istArr[i].update($(this).attr('data-max'))
                            })
                        }
                    }
                })
            },
        
        
            collapsibleItem: function () {
                var $item = $('.js__item-target')
                if ($item.length) {
                    $item.each(function () {
                       $(this).on('click', function () {
                           if ($(window).width() < 768) {
                                $(this).toggleClass('_active')
                                var $parent = $(this).parents().eq(1);
                                $parent.find('.service-item__img-preview').stop().slideToggle(300)
                                $parent.find('.service-item__caption-body').stop().slideToggle(300)
                           }
                       })
                    })
                }
            },
        
            pageScroll: function () {
                var $nav = $('.js__nav-list')
                if ($nav.length) {
                    $nav.onePageNav({
                        currentClass: '_active',
                        changeHash: false,
                        scrollSpeed: 750,
                        scrollThreshold: 0.1,
                        filter: '',
                        easing: 'swing'
                    })
                }
            },
        
            parallaxImage: function() {
                if ($('.js__parallax-image').length) {
                    paraxify('.js__parallax-image')
                }
            },
        
            teamFilter: function() {
                var $switcher = $('.js__team')
                var $item = $('.team-item')
                var $description = $('.js__caption-description')
                var filter = function (href) {
                    $item.each(function () {
                        $(this).attr('data-team') === href ? $(this).addClass('_active') : $(this).removeClass('_active')
                    })
                }
                if ($switcher.length) {
                    filter('team-1')
                    $($description.find('.our-team__caption-item')[0]).addClass('_active');
                    $switcher.on('click', function (e) {
                        e.preventDefault()
                        $(e.target).addClass('_active').siblings().removeClass('_active')
                        filter($(e.target).attr('href'))
                        $description.find('[data-team="' + $(e.target).attr('href') + '"]').addClass('_active').siblings().removeClass('_active')
                    })
                }
            },
        
            aboutUsToggler: function () {
                var $switcher = $('.js__about-us')
                var $description = $('.js__about-us__description')
                var $gallery = $('.js__about-us__allery-spot')
                var $sl = $('.js__gallery')
        
                if ($switcher.length && $description.length && $gallery.length && $sl.length) {
                    var slInstance = []
                    $sl.each(function () {
                        slInstance.push(new Swiper(this, {
                            navigation: {
                                nextEl: this.querySelector('.swiper-button-next'),
                                prevEl: this.querySelector('.swiper-button-prev'),
                            },
                            autoHeight: true
                        }))
                    })
                    $switcher.on('click', function (e) {
                        e.preventDefault()
                        $(e.target).addClass('_active').siblings().removeClass('_active')
                        $description.find($(e.target).attr('href')).addClass('_active').siblings().removeClass('_active')
                        $gallery.find($(e.target).attr('href')).addClass('_active').siblings().removeClass('_active')
                        $(slInstance).each(function () {
                            this.update()
                        })
                    })
                }
            },
        
            isTouch: function () {
                ('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0) ?
                $('html').addClass('touch') : $('html').addClass('no-touch');
            },
        
            mobileNav: function () {
                var $target = $('.header-nav__btn')
                var $linkItem = $('.header-nav__item-link')
                $target.on('click', function () {
                    $('html').toggleClass('_nav-open')
                })
                $linkItem.on('click', function () {
                    $('html').removeClass('_nav-open')
                })
                // $('.nav-panel__btn').on('click', function (e) {
                //     e.preventDefault();
                //     // var _getOffset = function () {
                //     //     return $(window).width() < 992 ? 63 : 86;
                //     // }
                //     // $('html, body').animate({
                //     //     scrollTop: $('.feedback').offset().top - _getOffset()
                //     // }, 1000)
                // })
        
            },
        
            map: function () {
                var $check = $('.js__check-item')
                var uluru = JSON.parse($check[0].value)
                var map = new google.maps.Map(document.getElementById('map'), {zoom: 14, center: uluru})
                var marker = new google.maps.Marker({position: uluru, map: map})
        
                $check.on('change', function () {
                    var uluru = JSON.parse(this.value)
                    marker.setPosition(uluru)
                    map.setCenter(uluru)
                })
            },
        
            heroSlider: function() {
                var elem = document.querySelector('.js__hero-slider')
                var sw = new Swiper(elem, {
                    autoplay: {
                        delay: 5000,
                    },
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    }
                })
            }
        }
        
		
	});
	
})(jQuery, this);