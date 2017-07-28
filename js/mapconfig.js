//google maps api JS file
(function(root) {

	var map;
	var markers = [];

	function initMap(centerLocation) {
		
			map = new google.maps.Map(document.getElementById('map'), {
		    zoom: 6,
			center: centerLocation || locations.crindledyke
		});

		//lib.map = map;

	}

	function addMarker(location) {

		var marker = new google.maps.Marker({
		  position: location,
		  map: map
		});

		markers.push(marker);
	}

	function hideMarkers() {
		markers.forEach(function(marker) {
			marker.setMap(null);
		});
	}

	function showMarkers() {
		markers.forEach(function(marker) {
			marker.setMap(map);
		});		
	}

	function removeMarkers() {
		markers.forEach(function(marker) {
			marker.setMap(null);
		});
		markers = [];
	}

	function addExtremesLocationMarkers() {

		var extremes = weatherApp.regionObject.extremes;

		for (var prop in extremes) {

			if (extremes[prop].coOrds) {
				addMarker(extremes[prop].coOrds);
			}
		}
	}

	var locations = {

		crindledyke: {lat: 55.78, lng: -3.86},
		london: {lat: 51.5286, lng: -0.1016}
	}

	var lib = {

		initMap: function(centerLocation) {initMap(centerLocation)},
		addExtremesLocationMarkers: function() {addExtremesLocationMarkers()},
		addMarker: function(location) {addMarker(location)},
		hideMarkers: function() {hideMarkers()},
		showMarkers: function() {showMarkers()},
		removeMarkers: function() {removeMarkers()},
		locations: locations,
		markers: markers

	}

	//lib object is made available to global scope via mapConfig.
	root.mapConfig = lib;

})(this);


//insert google maps script when page loaded
$(function() {
	var script = document.createElement('script');
	script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCCicxY9jL8VR5Vl4phPnhfVhbP5uOvsKk&callback=mapConfig.initMap";
 	document.body.appendChild(script);
});

