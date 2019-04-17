
//UPDATE PROFILE VALIDATION
function checkValidateUser(name) {
    console.log('------------->check User validation');
    var userID = document.forms[name]['userID'].value;
    var userName = document.forms[name]['userName'].value;
    var emailId = document.forms[name]['emailId'].value;
    var phone = document.forms[name]['phone'].value;

    //more strong validation for email
    var pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);


    var phonemsg = '';
    var emailmsg = '';
    if (phone.length != 10) {
        phonemsg = 'Please Specify a valid phone number';
    }

    if (emailId.length == 0 || !pattern.test(emailId)) {
        emailmsg = 'Please Specify a valid Email id';
    }

    if (phonemsg != '' || emailmsg != '') {
        document.getElementById(name + 'phone').innerHTML = phonemsg;
        document.getElementById(name + 'emailId').innerHTML = emailmsg;
        return false;
    }

    return true;
}


//CHANGE PASSWORD VALIDATION
function passwordCheck(name) {

    console.log('-------------->inside pass change');

    var passMsg = '';
    var newpassmsg = '';
    var confirmpassmsg = '';
    var newPassword = document.forms[name]['newPassword'].value;
    var confirmPassword = document.forms[name]['confirmPassword'].value;
    var oldpass = document.forms[name]['userpass'].value;
    var password = document.forms[name]['password'].value;


    var Passregex = new RegExp(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,}$/);


    if (password != oldpass) {
        passMsg = 'Please enter correct password.';
    }
    if (!Passregex.test(newPassword)) {
        console.log(Passregex.test(newPassword));
        newpassmsg = 'Your password should contain atleast 1 uppercase,1number and min 4 characters';
    }

    if (newPassword != confirmPassword) {
        console.log('newPass---------->!=confirmPass');

        confirmpassmsg = 'Your New Password and Confirm password doesnot match';
    }
    if (passMsg != '' || newpassmsg != '' || confirmpassmsg != '') {
        document.getElementById('password').innerHTML = passMsg;
        document.getElementById('newPassword').innerHTML = newpassmsg;
        document.getElementById('confirmPassword').innerHTML = confirmpassmsg;
        return false;
    }


    return true;
}

//RESETTING UPDATE PROFILE FIELDS
function resetHandlerUpdate(name) {

    var phonemsg = document.getElementById(name + 'phone').value;
    var emailmsg = document.getElementById(name + 'emailId').value;



    if (phonemsg != '' || emailmsg != '') {
        document.getElementById(name + 'phone').innerHTML = '';
        document.getElementById(name + 'emailId').innerHTML = '';

    }

}

//RESTTING CHANGE PASSWORD FIELDS
function resetHandlerPass(name) {

    var password = document.getElementById('password').value;
    var newPassword = document.getElementById('newPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;



    if (password != '' || newPassword != '' || confirmPassword != '') {
        document.getElementById('password').innerHTML = '';
        document.getElementById('newPassword').innerHTML = '';
        document.getElementById('confirmPassword').innerHTML = '';

    }

}