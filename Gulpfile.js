var gulp = require('gulp');

var jsFilesToMove = [
  'bower_components/angular/angular.min.js',
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/chart.js/dist/Chart.min.js',
  'bower_components/materialize/dist/js/materialize.min.js',
  'bower_components/moment/min/moment-with-locales.min.js',
  'bower_components/angular-pickadate/dist/angular-pickadate.min.js'
];

var cssFilesToMove = [
  'bower_components/materialize/dist/css/materialize.min.css',
  'bower_components/angular-pickadate/dist/angular-pickadate.css'
];

var fontsFilesToMove = [
  'bower_components/materialize/dist/fonts/**/*'
];

gulp.task('assets-dist', function() {
	gulp.src(jsFilesToMove)
		.pipe(gulp.dest('assets/components/js'));
  gulp.src(cssFilesToMove)
  	.pipe(gulp.dest('assets/components/css'));
  gulp.src(fontsFilesToMove)
  	.pipe(gulp.dest('assets/components/fonts'));
});

gulp.task('default', [ 'assets-dist' ]);
