let mysql = require('mysql');
function createDBconnection(){
    return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : 'assismenina123',
            database : "payfast"
        });
}

module.exports = ()=> createDBconnection

