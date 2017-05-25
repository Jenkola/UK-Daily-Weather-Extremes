(function(root) {
	//This code makes the request to the metoffice datapoint API to return UK extremes
	//weather data in JSON format.
	//The returned JSON object is made available to global scope via extremesData.
	function getExtremesData() {
		$.get('http://datapoint.metoffice.gov.uk/public/data/txt/wxobs/ukextremes/json/latest?key=85d42778-8866-4eac-9f4e-ad2b5c42db1c', 
			function(data) {
				lib.extremesData = data;
				weatherApp.init();
			}
		);	
	}

	function getForecastData(locationId) {
		var returnData,
			requestString = 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/';
		requestString += locationId;
		requestString += '?res=3hourly&key=85d42778-8866-4eac-9f4e-ad2b5c42db1c';
		$.get(requestString, 
			function(data) {
				lib.forecastData = data;
				//TODO: call function in weatherApp to extract lat/lon co-ords and attach to region object
			}
		);
	}

	//Gets site list which contains coordinates for obersvation sites. Approx 9kb.
	function getObservationsSiteList() {
		$.get('http://datapoint.metoffice.gov.uk/public/data/val/wxobs/all/json/sitelist?key=85d42778-8866-4eac-9f4e-ad2b5c42db1c',
			function(data) {
				lib.observationSiteList = data;
				//TODO: call function in weatherApp to extract lat/lon co-ords and attach to region object
			}
		);
	}

	//Global methods to attempt to get API data and to access contents of returned data.
	var lib = {

		getExtremesData: function() {getExtremesData();},
		getForecastData: function(locationId) {getForecastData(locationId);},	
		getObservationsSiteList: function() {getObservationsSiteList();},	

		extremesData: null,
		observationSiteList: null,
		forecastData: null

	}

	//lib object is made available to global scope via extremesData.
	root.metOfficeData = lib;

})(this);