/**
* http://macr.ae/article/gulp-and-babel.html
* http://egorsmirnov.me/2015/05/25/browserify-babelify-and-es6.html
* http://jpsierens.com/tutorial-javascript-es6-babelv6/
* http://hazmi.id/building-with-gulp-1-compile-less-watch-changes-and-minify-css/
*
* Packgages:
* https://www.npmjs.com/package/pump
* https://www.npmjs.com/package/gulp-uglify
*/

var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var livereload = require('gulp-livereload')

// JavaScript development.
var browserify = require('browserify')
var babelify = require('babelify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var uglify = require('gulp-uglify')

// Less compilation.
var less = require('gulp-less')

// CSS compilation.
var concat = require('gulp-concat')
var cleanCSS = require('gulp-clean-css')
var concatCss = require('gulp-concat-css') // optional

// HTML compilation.
var htmlmin = require('gulp-htmlmin');

// Task to compile js.
// https://gist.github.com/alkrauss48/a3581391f120ec1c3e03
// http://blog.revathskumar.com/2016/02/browserify-with-gulp.html
gulp.task('compile-js', function () {
    // app.js is your main JS file with all your module inclusions
  return browserify({
    extensions: ['.js', '.jsx'],
    entries: 'javascripts/app.js',
    debug: true
  })
  .transform('babelify', { presets: ['es2015', 'react'] })
  .bundle()
  .pipe(source('bundle.min.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('dist'))
  .pipe(livereload())
})

// Task to compile less.
gulp.task('compile-less', function () {
  return gulp.src([
    'stylesheets/*.less'
  ])
  .pipe(sourcemaps.init())
  .pipe(less())
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('stylesheets'))
})

// Task to minify css.
gulp.task('minify-css', function () {
  return gulp.src([
    'stylesheets/style.css'
  ])
  .pipe(sourcemaps.init())
  .pipe(cleanCSS({debug: true}))
  .pipe(concat('bundle.min.css'))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('dist'))
  .pipe(livereload())
})

// Task to minify html.
// https://www.npmjs.com/package/gulp-htmlmin
// https://github.com/kangax/html-minifier
gulp.task('minify-html', function() {
  return gulp.src('index.html')
  .pipe(htmlmin({
    collapseWhitespace: true,
    removeComments: true
  }))
  .pipe(concat('index.min.html'))
  .pipe(gulp.dest(''));
})

// Task to copy fonts to dist.
gulp.task('compile-fonts', function() {
  return gulp.src([
    'fonts/*',
    'node_modules/material-design-icons/iconfont/MaterialIcons-Regular.*',
    'node_modules/foundation-icon-fonts/foundation-icons.*',
  ])
  .pipe(gulp.dest('dist/fonts/'));
});

// Task to watch less & css changes.
gulp.task('watch', function () {
  gulp.watch('javascripts/*.js', ['compile-js'])  // Watch all the .js files, then run the js task
  gulp.watch('stylesheets/*.less', ['compile-less'])  // Watch all the .less files, then run the less task
  gulp.watch('stylesheets/*.css', ['minify-css'])  // Watch all the .css files, then run the css task
  gulp.watch('stylesheets/*.css', ['compile-fonts'])  // Watch all the .css files, then run the font task
})

// Development:
// Task when running `gulp` from terminal.
gulp.task('default', ['watch'])

// Production:
// Task when running `gulp build` from terminal.
gulp.task('build', ['minify-css', 'compile-fonts', 'compile-js', 'minify-html'])
