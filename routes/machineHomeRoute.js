

var express = require('express');

var machine_controller=require('../controllers/machineController');

const check=require('express-validator');
var router = express.Router();

//------- MACHINE HOME PAGE -----------
router.get('/', machine_controller.viewMachine);



//--------- MACHINE ADD -----------------

router.post('/add',machine_controller.addMachine);


//DELETE MACHINE

router.get('/delete/:id',machine_controller.deleteMachine);

//GET MACHINE BY ID

router.get('/getmachine/:id',machine_controller.getMachine);

//UPDATE MACHINE 

router.post('/update',machine_controller.editMachine);



module.exports = router;
