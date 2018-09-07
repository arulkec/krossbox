var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');

var paths = {
    scss: ['./src/**/*.scss'],
    build: ['build']
};

// Not all tasks need to use streams 
// A gulpfile is just another node program and you can use any package available on npm 
gulp.task('clean', function () {
    // You can use multiple globbing patterns as you would with `gulp.src` 
    return del('build');
});

gulp.task('sass', function () {
    return gulp.src(paths.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src'));
});

gulp.task('sass:watch', function () {
    gulp.watch(paths.scss, ['sass']);
});

gulp.task('watch:all', function () {
    gulp.watch(['clean'], ['sass'], ['sass:watch']);
});