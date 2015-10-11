/*================*//* 01 - VARIABLES */
/*================*/
var swipers = [], winW, winH, winScroll, _isresponsive, xsPoint = 767, smPoint = 991, mdPoint = 1199;


/*========================*/
/* 02 - page calculations */
/*========================*/
function pageCalculations() {
    winW = $(window).width();
    winH = $(window).height();
    if ($('.open-icon').is(':visible')) _isresponsive = true;
    else _isresponsive = false;
    if ($('.main-banner-height').length) $('.main-banner-height').css({ 'height': winH - $('header').height() - $('.container-above-header').height() - $('.banner-tabs').height() });
}

function updateSlidesPerView(xsValue, smValue, mdValue, lgValue, swiper) {
    if (winW > mdPoint) swiper.params.slidesPerView = lgValue;
    else if (winW > smPoint) swiper.params.slidesPerView = mdValue;
    else if (winW > xsPoint) swiper.params.slidesPerView = smValue;
    else swiper.params.slidesPerView = xsValue;
}

/*=====================*/
/* 07 - swiper sliders */
/*=====================*/
function initSwiper(swiperContainer) {
    var initIterator = 0;
    pageCalculations();
    $('.swiper-container').each(function () {
        var $t = $(this);

        var index = 'swiper-unique-id-' + initIterator;

        $t.addClass('swiper-' + index + ' initialized').attr('id', index);
        $t.find('.pagination').addClass('pagination-' + index);

        var autoPlayVar = parseInt($t.attr('data-autoplay'));
        var centerVar = parseInt($t.attr('data-center'));
        var simVar = ($t.closest('.circle-description-slide-box').length) ? false : true;
        var slidesPerViewVar = $t.attr('data-slides-per-view');
        var xsValue, smValue, mdValue, lgValue;
        if (slidesPerViewVar == 'responsive') {
            slidesPerViewVar = 1;
            xsValue = $t.attr('data-xs-slides');
            smValue = $t.attr('data-sm-slides');
            mdValue = $t.attr('data-md-slides');
            lgValue = $t.attr('data-lg-slides');
        }
        else if (slidesPerViewVar != 'auto') {
            slidesPerViewVar = parseInt(slidesPerViewVar);
        }
        var loopVar = parseInt($t.attr('data-loop'));
        var speedVar = parseInt($t.attr('data-speed'));


        swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
            speed: speedVar,
            pagination: '.pagination-' + index,
            loop: loopVar,
            paginationClickable: true,
            autoplay: autoPlayVar,
            slidesPerView: slidesPerViewVar,
            keyboardControl: true,
            calculateHeight: true,
            simulateTouch: simVar,
            centeredSlides: centerVar,
            onInit: function (swiper)
            {
                
                if ($t.attr('data-slides-per-view') == 'responsive') updateSlidesPerView(xsValue, smValue, mdValue, lgValue, swiper);
                if ($t.find('.swiper-slide').length > swiper.params.slidesPerView) $t.removeClass('hide-pagination');
                else $t.addClass('hide-pagination');
            },
            onSlideChangeStart: function (swiper) {
                var activeIndex = (loopVar === true) ? swiper.activeIndex : swiper.activeLoopIndex;
                if ($t.closest('.testimonials-container').length) {
                    $t.closest('.testimonials-wrapper').find('.testimonials-icons .entry div.active').removeClass('active');
                    $t.closest('.testimonials-wrapper').find('.testimonials-icons .entry div').eq(activeIndex).addClass('active');
                }
                if ($t.closest('.block.type-10').length) {
                    $t.closest('.block.type-10').find('.tab-entry.active').removeClass('active');
                    $t.closest('.block.type-10').find('.tab-entry').eq(activeIndex).addClass('active');
                }
            },
            onSlideClick: function (swiper) {
                if ($t.closest('.circle-slide-box').length) swiper.swipeTo(swiper.clickedSlideIndex);
            }
        });
        swipers['swiper-' + index].reInit();
        //swipers['swiper-'+index].resizeFix();
        if ($t.find('.default-active').length) swipers['swiper-' + index].swipeTo($t.find('.swiper-slide').index($t.find('.default-active')), 0);

        initIterator++;


    });

    //center all images inside containers
    $('.center-image').each(function () {
        var bgSrc = $(this).attr('src');
        $(this).parent().addClass('background-block').css({ 'background-image': 'url(' + bgSrc + ')' });
        $(this).hide();
    });

    $('.swiper-container.connected-to-bottom-swiper').each(function () {
        var $t = $(this);
        if ($t.closest('.block').find('.connected-to-top-swiper').length) {
            
            swipers['swiper-' + $t.attr('id')].addCallback('SlideChangeStart', function (swiper) {
                swipers['swiper-' + $t.closest('.block').find('.connected-to-top-swiper').attr('id')].swipeTo(swiper.activeIndex);
            });
        }
    });


    //swiper arrows
    $('.swiper-arrow.left').click(function () {
        swipers['swiper-' + $(this).parent().attr('id')].swipePrev();
    });

    $('.swiper-arrow.right').click(function () {
        swipers['swiper-' + $(this).parent().attr('id')].swipeNext();
    });

    $('.testimonials-arrow.left').click(function () {
        swipers['swiper-' + $(this).closest('.testimonials-wrapper').find('.testimonials-container .swiper-container').attr('id')].swipePrev();
    });

    $('.testimonials-arrow.right').click(function () {
        swipers['swiper-' + $(this).closest('.testimonials-wrapper').find('.testimonials-container .swiper-container').attr('id')].swipeNext();
    });

    //main banner tabs
    $('.tab-entry').click(function () {
        if ($(this).hasClass('active')) return false;
        var val = $(this).parent().find('.tab-entry').index(this);
        swipers['swiper-' + $(this).closest('.block').find('.swiper-container').attr('id')].swipeTo(val);
        $(this).parent().find('.tab-entry.active').removeClass('active');
        $(this).addClass('active');
    });
}


function initAccordian() {
    //accordeon
    //$('.accordeon-entry .title').click(function () {
    //    $(this).parent().toggleClass('active');
    //    $(this).next().slideToggle(300);
    //});
}

function initTestimonial() {
    //testimonials
    $('.testimonials-icons .entry div').click(function () {
        if ($(this).hasClass('active')) return false;
        var val = $(this).parent().parent().find('.entry').index($(this).parent());
        swipers['swiper-' + $(this).closest('.testimonials-wrapper').find('.testimonials-container .swiper-container').attr('id')].swipeTo(val);

        var parentSwiper = $(this).closest('.testimonials-wrapper').find('.testimonials-icons').parent();
        if (parentSwiper.hasClass('swiper-container')) swipers['swiper-' + parentSwiper.attr('id')].swipeTo(val);
        $(this).parent().parent().find('div.active').removeClass('active');
        $(this).addClass('active');
    });
}