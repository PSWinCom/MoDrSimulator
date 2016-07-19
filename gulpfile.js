var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var gutil = require('gulp-util');

gulp.task('default', function() {
});

gulp.task('bootstrap-fonts', function() {
  gulp.src('src/static/bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg,woff2}')
    .pipe(gulp.dest("dist/static/fonts"));
});

gulp.task('default', ['bootstrap-fonts'], function() {
    gulp.src('src/static/index.html')
      .pipe(usemin({
            assetsDir: 'src/static',
            css: gutil.env.env === 'prod' ? [minifyCss(), 'concat'] : [ 'concat' ],
            js: gutil.env.env === 'prod' ? [uglify(), 'concat'] : [ 'concat' ]
        }))
      .pipe(
        gulp.dest("dist/static"));
});