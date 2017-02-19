const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const source = require('vinyl-source-stream');

// Static server
gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './src/'
    }
  });
});

gulp.task('watch', ['browser-sync'], () => {
  gulp.watch('index.html', browserSync.reload);
});

gulp.task('browserify', () =>
    browserify('./jasmine/spec/inverted-index-test.js')
        .bundle()
        .pipe(source('app-test.js'))
        .pipe(gulp.dest('./jasmine/spec'))
);


gulp.task('default', ['browserify', 'watch']);
