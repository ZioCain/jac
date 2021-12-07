const express = require("express");
//router di express
const router = express.Router();

const controllers = require("../controllers/studenti");

//controller. Essendo già in /studenti non serve mettere /studenti qui
router.get("/", controllers.getStudenti);

router.post("/addstudente/", controllers.addStudente);

//Express permette di generlizzare l'endpoint con :username per esempio. 
router.get("/:username", controllers.getStudente);
    //req.params.username andrà a contenere l'username utilizzato, cioè i parametri nella richiesta
    //console.log(req.params.username);

router.put("/updatestudente/:username", controllers.updateStudente);

router.delete("/deletestudente/:username", controllers.deleteStudente);
//Per fare in modo che tutto il router sia chiamabile da index
module.exports = router;