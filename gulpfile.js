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

var paths = {
  src: {
    base: 'src',
    sass: 'src/sass/**/*.scss',
    js: 'src/js/**/*.js',
    html: 'src/**/*.html'
  },
  dev: {
    base: 'builds/dev',
    css: 'builds/dev/css',
    js: 'builds/dev/js',
    html: 'builds/dev'
  }
}

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: paths.dev.base // "./" means root dir
    }
  });
});

gulp.task('html', function() {
  gulp.src(paths.src.html) // get any html files from the src dir
    .pipe(gulp.dest(paths.dev.html))
    .pipe(reload({stream:true})) // reload page via browserSync
});

gulp.task('js', function() {
  gulp.src(jsSources) //grab all the js files listed in the jsSources var
    .pipe(concat('scripts.js')) // pipe each file through the concat plugin and combine into a single "scripts.js" file
    .pipe(gulp.dest(paths.dev.js)) // copy the scripts.js file to the js folder in root
    .pipe(reload({stream:true})) // reload page via browserSync
});

gulp.task('sass', function() {
  gulp.src(paths.src.sass)
    .pipe(sass())
    //.on('error', gutil.log) // enable for more verbose terminal error messages
    .pipe(gulp.dest(paths.dev.css))
    .pipe(reload({stream:true})) // reload page via browserSync
});

gulp.task('watch', function() {
  gulp.watch(paths.src.js, ['js']);
  gulp.watch(paths.src.sass, ['sass']);
  gulp.watch(paths.src.html, ['html'], reload); // watch for any changes to .html files in root or subdirectories and call the reload task
});

gulp.task('default', ['browser-sync', 'html', 'js', 'sass', 'watch']); // default task to run when typing "gulp" in terminal window

// BUILD TASK

gulp.task('usemin', function() {
  return gulp.src(paths.src.html)
    .pipe(usemin({
      css:  [minifyCss(), 'concat'],
      html: [minifyHtml({ empty: true,
                          conditionals: true })],
      js:   [uglify()]
    }))
    .pipe(gulp.dest(paths.dev.html));
});

gulp.task('usemin-root', function() {
  return gulp.src(paths.dev.html)
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
