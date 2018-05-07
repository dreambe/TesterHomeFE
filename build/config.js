/**
 * Created by Shark on 18/2/01.
 */


var path = require('path');
module.exports = {
    dev: {
        outputPath: path.resolve(__dirname, '../dist'),
        outputPublicPath: '/',
        port: 8080
    },
    prod: {
        outputPath: path.resolve(__dirname, '../dist'),
        outputPublicPath: '/'
    }
}