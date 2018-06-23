let fs = require('fs');

module.exports = (app)=>{

    app.post('/upload/imagem',(req,res)=>{

        let filename = req.headers.filename;
        console.log(`Arquivo Recebido: ${filename}`);

        req.pipe(fs.createWriteStream(`app/files/${filename}.png`))
        .on('finish', ()=>{
            console.log("arquivo escrito");
            res.status(201).send('ok');
        });


    });

}
