'use strict';

const gulp = require('gulp');
const cache = require('gulp-cached');
const remember = require('gulp-remember');
const path = require('path');


// =============================================================================
// функция "ленивой" загрузки модуля
// =============================================================================

function lazyRequireTask(taskName, path, options) {
  options.taskName = taskName;
  options = options || {};
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);
    return task(callback);
  });
}


// =============================================================================
// пути
// =============================================================================

const src = 'src/';
const dist = 'dist/';

const views = {
  src: 'src/**/index.pug',
  templates: 'src/_kit/templates/**/*.pug',
  dist: 'dist/**/index.html'
};

const css = {
  src: 'src/_kit/css/**/*.css',
  dist: 'dist/_kit/css/'
};


// =============================================================================
// представления
// =============================================================================

lazyRequireTask('build:views', './gulp-tasks/build/views', {
  base: src,
  src: views.src,
  dist: dist
});

lazyRequireTask('clean:views', './gulp-tasks/clean', {
  clean: views.dist
});


// =============================================================================
// стили
// =============================================================================

lazyRequireTask('build:css', './gulp-tasks/build/css', {
  base: src,
  src: css.src,
  dist: css.dist
});

lazyRequireTask('clean:css', './gulp-tasks/clean', {
  clean: css.dist
});


// =============================================================================
// очистка всей сборки
// =============================================================================

lazyRequireTask('clean', './gulp-tasks/clean', {
  clean: dist
});


// =============================================================================
// отслеживание изменений в исходных файлах
// =============================================================================

gulp.task('watch', function() {

  gulp.watch([
    views.src,
    views.templates
  ], gulp.series('build:views'))

  gulp.watch(css.src, gulp.series('build:css'))
      .on('unlink', function(filepath) {
        delete cache.caches['css'][path.resolve(filepath)];
        remember.forget('css', path.resolve(filepath));
      });

});


// =============================================================================
// варианты сборки
// =============================================================================

gulp.task('default', gulp.series('clean', 'build:views', 'build:css', 'watch'));

gulp.task('build', gulp.series('clean', 'build:views', 'build:css'));
