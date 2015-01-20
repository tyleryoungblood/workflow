var gulp        = require('gulp'),
    gutil       = require('gulp-util'); // display log via terminal window


gulp.task('log', function() {
  gutil.log('Yea!');
})