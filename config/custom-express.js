let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let expressvalidator = require('express-validator');

module.exports = () =>{
  let app = express();
  
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(expressvalidator());
  
  consign({cwd:'app'})
   .include('controllers')
   .then('models')
   .then('servico')
   .into(app);

  return app;
}
