const express = require("express");
const app = express();
require("dotenv").config();

const studentiRouter = require("./routers/stundenti");

//Middleware per andare a interpretare quello che c'è nel body
app.use(express.urlencoded({extended: true}));

//quando passiamo da un middleware bisogna sembre richiamare un passaggio successivo
//next(); fa continuare la richiesta sul suo rout. Se non c'è un next e facciamo un res le cose/rout sotto non funzioneranno.
app.use("/", function(req, res,  next){
    console.log(req.method, req.url, req.query, req.body);
    next();
});

//Middleware. Tutte le richiesti /studenti/ andranno al router degli studenti
app.use("/studenti", studentiRouter);

//funzione per differire i vari endpoint
app.get("/", function (req, res){
    res.sendFile(__dirname + 'views/index.html');
});

//per inizializare il server
app.listen(process.env.PORT, process.env.HOST, function(){
    console.log("Server avviato sulla porta " + process.env.PORT);
});