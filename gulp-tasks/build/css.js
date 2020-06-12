'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const argv = require('yargs').argv;

module.exports = function(options) {

  return function() {
    return gulp.src(options.src, {base: options.base})
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(options.dist));
  };

};
