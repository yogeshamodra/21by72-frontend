/**
 * sliders.js
 * Testimonials slider (Slick).
 * Markup: #testi > .testi-slide (one per testimonial); arrows + dots are
 *         rendered into #testi-controls.
 * Needs: jQuery, slick-carousel.
 */
jQuery(function ($) {
  var chevron = function (d) {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>';
  };

  $('#testi').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4500,
    speed: 600,
    pauseOnHover: true,
    dots: true,
    arrows: false,
    appendArrows: '#testi-controls',
    appendDots: '#testi-controls',
    prevArrow: '<button type="button" class="testi-arrow" aria-label="Previous testimonial">' + chevron('M15 18l-6-6 6-6') + '</button>',
    nextArrow: '<button type="button" class="testi-arrow" aria-label="Next testimonial">' + chevron('M9 18l6-6-6-6') + '</button>',
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  });
});
