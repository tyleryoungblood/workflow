// DEFAULT GULP TASK

var // VARS FOR DEFAULT TASK
    gulp        = require('gulp'),
    gutil       = require('gulp-util'), // display any error logs via terminal window
    concat      = require('gulp-concat'), //concatenate files
    sass        = require('gulp-sass'), // sass to css preprocessing via gulp-sass
    browserSync = require('browser-sync'), // reload browser(s) whenever gulp detects a file change
    reload      = browserSync.reload,
    // VARS FOR BUILD TASK
    usemin      = require('gulp-usemin'), // replaces links to non-minified js or css in html file
    uglify      = require('gulp-uglify'), // minifies js
    minifyHtml  = require('gulp-minify-html'),
    minifyCss   = require('gulp-minify-css');

// control the order that js files get concatenated in by the order in the array below.
var jsSources   = [   'src/js/test.js',
                      'src/js/test2.js' ];

// gulp.task('log', function() {
//   gutil.log('Yea!');
// });

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "builds/dev" // "./" means root dir
    }
  });
});

gulp.task('html', function() {
  gulp.src('src/*.html') // get any html files from the src dir
    .pipe(gulp.dest('builds/dev'))
    .pipe(reload({stream:true})) // reload page via browserSync
});

gulp.task('js', function() {
  gulp.src(jsSources) //grab all the js files listed in the jsSources var
    .pipe(concat('scripts.js')) // pipe each file through the concat plugin and combine into a single "scripts.js" file
    .pipe(gulp.dest('builds/dev/js/')) // copy the scripts.js file to the js folder in root
    .pipe(reload({stream:true})) // reload page via browserSync
});

gulp.task('sass', function() {
  gulp.src('src/sass/*.scss')
    .pipe(sass())
    //.on('error', gutil.log) // enable for more verbose terminal error messages
    .pipe(gulp.dest('builds/dev/css'))
    .pipe(reload({stream:true})) // reload page via browserSync
});

gulp.task('watch', function() {
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('./**/*.html', ['html'], reload); // watch for any changes to .html files in root or subdirectories and call the reload task
});

gulp.task('default', ['browser-sync', 'html', 'js', 'sass', 'watch']); // default task to run when typing "gulp" in terminal window

// BUILD TASK

gulp.task('usemin', function() {
  return gulp.src('builds/dev/*.html')
    .pipe(usemin({
      css:  [minifyCss(), 'concat'],
      html: [minifyHtml({ empty: true,
                          conditionals: true })],
      js:   [uglify()]
    }))
    .pipe(gulp.dest('builds/dist'));
});

gulp.task('usemin-root', function() {
  return gulp.src('builds/dev/*.html')
    .pipe(usemin({
      css:  [minifyCss(), 'concat'],
      html: [minifyHtml({ empty: true,
                          conditionals: true })],
      js:   [uglify()]
    }))
    .pipe(gulp.dest('./'));
});

 
gulp.task('build', ['usemin']); // minify css & html, uglify js, and pipe to dist directory
gulp.task('build-root', ['usemin-root']); //same as build, but to root instead of builds/dist

// DEPLOY TASK

gulp.task('deploy', []); // deploy to server