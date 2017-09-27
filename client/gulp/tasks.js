var config = require('./build-config.js');
var gulp = require('gulp'),
    gzip = require('gulp-gzip'),
    gutil = require('gulp-util'),
    rebaseCssUrls = require('gulp-rebase-css-urls'),
    gif = require('gulp-if'),
    livereload = require('gulp-livereload'),
    uglify = require ('gulp-uglify'),
    typescript = require('gulp-typescript'),
    path = require('path'),
    rename = require('gulp-rename'),
    SystemBuilder = require('systemjs-builder'),
    rimraf = require('gulp-rimraf'),
    runSequence = require('run-sequence'),
    concat = require('gulp-concat'),
    cleanMinCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    htmlmin = require('gulp-htmlmin'),
    chalk = require('chalk'),
    inject = require('gulp-inject'),
    mergeStream = require('merge-stream'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    builder = new SystemBuilder();

var paths = config.paths;
var hasErrors = false;

gulp.task('compile:images', function(done) {
    gutil.log(chalk.bold("Environment: " + config.env));
    //gutil.log(chalk.red("SourceMap: "  + sourceMap));
    gutil.log(chalk.green('✔ ') + chalk.bold.gray(paths.images.src) + chalk.red(' -> ') + chalk.bold(paths.images.dest));
    var stream = gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest))
        .on('end', function (){
            logFinish('Images copy and optimization');
            done();
        });
});

gulp.task('compile:typescript', function(done) {
    var sourceMap = false;
    var emitDecoratorMetadata = true;
    var experimentalDecorators = true;
    var removeComments = false;
    var tsProject = typescript.createProject('tsconfig.json');
    gutil.log(chalk.bold("Environment: " + config.env));
    gutil.log(chalk.red("SourceMap: "  + sourceMap));
    gutil.log(chalk.red("EmitDecoratorMetadata: "  + emitDecoratorMetadata));
    gutil.log(chalk.red("ExperimentalDecorators: "  + experimentalDecorators));
    gutil.log(chalk.red("RemoveComments: "  + removeComments));
    gutil.log(chalk.green('✔ ') + chalk.bold.gray(paths.typescript.src) + chalk.red(' -> ') + chalk.bold(paths.typescript.dest));
    var stream = gulp.src(paths.typescript.src)
        .pipe(plumber({errorHandler: logError}))
        .pipe(tsProject())
        .pipe(gulp.dest(paths.typescript.dest))
        .on('end', function () {
            logFinish('Typescript compilation')();
            done();
        });
});


gulp.task('bundle:js', function(done) {
    var mStream = mergeStream();
    gutil.log(chalk.bold("Environment: " + config.env));
    gutil.log(chalk.red("SourceMaps: " + config.sourceMaps));
    gutil.log(chalk.red("Minify: "  + config.minifyJS));
    gutil.log(chalk.red("Bundle: "  + config.bundle));
    gutil.log(chalk.green('✔ ') + chalk.bold.gray(paths.js.src) + chalk.red(' -> ') + chalk.bold(paths.js.dest));
    for(var bundle in paths.js.bundles){
        var bundleFileName = bundle + '.js';
        var files = paths.js.bundles[bundle];
        var filePaths = getFilePaths(files, config.minifyJS);
        var configSrc = config.bundle ? {} : {base:'.'};
        var sourceMapsDest = config.bundle ? '../maps' : './maps';
        var stream = gulp.src(filePaths, configSrc)
            .pipe(plumber({errorHandler: logError}))
            .pipe(gif(config.sourceMaps, sourcemaps.init()))
            .pipe(gif(config.bundle, concat(bundleFileName)))
            .pipe(gif(config.minifyJS, uglify()))
            .pipe(gif(config.sourceMaps, sourcemaps.write(sourceMapsDest)));
        mStream.add(stream);
        for(var i in filePaths){
            gutil.log(chalk.green('✔ ') + chalk.gray(filePaths[i]) + chalk.red(' -> ') +
                (config.bundle ? paths.build + bundleFileName : paths.build + filePaths[i]));
        }
    }

    mStream.pipe(gulp.dest(paths.js.dest))
        .on('end', function () {
            logFinish('JS bundle')();
            done();
        });
});

gulp.task('bundle:css', function(done) {
    var mStream = mergeStream();
    gutil.log(chalk.bold("Environment: " + config.env));
    gutil.log(chalk.red("SourceMaps: " + config.sourceMaps));
    gutil.log(chalk.red("Minify: "  + config.minifyCSS));
    gutil.log(chalk.red("Bundle: "  + config.bundle));
    gutil.log(chalk.green('✔ ') + chalk.bold.gray(paths.css.src) + chalk.red(' -> ') + chalk.bold(paths.css.dest));
    for(var bundle in paths.css.bundles){
        var bundleFileName = bundle + '.css';
        var files = paths.css.bundles[bundle];
        var isSass = true;
        var filePaths = getFilePaths(files, config.minifyCSS, isSass);
        var configSrc = config.bundle ?  null:  {base:'.'};
        var sourceMapsDest = config.bundle ? '../maps' : './maps';
        var stream = gulp.src(filePaths, configSrc)
            .pipe(plumber({errorHandler: logError}))
            .pipe(gif(config.sourceMaps, sourcemaps.init({debug:true})))
            .pipe(gif('*.scss', sass()))
            .pipe(gif(config.minifyCSS, cleanMinCSS({processImportFrom:['!fonts.googleapis.com']})))
            .pipe(gif(config.bundle, concat(bundleFileName)))
            //.pipe(urlAdjuster({replace:  ['assets','']}))
            .pipe(rebaseCssUrls('assets'))
            .pipe(gif(config.sourceMaps, sourcemaps.write(sourceMapsDest)));
        mStream.add(stream);
        for(var i in filePaths){
            gutil.log(chalk.green('✔ ') + chalk.gray(filePaths[i]) + chalk.red(' -> ') +
                (config.bundle ? paths.build + bundleFileName : paths.build + filePaths[i]));
        }
    }
    mStream.pipe(gulp.dest(paths.css.dest))
        .on('end', function () {
            logFinish('CSS bundle')();
            done();
        });
});


gulp.task('bundle:angular-app', function(done){
    var outputFile = paths.build + getFilePaths(paths.js.bundles["app/angular-app"], config.minifyJS)[0];
    gutil.log(chalk.bold("Environment: " + config.env));
    gutil.log(chalk.red("SourceMaps: " + config.sourceMaps));
    gutil.log(chalk.red("Minify: "  + config.minifyJS));
    gutil.log(chalk.red("Mangle: "  + config.minifyJS));
    gutil.log(chalk.green('✔ ') + chalk.gray(paths.app.src) + chalk.red(' -> ') + outputFile);
    builder.reset();
    builder.loadConfig(path.join(__dirname, 'systemjs.config.js'))
        .then(function(){
            builder.buildStatic('javascripts/app', outputFile, {
                sourceMaps: config.sourceMaps,
                minify: config.minifyJS,
                mangle: config.minifyJS,
                rollup: config.minifyJS
            })
            .then(function(){
                logFinish('Angular app bundle')();
                done();
            });
        })
});

gulp.task('deploy', function(done) {
    gutil.log(chalk.bold("Environment: " + config.env));
    gutil.log(chalk.red("SourceMaps: " + config.sourceMaps));
    gutil.log(chalk.red("Minify HTML: "  + config.minifyHTML));
    gutil.log(chalk.red("Minify CSS: "  + config.minifyCSS));
    gutil.log(chalk.red("Minify JS: "  + config.minifyJS));
    gutil.log(chalk.red("Bundle JS and CSS: "  + config.bundle));
    gutil.log(chalk.red("Use Vendor Min: "  + config.useMin));
    runSequence('clean','compile:typescript',
        ['bundle:angular-app','bundle:js', 'bundle:css'],
        ['copy:html', 'copy:images', 'copy:fonts', 'compile:index'],
        function(){
            logFinish('Deploy')();
            done();
        });
});


gulp.task('watch', function () {
    gutil.log(chalk.bold("Environment: " + config.env));
    livereload.listen();
    gulp.watch(paths.js.src).on('change', livereload);
    gulp.watch(paths.css.src).on('change', livereload);
    gulp.watch(paths.html.src).on('change', livereload);

    //logWatch(paths.js.src, 'bundle:js');
    //gulp.watch(paths.js.src, ['bundle:js']);

    logWatch(paths.css.src, 'bundle:css');
    gulp.watch(paths.css.src, ['bundle:css']);

    logWatch(paths.app.src, 'bundle:angular-app');
    gulp.watch(paths.app.src, ['bundle:angular-app']);

    logWatch(paths.images.src, 'copy:images');
    gulp.watch(paths.images.src, ['copy:images']);

    logWatch(paths.fonts.src, 'copy:fonts');
    gulp.watch(paths.fonts.src, ['copy:fonts']);

    logWatch(paths.html.src, 'copy:html');
    gulp.watch(paths.html.src, ['copy:html']);

    logWatch(paths.mainHtml, 'compile:index');
    gulp.watch(paths.mainHtml, ['compile:index']);

    gutil.log(chalk.bold.gray.underline(' Watching files... '));
});


gulp.task("copy:fonts", function () {
    gutil.log(chalk.bold("Environment: " + config.env));
    gutil.log(chalk.green('✔ ') + chalk.bold.gray(paths.fonts.src) + chalk.red(' -> ') + chalk.bold(paths.fonts.dest));
    var configSrc = config.bundle ?  {} :  {base:'.'};
    gulp.src(paths.fonts.src, configSrc)
        .pipe(gulp.dest(paths.fonts.dest));
});

gulp.task("copy:images", function () {
    gutil.log(chalk.bold("Environment: " + config.env));
    gutil.log(chalk.green('✔ ') + chalk.bold.gray(paths.images.src) + chalk.red(' -> ') + chalk.bold(paths.images.dest));
    gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
});

gulp.task("copy:html", function () {
    gutil.log(chalk.bold("Environment: " + config.env));
    gutil.log(chalk.red("Minify HTML: "  + config.minifyHTML));
    gutil.log(chalk.green('✔ ') + chalk.bold.gray(paths.html.src) + chalk.red(' -> ') + chalk.bold(paths.html.dest));
    gulp.src(paths.html.src)
        .pipe(gif(config.minifyHTML, htmlmin({collapseWhitespace: true, caseSensitive:true})))
        .pipe(gulp.dest(paths.html.dest));
});

gulp.task('compile:index', function(done) {
    gutil.log(chalk.bold("Environment: " + config.env));
    gutil.log(chalk.green('✔ ') + chalk.bold.gray(paths.mainHtml) + chalk.red(' -> ') + chalk.bold(paths.build));
    var htmlStream = gulp.src([paths.mainHtml])
        .pipe(gulp.dest(paths.build));
    for(var bundle in paths.css.bundles){
        var files = paths.css.bundles[bundle];
        var filePaths = config.bundle ? [bundle + '.css'] : getFilePaths(files, config.minifyCSS);
        var workingDir =  config.bundle ? paths.css.dest : paths.build;
        var bundleStream = gulp.src(filePaths, {read: false, cwd: workingDir});
        htmlStream
            .pipe(inject(bundleStream, {addPrefix:'/static', name: bundle, relative:true}))
            .pipe(gulp.dest(paths.build));
        for(var i in filePaths){
            gutil.log(chalk.green('✔ ') + chalk.green.bold(paths.mainHtml) + chalk.red(' <- ') + chalk.gray(filePaths[i]));
        }
    }
    for(var bundle in paths.js.bundles){
        var files = paths.js.bundles[bundle];
        var filePaths = config.bundle ? [bundle + '.js'] : getFilePaths(files, config.minifyJS);
        var workingDir =  config.bundle ? paths.js.dest : paths.build;
        var bundleStream = gulp.src(filePaths, {read: false, cwd: workingDir});
        htmlStream
            .pipe(inject(bundleStream, {addPrefix:'/static', name: bundle, relative:true}))
            .pipe(gulp.dest(paths.build));
        for(var i in filePaths){
            gutil.log(chalk.green('✔ ') + chalk.green.bold(paths.mainHtml) + chalk.red(' <- ') + chalk.gray(filePaths[i]));
        }
    }
    htmlStream.on('end', function () {
        gulp.src([paths.build + paths.mainHtml])
            .on('end', function () {
                logFinish('Index compilation')();
                done();
            });
    });
});

// ** Clean ** //
gulp.task("clean", function () {
    gutil.log(chalk.bold("Environment: " + config.env));
    gutil.log(chalk.red('✔ ') + chalk.bold.red('Deleting ' + paths.build + '*'));
    return gulp.src(paths.build + '*') // much faster
        .pipe(rimraf({ force: true }));
});

function getFilePaths(files, min, isSass) {
    var filenames = [];
    for (var i in files) {
        var file = files[i];
        if(isSass && file.hasOwnProperty("sass")){
            filenames.push(file.sass);
        }
        if(min && file.hasOwnProperty("minSrc")){
            filenames.push(file.minSrc);
        }
        else if (file.hasOwnProperty("src")){
            filenames.push(file.src);
        }
        else {
            filenames.push(file);
        }
    }
    return filenames;
}

function getFileNames(filePaths) {
    var regex = new RegExp(/[\*-\.\w]+\.js/g);
    if(!filePaths[0].match(regex)){
        regex = new RegExp(/[\*-\.\w]+\.css/g);
    }
    var fileNames = [];
    for (var i in filePaths) {
        var filePath = filePaths[i];
        var fileName = filePath.match(regex);
        if(fileName){
            fileNames.push(fileName[0]);
        }
    }
    return fileNames;
}

function debugFunction (details) {
    console.log("File name: " + details.name);
    console.log("Original size: "+ ': ' + details.stats.originalSize);
    console.log("Compressed size: "+ ': ' + details.stats.minifiedSize);
}

function logFinish (task, done) {
    return function(){
        if(hasErrors){
            gutil.log(chalk.yellow.bold(task + ' completed with some errors.'))
        } else {
            gutil.log(chalk.green.bold(task + ' completed successfully!'))
        }
        if(done){
            done();

        }
    };
}

function logWatch (src, taskName) {
    gutil.log(chalk.green('✔ ') + chalk.bold('Watching: ') + chalk.gray(src)
        +  chalk.red(' -> ') + chalk.yellow(taskName));
}

function logError(err){
    gutil.log(chalk.cyan('Plumber ') + chalk.red.bold('found unhandled error:'), err.toString());
    hasErrors = true;
    this.emit('end');
}
