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
        res.location('/pagamentos/pagamento/' +
        corpo.id);
        
        var response = {
          dados_do_pagamanto: corpo,
          links: [
            {
              href:"http://localhost:3000/pagamentos/pagamento/"
              + corpo.id,
              rel:"confirmar",
              method:"PUT"
            },
            {
              href:"http://localhost:3000/pagamentos/pagamento/"
              + corpo.id,
              rel:"cancelar",
              method:"DELETE"
            }
          ]
        }
        res.status(201).json(response);

      });
      connection.end();

    }

  });

  app.delete('/pagamentos/pagamento/:id', (req,res)=>{

      let pagamento = {};
      let id = req.params.id;

      pagamento.id = id;
      pagamento.status = "CANCELADO";

      let connection = app.models.connectionFactory();
      let bdclass = new app.models.bdclass(connection);

      bdclass.atualizar(pagamento,(erros)=>{

       if(erros){
          res.status(400).send(erros);
          return;
        }
        console.log('Pagamento atualizado');
        res.status(204).send(pagamento);

      });
      connection.end();

      
  });
  app.put('/pagamentos/pagamento/:id', (req,res)=>{

    let pagamento = {};
    let id = req.params.id;

    pagamento.id = id;
    pagamento.status = "CONFIRMADO";

    let connection = app.models.connectionFactory();
    let bdclass = new app.models.bdclass(connection);

    bdclass.atualizar(pagamento,(erros)=>{

    if(erros){
        res.status(400).send(erros);
        return;
      }
      console.log('Pagamento atualizado');
      res.send(pagamento);

    });
    connection.end();

    
  });
}