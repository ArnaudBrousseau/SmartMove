/*
 * SmartMove scripting
 * --
 *  Mainly geolocation and tracking
 */

function initialize() {
  var myLatlng = new google.maps.LatLng(21.306944,-157.858333);
  var myOptions = {
    zoom: 8,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }
  var map = new google.maps.Map(document.getElementById("google-map"), myOptions);
}
document.getElementById("google-map").addEventListener('click',initialize,true)
