const gulp  = require('gulp');
const browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('watch', ['browser-sync'], () => {
	gulp.watch('index.html', browserSync.reload);
});


gulp.task( 'default', ['watch'] );
