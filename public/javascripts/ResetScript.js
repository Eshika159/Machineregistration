var req;
	
function checkajax(){
    try{
    req = new XMLHttpRequest();
    console.log("///////////////////ajax////");
    /* alert("xmlhttprequest done") */
    return;
    }
    catch(e){}
    
    try{
        req = new ActiveXObject("Msxm2.XMLHTTP");
        /* alert("activex msxm2 done"); */
        return;
    }
    catch(e){}
    
    try{
        req = new ActiveXObject("Microsoft.XMLHTTP");
        /* alert("activex microsoft xmlhttp done"); */
        return;
    }catch(e){}
    console.log("///////////////////ajax////");
    alert("your browser doesnot support ajax");
}

function checkPassword(name){
    var newPass=document.forms[name]['newPass'].value;
    var confirmPass=document.forms[name]['confirmPass'].value;
    
    var Passregex=new RegExp(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,}$/);
    var passmsg='';
    var newpassmsg='';
    if(!Passregex.test(newPass)){
        console.log(Passregex.test(newPass));
        newpassmsg='Your password should contain atleast 1 uppercase,1number and min 4 characters';
    }

    if(newPass!=confirmPass||confirmPass.length==0){
        passmsg='Your New Password and Confirm password doesnot match';
 }

    if(passmsg!=''||newpassmsg!=''){
        document.getElementById('newPass').innerHTML=newpassmsg;
        document.getElementById('confirmPass').innerHTML=passmsg;
        return false;
    }
    return true;

}