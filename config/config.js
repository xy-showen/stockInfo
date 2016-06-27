var envmode = process.env.ENVNODE || 'development';



var conf = {
    "production":{
        mysql:{
            host: '115.28.222.186',
            port: 3306,
            user: 'root',
            pass: 'xiao52yong',
            database: 'stockInfoDb'
        },
        "shangjiaosuo": "http://query.sse.com.cn/infodisplay/showTradePublicFile.do?jsonCallBack=jsonpCallback21112&isPagination=false&dateTx=2016-04-26&_=1465128134365",
        "shenjiaosuo": "http://www.szse.cn/szseWeb/common/szse/files/text/jy/jy", //160603.txt
        "zhongxiaoban": "http://www.szse.cn/szseWeb/common/szse/files/text/smeTxt/gk/sme_jy"
    },
    "development":{
        mysql:{
            host: '127.0.0.1',
            port: 3307,
            user: 'root',
            pass: '',
            database: 'stockInfoDb'
        },
        "shangjiaosuo": "http://query.sse.com.cn/infodisplay/showTradePublicFile.do?jsonCallBack=jsonpCallback43412&isPagination=false&dateTx=2016-04-26&_=",
        "shenjiaosuo": "http://www.szse.cn/szseWeb/common/szse/files/text/jy/jy", //160518.txt"
        "zhongxiaoban": "http://www.szse.cn/szseWeb/common/szse/files/text/smeTxt/gk/sme_jy"
    }
};

module.exports = exports = conf[envmode];