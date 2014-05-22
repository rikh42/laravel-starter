
// tools we'll use
var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');


// Where to put the compiled assets
var target = 'public/assets';

// All the source files that we need to process
var cssPublic = [
    'app/assets/less/master.less'
];


// Javascript files
var jsPublic = [
    'vendor/twbs/bootstrap/js/*.js'
];

// Delete all the generated assets
gulp.task('clean', function () {
    return gulp.src(target, {read: false})
        .pipe(clean());
});


// Combine our javascript
gulp.task('js-public', function() {
    return gulp.src(jsPublic)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(target))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(target));
});



// Compile Our Less
gulp.task('less', function() {
    return gulp.src(cssPublic)
        .pipe(less({paths: [ path.join(__dirname, 'less', 'includes') ]}))
        .pipe(concat('all.css'))
        .pipe(gulp.dest(target))
        .pipe(rename('all.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(target));
});



// By default, clean the asset folder and rebuild all the js and css files
gulp.task('default', ['clean', 'js-public', 'less']);
