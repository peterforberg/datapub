$(document).ready(function () {
    $("#nav-template").load("nav.html");
});

/*
function eliminate() {
    var a = document.getElementById("delete");
        a.style.display = "none";
}

function eliminate() {
    let selectedElement = document.getElementById("delete");
    console.log(selectedElement);
    selectedElement.istyle.display = "none";
}
*/

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

foodArray = ["meatloaf", "butternut squash ravioli", "egg fried rice", "tuna salad"]

function foodSort(foods) {
    var food = prompt("Hey, what should I cook next?");
    food = food.toLowerCase();
    foodArray.push(food);
    var sortedFood = foodArray.sort();
    /* var foodAsUL = sortedFood.map(function (i) {
        return i
      }) */

    document.getElementById('foodList').innerHTML =
        '<li>' + sortedFood.join('</li><li>') + '</li>'
}

function lastFood() {
    index = foodArray.length - 1;
    document.getElementById("lastFood").innerHTML = foodArray[index];
}

newArray = ["meatloaf", "butternut squash ravioli", "egg fried rice", "tuna salad"]

function checkLength(food) {
    var food = prompt("Hey, what should I cook next?");

}

//api things
//map first
function mapLoad() {
    //Define the lattitude longitude coordinate
    var latLng = [41.80222, -87.589424];

    var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

    var grayscale = L.tileLayer(mbUrl, { id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr }),
        streets = L.tileLayer(mbUrl, { id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr });

    var map = L.map('map', {
        center: latLng,
        zoom: 16,
        layers: [streets]
    });

    var baseLayers = {
        "Grayscale": grayscale,
        "Streets": streets
    };

    L.control.layers(baseLayers).addTo(map);

    L.marker(latLng).addTo(map)
        .bindPopup("<b>Uncle Joe's<br>Jerk Chicken</b>").openPopup();

    //Click event
    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }
    map.on('click', onMapClick);
}

function wikiAPI() {
    var parentDiv = document.getElementById('wiki');
    removeResults(parentDiv);
    var searchTerm = document.getElementById('searchTerm').value;
    var connect = new XMLHttpRequest();
    var url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=20&gsrsearch=" + searchTerm;

    connect.open('GET', url);

    connect.onload = function () {
        var wikiObject = JSON.parse(this.response);
        //console.log(wikiObject);
        //console.log(wikiObject.query.pages);
        var pages = wikiObject.query.pages;
        for (i in pages) {
            //basic function from before the super challenge
            /* var newDiv = document.createElement("div");
            newDiv.setAttribute('class', 'row h4');
            document.getElementById("wiki").appendChild(newDiv);
            newDiv.innerText = pages[i].title; */

            //super challenge
            var pageURL = "https://en.wikipedia.org/?curid="
            var newAnchor = document.createElement("a");
            newAnchor.href = pageURL + pages[i].pageid;
            newAnchor.className = 'd-block';
            newAnchor.innerText = pages[i].title;
            document.getElementById("wiki").appendChild(newAnchor);
        };

    }
    connect.send(); // .open() opens the request, connect is parsed using the .parse() method, .send() sends the request
}

//This function will remove the previous results.
function removeResults(parentDiv) {
    while (parentDiv.firstChild) {
        parentDiv.removeChild(parentDiv.firstChild);
    }
}

//ochre

//Define parent element where table will be created
var parentElement = document.getElementById('ochreTableBody');
//Define API url
var urlOCHRE = "https://ochre.lib.uchicago.edu/ochre?uuid=accd571b-bae3-4d42-93d9-58b65ec79300";

//First function, called on <body>
function loadXML(){
    //Chain the next funtion to create the XHR
    XMLrequest(urlOCHRE);
    console.log('loadXML -- ok');
};

function XMLrequest(link){
    //Make the API call and send the results to the next function
    var connectOCHRE = new XMLHttpRequest(); //connect OCHRE is an object now seen as an XMLHttpRequest
    connectOCHRE.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) { //"this" refers to the connectOCHRE object now understood as an XMLHttpRequest
            listTexts(this.responseXML); //"this" can use specific methods like responseXML due to its status
        };
    };
    connectOCHRE.open('GET', link, true);
    connectOCHRE.send();
    console.log('XML request -- ok');
}

function listTexts(sourceXML){
    //Here we are just setting the innerText of preset divs directly to the value of XML elements
    document.getElementById('projectTitle').innerText = sourceXML.getElementsByTagName('metadata')[0].children[1].innerHTML;
    document.getElementById('setTitle').innerText = sourceXML.getElementsByTagName('set')[0].children[3].children[0].innerHTML;
    document.getElementById('setDescription').innerText = sourceXML.getElementsByTagName('set')[0].children[4].innerHTML;
    var licenseText = document.getElementById('license');
    licenseText.innerText = sourceXML.getElementsByTagName('availability')[0].children[0].innerHTML;
    licenseText.setAttribute('href', sourceXML.getElementsByTagName('availability')[0].children[0].attributes[0].nodeValue);

    //Select, parse, and display the data
    console.log(sourceXML);
    var textList = sourceXML.getElementsByTagName('text');
    console.log(textList);
    for (i=0; i < textList.length; i++) {
        //create one row per text
        var tr = document.createElement('tr');
        tr.setAttribute('class', 'ochreTableRows');
        tr.setAttribute('id', 'row_'+i);
        document.getElementById('ochreTableBody').appendChild(tr);
        //populate the cells in the row
        var td = document.createElement('td');
        td.setAttribute('id', 'td_name_'+i);
        td.textContent = textList[i].children[0].children[0].innerHTML;
        document.getElementById('row_'+i).appendChild(td);
        var td2 = document.createElement('td');
        td2.setAttribute('id', 'td_desc_'+i);
        td2.textContent = textList[i].children[3].innerHTML;
        document.getElementById('row_'+i).appendChild(td2);
    }

}