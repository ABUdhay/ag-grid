/**
 * WEB ANGULAR VERSION
 * (based on systemjs.config.js from the angular tutorial - https://angular.io/tutorial)
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    // simplified version of Object.assign for es3
    function assign() {
        var result = {};
        for (var i = 0, len = arguments.length; i < len; i++) {
            var arg = arguments[i];
            for (var prop in arg) {
                result[prop] = arg[prop];
            }
        }
        return result;
    }

    var ANGULAR_VERSION = "10.0.0";
    var ANGULAR_CDK_VERSION = "10.0.0";
    var ANGULAR_MATERIAL_VERSION = "10.0.0";

    var sjsPaths = {};
    if (typeof systemJsPaths !== "undefined") {
        sjsPaths = systemJsPaths;
    }

    System.config({
        // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
        transpiler: "ts",
        typescriptOptions: {
            // Copy of compiler options in standard tsconfig.json
            target: "es5",
            module: "system", //gets rid of console warning
            moduleResolution: "node",
            sourceMap: true,
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            lib: ["es2015", "dom"],
            noImplicitAny: true,
            suppressImplicitAnyIndexErrors: true
        },
        meta: {
            typescript: {
                exports: "ts"
            },
            '*.css': { loader: 'css' }
        },
        paths: assign({
            // paths serve as alias
            "npm:": "https://unpkg.com/",
        }, sjsPaths),
        // RxJS makes a lot of requests to unpkg. This guy addressed it:
        // https://github.com/OasisDigital/rxjs-system-bundle.
        bundles: {
            "npm:rxjs-system-bundle@6.3.3/Rx.system.min.js": [
                "rxjs",
                "rxjs/*",
                "rxjs/operator/*",
                "rxjs/operators/*",
                "rxjs/observable/*",
                "rxjs/scheduler/*",
                "rxjs/symbol/*",
                "rxjs/add/operator/*",
                "rxjs/add/observable/*",
                "rxjs/util/*"
            ]
        },
        // map tells the System loader where to look for things
        map: assign(
            {
                // css plugin
                'css': 'npm:systemjs-plugin-css@0.1.37/css.js',

                // angular bundles
                "@angular/animations": "npm:@angular/animations@" + ANGULAR_VERSION + "/bundles/animations.umd.min.js",
                "@angular/animations/browser": "npm:@angular/animations@" + ANGULAR_VERSION + "/bundles/animations-browser.umd.min.js",
                "@angular/core": "npm:@angular/core@" + ANGULAR_VERSION + "/bundles/core.umd.min.js",
                "@angular/common": "npm:@angular/common@" + ANGULAR_VERSION + "/bundles/common.umd.min.js",
                "@angular/common/http": "npm:@angular/common@" + ANGULAR_VERSION + "/bundles/common-http.umd.min.js",
                "@angular/compiler": "npm:@angular/compiler@" + ANGULAR_VERSION + "/bundles/compiler.umd.min.js",
                "@angular/platform-browser": "npm:@angular/platform-browser@" + ANGULAR_VERSION + "/bundles/platform-browser.umd.min.js",
                "@angular/platform-browser/animations": "npm:@angular/platform-browser@" + ANGULAR_VERSION + "/bundles/platform-browser-animations.umd.min.js",
                "@angular/platform-browser-dynamic": "npm:@angular/platform-browser-dynamic@" + ANGULAR_VERSION + "/bundles/platform-browser-dynamic.umd.min.js",
                "@angular/forms": "npm:@angular/forms@" + ANGULAR_VERSION + "/bundles/forms.umd.min.js",

                ts: "npm:plugin-typescript@8.0.0/lib/plugin.js",
                tslib: "npm:tslib@2.3.1/tslib.js",
                typescript: "npm:typescript@3.7.7/lib/typescript.js",

                // our app is within the app folder, appLocation comes from index.html
                app: appLocation + "app",
            },
            systemJsMap
        ),
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: "./main.ts",
                defaultExtension: "ts",
                meta: {
                    "./*.ts": {
                        loader: boilerplatePath + "systemjs-angular-loader.js"
                    }
                }
            },
            'ag-charts-angular': {
                main: './bundles/ag-charts-angular.umd.min.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: false
            }
        }
    });
})(this);

