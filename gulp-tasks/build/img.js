'use strict';

const gulp = require('gulp');
const cache = require('gulp-cached');
const gulpIf = require('gulp-if');
const argv = require('yargs').argv;
const imagemin = require('gulp-imagemin');
const imageminJpeg = require('imagemin-jpeg-recompress');
const imageminPng = require('imagemin-pngquant');
const notify = require('gulp-notify');

module.exports = function(options) {

  const imageminPreset = {
    dev: notify({
      onLast: true,
      sound: false,
      title: 'imagemin',
      message: 'Оптимизация изображений была пропущена (режим разработки)'
    }),
    prod: imagemin([
      imagemin.gifsicle({interlaced: true}),
      imageminJpeg({min: 75, max: 85}),
      imageminPng({quality: [0.75, 0.85]})
    ], {verbose: true})
  };

  return function() {
    return gulp.src(options.src, {base: options.base})
        .pipe(cache('img'))
        .pipe(gulpIf(argv.prod, imageminPreset.prod, imageminPreset.dev))
        .pipe(gulp.dest(options.dist));
  };

};
