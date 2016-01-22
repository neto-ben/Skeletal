var gulp = require('gulp');
var less = require('gulp-sass');
var path = require('path');

gulp.task('sass', function () {
	gulp.src('./httpdocs/assets/themes/**/css/app.scss')
	.pipe(less({
		paths: [ path.join(__dirname, 'sass', 'includes') ]
	}))
	.pipe(gulp.dest('./httpdocs/assets/themes/'));
});

gulp.task('default', function () {
	gulp.watch('./httpdocs/assets/themes/*/css/**/*.scss', ['sass']);
});
