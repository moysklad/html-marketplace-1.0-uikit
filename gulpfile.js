"use strict";

const gulp = require("gulp");
const del = require("del");
const plugins = require("gulp-load-plugins")();
const autoprefixer = require("autoprefixer");
const mqpacker = require("css-mqpacker");
const include = require("posthtml-include");

gulp.task('clean', function () {
    return del("./build");
});

gulp.task("copy", function () {
    return gulp
        .src([
            "./source/fonts/**/*.{eot,ttf,woff,woff2}",
            "./source/img/**",
            "./source/index.html",
        ], {
            base: "source"
        })
        .pipe(gulp.dest("./build"));
});

gulp.task("styles", plugins.parameterized(function (args) {
    return gulp
        .src("./source/scss/uikit.scss")
        .pipe(plugins.sass({outputStyle: "expanded"}))
        .pipe(plugins.concat("uikit.css"))
        .pipe(plugins.postcss([
            autoprefixer(),
            mqpacker({sort: true})
        ]))
        .pipe(gulp.dest("./build/css"))
        .pipe(plugins.if(args.params.production, plugins.csso({comments: false})))
        .pipe(plugins.if(args.params.production, plugins.rename("uikit.min.css")))
        .pipe(plugins.if(args.params.production, gulp.dest("./build/css")))
}));

gulp.task("scripts", plugins.parameterized(function (args) {
    return gulp
        .src("./source/js/uikit.js")
        .pipe(plugins.include())
        .pipe(plugins.concat("uikit.js"))
        .pipe(plugins.babel({"presets": ["@babel/preset-env"]}))
        .pipe(gulp.dest("./build/js"))
        .pipe(plugins.if(args.params.production, plugins.uglify()))
        .pipe(plugins.if(args.params.production, plugins.rename("uikit.min.js")))
        .pipe(plugins.if(args.params.production, gulp.dest("./build/js")))
}));

gulp.task("html", function () {
    return gulp.src("source/*html")
        .pipe(plugins.posthtml([
            include()
        ]))
        .pipe(gulp.dest("./build"));
});

gulp.task("images", function () {
    return gulp
        .src("./source/img/**/*.{png,jpg,svg}")
        .pipe(plugins.imagemin([
            plugins.imagemin.optipng({optimizationLevel: 3}),
            plugins.imagemin.jpegtran({progressive: true}),
            plugins.imagemin.svgo()
        ]))
        .pipe(gulp.dest("./build/img"));
});

gulp.task("watch", function () {
    gulp.watch("./source/scss/**/*", gulp.series("styles"));
    gulp.watch("./source/js/**/*", gulp.series("scripts"));
    gulp.watch("./source/*.html", gulp.series("html"));
});

gulp.task("build", gulp.series(
    "clean",
    "copy",
    "styles",
    "scripts",
    "html",
    "watch"
));

gulp.task("production", plugins.parameterized.series(
    "clean",
    "copy",
    "styles --production",
    "scripts --production",
    "html"
));
