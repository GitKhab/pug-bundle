'use strict';

const gulp = require('gulp');
const cache = require('gulp-cached');
const gulpIf = require('gulp-if');
const argv = require('yargs').argv;
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');

module.exports = function(options) {

  const imageminPreset = {
    dev: notify({
      onLast: true,
      sound: false,
      title: 'imagemin',
      message: 'Оптимизация векторных изображений была пропущена (режим разработки)'
    }),
    prod: imagemin([
      imagemin.svgo()
    ], {verbose: true})
  };

  return function() {
    return gulp.src(options.src, {base: options.base})
        .pipe(cache('svg'))
        .pipe(gulpIf(argv.prod, imageminPreset.prod, imageminPreset.dev))
        .pipe(gulp.dest(options.dist));
  };

};
