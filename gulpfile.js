
var gulp = require('gulp');
var print = require('gulp-print');
var webserver = require('gulp-webserver');  
var sass = require('gulp-sass');

gulp.task('js', function() {
  return gulp.src('content/app/**/*.js')               
      .pipe(print())                         
      .pipe(gulp.dest('build/js'));             
});

gulp.task("sass", function () {
    return gulp.src(
        "content/scss/*.scss"
    ).pipe(sass()).pipe(gulp.dest("build/css"));
});
    
gulp.task('libs', function(){
    return gulp.src([
        'node_modules/angular/angular.min.js',
        'node_modules/angular-route/angular-route.min.js',
        ])
        .pipe(print())
        .pipe(gulp.dest('build/libs'));
});

gulp.task('index', function(){
    return gulp.src(['content/index.html'])
            .pipe(print())
            .pipe(gulp.dest('build'));
});

gulp.task('images', function(){
    return gulp.src(['content/images/**.*'])
            .pipe(print())
            .pipe(gulp.dest('build/images'));
});

gulp.task('build', ['js', 'libs','sass', 'index','images'], function(){
    return gulp.src(['content/app/**/*.html'])
            .pipe(print())
            .pipe(gulp.dest('build/views'));
});

gulp.task('serve', ['build'], function() {
    
    gulp.watch(['content/index.html','content/app/**/*.*'], ['build']);
    
    gulp.src('build')
        .pipe(webserver({open: true}));
});