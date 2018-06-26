let winston = require('winston');
let fs = require('fs');

if (!fs.existsSync('logs')) 
    fs.mkdirSync('logs');

module.exports = winston.createLogger({
    transports:[
        new winston.transports.File({
            level: "info",
            filename: "logs/payfast.log",
            maxsize:1000,
            maxFiles:10
        })
    ]
});
