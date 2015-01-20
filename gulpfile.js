var gulp        = require('gulp'),
    log         = require('gulp-util'), // display any error logs via terminal window
    concat      = require('gulp-concat'); //concatenate files

// control the order that js files get concatenated in by the order in the array below.
var jsSources   = [   'src/js/test.js',
                      'src/js/test2.js' ];


// gulp.task('log', function() {
//   gutil.log('Yea!');
// });

gulp.task('js', function() {
  gulp.src(jsSources) //grab all the js files listed in the jsSources var
    .pipe(concat('scripts.js')) // pipe each file through the concat plugin and combine into a single "scripts.js" file
    .pipe(gulp.dest('./js/')) // copy the scripts.js file to the js folder in root
})