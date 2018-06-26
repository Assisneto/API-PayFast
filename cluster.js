let cluster = require('cluster');
let os = require('os');
let logger = require('./app/servico/logger.js');

const CPUS = os.cpus();

// A primeira coisa é verificar se é o master

if(cluster.isMaster){

    CPUS.forEach(()=>{
        cluster.fork();
    });
    cluster.on("listening", worker => {
        console.log("cluster %d conectado", worker.process.pid);
        logger.info(`cluster ${worker.process.pid} conectado`);
    });

    cluster.on("disconnect", worker => {
        console.log("cluster %d desconectado", worker.process.pid);
        logger.info(`cluster ${worker.process.pid} desconectado`);
    });

    cluster.on("exit", worker => {
        console.log("cluster %d perdido", worker.process.pid);
        logger.info(`cluster ${worker.process.pid} desconectado`);
        cluster.fork();
    });

// Se o cluster não for o master, ele deve somente executar o index.js
}else{
    require('./index.js');
}