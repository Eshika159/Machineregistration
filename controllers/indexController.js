const Sequelize = require('sequelize');

var machineModel=require('../models/machineModel');


exports.index=function(req,res){
var machine=machineModel(sequelize,Sequelize);
var runningcount=0;
var paused=0;
var stop=0;
var msg='';
var type=null;
if(MSG){
    msg=MSG.result;
    type=MSG.type;
    MSG=null;

}
machine.findAll().then((machineList)=>{

    for(var val of machineList){
        if(val.machineStatus=='Running'){
            runningcount++;
        }
        else if(val.machineStatus=='Paused'){
            paused++;
        }
        else{
            stop++;
        }
    }
    res.render('index',{title:'Machines Status',running:runningcount,paused:paused,stop:stop,total:machineList.length,result:msg,type:type});
        
});

}