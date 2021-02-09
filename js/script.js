$(document).ready(function(){
    $( "#nav-template" ).load( "nav.html" );
    });

function becomeChef() {
    var a = document.getElementById("hatted");
        a.style.display = "block";
    var b = document.getElementById("hatless");
        b.style.display = "none";
    var c = document.getElementById("amchef");
        c.style.display = "block";
    var d = document.getElementById("notchef");
        d.style.display = "none";
}

function unbecomeChef() {
    var a = document.getElementById("hatted");
        a.style.display = "none";
    var b = document.getElementById("hatless");
        b.style.display = "block";
    var c = document.getElementById("amchef");
        c.style.display = "none";
    var d = document.getElementById("notchef");
        d.style.display = "block";
}

function checkTime() {
    let selectedElement = document.getElementById("minute");
    console.log(selectedElement);
    const now = new Date();
    selectedElement.innerText = now.getMinutes();
}

