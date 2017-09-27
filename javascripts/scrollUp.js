'use strict'

import $ from 'jquery'
import 'jquery-ui-bundle'

// Scroll up.
export default function scrollUp () {
  var position = $('main').position()
  var scrollUp = $('.button-arrow-up')
  window.addEventListener('scroll', function () {
    var height = $(window).scrollTop()
    if (height > position.top) {
      scrollUp.fadeIn('slow')
        // scrollUp.fadeTo("slow", 1);
    } else {
      scrollUp.fadeOut('slow')
        // scrollUp.fadeTo("slow", 0);
    }
  })
  scrollUp.click(function () {
    // Must add 'html' to the target for Firefox.
    $('body, html').animate({ scrollTop: 0 },
      600,
      'easeOutExpo',
    function () {
      //
    })
    return false
  })
}
