var App = require( './app' );
var Config = require( './config/config.js' );

require('./lib/initMysql')( function(){
    App.listen( Config.webServer.port || 3000 );
    console.log( "listening " + Config.webServer.port || 3000 );
});



