'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const argv = require('yargs').argv;
const autoprefixer = require('gulp-autoprefixer');
const stylus = require('gulp-stylus');
const filter = require('gulp-filter');

module.exports = function(options) {

  const cssDeclaration = 'src/_kit/css/declaration/styles.css';

  return function() {
    return gulp.src(options.src, {base: options.base})
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(filter(cssDeclaration))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(options.dist));
  };

};
