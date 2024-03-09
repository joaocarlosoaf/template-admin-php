const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

const phpServiceName = process.env.PHP_SERVICE_NAME || 'localhost';
const phpServicePort = process.env.PHP_SERVICE_PORT || '8000';

mix.webpackConfig({
    devServer: {
        host: '0.0.0.0',
        port: '8080',
        proxy: {
            '**': {
                target: `http://${phpServiceName}:${phpServicePort}`,
                changeOrigin: true,
            },
        },
    },
});

mix.override(webpackConfig => {
    webpackConfig.stats = webpackConfig.stats || {};
    webpackConfig.stats.warningsFilter = warning => 
        !(/list-group-item-variant\(\) has been deprecated/.test(warning));
});

mix.postCss('resources/css/app.css', 'public/css', [
    //
]);

mix.js('resources/js/app.js', 'public/js').react();
