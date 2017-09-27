'use strict'

// Import node modules.
import DocReady from 'es6-docready'
import $ from 'jquery'
import Foundation from 'foundation-sites'
import autosize from 'autosize'
import AOS from 'aos'

// Import custom modules.
// You need to import modules with './' because they don't reside in node_modules.
import { getZFcurrentMediaQuery } from './utils'

// Must wait until DOM is ready before initiating the modules.
// <script> tag doc readcy.
// https://www.npmjs.com/package/docready
// https://stackoverflow.com/questions/45501939/es6-docready-uncaught-typeerror-0-docready2-default-is-not-a-function
// ES6 doc ready.
// https://www.npmjs.com/package/es6-docready
DocReady(() => {
  console.log("DOM is ready. Let's party")

  // Add custom regex for UK mobile and landline number only.
  // Must add the pattern before calling $(document).foundation()
  // http://regexlib.com/(X(1)A(tZROB7k-twVB-offup60VUWj31cghbidKadtEHS6h5jx2WCMy5t4xWf7AdWCkoYaTjk8CmaJpONO1MO8LGjGyuCGb6eNSzuhtGR9pokhLoZhx6auxKYu08uVScDJbh1hePuPjnnZbytT8_LA_lmYH-qWwc-Bsn-fp3KyBLKgUcMqsgcrtwgnOYNpjVfw066f0))/UserPatterns.aspx?authorid=d95177b0-6014-4e73-a959-73f1663ae814&AspxAutoDetectCookieSupport=1
  // https://stackoverflow.com/questions/11518035/regular-expression-for-uk-based-and-only-numeric-phone-number-in-cakephp
  // https://foundation.zurb.com/sites/docs/abide.html
  Foundation.Abide.defaults.patterns['UK_number_only'] = /^(((\(?0\d{4}\)?\s?\d{3}\s?\d{3})|(\(?0\d{3}\)?\s?\d{3}\s?\d{4})|(\(?0\d{2}\)?\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?|(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3})$/

  // Must call it after the pattern.
  $(document).foundation()

  // Submit message form.
  // http://foundation.zurb.com/forum/posts/37267-foundation-6-abide-trigger-without-submit-button
  // var form = $("form#formComment")
  var form = $("form.form-submit")
  form.bind("submit",function(e) {
    e.preventDefault()
    console.log("submit intercepted")
    return false
  })
  form.bind("forminvalid.zf.abide", function(e,target) {
    console.log("form is invalid")
  })

  form.bind("formvalid.zf.abide", function(e,target) {
    console.log("form is valid")

    var param = target.serialize()
    $.ajax({
      type: "POST",
      url: target.attr('action'),
      data: param,
      contentType: "application/x-www-form-urlencoded",
      // success: function(data) {
      //     $("#result_div").html(data).foundaton()
      // },
      success: function(responseData, textStatus, jqXHR) {
          // Clear the form.
          target.find("input[type=text], input[type=email], textarea").val("")

          console.log(responseData)
          // alert("data saved")

          // Foundation Reveal - trigger reveal.
          // http://zurb.com/university/lessons/ajaxing-dynamic-content-with-foundation
          $('#reveal1').foundation('open')
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log(errorThrown)
      }
    })
  })

  // Foundation reveal - on reveal
  // http://zurb.com/university/lessons/dynamically-update-your-web-pages
  $('#reveal1').on('open.zf.reveal', function() {
    //artificially slow down load to let you see the loading state
    setTimeout(function() {
      $.ajax('https://codepen.io/kball/pen/rLKrkO.html').
        done(function(content) {
          $('#reveal1').html(content)
          $('#reveal1').trigger('resizeme.zf.reveal')
        })
    }, 500)
  })

  // Textarea autosize.
  // http://www.jacklmoore.com/autosize/
  // https://github.com/jackmoore/autosize
  // https://www.npmjs.com/package/autosize
  // from a jQuery collection
  autosize($('textarea'))

  // AOS scroll reveal.
  // http://michalsnik.github.io/aos/
  // https://css-tricks.com/aos-css-driven-scroll-animation-library/
  AOS.init({
      duration: 1200,
  })

  // Check screen size on resize window.
  window.addEventListener('resize', () => {
    var current = getZFcurrentMediaQuery()
    console.log('Screen size: ' + current)
  })
})
