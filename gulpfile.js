var gulp = require('gulp');
var less = require('gulp-less');
var csso = require('gulp-csso');
var csslint = require('gulp-csslint');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var shell = require('gulp-shell')
var path = require('path');
var fs = require('fs');

gulp.task('less', function () {
	fs.stat('./src/css/app.less', function(err, stat) {
		if(err != null) {
			console.log('Error:' + err.code);
		}
	});
	gulp.src('./src/css/app.less')
	.pipe(plumber())
	.pipe(less({
		paths: [ path.join(__dirname, 'less', 'includes') ]
	}))
	.pipe(gulp.dest('./src/css/'));
});
gulp.task('minify', function () {
    return gulp.src('./src/css/app.css')
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
        .pipe(gulp.dest('./src/css/'));
});
gulp.task('lint', function() {
  return gulp.src('./src/css/*.css')
  	.pipe(plumber())
    .pipe(csslint())
    .pipe(csslint.formatter());
});
gulp.task('uglify', function () {
	return gulp.src('./src/js/*.js')
	.pipe(uglify())
    .pipe(gulp.dest('./src/js/'));
});
gulp.task('injectCSS', function () {
  var target = gulp.src('./src/templates/headers/template.html');
  var sources = gulp.src(['./src/css/*.css'], {read: false});
  return target.pipe(inject(sources,{
		transform: function(filepath){
			return '<link rel="stylesheet" type="text/css" href="' + filepath + '" media="all"/>';
		}
	}
	))
    .pipe(gulp.dest('./src/templates/headers/'));
});
gulp.task('injectJS', function () {
  var target = gulp.src('./src/templates/footers/template.html');
  var sources = gulp.src(['./src/js/*.js'], {read: false});
  return target.pipe(inject(sources,{
		transform: function(filepath){
			return '<script type="text/javascript" src="' + filepath + '"></script>'
		}
	}
	))
    .pipe(gulp.dest('./src/templates/footers/'));
});
gulp.task('injection', ['injectCSS', 'injectJS']);
gulp.task('build', shell.task([
	'bin/compile'
]));
gulp.task('default', function () {
	gulp.watch('./src/css/*.less', ['less']);
});
