(function(root) {
	//This code makes the request to the metoffice datapoint API to return UK extremes
	//weather data in JSON format.

	//The returned JSON object is made available to global scope via extremesData.

	var xhr = new XMLHttpRequest(),
		responseObject;

	xhr.onload = function() {
		if(xhr.status === 200) {
			responseObject = JSON.parse(xhr.responseText);
			lib.returnedData = responseObject;
			//Inititalise the app in app.js
			weatherApp.init();

		} else {
			console.log('HTTP status code was ' + xhr.status);
		}
	};

	xhr.open('GET', 'http://datapoint.metoffice.gov.uk/public/data/txt/wxobs/ukextremes/json/latest?key=85d42778-8866-4eac-9f4e-ad2b5c42db1c');
	
	//Global methods to attempt to get API data and to access contents of returned data.
	var lib = {

		sendForData: function() {
			xhr.send();
		},

		returnedData: null,
	}

	//lib object is made available to global scope via extremesData.
	root.extremesData = lib;

})(this);