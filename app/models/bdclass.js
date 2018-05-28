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
    /*delete(id,callback){
        return this.connection.query('DELETE from produtos WHERE id = (?)',[id.id],callback);
    }*/
    busca_id(id,callback){
        return this._connection.query("select * from pagamentos where id = ?",[id],callback);
    }
}