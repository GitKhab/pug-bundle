'use strict';

const gulp = require('gulp');
const cache = require('gulp-cached');

module.exports = function(options) {

  return function() {
    return gulp.src(options.src, {base: options.base})
        .pipe(cache('assets'))
        .pipe(gulp.dest(options.dist));
  };

};
