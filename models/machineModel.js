
//var sequelize=require('../app');

console.log("Inside Machine Model");
module.exports=(sequelize,type) =>{
var Machine = sequelize.define('Machine',{
    'machineID':{type: type.STRING,primaryKey:true,
        validate: {
            len:{
                args:4,
                msg:"ID Must be 4 characters"

                } 
    }},
    'machineName':type.STRING,
    'serialNo':type.STRING,
    'modelID':type.STRING,
    'ip':type.STRING,
    'machineStatus':type.STRING
});

// sequelize.sync({force:true});
return Machine;
}


//module.exports=Machine;