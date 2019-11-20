const gulp = require("gulp");
const cssnano = require("gulp-cssnano");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();

gulp.task("sass", function () {
  return gulp
    .src("css/sass/*.scss")
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());
});

gulp.task("js", function () {
  return gulp
    .src('js/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['@babel/preset-env'],
      plugins: ['transform-custom-element-classes'],
    }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest("js/dist"));
});

gulp.task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("css/sass/*.scss", gulp.series("sass"));
  gulp.watch("js/*.js", gulp.series("js")).on("change", browserSync.reload);
  gulp.watch("*.html").on("change", browserSync.reload);
});

gulp.task("build", gulp.series(["sass", "js"]));
