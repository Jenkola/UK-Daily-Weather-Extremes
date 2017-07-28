//google maps api JS file

//$.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyCCicxY9jL8VR5Vl4phPnhfVhbP5uOvsKk', initMap());



function initMap() {
	var crindledyke = {lat: 55.78, lng: -3.86};
	var map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 6,
		center: crindledyke
	});
    var marker = new google.maps.Marker({
      position: crindledyke,
      map: map
    });
}

function loadScript() {

	var script = document.createElement('script');

	script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCCicxY9jL8VR5Vl4phPnhfVhbP5uOvsKk&callback=initMap";
	document.body.appendChild(script);
}

//window.onload = loadScript;