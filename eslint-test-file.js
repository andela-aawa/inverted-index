const gulp = require('gulp');
const browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('default', ['browser-sync']);
