var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

gulp.task('default', function() {
});

gulp.task('bootstrap', function() {
  gulp.src('src/static/bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg,woff2}')
    .pipe(gulp.dest("dist/static/fonts"));
});

gulp.task('dev', ['bootstrap'], function() {
    gulp.src('src/static/index.html')
      .pipe(usemin({
            assetsDir: 'src/static',
            css: ['concat'],
            js: ['concat']
        }))
      .pipe(
        gulp.dest("dist/static"));
});

gulp.task('prod', ['bootstrap'], function() {
    gulp.src('src/static/index.html')
      .pipe(usemin({
            assetsDir: 'src/static',
            css: [minifyCss(), 'concat'],
            js: [uglify(), 'concat']
        }))
      .pipe(
        gulp.dest("dist/static"));
});