'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const argv = require('yargs').argv;
const stylus = require('gulp-stylus');

module.exports = function(options) {

  const stylusPreset = {
    dev: stylus(),
    prod: stylus({compress: true})
  };

  return function() {
    return gulp.src(options.src, {base: options.base})
        .pipe(sourcemaps.init())
        .pipe(gulpIf(argv.prod, stylusPreset.prod, stylusPreset.dev))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(options.dist));
  };

};
