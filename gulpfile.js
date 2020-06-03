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

lazyRequireTask('clean:views', './gulp-tasks/clean', {
  clean: views.dist
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

});


// =============================================================================
// варианты сборки
// =============================================================================

gulp.task('default', gulp.series('clean', 'build:views', 'watch'));

gulp.task('build', gulp.series('clean', 'build:views'));
