'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const argv = require('yargs').argv;
const autoprefixer = require('gulp-autoprefixer');
const stylus = require('gulp-stylus');
const filter = require('gulp-filter');

module.exports = function(options) {

  const stylusPreset = {
    dev: stylus(),
    prod: stylus({compress: true})
  };

  const mainStylesheets = 'src/_kit/css/styles.css';

  return function() {
    return gulp.src(options.src, {base: options.base})
        .pipe(sourcemaps.init())
        .pipe(gulpIf(argv.prod, stylusPreset.prod, stylusPreset.dev))
        .pipe(filter(mainStylesheets))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(options.dist));
  };

};
