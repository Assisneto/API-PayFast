module.exports = ()=>{
  return bdClass;
}
class bdClass{
    constructor(connection){
        this.connection = connection;
    }
    lista(callback) {
        return this.connection.query('select * from pagamentos',callback);
    }
    salvar(pagamentos,callback){
        return this.connection.query('INSERT INTO pagamentos SET ?',pagamentos,callback);
    }
   /* delete(pagamentos,callback){
        return this.connection.query('UPDATE pagamentos SET status = ? where id = ?',[pagamentos.status,pagamentos.id],callback);
    }*/
    busca_id(id,callback){
        return this.connection.query("select * from pagamentos where id = ?",[id],callback);
    }
    atualizar(pagamentos,callback){
        return this.connection.query('UPDATE pagamentos SET status = ? where id = ?', [pagamentos.status,pagamentos.id],callback);
    }
}