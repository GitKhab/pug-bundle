'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const cache = require('gulp-cached');
const babel = require('gulp-babel');
const gulpIf = require('gulp-if');
const argv = require('yargs').argv;
const uglify = require('gulp-uglify');
const remember = require('gulp-remember');
const concat = require('gulp-concat');
const header = require('gulp-header');

module.exports = function(options) {

  const concatPreset = {
    dev: concat('scripts.js'),
    prod: concat('scripts.js', {newLine: ''})
  };

  return function() {
    return gulp.src(options.src, {base: options.base})
        .pipe(sourcemaps.init())
        .pipe(cache('js'))
        .pipe(babel())
        .pipe(gulpIf(argv.prod, uglify()))
        .pipe(remember('js'))
        .pipe(gulpIf(argv.prod, concatPreset.prod, concatPreset.dev))
        .pipe(header('"use strict";'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(options.dist));
  };

};
