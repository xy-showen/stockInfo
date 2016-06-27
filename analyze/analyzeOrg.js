var _ = require( 'underscore' );
var fs = require( 'fs' );

var baseInfo = [];

var orgBuyArr = [];
var orgSellArr = [];
var orgArr = [];

var orgObj = {};
var orgObjArr = [];
var org2Obj = [];
var org2ObjArr = [];
var org3Obj = [];
var org3ObjArr = [];

var flag = process.argv[ 3 ];


module.exports = exports = function analyzeOrg(){
    if( flag != '2' && flag != '3' ){
        console.log( 'flag must 2 or 3' );
        return;
    }

    require('../lib/initMysql')( function(){
        var sql = "select organization1, organization2, organization3, organization4, organization5, organization6, organization7, organization8, organization9, organization10 from stockInfo";

        global.conn.query( sql, function( err, infos ){
            for( var i = 0; i < infos.length; i++ ){
                var temOrgs = [];
                for( var j = 1; j <= 10; j++ ){
                    console.log( infos[ i ][ 'organization' + j ] );
                    temOrgs.push( infos[ i ][ 'organization' + j ] );
                    if( infos[ i ][ 'organization' + j ] != '机构专用' && infos[ i ][ 'organization' + j ] != 0 ) {
                        if(orgObj[ infos[ i ]['organization' + j ] ])
                            ++orgObj[ infos[ i ]['organization' + j ] ];
                        else
                            orgObj[ infos[ i ][ 'organization' + j ] ] = 1;
                    }

                    if( orgArr.indexOf( infos[ i ][ 'organization' + j ] ) == -1 && infos[ i ][ 'organization' + j ] != '机构专用' && infos[ i ][ 'organization' + j ] != 0 ){
                        if( j < 6 )
                            orgBuyArr.push( infos[ i ][ 'organization' + j ] );
                        else
                            orgSellArr.push( infos[ i ][ 'organization' + j ] );

                        orgArr.push( infos[ i ][ 'organization' + j ] );
                    }
                }
                baseInfo.push( temOrgs );
            }

            for( var key in orgObj ){
                orgObjArr.push( { name: key, num: orgObj[ key ] } );
            }


            orgObjArr = orgObjArr.sort( function( a, b ){
                return( b.num - a.num );
            });



            if( fs.existsSync( 'org.txt' ) )
              fs.unlinkSync( 'org.txt' );

            for( var i = 0; i < orgObjArr.length; i++ ){
                console.log( orgObjArr[ i ] );
                fs.appendFile('org.txt', orgObjArr[ i].name + ' ' + orgObjArr[ i].num + '\r\n', function (err) {});
            }

            switch( flag ){
                case '2':
                    _analyzeOrg2( baseInfo, orgObjArr, org2Obj, org2ObjArr );
                    break;
                case '3':
                    _analyzeOrg3( baseInfo, orgObjArr, org3Obj, org3ObjArr );
                    break;
                default:
                    console.log( "flag err" );
            }
        });
    });
};

function _analyzeOrg2( baseInfo, orgObjArr, org2Obj, org2ObjArr ){
    for( var i = 0; i < 1499; i++ ){
        console.log( "doing..." + i/1500*100 + "%" );
        for( var j = i + 1; j < 1500; j++ ){
            for( var k = 0; k < baseInfo.length; k++ ){
                if( baseInfo[ k ].indexOf( orgObjArr[ i ].name ) != -1 && baseInfo[ k ].indexOf( orgObjArr[ j ].name ) != -1 ){
                    if( org2Obj[ orgObjArr[ i ].name + '|' + orgObjArr[ j ].name ] )
                        org2Obj[ orgObjArr[ i ].name + '|' + orgObjArr[ j ].name ] += 1;
                    else
                        org2Obj[ orgObjArr[ i ].name + '|' + orgObjArr[ j ].name ] = 1;
                }
            }
        }
    }


    if( fs.existsSync( 'org2.txt' ) )
        fs.unlinkSync( 'org2.txt' );

    for( var key in org2Obj ){
        org2ObjArr.push( { name: key, num: org2Obj[ key ] } );
    }

    org2ObjArr = org2ObjArr.sort( function( a, b ){
        return( b.num - a.num );
    });

    for( var i = 0; i < org2ObjArr.length; i++ ){
        console.log( org2ObjArr[ i ] );
        fs.appendFileSync('org2.txt', org2ObjArr[ i].name + ' ' + org2ObjArr[ i].num + '\r\n' );
    }

    console.log( 'done' );
}

function _analyzeOrg3( baseInfo, orgObjArr, org3Obj, org3ObjArr ){
    for( var i = 0; i < 98; i++ ){
        console.log( "doing..." + i/100*100 + "%" );
        for( var j = i + 1; j < 99; j++ ){
            for( var l = j + 1; l < 100; l++  ){
                for( var k = 0; k < baseInfo.length; k++ ){
                    if( baseInfo[ k ].indexOf( orgObjArr[ i ].name ) != -1 && baseInfo[ k ].indexOf( orgObjArr[ j ].name ) != -1 && baseInfo[ k ].indexOf( orgObjArr[ l ].name ) != -1 ){
                        if( org3Obj[ orgObjArr[ i ].name + '|' + orgObjArr[ j ].name + '|' + orgObjArr[ l ].name ] )
                            org3Obj[ orgObjArr[ i ].name + '|' + orgObjArr[ j ].name + '|' + orgObjArr[ l ].name ] += 1;
                        else
                            org3Obj[ orgObjArr[ i ].name + '|' + orgObjArr[ j ].name + '|' + orgObjArr[ l ].name ] = 1;
                    }
                }
            }
        }
    }


    if( fs.existsSync( 'org3.txt' ) )
        fs.unlinkSync( 'org3.txt' );

    for( var key in org3Obj ){
        org3ObjArr.push( { name: key, num: org3Obj[ key ] } );
    }

    org3ObjArr = org3ObjArr.sort( function( a, b ){
        return( b.num - a.num );
    });

    for( var i = 0; i < org3ObjArr.length; i++ ){
        console.log( org3ObjArr[ i ] );
        fs.appendFileSync('org3.txt', org3ObjArr[ i].name + ' ' + org3ObjArr[ i].num + '\r\n' );
    }

    console.log( 'done' );
}