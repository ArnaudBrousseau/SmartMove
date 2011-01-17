/***********************
 * SmartMove scripting
 ***********************/


/*
 * Geolocation stuff
 */

var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var currentLatLng;

function initialize() {
  var myLatlng = new google.maps.LatLng(21.306944,-157.858333);
  var myOptions = {
    zoom: 8,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById("google-map"), myOptions);
  directionsDisplay = new google.maps.DirectionsRenderer();//pour le chemin
  directionsDisplay.setMap(map);
}

function getLatLng(position){
  //Function to be passed to the browser's geolocation feature
  var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  currentLatLng = latLng;
  return;
}

function calcRoute(e) {

  var start = document.getElementById("from").value;
  var end = document.getElementById("to").value;

  if(start == "Your current location"){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getLatLng);
    }
    var request = {
      origin:currentLatLng,
      destination:end,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
  }
  else{
    var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
  }

  directionsService.route(request, function(response, status) {
    alert('In the callback'); //Page refreshes before being alerted :(
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
    else{alert('status not ok!');}
  });
  alert('Default stopped');
  return false;
}
 
document.getElementById("form").addEventListener("submit", calcRoute, false);

/*
 * Working tabs
 */

function toggle(e){
  if(this.getAttribute('class') == "active"){alert('You are already here');}
  else{
    for(var i=0;i<3;i++){
      document.getElementById('content').getElementsByTagName('li')[i].setAttribute('class','');
    }
    this.setAttribute('class', 'active')
  }
}
for(var i=0;i<3;i++){
  document.getElementById('content').getElementsByTagName('li')[i].addEventListener('click',toggle,false);
}