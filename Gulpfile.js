var gulp = require('gulp');

var jsFilesToMove = [
  'bower_components/angular/angular.min.js',
  'bower_components/angular-route/angular-route.min.js',
  'bower_components/angular-chart.js/dist/angular-chart.min.js',
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/chart.js/dist/Chart.min.js',
  'bower_components/materialize/dist/js/materialize.min.js',
  'bower_components/moment/min/moment-with-locales.min.js'
];

var cssFilesToMove = [
  'bower_components/materialize/dist/css/materialize.min.css'
];

var fontsFilesToMove = [
  'bower_components/materialize/dist/fonts/**/*'
];

gulp.task('js-dist', function() {
	gulp.src(jsFilesToMove)
		.pipe(gulp.dest('assets/components/js'));
});

gulp.task('css-dist', function() {
	gulp.src(cssFilesToMove)
		.pipe(gulp.dest('assets/components/css'));
});

gulp.task('fonts-dist', function() {
	gulp.src(fontsFilesToMove)
		.pipe(gulp.dest('assets/components/fonts'));
});

gulp.task('default', [ 'js-dist', 'css-dist', 'fonts-dist' ]);
