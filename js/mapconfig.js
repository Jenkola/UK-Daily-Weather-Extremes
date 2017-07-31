//google maps api JS file
(function(root) {

	var map;
	var markers = [];

	function requestGoogleMapApi() {

		//clear any pre-existing google object
		window.google = {};

		var script = document.createElement('script');
		script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCCicxY9jL8VR5Vl4phPnhfVhbP5uOvsKk&callback=mapConfig.initMap";
 		document.body.appendChild(script);
	}

	function initMap(centerLocation) {

		var region = weatherApp.regionObject.region,
			regionCenterCoOrds,
			regionZoomLevel;

		switch(region) {

			case 'UK':
				regionCenterCoOrds = {lat: 55.78, lng: -3.86};
				regionZoomLevel = 6;
				break;
			case 'Northern Ireland':
				regionCenterCoOrds = {lat: 54.4, lng: -6.78};
				regionZoomLevel = 8;
				break;
			case 'Orkney & Shetland':
				regionCenterCoOrds = {lat: 59.8, lng: -2.16};
				regionZoomLevel = 8;
				break;
			case 'Highland & Eilean Siar':
				regionCenterCoOrds = {lat: 57.65, lng: -5.41};
				regionZoomLevel = 7;
				break;
			case 'Grampian':
				regionCenterCoOrds = {lat: 57.19, lng: -3.05};
				regionZoomLevel = 8;
				break;
			case 'Central Tayside & Fife':
				regionCenterCoOrds = {lat: 56.28, lng: -3.52};
				regionZoomLevel = 9;
				break;
			case 'Strathclyde':
				regionCenterCoOrds = {lat: 55.84, lng: -5.28};
				regionZoomLevel = 8;
				break;
			case 'Dumfries,Galloway,Lothian & Borders':
				regionCenterCoOrds = {lat: 55.41, lng: -3.43};
				regionZoomLevel = 8;
				break;
			case 'North East England':
				regionCenterCoOrds = {lat: 55.05, lng: -1.95};
				regionZoomLevel = 8;
				break;
			case 'Yorkshire & Humber':
				regionCenterCoOrds = {lat: 54.07, lng: -1.63};
				regionZoomLevel = 8;
				break;
			case 'North West England':
				regionCenterCoOrds = {lat: 54.26, lng: -2.68};
				regionZoomLevel = 8;
				break;
			case 'East Midlands':
				regionCenterCoOrds = {lat: 52.82, lng: -0.45};
				regionZoomLevel = 8;
				break;
			case 'West Midlands':
				regionCenterCoOrds = {lat: 52.66, lng: -2.09};
				regionZoomLevel = 8;
				break;
			case 'Wales':
				regionCenterCoOrds = {lat: 52.4, lng: -3.66};
				regionZoomLevel = 8;
				break;
			case 'East of England':
				regionCenterCoOrds = {lat: 52.36, lng: 0.43};
				regionZoomLevel = 8;
				break;
			case 'London & South East England':
				regionCenterCoOrds = {lat: 51.41, lng: -0.18};
				regionZoomLevel = 8;
				break;
			case 'South West England':
				regionCenterCoOrds = {lat: 50.9, lng: -3.64};
				regionZoomLevel = 7;
				break;
			default:
				regionCenterCoOrds = {lat: 55.78, lng: -3.86};
				regionZoomLevel = 6;			
		}
		
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: regionZoomLevel,
			center: regionCenterCoOrds
		});

		addExtremesLocationMarkers();

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

		requestGoogleMapApi: function() {requestGoogleMapApi()},
		initMap: function(centerLocation) {initMap(centerLocation)},
		addExtremesLocationMarkers: function() {addExtremesLocationMarkers()},
		addMarker: function(location) {addMarker(location)},
		hideMarkers: function() {hideMarkers()},
		showMarkers: function() {showMarkers()},
		removeMarkers: function() {removeMarkers()},
		locations: locations,
		map: map,
		markers: markers

	}

	//lib object is made available to global scope via mapConfig.
	root.mapConfig = lib;

})(this);


//insert google maps script when page loaded
// $(function() {
// 	var script = document.createElement('script');
// 	script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCCicxY9jL8VR5Vl4phPnhfVhbP5uOvsKk&callback=mapConfig.initMap";
//  	document.body.appendChild(script);
// });

