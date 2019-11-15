var gulp = require("gulp");
var cssnano = require("gulp-cssnano");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const plumber = require("gulp-plumber");

gulp.task("sass", function() {
  return gulp
    .src("css/sass/*.scss")
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest("css"));
});

gulp.task("js", function() {
  return gulp
    .src("js/*.js")
    .pipe(plumber())
    .pipe(
      babel({
        presets: [
          [
            "@babel/env",
            {
              modules: false
            }
          ]
        ]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("js/min"));
});

gulp.task("watch", function() {
  gulp.watch("css/sass/*.scss", gulp.series("sass"));
  gulp.watch("js/accordion.js", gulp.series("js"));
});

gulp.task("build", gulp.series(["sass", "js"]));
