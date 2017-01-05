var fs = require('fs'),
    path = require('path'),
    express = require('express');

var isDeveloping = process.env.NODE_ENV !== 'production',
    port = 3000,
    app = express();

if (isDeveloping) {
    var config = require('../../../webpack.config'),
        compiler = require('webpack')(config),
        middleware = require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath,
        contentBase: 'src',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    // [TODO]
} else {
    // [TODO]
}

function start() {
    // [TODO]
}

module.exports = start;
