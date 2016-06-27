var mysql = require( 'mysql' );
var conf = require('../config/config' );

module.exports = exports = function initMysql( cb ){
    global.conn = mysql.createConnection( { host : conf.mysql.host, port: conf.mysql.port, user : conf.mysql.user, password : conf.mysql.pass, database: conf.mysql.database } );

    global.conn.connect( function( err ){
        if( err )
          console.log( 'connect mysql err' + err );
        else
          console.log( 'connect mysql success.' );
    });
    cb && cb()
};


