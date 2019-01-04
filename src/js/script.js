$(window).on('load', () => {
    App.init()
})

const App = {

    init() {
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

    collapsibleItem() {
        let $item = $('.js__item-target')
        if ($item.length) {
            $item.each(function () {
               $(this).on('click', function () {
                   if ($(window).width() < 768) {
                        $(this).toggleClass('_active')
                        let $parent = $(this).parents().eq(1);
                        $parent.find('.service-item__img-preview').stop().slideToggle(300)
                        $parent.find('.service-item__caption-body').stop().slideToggle(300)
                   }
               })
            })
        }
    },

    pageScroll() {
        const $nav = $('.js__nav-list')
        if ($nav.length) {
            $nav.find('a').pageNav({
                'active_item' : '_active',
                'scroll_shift': $('.header').outerHeight()
            })
        }
    },

    parallaxImage() {
        if ($('.js__parallax-image').length) {
            paraxify('.js__parallax-image')
        }
    },

    teamFilter() {
        let $switcher = $('.js__team')
        let $item = $('.team-item')

        const filter = (href) => {
            $item.each(function () {
                $(this).attr('data-team') === href ? $(this).addClass('_active') : $(this).removeClass('_active')
            })
        }
        if ($switcher.length) {
            filter('team-1')
            $switcher.on('click', (e) => {
                e.preventDefault()
                $(e.target).addClass('_active').siblings().removeClass('_active')
                filter($(e.target).attr('href'))
            })
        }
    },

    aboutUsToggler() {
        let $switcher = $('.js__about-us')
        let $description = $('.js__about-us__description')
        let $gallery = $('.js__about-us__allery-spot')
        let $sl = $('.js__gallery')

        if ($switcher.length && $description.length && $gallery.length && $sl.length) {
            let slInstance = []
            $sl.each(function () {
                slInstance.push(new Swiper(this, {
                    navigation: {
                        nextEl: this.querySelector('.swiper-button-next'),
                        prevEl: this.querySelector('.swiper-button-prev'),
                    },
                    autoHeight: true
                }))
            })
            $switcher.on('click', (e) => {
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

    isTouch() {
        ('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0) ?
        $('html').addClass('touch') : $('html').addClass('no-touch');
    },

    mobileNav() {
        let $target = $('.header-nav__btn')
        $target.on('click', () => {
            $('html').toggleClass('_nav-open')
        })
    },

    map() {
        let $check = $('.js__check-item')
        let uluru = JSON.parse($check[0].value)
        let map = new google.maps.Map(document.getElementById('map'), {zoom: 14, center: uluru})
        let marker = new google.maps.Marker({position: uluru, map: map})

        $check.on('change', function () {
            let uluru = JSON.parse(this.value)
            marker.setPosition(uluru)
            map.setCenter(uluru)
        })
    },

    heroSlider() {
        let elem = document.querySelector('.js__hero-slider')
        new Swiper(elem, {
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
