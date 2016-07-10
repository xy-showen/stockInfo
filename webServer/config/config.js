var envmode = process.env.ENVNODE || 'development';

var conf = {
    "production":{
        webServer:{
            port: 8088
        },
        mysql:{
            host: '115.28.222.186',
            port: 3306,
            user: 'root',
            pass: 'xiao52yong',
            database: 'stockInfoDb'
        }
    },
    "development":{
        webServer:{
            port: 8088
        },
        mysql:{
            host: '127.0.0.1',
            port: 3307,
            user: 'root',
            pass: '',
            database: 'stockInfoDb'
        }
    }
};

module.exports = exports = conf[envmode];
