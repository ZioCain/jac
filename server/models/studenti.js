const fs = require("fs");
const studenti = require("../controllers/studenti");
require("dotenv").config();

module.exports = {
    //Variabile per il "database"
    //db: db,

    returnListaStudenti: function (callback){
        fs.readFile(process.env.STUDENTI, {encripting: "utf-8"}, (err, data) =>{
            if (err){
                throw err
            }
            //db = JSON.parse(data);
            callback(JSON.parse(data));
        });
    },

    addStudente: function (listastudenti, username, nome, cognome, luogo, datadinascita, callback){
        
        var studs = listastudenti;

        var stud = {
            username, 
            nome,
            cognome,
            nascita: {luogo,
                      datadinascita
            }
        };

        studs.push(stud);
        callback(studs);
    },

    writeStudenti: function(data, callback){
        fs.writeFile(process.env.STUDENTI, JSON.stringify(data), (err)=>{
            if (err){
                throw err;
            }
            callback();
        });
    }
}