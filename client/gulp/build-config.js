var dist = "./deployed/";
var currentEnv = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
require('events').EventEmitter.defaultMaxListeners = 0;
environments = {
    development: {
        minifyJS: false,
        minifyCSS: true,
        minifyHTML: true,
        useMin: true,
        bundle: false,
        sourceMaps: false
    },
    production: {
        minifyJS: true,
        minifyCSS: true,
        minifyHTML: true,
        useMin: true,
        bundle: true,
        sourceMaps: false
    },
    staging: {
        minifyJS: true,
        minifyCSS: true,
        minifyHTML: true,
        useMin: true,
        bundle: true,
        sourceMaps: false
    },
    test: {
        minifyJS: true,
        minifyCSS: true,
        minifyHTML: true,
        useMin: true,
        bundle: true,
        sourceMaps: false
    }
}


module.exports = {
    env: currentEnv,
    minifyJS : environments[currentEnv].minifyJS,
    minifyCSS : environments[currentEnv].minifyCSS,
    minifyHTML: environments[currentEnv].minifyHTML,
    bundle : environments[currentEnv].bundle,
    sourceMaps : environments[currentEnv].sourceMaps,
    useMin: environments[currentEnv].useMin,
    paths : {
        typescript: {
            src: ["./javascripts/app/**/*.ts"],
            dest: "./javascripts/app/"
        },
        app: {
            src: ["./javascripts/app/**/*.js"],
            dest: dist + "javascripts/app/"
        },
        js: {
            src: ["./javascripts/**/*.js"],
            dest: environments[currentEnv].bundle ? dist + "javascripts/" : dist,
            bundles: {
                vendor : [
                    {src: './node_modules/tether/dist/js/tether.js', minSrc: './node_modules/tether/dist/js/tether.min.js'},
                    {src: './node_modules/jquery/dist/jquery.js', minSrc: './node_modules/jquery/dist/jquery.min.js'},
                    {src: './node_modules/bootstrap/dist/js/bootstrap.js', minSrc: './node_modules/bootstrap/dist/js/bootstrap.min.js'}

                ],
                "app/angular-app": [{src: 'javascripts/app/angular-app.js'}],
                "rd-tracking": [{src: 'javascripts/rd-tracking.js'}], 
                "application": [{src: 'javascripts/application.js'}]
            }
        },
        css: {
            src: ['./stylesheets/**/*.css', './stylesheets/**/*.scss'],
            dest: environments[currentEnv].bundle ? dist + "stylesheets/" : dist,
            bundles: {
                application : [{src: './stylesheets/application.css', sass: './stylesheets/application.scss'},
                                {src: './stylesheets/bootstrap.css', sass: './stylesheets/bootstrap.css'} ],
            }
        },
        html: {
            src: ["./views/**/*.html"],
            dest: dist + "views/"
        },
        mainHtml: "index.html",
        fonts: {
            src: [
                "./fonts/**/*.{otf,eot,svg,ttf,woff,woff2}"
            ],
            dest: environments[currentEnv].bundle ? dist + "fonts/" : dist
        },
        images: {
            src: ["./images/**/*.{png,jpg,gif}"],
            dest: dist + "images/"
        },
        build: dist
    }
};
