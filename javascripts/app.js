'use strict'

// Import babel/polyfill.
// https://babeljs.io/docs/en/babel-polyfill/#usage-in-node--browserify--webpack
// Installation
// npm install --save @babel/polyfill
// Because this is a polyfill (which will run before your source code), we need it to be a dependency, not a devDependency
import "@babel/polyfill";

// Import node modules.
import DocReady from 'es6-docready'
import $ from 'jquery'
import 'jquery-ui-bundle'
import Foundation from 'foundation-sites'
import Vue from 'vue/dist/vue.js'
import Swiper from 'swiper'
import autosize from 'autosize'
import AOS from 'aos'
import axios from 'axios'

// Import local modules.
import { getZFcurrentMediaQuery } from './utils'
import Sample from './modules/sample/index'

// Must wait until DOM is ready before initiating the modules.
DocReady(async () => {
  console.log("DOM is ready. Let's party")

  // Async sample.
  async function example3() {
    return 'example 3'
  }
  console.log(await example3())

  // Initiate foundation.
  // Must do it after Vue has rendered the view.
  $(document).foundation()

  // Sample class evocation.
  let s = new Sample()
  console.log(await s.multiply(2)) // return 4

  // Detect ZF sceen size on resize.
  window.addEventListener('resize', () => {
    var current = getZFcurrentMediaQuery()
    console.log('Screen size: ' + current)
  })

  // Detect browser visibility.
  // https://stackoverflow.com/questions/10328665/how-to-detect-browser-minimize-and-maximize-state-in-javascript
  document.addEventListener('visibilitychange', () => {
    console.log(document.hidden, document.visibilityState)
  }, false)

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

  // Refresh/ re-init aos on scroll.
  document.addEventListener('scroll', (event) => {
    AOS.init({
      duration: 1200,
    })
    // if (event.target.id === 'idOfUl') { // or any other filtering condition
    //     console.log('scrolling', event.target);
    // }
  }, true /*Capture event*/);
})
