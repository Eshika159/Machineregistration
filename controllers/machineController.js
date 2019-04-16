
const Sequelize = require('sequelize');

var machineModel=require('../models/machineModel');



//ADD MACHINE CODE
exports.addMachine=function(req,res){

const machine= machineModel(sequelize,Sequelize);
if(USER==null){
    res.redirect('/users/login');
}
machine.create(
    {
    machineID:req.body.machineID,
    machineName:req.body.machineName,
    serialNo:req.body.serialNo,
    modelID:req.body.modelID,
    ip:req.body.ip,
    machineStatus:req.body.machineStatus

}).then(()=>{
    res.redirect('/machine/');
    MSG={result:'Machine Added Successfully',type:true};
}).catch(function(err) {
    res.redirect('/machine/');
    MSG={result:'Failed. Machine already exist',type:false};
    // print the error details
    console.log(err);
});

console.log("After Machine model data sent ");

sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  });

 

}

//VIEW MACHINE CODE

exports.viewMachine=function (req,res) {
    var msg='';
    var type=null;
    if(USER==null){
        res.redirect('/users/login');
    }
    
    const machine= machineModel(sequelize,Sequelize);
    machine.findAll().then((machinelist) => {

        if(MSG){
            msg=MSG.result;
            type=MSG.type;
            MSG=null;
        
        }

        res.render('machineHomePage',{title:'Machines Details',machinelist,result:msg,type:type});
        //it will be objects of machine
        console.log("View machines------------->"+machinelist);
    }).catch((err) => {
        console.log(err);
    });
    
}

//Edit MACHINE CODE

exports.editMachine=function (req,res) {
    const machine= machineModel(sequelize,Sequelize);
    machine.update({
       // machineID:req.body.machineID,
        machineName:req.body.machineName,
        serialNo:req.body.serialNo,
        modelID:req.body.modelID,
        ip:req.body.ip,
        machineStatus:req.body.machineStatus
    }, {
        where: {
            machineID: req.body.machineID
        }
    }).then(() => {
        MSG={result:'Machine Edited Successfully',type:true};
        console.log('----------->Updated with id'+req.body.machineID);
        res.redirect('/machine/');
       
    }).catch((e) => {
        MSG={result:'Failed to update machine ',type:false};
        console.log("Error"+e);
    });
}


//DELETE MACHINE CODE
exports.deleteMachine=function(req,res) {
    const machine= machineModel(sequelize,Sequelize);
    const machine_id=req.params.id;
    machine.destroy({
        where: {
            machineID: machine_id
        }
    }).then(() => {
       
        res.writeHead("200",{"Content-Type":'text/plain'});
        MSG={result:'Machine Deleted Successfully',type:true};
        res.end("success");
        
        console.log("----------> Deleted with id= "+machine_id);
    }).catch((e) => {
        MSG={result:'Failed to  Delete Machine',type:false};
        console.log("Error" + e);
    });
}


// GET MACHINE BY ID
exports.getMachine=function(req,res)
{
    const machine=machineModel(sequelize,Sequelize);
    const machine_id=req.params.id;
    machine.findOne({
        where:{
            machineID: machine_id
        }
    }).then(function(machinedata) {
        console.log("---------->Got Machine with id "+machinedata.machineID);
        res.writeHead("200",{"Content-Type":'text/plain'});
        var json=machinedata.toJSON();
        res.end(JSON.stringify(json));

 
    });

}


