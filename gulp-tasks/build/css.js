'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const cache = require('gulp-cached');
const gulpIf = require('gulp-if');
const argv = require('yargs').argv;
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const remember = require('gulp-remember');
const concat = require('gulp-concat');

module.exports = function(options) {

  const postcssPreset = {
    dev: postcss([
      autoprefixer()
    ]),
    prod: postcss([
      autoprefixer(),
      cssnano()
    ])
  };

  const concatPreset = {
    dev: concat('styles.css'),
    prod: concat('styles.css', {newLine: ''})
  };

  return function() {
    return gulp.src(options.src, {base: options.base})
        .pipe(sourcemaps.init())
        .pipe(cache('css'))
        .pipe(gulpIf(argv.prod, postcssPreset.prod, postcssPreset.dev))
        .pipe(remember('css'))
        .pipe(gulpIf(argv.prod, concatPreset.prod, concatPreset.dev))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(options.dist));
  };

};
