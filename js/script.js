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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getLatLng);
    }
}

function getLatLng(position){
  //Function to be passed to the browser's geolocation feature
  var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  currentLatLng = latLng;
  return;
}

function calcRoute(e) {

  var request = null;
  var start = document.getElementById("from").value;
  var end = document.getElementById("to").value;

  if(start == "Your current location"){

    request = {
      origin:currentLatLng,
      destination:end,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
  }
  else{
    request = {
      origin:start,
      destination:end,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
  }

  directionsService.route(request, function(response, status) {
    /* BUG !
     * alert('In the callback'); //Page refreshes before being alerted :(
     */
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
    else{alert('status not ok!');}
  });
  e.preventDefault();
  return false;
}
 
document.getElementById("form").addEventListener("submit", calcRoute, false);

/*
 * Working tabs
 */
function setData(meanOfTransport){
  //Adjusts the data on the right column according to the mean of the transport
  // very-good:good:neutral:bad:very-bad

  var instructions = document.getElementById('instructions');
  var base = "<strong>Instructions</strong><br/>";

  var co2 = document.getElementById('co2');
  var co2Value = co2.getElementsByTagName('strong')[0];

  var time = document.getElementById('time');
  var timeValue = time.getElementsByTagName('strong')[0];


  switch(meanOfTransport.substring(10,13)){
    case 'foo':
      co2Value.innerHTML = "0g";
      co2.setAttribute('class','very-good')

      timeValue.innerHTML = "5h";
      time.setAttribute('class', 'bad');

      instructions.innerHTML = base + "- Be careful with cars<br/>";
      instructions.innerHTML += "- Respect (even road!) signs<br/>";
      instructions.innerHTML += "- Enjoy your fresh air taking!";

      break;
    case 'car':
      co2Value.innerHTML = "350g";
      co2.setAttribute('class','very-bad')

      timeValue.innerHTML = "1h";
      time.setAttribute('class', 'good');

      instructions.innerHTML = base + "- Be careful with pedestrians<br/>";
      instructions.innerHTML += "- Check road signs<br/>";
      instructions.innerHTML += "- Don't burn too much oil!";

      break;
    case 'bus':
      co2Value.innerHTML = "150g";
      co2.setAttribute('class','neutral')

      timeValue.innerHTML = "1h";
      time.setAttribute('class', 'neutral');

      instructions.innerHTML = base + "- Respect the driver<br/>";
      instructions.innerHTML += "- Buy your ticket<br/>";
      instructions.innerHTML += "- Give your seat to that older women. She'll appreciate it!";

      break;

    default:
      alert('Error: unknown mean of transport: ' + meanOfTransport.substring(10,13));
  }
}

function toggle(e){
  if(this.getAttribute('class') == "active"){alert('You are already here');}
  else{
    for(var i=0;i<3;i++){
      document.getElementById('content').getElementsByTagName('li')[i].setAttribute('class','');
    }
    this.setAttribute('class', 'active');
    setData(this.innerHTML);
  }
}
for(var i=0;i<3;i++){
  document.getElementById('content').getElementsByTagName('li')[i].addEventListener('click',toggle,false);
}