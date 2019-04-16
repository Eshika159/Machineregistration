var nav='open'

function openNav() {
    document.getElementById("mySidenav").style.marginTop="35px";
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById('main').style.marginLeft='250px';
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.marginTop="0";
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById('main').style.marginLeft='0';
  }