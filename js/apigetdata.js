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

	//Global methods to attempt to get API data and to access contents of returned data.
	var lib = {

		getExtremesData: function() {
			getExtremesData();
		},

		extremesData: null
	}

	//lib object is made available to global scope via extremesData.
	root.metOfficeData = lib;

})(this);