var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    _ = require('underscore'),
    del = require('del'),
    glob = require('glob'),
    source = require('vinyl-source-stream'),
    through = require('through'),
    notifier = require("node-notifier"),
    browserify = require('browserify');
    

var BUILD_DIR = 'build';
var BROWSERIFY_VENDORED_MODULES = ['react','react/addons','underscore'];

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('clean', function(cb){
  return del([BUILD_DIR],cb);
});

gulp.task('copy', function () {
  var inputs = [
    './index.html'
  ];

  return gulp.src(inputs)
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('app-js', function() {
  var bundler = browserify({
      entries: ['./app.js'],
      basedir: './js',
      extensions: ['.jsx'],
      debug: true
    });
  bundler.transform('reactify');
  bundler.external(BROWSERIFY_VENDORED_MODULES);

  return bundler.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('vendor-js', function() {
  var bundler = browserify({
      debug: true
    });

  BROWSERIFY_VENDORED_MODULES.forEach( function(m){
    bundler.require(m);
  });

  return bundler.bundle()
    .pipe(source('vendor.js'))
    .pipe(gulp.dest(BUILD_DIR));
});

// this task is called from testem's before hook
gulp.task('browser-specs-js', function() {
  var specFiles = glob.sync('./tests/{view,acceptance}/**/*_spec.js');
  var bundler = browserify({
    entries: specFiles,
    debug: true,
    extensions: ['.jsx']
  });
  bundler.transform('reactify');
  bundler.external(BROWSERIFY_VENDORED_MODULES);

  return bundler.bundle()
    .pipe(source('browser_specs.js'))
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('unit-test', function() {
  var notifyError = plugins.notify.onError({
    title: "unit tests failed",
    message: "<%= error.message %>"
  });

  return gulp.src(['tests/unit/**/*_spec.js'],{read:false})
    .pipe(plugins.mocha({
      ui: 'bdd',
      useColors: false,
    }))
    .on("error", notifyError)
});

gulp.task('browser-test', plugins.shell.task([ 'testem ci -f tests/testem.json' ]));

gulp.task('build', ['vendor-js','app-js','copy']);

gulp.task('watch', ['default'], function(){
  var watchOpts = {debounceDelay:2000}, // workaround for editors saving file twice: http://stackoverflow.com/questions/21608480/gulp-js-watch-task-runs-twice-when-saving-files
      watchTargets = {
    './index.html': ['copy'],
    './js/**/*': ['unit-test','app-js'],
    './tests/unit/**/*': ['unit-test']
  };
  
  _.each(watchTargets, function(tasks,glob){
    gulp.watch( glob, watchOpts, tasks );
  });
});


gulp.task('default', ['clean','unit-test','build']);
