/// <reference path="typings/tsd.d.ts" />
var plugins = {
    gulp: require("gulp"),
    gulpBrowser: require("gulp-browser"),
    easyserve: require("easyserve")
};
plugins.gulp.task('compileBrowserJS', function () {
    var stream = plugins.gulp.src('test/browser/index.js')
        .pipe(plugins.gulpBrowser.browserify())
        .pipe(plugins.gulp.dest("test/browser/browserified/"));
    return stream;
});
plugins.gulp.task('default', ['compileBrowserJS'], function () {
    console.log('browserJS has been browserified');
    plugins.easyserve("test/browser/");
});
plugins.gulp.start.apply(plugins.gulp, ['default']);
//# sourceMappingURL=testbrowser.js.map