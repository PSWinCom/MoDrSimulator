var gulp = require('gulp');

gulp.task('default', function() {

});

gulp.task('dev', function() {
  gulp.src('bower_components')
    .pipe(gulp.dest('static'));
});