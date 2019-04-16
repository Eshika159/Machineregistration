console.log('Inside User Model');

module.exports=(sequelize,type)=>{
    var user= sequelize.define('User',{
        'userID':{
            type: type.STRING,
            primaryKey:true,
            allowNull:false },
        'userName':{
            type: type.STRING,
            allowNull:false },
        'emailId':{type:type.STRING,
            allowNull:false},
        'password':{ type:type.STRING,
            allowNull:false},
        'phone':{
            type:type.STRING,
            allowNull:false},
        
    });
   

    return user;
    }

