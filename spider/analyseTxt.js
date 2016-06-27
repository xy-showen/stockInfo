var analyseTxt = function( arrTxt ){
    var info = [];
    var type = '';
    var stockObj = {};
    var isBuyFlag = true;

    var typeArr = [
        '日涨幅偏离值达到7%的前五只证券：',
        '日跌幅偏离值达到7%的前五只证券：',
        '日振幅值达到15%的前五只证券：',
        '日换手率达到20%的前五只证券：',
        '无价格涨跌幅限制的证券：',
        '连续三个交易日内，涨幅偏离值累计达到20%的证券：',
        '连续三个交易日内，跌幅偏离值累计达到20%的证券：',
        '连续三个交易日内，涨幅偏离值累计达到12%的ST证券、*ST证券和未完成股改证券：',
        '连续三个交易日内，跌幅偏离值累计达到12%的ST证券、*ST证券和未完成股改证券：',
        '日均换手率与前五个交易日的日均换手率的比值达到30倍，且换手率累计达20%的证券：'
    ];

    for( var i = 0; i < arrTxt.length; i++ ){
        if( arrTxt[ i ] == '' )
          continue;

        if( typeArr.indexOf( arrTxt[ i ] ) != -1 ) {
            type = arrTxt[ i ];
            info[ typeArr.indexOf( arrTxt[ i ] ) ] = {};
            info[ typeArr.indexOf( arrTxt[ i ] ) ].type = type;
            info[ typeArr.indexOf( arrTxt[ i ] ) ].info = [];
            continue;
        }

        if( arrTxt[ i].indexOf( '买入金额最大的前5名' ) != -1 ){
            isBuyFlag = true;
        }

        if( arrTxt[ i].indexOf( '卖出金额最大的前5名' ) != -1 ){
            isBuyFlag = false;
        }

        if( arrTxt[ i ].indexOf( '(代码' ) != -1 ){

                var stockBasicOriginal = arrTxt[ i].split( '(' )[ 1 ].split( ' ' );
                var stockBasic = [];

                for( var j = 0; j < stockBasicOriginal.length; j++ ){
                    if( stockBasicOriginal[ j ] != '' )
                        stockBasic.push( stockBasicOriginal[ j ] );
                }


                if( stockBasic[ stockBasic.length - 2 ] == '成交金额:' ){
                    stockBasic[ stockBasic.length - 2 ] += stockBasic[ stockBasic.length - 1 ];
                    stockBasic.length = stockBasic.length - 1;
                }

                stockObj = {};

                if( stockBasic.length == 4 ){
                    stockObj.name = arrTxt[ i ].split( '(' )[ 0 ];
                    stockObj.code = stockBasic[ 0 ].substr( 2, stockBasic[ 0 ].length - 3 );
                    stockObj.offset = stockBasic[ 1 ].split( ':' )[ 1 ];

                    stockObj.dealDose = stockBasic[ 2 ].split( ':' )[ 1 ];
                    stockObj.dealDose = parseInt( stockObj.dealDose.substr( 0, stockObj.dealDose.length - 2 ) );

                    stockObj.dealValue = stockBasic[ 3 ].split( ':' )[ 1 ];
                    stockObj.dealValue = parseInt( stockObj.dealValue.substr( 0, stockObj.dealValue.length - 2 ) );

                    stockObj.organizationBuy = [];
                    stockObj.organizationSell = [];
                    stockObj.organization = [];

                    info[ typeArr.indexOf( type ) ].info.push( stockObj );
                }

                if( stockBasic.length == 3 ){
                    stockObj.name = arrTxt[ i ].split( '(' )[ 0 ];
                    stockObj.code = stockBasic[ 0 ].substr( 2, stockBasic[ 0 ].length - 3 );

                    stockObj.dealDose = stockBasic[ 1 ].split( ':' )[ 1 ];
                    stockObj.dealDose = parseInt( stockObj.dealDose.substr( 0, stockObj.dealDose.length - 2 ) );

                    stockObj.dealValue = stockBasic[ 2 ].split( ':' )[ 1 ];
                    stockObj.dealValue = parseInt( stockObj.dealValue.substr( 0, stockObj.dealValue.length - 2 ) );

                    stockObj.organizationBuy = [];
                    stockObj.organizationSell = [];
                    stockObj.organization = [];

                    info[ typeArr.indexOf( type ) ].info.push( stockObj );
                }

            }

        if( arrTxt[ i ].indexOf( '异常期间:20' ) != -1 ){
            var lineArrOriginal = arrTxt[ i ].split(' ');
            var lineArr = [];
            for( var ii = 0; ii < lineArrOriginal.length; ii++ ){
                if( lineArrOriginal[ ii ] != '' )
                    lineArr.push( lineArrOriginal[ ii ] );
            }
            stockObj.unusualDate = lineArr[ 0 ].split( ':' )[ 1 ];
            stockObj.offset = lineArr[ 1 ].split( ':' )[ 1 ];
        }

        if( arrTxt[ i ].indexOf( '营业部 ' ) != -1 || arrTxt[ i ].indexOf( '证券营业 ' ) != -1 || arrTxt[ i ].indexOf( '机构专用' ) != -1 || arrTxt[ i ].indexOf( '公司 ' ) != -1 ){
            var organizationBasicOriginal = arrTxt[ i ].split( ' ' );
            var organizationBasic = [];

            for( var j = 0; j < organizationBasicOriginal.length; j++ ){
                if( organizationBasicOriginal[ j ] !='' )
                  organizationBasic.push( organizationBasicOriginal[ j ] );
            }

            var organizationObj = {};
            organizationObj.name = organizationBasic[ 0 ];
            organizationObj.buy = parseInt( organizationBasic[ 1 ] );
            organizationObj.sell = parseInt( organizationBasic[ 2 ] );

            console.log( arrTxt[ i ] );
            if( isBuyFlag )
                stockObj.organizationBuy.push( organizationObj );
            else
                stockObj.organizationSell.push( organizationObj );
            //stockObj.organization.push( organizationObj );
        }
    }

    return info;
};


module.exports = exports = analyseTxt;