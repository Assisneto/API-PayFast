let memcached = require('memcached');

function memcachedClient(){
        return client = new memcached('localhost:11211',{
            retries:10,
            retry:10000,
            remove:true
    });
}
module.exports = () =>{
    return memcachedClient;
}
