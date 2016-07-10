var express = require('express');
var router = express.Router();
var _ = require('underscore');
var Moment = require( 'moment' );

router.get('/', function(req, res, next) {
    var startDate = req.params.beginDate;
    var endDate = req.params.endDate;
    var stock = req.params.stock;


    if( !Moment( startDate, 'YYYY-MM-DD'  ).isValid() || !Moment( startDate, 'YYYY-MM-DD'  ).isValid() || Moment( startDate, 'YYYY-MM-DD'  ) > Moment( endDate, 'YYYY-MM-DD'  ) ){
        return next({ status: 502, message: 'startDate or endDate err ' });
    }

    if( !stock ){
        return next({ status: 500, message: 'stock err ' });
    }

    var sql = "select * from stockInfo where date>='" + startDate + "' and date<= " + "'" + endDate + "'" + " and" +
        "( code = '" + stock + "' or " + "name=" + "'" +stock + "')";
    var sql = `select * from stockInfo where date>='${startDate}' and date<=  '${endDate}' and
        ( code = '${stock}' or name='${stock}' or organization1='${stock}' or organization2='${stock}'
        or organization3='${stock}' or organization4='${stock}' or organization5='${stock}'
        or organization6='${stock}' or organization7='${stock}' or organization8='${stock}' or organization9='${stock}' or organization10='${stock}')`;

    console.log( sql );
    global.conn.query( sql, function( err, stocks ){
        if( err )
            return next( err );
        res.status( 200).send( _date2String( stocks ) );
    });

});

function _date2String (ret){
    if( _.isArray( ret ) ){
        _.map(ret, function(obj) {
            if (_.isDate(obj.date)) {
                obj.date = Moment(obj.date).format('YYYY-MM-DD');
            }
            if (_.isDate(obj.begin_date)) {
                obj.begin_date = Moment(obj.begin_date).format('YYYY-MM-DD');
            }
            if (_.isDate(obj.end_date)) {
                obj.end_date = Moment(obj.end_date).format('YYYY-MM-DD');
            }
            if (_.isDate(obj.datetime)) {
                obj.datetime = Moment(obj.datetime).format('YYYY-MM-DD HH:mm:ss');
            }
            return obj;
        });
    } else if( _.isObject( ret ) ) {
        for( var key in ret ) {
            var val = ret[ key ];
            if( _.isDate( val ) ) {
                ret[ key ] = Moment(val).format('YYYY-MM-DD');
            }
        }
    }

    return ret;
}



module.exports = router;
