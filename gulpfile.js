var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassGlob = require('gulp-sass-glob');


//style paths

var sassFiles = './components/**/*.scss',
  mainStyles = './components/main.scss';
  cssDest = './public/assets/styles/css';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

// ... variables
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function () {
  return gulp
    .src(mainStyles)
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(cssDest));
});

gulp.task('watch', function() {
  return gulp
  // Watch the input folder for change,
  // and run `sass` task when something happens
    .watch(sassFiles, ['sass'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});