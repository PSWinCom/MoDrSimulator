var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var gutil = require('gulp-util');
var bower = require('gulp-bower');

gulp.task('bower', function() {
  return bower();
});

gulp.task('bootstrap-fonts', [ 'bower' ], function() {
  gulp.src('src/static/bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg,woff2}')
    .pipe(gulp.dest("dist/static/fonts"));
});

gulp.task('default', ['bower', 'bootstrap-fonts'], function() {
    gulp.src('src/static/index.html')
      .pipe(usemin({
            assetsDir: 'src/static',
            css: (gutil.env.NODE_ENV === 'production') ? [minifyCss(), 'concat'] : [ 'concat' ],
            js: (gutil.env.NODE_ENV === 'production') ? [uglify(), 'concat'] : [ 'concat' ]
        }))
      .pipe(
        gulp.dest("dist/static"));
});