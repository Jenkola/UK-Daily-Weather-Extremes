(function(root) {
	//Get data from API
	if (metOfficeData.extremesData === null) {
		metOfficeData.getExtremesData();
	}

	//Called by apigetdata.js when data is returned from Met Office API
	function init() {
		presentUKExtremes('UK');
	}

	function presentUKExtremes(regionName) {

		//Helper function to get the index number in an array containing a specified property value
		function getIndexByProperty(array, propertyName, propertyVal) {
			for (var i = 0; i < array.length; i++) {
				if (array[i][propertyName] === propertyVal) {
					return i;
				}
			}
		}

		//Creates a better formatted object for weather extremes in a specified region
		function createRegionObject(regionName) {
			//extremesData.returnedData is the returned object from the Met Office API call.
			var ukExtremesData = metOfficeData.extremesData.UkExtremes,
				dateOfData = ukExtremesData.extremeDate,
				dataIssuedAt = ukExtremesData.issuedAt,
				extremesRegionsArray = ukExtremesData.Regions.Region,	
				regionIndex = getIndexByProperty(extremesRegionsArray, 'name', regionName),
				extremesArr = extremesRegionsArray[regionIndex].Extremes.Extreme;

			//Create new object
			var returnObj = {};

			returnObj.date = dateOfData;
			returnObj.issuedAt = dataIssuedAt;
			returnObj.region = regionName;
			returnObj.HMAXT = extremesArr[getIndexByProperty(extremesArr, 'type', 'HMAXT')];
			returnObj.LMAXT = extremesArr[getIndexByProperty(extremesArr, 'type', 'LMAXT')];
			returnObj.LMINT = extremesArr[getIndexByProperty(extremesArr, 'type', 'LMINT')];
			returnObj.HRAIN = extremesArr[getIndexByProperty(extremesArr, 'type', 'HRAIN')];
			returnObj.HSUN = extremesArr[getIndexByProperty(extremesArr, 'type', 'HSUN')];

			return returnObj;
		}

		//Logs data to the console for selected region object
		function logExtremes(regionObject) {

			console.log('Data released by the Met Office at ' + regionObject.issuedAt);
			console.log('Data is for the following date: ' + regionObject.date);
			console.log('Data is for the following region: ' + regionObject.region);
			console.log('The highest maximum temperature was ' + regionObject.HMAXT.$ + 
				regionObject.HMAXT.uom + ' recorded at ' + regionObject.HMAXT.locationName);
			console.log('The lowest maximum temperature was ' + regionObject.LMAXT.$ + 
				regionObject.LMAXT.uom + ' recorded at ' + regionObject.LMAXT.locationName);
			console.log('The lowest minimum temperature was ' + regionObject.LMINT.$ + 
				regionObject.LMINT.uom + ' recorded at ' + regionObject.LMINT.locationName);		
			console.log('The highest rainfall total was ' + regionObject.HRAIN.$ + 
				regionObject.HRAIN.uom + ' recorded at ' + regionObject.HRAIN.locationName);		
			console.log('The sunniest place was ' + regionObject.HSUN.locationName +
			 ' which had ' + regionObject.HSUN.$ + ' ' + regionObject.HSUN.uom + ' of sunshine.');
		}

		var regionObject = createRegionObject(regionName);

		logExtremes(regionObject);
		return regionObject;

	}	

	//Global methods to attempt to get API data and to access contents of returned data.
	var lib = {

		init: init,
		presentUKExtremes: presentUKExtremes,

	}

	//lib object is made available to global scope via extremesData.
	root.weatherApp = lib;

})(this);

//**REGIONS BY NAME**

// "Orkney & Shetland"
// "East of England"
// "Strathclyde"
// "North East England"
// "North West England"
// "Wales"
// "Yorkshire & Humber"
// "Grampian"
// "West Midlands"
// "Northern Ireland"
// "South West England"
// "Central Tayside & Fife"
// "UK"
// "East Midlands"
// "London & South East England"
// "Dumfries,Galloway,Lothian & Borders"
// "Highland & Eilean Siar"