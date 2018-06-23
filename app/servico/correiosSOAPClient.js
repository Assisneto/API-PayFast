let soap = require('soap');


class correiosSOAPClient{
    constructor(){
        this.url = "http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl";
    }

    calculaPrazo(args, callback){
        soap.createClient(this.url, (erro, cliente)=>{
            console.log('cliente soap criado');
            cliente.CalcPrazo(args, callback);
        });
    }
} 
module.exports = ()=>{
    return correiosSOAPClient;
  }
