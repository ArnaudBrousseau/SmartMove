/*
 * SmartMove scripting
 * --
 *  Mainly geolocation and tracking
 */

var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

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

function calcRoute(e) {
    //To clear the instructions -- should we activate it ?
	//document.getElementsByTagName("aside")[0].style.display="none";
	
	//To go to top of the page
	//window.scrollTo(0,0);
	
    var start = document.getElementById("from").value;
    var end = document.getElementById("to").value;
    var request = {
        origin:start, 
        destination:end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
	e.preventDefault();
  }
 
 document.getElementById("form").addEventListener("submit", calcRoute, false);
