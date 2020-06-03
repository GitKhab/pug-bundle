'use strict';

const gulp = require('gulp');


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


// =============================================================================
// представления
// =============================================================================

lazyRequireTask('build:views', './gulp-tasks/build/views', {
  base: src,
  src: views.src,
  dist: dist
});
