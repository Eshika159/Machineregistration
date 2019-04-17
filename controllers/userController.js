const Sequelize=require('sequelize');

var userModel=require('../models/UserModel');

var nodemailer=require('nodemailer');

var phoneToken = require('generate-sms-verification-code')


// REGISTER CODE
exports.register=function(req,res){
const user=userModel(sequelize,Sequelize);

user.create(
    
        {
        userID:req.body.userID,
        userName:req.body.userName,
        emailId:req.body.emailId,
        
        password:req.body.password,
        phone:req.body.phone
    
    }).then(()=>{
        res.redirect('/users/');
        console.log("User registered");
    }).catch(function(err) {
        // print the error details
        console.log(err);
    });


};

// LOGIN CODE
exports.login=function(req,res){
    const user=userModel(sequelize,Sequelize);
    const user_id=req.body.userID;
    const pass=req.body.password;
    user.findOne({
        where:{
            userID:user_id,
            password:pass

    }
}).then(function(userdata){
    console.log('----------->'+userdata);
    
    if(userdata==null){
        res.render('login',{result:'username or password is invalid'});
    }
    MSG={result:'Logged in Successfully',type:true};
    USER=userdata;
    res.redirect('/');

});

};


//LOGOUT CODE
exports.logout=function(req,res){
    if(USER!=null){
        USER=null;
        res.render('login',{result:'Logged out successfully'});
      

    }
    else{
        res.render('login',{result:'Already Logged out '});
        
    }
}

// PROFILE DETAIL CODE
exports.profile=function(req,res)
{   
    if(USER==null){
        res.redirect('/users/login');
    }
    console.log('------------->Profile of '+USER.userID);
    res.render('Profile');
}

//UPDATE PROFILE
exports.update=function(req,res){
    if(USER==null){
        res.redirect('/users/login');
    }

    console.log('------------->Update Profile');
    const user=userModel(sequelize,Sequelize);
    user.update({
        userName:req.body.userName,
        emailId:req.body.emailId,
        phone:req.body.phone

    },{
        where:{
            userID:req.body.userID
        }
    }).then((updatedMember)=>{
        console.log('------------->Updated member '+updatedMember);
        if(updatedMember>0){
            USER.userName=req.body.userName;
            USER.emailId=req.body.emailId;
            USER.phone=req.body.phone;
            res.render('Profile',{result:"Successfully Updated ",type:true});
        }
        res.render('Profile',{result:"Cannot Update.Please Try again",type:false});
        
        
    });

}

//CHANGE PASSWORD CODE
exports.change=function(req,res){
    if(USER==null){
        res.redirect('/users/login');
    }

    console.log('-------------->Change Password');
    const user=userModel(sequelize,Sequelize);
    user.update({

        password:req.body.newPassword
    },{
        where:{
        userID:USER.userID
    }
}).then(()=>{
    USER.password=req.body.newPassword;
    res.render('Login',{result:"Success! Your Password has been changed! Please log in again ",type:true});
   
});

}

//FORGOT PASSWORD
exports.forgot=function(req,res){
   
    var token=phoneToken(6,{type:'string'}); 
    var starttimestamp=Date.now();
    
    STARTTIME=starttimestamp;
    TOKEN=token;
    var url=req.protocol+"://"+req.hostname+":3000/users/reset/"+token;
    console.log("------------> Inside forgot password----->URL is "+ url+"------"+starttimestamp);
    const user=userModel(sequelize,Sequelize);
    user.findOne({
        where:{
            emailId:req.body.email
           

    }
}).then(function(userdata){

    if(userdata==null){
        res.render('login',{result:'User with this emailid doesnot exist'});
    }
   
    USER=userdata;
    var transporter=nodemailer.createTransport({
        service:'gmail',
       auth: {
           user:'eshikagupta159@gmail.com',
           pass:'seema#9897'

        }
    });

    var mailOptions={
        from:'eshikagupta159@gmail.com',
        to:'eshikagupta159@gmail.com',
        subject:'Password Reset ',
        text:'We have got  a request to reset your password.Click here to proceed further  - '+url 
    };
        
    transporter.sendMail(mailOptions,function(error,info){
        if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }

    });

    res.render('login',{result:'An email has been sent to (provided email address) with further instructions.”'});
    
});


}
exports.reset1=function(req,res){
    var time=Date.now();
    var seconds=(time-STARTTIME)/1000;
    var verificationCode=req.params.token;
    if(verificationCode==TOKEN){
        //valid for 5 minutes
        if(seconds<300){
        res.render('Reset');}
        else{
        res.render('login',{result:'The password reset link is no longer valid. Please request another password reset email from the login page.'});
    }
}
    else{
        res.render('login',{result:'The password reset link doesnot match.Please Try again'});
    }
};


exports.reset=function(req,res){
    var time=Date.now();
    var seconds=(time-STARTTIME)/1000;
    
        //check if token is still valid or not
        if(seconds<300){
        
        const user=userModel(sequelize,Sequelize);
        user.update({

            password:req.body.confirmPass
        },{
            where:{
            userID:USER.userID
        }
    }).then(()=>{
        res.render('login',{result:"Success.Your password has been reset "});
       
    });
}
    else
    res.render('login',{result:'Timeout for resetting password.Please try again'});
    
    
    
 

}