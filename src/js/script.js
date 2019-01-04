$(window).on('load', function () {
    App.init()
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
            $nav.find('a').pageNav({
                'active_item' : '_active',
                'scroll_shift': $('.header').outerHeight()
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
        var filter = function (href) {
            $item.each(function () {
                $(this).attr('data-team') === href ? $(this).addClass('_active') : $(this).removeClass('_active')
            })
        }
        if ($switcher.length) {
            filter('team-1')
            $switcher.on('click', function (e) {
                e.preventDefault()
                $(e.target).addClass('_active').siblings().removeClass('_active')
                filter($(e.target).attr('href'))
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
        $target.on('click', function () {
            $('html').toggleClass('_nav-open')
        })
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
