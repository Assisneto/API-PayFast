module.exports = (app)=>{
  app.get('/pagamentos', (req, res)=>{
    console.log('Recebida requisicao de teste na porta 3000.')
    res.send('OK.');
  });

  app.post('/pagamentos/pagamento',(req,res)=>{
    let corpo = req.body;

    req.assert("forma_de_pagamento", "Forma de pagamento é obrigatória.").notEmpty();
    req.assert("valor", "Valor é obrigatório e deve ser um decimal.").notEmpty().isFloat();
    req.assert("moeda", "Moeda é obrigatória e deve ter 3 caracteres").notEmpty().len(3,3);
     
    let err = req.validationErrors();
    
    if(err){
      res.status(400).send(err);
      return
    }
    else{
      let connection = app.models.connectionFactory();
      let bdclass = new app.models.bdclass(connection);
      corpo.status = "CRIADO";
      corpo.data = new Date;
      bdclass.salvar(corpo,(err,result)=>{
        res.status(201).json(corpo);
      });
      connection.end();

    }

  });
}
