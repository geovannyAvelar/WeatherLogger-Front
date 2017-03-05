var gulp = require('gulp');
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var cssmin = require("gulp-cssmin");
var stripCssComments = require('gulp-strip-css-comments');
var watch = require('gulp-watch');

var js = [
  'bower_components/angular/angular.min.js',
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/chart.js/dist/Chart.min.js',
  'bower_components/materialize/dist/js/materialize.min.js',
  'bower_components/moment/min/moment-with-locales.min.js',
  'bower_components/angular-pickadate/dist/angular-pickadate.min.js'
];

var jsToMinify = [
  'app/js/tabs.js',
  'app/js/angular-main.js',
  'app/js/services/weather-service.js',
  'app/js/services/line-chart-service.js',
  'app/js/controllers/weather-controller.js'
];

var css = [
  'bower_components/materialize/dist/css/materialize.min.css',
  'bower_components/angular-pickadate/dist/angular-pickadate.css'
];

var cssToMinify = [
  'app/css/input-colors.css',
  'app/css/main.css',
  'app/css/preloader.css'
];

var fonts = [
  'bower_components/materialize/dist/fonts/**/*'
];

gulp.task('assets-dist', function() {
	gulp.src(js)
		.pipe(gulp.dest('assets/components/js'));
  gulp.src(css)
  	.pipe(gulp.dest('assets/components/css'));
  gulp.src(fonts)
  	.pipe(gulp.dest('assets/components/fonts'));
});

gulp.task('minify-js', function () {
  gulp.src(jsToMinify)
    .pipe(concat('script.min.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('app/js'));
});

gulp.task('minify-css', function(){
  gulp.src(cssToMinify)
    .pipe(concat('style.min.css'))
    .pipe(stripCssComments({all: true}))
    .pipe(cssmin())
    .pipe(gulp.dest('app/css/'));
  
  gulp.src(['assets/components/css/angular-pickadate.css'])
    .pipe(concat('angular-pickadate.min.css'))
    .pipe(stripCssComments({all: true}))
    .pipe(cssmin())
    .pipe(gulp.dest('assets/components/css/'));
});

gulp.task('default', [ 'assets-dist', 'minify-js', 'minify-css' ]);

gulp.task('watch', function() {
  gulp.watch(css, ['minify-js', 'minify-css']);
});
