
var req;

function checkajax() {
    try {
        req = new XMLHttpRequest();
        console.log("///////////////////ajax////");
        /* alert("xmlhttprequest done") */
        return;
    }
    catch (e) { }

    try {
        req = new ActiveXObject("Msxm2.XMLHTTP");
        /* alert("activex msxm2 done"); */
        return;
    }
    catch (e) { }

    try {
        req = new ActiveXObject("Microsoft.XMLHTTP");
        /* alert("activex microsoft xmlhttp done"); */
        return;
    } catch (e) { }
    console.log("///////////////////ajax////");
    //alert("your browser doesnot support ajax");
}


//POPULATING DATA IN EDIT MACHINE MODAL
function edit(id) {
    console.log("------------------>Inside edit" + id);
    var url = "/machine/getmachine/" + id;
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var obj = JSON.parse(req.responseText);
            console.log(req.responseText);

            document.getElementById("machineID").value = obj.machineID;
            document.getElementById("machineName").value = obj.machineName;
            document.getElementById("serialNo").value = obj.serialNo;
            document.getElementById("modelID").value = obj.modelID;
            document.getElementById("ip").value = obj.ip;
            document.getElementById("machineStatus").value = obj.machineStatus;
            document.getElementById("reset").value = obj.machineID;

        }
    }

    req.open("GET", url, true);
    req.send();

}


//VALIDATING MACHINE MODAL
function checkValidate(name) {
    console.log("---------->check validate");

    var machineID = document.forms[name]['machineID'].value;
    var machineName = document.forms[name]['machineName'].value;
    var serialNo = document.forms[name]['serialNo'].value;
    var modelID = document.forms[name]["modelID"].value;
    var ip = document.forms[name]['ip'].value;

    var machineReg = new RegExp('^([a-zA-Z]{2}[0-9]{2,})$');
    var serialReg = new RegExp('^([0-9]{4})$');
    var ipReg = new RegExp('^([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])$');

    var machineIDvalid = '';
    var machineNameValid = '';
    var serailNoValid = '';
    var modelIDValid = '';
    var ipValid = '';

    if (machineID.length == 0 || machineID.length < 4 || !machineReg.test(machineID)) {
        console.log("------------->" + machineReg.test(machineID.value));
        machineIDvalid = "Please enter ID with first 2 letters and next digit";
    }

    if (machineName.length < 4 || machineName.length > 15) {
        machineNameValid = "Please enter Name with min 4 and max 15 characters";
    }
    if (serialNo.length != 4 || !serialReg.test(serialNo)) {
        console.log("Serial no " + serialReg.test(serialNo));
        serailNoValid = "Please enter digit[0-9] of length 4";
    }
    if (modelID.length == 0 || modelID.length < 4 || !machineReg.test(modelID)) {
        console.log("------------->ModelID " + machineReg.test(modelID.value));
        modelIDValid = "Please enter ID with first 2 letters and next 2 digit";
    }
    if (!ipReg.test(ip)) {
        ipValid = "Please enter valid IP Adrress";
    }

    if (machineIDvalid != '' || machineNameValid != '' || serailNoValid != '' || modelIDValid != '' || ipValid != '') {
        document.getElementById(name + 'machineID').innerHTML = machineIDvalid;
        document.getElementById(name + 'machineName').innerHTML = machineNameValid;
        document.getElementById(name + 'serialNo').innerHTML = serailNoValid;
        document.getElementById(name + 'modelID').innerHTML = modelIDValid;
        document.getElementById(name + 'ip').innerHTML = ipValid;

        return false;
    }


    return true;
}

function setID(machineid) {
    document.getElementById('form3machineID').value = machineid;

}

//DELETE MACHINE 
function delMachine() {
    var machineid = document.getElementById('form3machineID').value;

    var url = '/machine/delete/' + machineid;
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            alert.log(req.responseText);


            window.location.href = '/machine/';
            location.reload(true);

        }
    }

    req.open("GET", url, true);
    req.send();
}


//RESETTING FORM FIELDS
function resetHandler(name) {

    var machineID = document.getElementById(name + 'machineID').value;
    var machineName = document.getElementById(name + 'machineName').value;
    var serialNo = document.getElementById(name + 'serialNo').value;
    var modelID = document.getElementById(name + 'modelID').value;
    var ip = document.getElementById(name + 'ip').value;
    if (machineID != '' || machineName != '' || serialNo != '' || modelID != '' || ip != '') {
        document.getElementById(name + 'machineID').innerHTML = '';
        document.getElementById(name + 'machineName').innerHTML = '';
        document.getElementById(name + 'serialNo').innerHTML = '';
        document.getElementById(name + 'modelID').innerHTML = '';
        document.getElementById(name + 'ip').innerHTML = '';

    }

}

//VALIDATING INPUTS ON CHANGE
$(document).ready(function(){

    //MODAL ON CLOSE CLEAR FIELDS 
    $('#addMachineModal').on('hidden.bs.modal', function (e) {
        $(this)
          .find("input,select")
             .val('')
             .end();
             $('#form1machineID').html('');
             $('#form1machineName').html('');
             $('#form1serialNo').html('');
             $('#form1modelID').html('');
             $('#form1ip').html('');
      });

    //MODAL ON CLOSE CLEAR FIELDS   
    $('#editMachineModal').on('hidden.bs.modal', function (e) {
    
            $('#form2machineID').html('');
            $('#form2machineName').html('');
            $('#form2serialNo').html('');
            $('#form2modelID').html('');
            $('#form2ip').html('');
    });


    //VALIDATING MACHINEID
    $('[name="machineID"]').on('input', function() {
        var machineID=$(this).val();
        var machineIDvalid='';
        var machineReg = new RegExp('^([a-zA-Z]{2}[0-9]{2,})$');
        if (machineID.length == 0 || machineID.length < 4 || !machineReg.test(machineID)) {
            console.log("------------->" + machineReg.test(machineID.value));
            machineIDvalid = "Please enter ID with first 2 letters and next digit";
            }

            var form='form2';
            if(document.forms['form1']['machineID'].value!=''){
                form='form1';
            }
        $('#'+form+'machineID').html(machineIDvalid);
        

    });

    //VALIDATING MACHINE NAME
    $('[name="machineName"]').on('input',function(){
        
        var machineName=$(this).val();
        var machineNameValid = '';
        if (machineName.length < 4 || machineName.length > 15) {
            machineNameValid = "Please enter Name with min 4 and max 15 characters";
        }

        var form='form2';
        if(document.forms['form1']['machineID'].value!=''){
            form='form1';
        }
        $('#'+form+'machineName').html(machineNameValid);


    });


    //VALIDATING SERIAL NO

    $('[name="serialNo"]').on('input',function(){
        var serialNo=$(this).val();
        var serailNoValid = '';
        var serialReg = new RegExp('^([0-9]{4})$');
        if (serialNo.length != 4 || !serialReg.test(serialNo)) {
            console.log("Serial no " + serialReg.test(serialNo));
            serailNoValid = "Please enter digit[0-9] of length 4";
        }
        var form='form2';
        if(document.forms['form1']['machineID'].value!=''){
            form='form1';
        }

        $('#'+form+'serialNo').html(serailNoValid);
       
    });

    //VALIDATING MODEL ID

    $('[name="modelID"]').on('input', function() {
        var modelID=$(this).val();
        var modelIDvalid='';
        var modelReg = new RegExp('^([a-zA-Z]{2}[0-9]{2,})$');
        if (modelID.length == 0 || modelID.length < 4 || !modelReg.test(modelID)) {
           
            modelIDvalid = "Please enter ID with first 2 letters and next digit";
            }
            var form='form2';
        if(document.forms['form1']['machineID'].value!=''){
            form='form1';
        }
        $('#'+form+'modelID').html(modelIDvalid);
        

    });


    //VALIDATING IP ADDRESS
    $('[name="ip"]').on('input',function(){
        var ip=$(this).val();
        var ipReg = new RegExp('^([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])$');
        var ipValid='';
        if (!ipReg.test(ip)) {
            ipValid = "Please enter valid IP Adrress";
        }
        var form='form2';
        if(document.forms['form1']['machineID'].value!=''){
            form='form1';
        }
        $('#'+form+'ip').html(ipValid);
       
    });

});
