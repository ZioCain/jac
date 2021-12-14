const studentiModel = require("../models/studenti.js");
//const express = require("express");
//const app = express();

module.exports = {
    getStudenti: function(req, res) {
        studentiModel.returnListaStudenti((studenti)=>{
            res.send(JSON.stringify(studenti));
        });
    },

    //Andiamo a usare req.bosy essendo i parametri nel body e non nel query
    addStudente: function (req, res) {
        if (req.body.username && req.body.nome && req.body.cognome && req.body.luogo && req.body.data){
        
            studentiModel.returnListaStudenti((studenti)=>{
                for (var elem of studenti){
                    if (elem.username.toUpperCase() === req.body.username.toUpperCase()){
                        //status(). per ritornare un codice errore
                        res.status(409).send("username: " + req.body.username + " è già in uso");
                        return;
                    }
                }
                studentiModel.addStudente(studenti, req.body.username, req.body.nome, req.body.cognome, req.body.luogo, req.body.data, (newStudenti)=>{
                    studentiModel.writeStudenti(newStudenti, ()=>{
                        res.send("Studente: username = " + req.body.username + " nome = " + req.body.nome + " cognome = " + req.body.cognome + " luogo = " + req.body.luogo + " data = " + req.body.data + " AGGIUNTO");
                    });         
                });
            });
        }else{
            res.status(400).send("Parametri non validi, impossibile aggiungere studente");
        }
    },

    getStudente: function (req, res){
        studentiModel.returnListaStudenti((studenti)=>{
            for (var elem of studenti){
                if(elem.username.toUpperCase() === req.params.username.toUpperCase()){
                    res.send("Studente: username = " + elem.username + " nome = " + elem.nome + " cognome = " + elem.cognome + " luogo = " + elem.nascita.luogo + " data = " + elem.nascita.datadinascita);
                    return;
                }
            }
            res.status(404).send("Username not found!");
        });
    },

    updateStudente: function (req, res){
        studentiModel.returnListaStudenti((studenti)=>{
            for (var i = 0; i < studenti.length; i++){
                if(studenti[i].username.toUpperCase() === req.params.username.toUpperCase()){

                    if(req.body.username){           
                        for (var elem of studenti){     
                            if (elem.username.toUpperCase() === req.body.username.toUpperCase()){
                                break;
                            }
                            studenti[i].username = req.body.username;
                        }   
                    }

                    if (req.body.nome){
                        studenti[i].nome = req.body.nome;
                    }

                    if (req.body.cognome){
                        studenti[i].cognome = req.body.cognome;
                    }

                    if (req.body.luogo){
                        studenti[i].nascita.luogo = req.body.luogo;
                    }
                    
                    if (req.body.data){
                        studenti[i].nascita.datadinascita = req.body.data;
                    }

                    studentiModel.writeStudenti(studenti, ()=>{
                        if (studenti[i].username !== req.body.username){
                            res.send("Studente Aggiornato (username: " + req.body.username + " già in uso): username = " + studenti[i].username + " nome = " + studenti[i].nome + " cognome = " + studenti[i].cognome + " luogo = " + studenti[i].nascita.luogo + " data = " + studenti[i].nascita.datadinascita);
                        }else{
                            res.send("Studente Aggiornato: username = " + studenti[i].username + " nome = " + studenti[i].nome + " cognome = " + studenti[i].cognome + " luogo = " + studenti[i].nascita.luogo + " data = " + studenti[i].nascita.datadinascita);
                        }
                    });  
                    return; 
                }
            }
            res.status(404).send("Studente non trovato");
        });
    },

    deleteStudente: function (req, res){
        studentiModel.returnListaStudenti((studenti)=>{
            for (var i = 0; i < studenti.length; i++){
                if(studenti[i].username.toUpperCase() === req.params.username.toUpperCase()){

                    studenti.splice(i , 1);

                    studentiModel.writeStudenti(studenti, ()=>{
                        res.send("Studente Cancellato: username = " + req.params.username);
                    });  
                    return; 
                }
            }
            res.status(404).send("Studente non trovato");
        });
    } 
}