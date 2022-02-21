const gulp = require('gulp');
const { src, dest, watch, series } = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();


// Sass Task
// function scssTask() {
//     return gulp.src('app/scss/**/*.scss')
//         .pipe(cssnano())
//         .pipe(sass().on('error', sass.logError))

//     .pipe(gulp.dest('dist', { sourcemaps: '.' }));
// };
function scssTask() {
    return src('app/scss/**/*.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([cssnano()]))
        .pipe(dest('dist', { sourcemaps: '.' }));
}

function jsTask() {
    return src('app/js/**/*.js', { sourcemaps: true })
        .pipe(concat('script.js'))
        .pipe(terser())
        .pipe(dest('dist', { sourcemaps: '.' }));
}

// Browsersync Tasks
function browsersyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: '.'
        }
    });
    cb();
}

function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

// Watch Task
function watchTask() {
    watch('*.html', browsersyncReload);
    watch(['app/scss/**/*.scss', 'app/js/**/*.js'], series(scssTask, jsTask, browsersyncReload));
}

// Default Gulp task
exports.default = series(
    scssTask,
    jsTask,
    browsersyncServe,
    watchTask
);