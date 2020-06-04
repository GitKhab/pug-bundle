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

const js = {
  src: 'src/_kit/js/**/*.js',
  dist: 'dist/_kit/js/'
};

const img = {
  src: 'src/_kit/img/**/*.{jpg,JPG,jpeg,JPEG,png,PNG,gif,GIF}',
  dist: 'dist/_kit/img/'
};

const svg = {
  src: 'src/_kit/svg/**/*.{svg,SVG}',
  dist: 'dist/_kit/svg/'
};

const assets = {
  src: 'src/_kit/assets/**/{.*,*.*}',
  dist: 'dist/_kit/assets/'
};

const server = {
  base: 'src/_kit/server/',
  src: 'src/_kit/server/**/{.*,*.*}'
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
// скрипты
// =============================================================================

lazyRequireTask('build:js', './gulp-tasks/build/js', {
  base: src,
  src: js.src,
  dist: js.dist
});

lazyRequireTask('clean:js', './gulp-tasks/clean', {
  clean: js.dist
});


// =============================================================================
// изображения
// =============================================================================

lazyRequireTask('build:img', './gulp-tasks/build/img', {
  base: src,
  src: img.src,
  dist: dist
});

lazyRequireTask('clean:img', './gulp-tasks/clean', {
  clean: img.dist
});


// =============================================================================
// векторные изображения
// =============================================================================

lazyRequireTask('build:svg', './gulp-tasks/build/svg', {
  base: src,
  src: svg.src,
  dist: dist
});

lazyRequireTask('clean:svg', './gulp-tasks/clean', {
  clean: svg.dist
});


// =============================================================================
// вспомогательные файлы, не требующие обработки
// =============================================================================

lazyRequireTask('build:assets', './gulp-tasks/build/assets', {
  base: src,
  src: assets.src,
  dist: dist
});

lazyRequireTask('clean:assets', './gulp-tasks/clean', {
  clean: assets.dist
});


// =============================================================================
// серверные файлы, сливающиеся в корневую директорию сборки
// =============================================================================

lazyRequireTask('build:server', './gulp-tasks/build/server', {
  base: server.base,
  src: server.src,
  dist: dist
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
  ], gulp.series('build:views'));

  gulp.watch(css.src, gulp.series('build:css'))
      .on('unlink', function(filepath) {
        delete cache.caches['css'][path.resolve(filepath)];
        remember.forget('css', path.resolve(filepath));
      });

  gulp.watch(js.src, gulp.series('build:js'))
      .on('unlink', function(filepath) {
        delete cache.caches['js'][path.resolve(filepath)];
        remember.forget('js', path.resolve(filepath));
      });

  gulp.watch(img.src, gulp.series('build:img'))
      .on('unlink', function(filepath) {
        delete cache.caches['img'][path.resolve(filepath)];
      });

  gulp.watch(svg.src, gulp.series('build:svg'))
      .on('unlink', function(filepath) {
        delete cache.caches['svg'][path.resolve(filepath)];
      });

  gulp.watch(assets.src, gulp.series('build:assets'))
      .on('unlink', function(filepath) {
        delete cache.caches['assets'][path.resolve(filepath)];
      });

  gulp.watch(server.src, gulp.series('build:server'))
      .on('unlink', function(filepath) {
        delete cache.caches['server'][path.resolve(filepath)];
      });

});


// =============================================================================
// варианты сборки
// =============================================================================

gulp.task('default', gulp.series('clean', 'build:views', 'build:css',
    'build:js', 'build:img', 'build:svg', 'build:assets', 'build:server',
    'watch'));

gulp.task('build', gulp.series('clean', 'build:views', 'build:css',
    'build:js', 'build:img', 'build:svg', 'build:assets', 'build:server'));
