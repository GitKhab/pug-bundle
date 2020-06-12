'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const argv = require('yargs').argv;
const concat = require('gulp-concat');

module.exports = function(options) {

  const concatPreset = {
    dev: concat('styles.css'),
    prod: concat('styles.css', {newLine: ''})
  };

  return function() {
    return gulp.src(options.src, {base: options.base})
        .pipe(sourcemaps.init())
        .pipe(gulpIf(argv.prod, concatPreset.prod, concatPreset.dev))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(options.dist));
  };

};
