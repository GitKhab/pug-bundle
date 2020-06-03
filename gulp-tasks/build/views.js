'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');

module.exports = function(options) {

  return function() {
    return gulp.src(options.src, {base: options.base})
        .pipe(pug())
        .pipe(gulp.dest(options.dist));
  };

};
