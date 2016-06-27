var Request = require( 'request' );
var http = require( 'http' );
var Config = require( '../config/config' );
var Moment = require( 'moment' );
var Iconv = require( 'iconv').Iconv;

var analyseTxt = require( './analyseTxt.js' );

var beginDate = Moment( process.argv[ 2 ], 'YYYY-MM-DD' );
var endDate = Moment( process.argv[ 3 ], 'YYYY-MM-DD' );;
var flag = process.argv[ 4 ]; //0-中小板  1-深交所  2-上交所

if( !beginDate.isValid() || !endDate.isValid() || !flag ){
    console.log("need date or flag");
    return process.exit();
}

var n = 0;
var m = 0;



require('../lib/initMysql')( function(){
    for(; beginDate <= endDate; beginDate = beginDate.add( 1, 'day' ) ){
        var dateStr = beginDate.format('YYYYMMDD').substr( 2 );
        if( flag == 0 )
            var url = Config.zhongxiaoban + dateStr + ".txt?randnum=" + Math.random();

        if( flag == 1 )
            var url = Config.shenjiaosuo + dateStr + ".txt?randnum=" + Math.random();

        console.log( url );
        getAndInsert( url, beginDate.format( 'YYYY-MM-DD' ) );
    }
});

function getAndInsert( url, beginDate ){
    Request.get( { url: url, timeout: 30000 } )
        .on( 'response', function( res ){
            var html = '';

            res.setEncoding('binary');
            res.on('data', function (chunk) {
                html += chunk;
            });

            res.on('end',function(){
                if ( res.statusCode != 200 )
                    return null;

                var txt = new Iconv('GBK','UTF-8').convert(new Buffer(html,'binary')).toString();
                var resultOriginal = analyseTxt( txt.split( '\r\n' ) );
                var result = [];
                console.log( resultOriginal );
                for( var i = 0; i < resultOriginal.length; i++ ){
                    if( resultOriginal[ i ] ){
                        result.push( resultOriginal[ i ] );
                    }
                }

                insertData( result, beginDate );
            });
        });
};

function insertData( result, beginDate ){
    for( var i = 0; i < result.length; i++ ){
        for( var j = 0; j < result[ i ].info.length; j++ ){
            ++m;
            var value = "('"+ beginDate +"',";
            value += "'" + result[ i ].info[ j ].name + "'" + ',';
            value += "'" + result[ i ].info[ j ].code + "'" + ',';
            value += "'" + result[ i ].type + "'" + ',';
            value += "'" + result[ i ].info[ j ].offset + "'" + ',';
            value += "'" + result[ i ].info[ j ].dealDose + "'" + ',';
            value += "'" + result[ i ].info[ j ].dealValue + "'" + ',';

            result[ i ].info[ j ].organizationBuy.length = 5;
            result[ i ].info[ j ].organizationSell.length = 5;

            result[ i ].info[ j ].organization = result[ i ].info[ j ].organization.concat( result[ i ].info[ j ].organizationBuy, result[ i ].info[ j ].organizationSell );

            for( var ii = 0; ii < 10; ii++ ){
                var name, buy, sell;
                if( result[ i ].info[ j ].organization[ ii ] ){
                    name =  result[ i ].info[ j ].organization[ ii ].name;
                    buy =  result[ i ].info[ j ].organization[ ii ].buy;
                    sell =  result[ i ].info[ j ].organization[ ii ].sell;
                }else{
                    name = 0;
                    buy = 0;
                    sell = 0;
                }

                value += "'" + name + "'" + ',';
                value += buy + ',';
                value += sell + ',';
            }

            value = value.substr( 0, value.length - 1 );
            value += ')';

            var sql = "insert into stockInfo( date, name, code, unusualType, unusualValue, dealDose, dealValue," +
                "organization1, buy1, sell1, organization2, buy2, sell2, organization3, buy3, sell3, organization4 ,buy4, sell4," +
                "organization5, buy5, sell5, organization6, buy6, sell6, organization7, buy7, sell7, organization8, buy8, sell8," +
                "organization9, buy9, sell9, organization10, buy10, sell10) values" + value;

            console.log( sql );
            global.conn.query( sql, function( err, returnInfo ){
                if( err )
                    return console.log( err );
                console.log( returnInfo );
            });
        }
    }
};