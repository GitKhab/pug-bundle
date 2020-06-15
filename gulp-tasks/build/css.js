'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const argv = require('yargs').argv;
const autoprefixer = require('gulp-autoprefixer');
const stylus = require('gulp-stylus');
const filter = require('gulp-filter');
const cleanCss = require('gulp-clean-css');

module.exports = function(options) {

  const cleanCssPreset = {
    dev: cleanCss({format: 'beautify'}),
    prod: cleanCss()
  }

  const cssDeclaration = 'src/_kit/css/declaration/styles.css';

  return function() {
    return gulp.src(options.src, {base: options.base})
        .pipe(sourcemaps.init())
        .pipe(stylus({'include css': true}))
        .pipe(filter(cssDeclaration))
        .pipe(gulpIf(argv.prod, cleanCssPreset.prod, cleanCssPreset.dev))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(options.dist));
  };

};
