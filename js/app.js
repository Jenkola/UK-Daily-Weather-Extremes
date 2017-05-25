(function(root) {
	//Get data from API
	if (metOfficeData.extremesData === null
		&& metOfficeData.observationSiteList === null) {
		metOfficeData.getExtremesData();
		metOfficeData.getObservationsSiteList();
	}

	//Called by apigetdata.js when data is returned from Met Office API
	function init() {
		presentUKExtremes('UK');
	}

	function presentUKExtremes(regionName) {

		//Helper function to get the index number of an array element 
		//that contains a specified property value
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

			//TODO: loop through relevant properties and for each location ID, call a new
			//helper function that gets the co-ordinates of that ID by using the forecast data?

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

		function addCoOrdinatesToRegionObject(regionObject) {
			//Loops through the relevant properties in regionObject
			//i.e. HMAXT, LMAXT, LMINT, HRAIN, HSUN
			//Grabs the 'locId' property from each one.
			function getCoOrdinatesFromSiteId(locId) {
				//May need to trim off any zeros at the beginning of the locID value
				//e.g. '03529' => '3529'
				//Loops through the array in metOfficeData.observationSiteList.Locations.Location
				//If 'id' property in array object === locID value,
				//Return the 'latitude' and 'longitude' properties from the array object.
				//Return them as an object with 2 properties?
			};
			
			//Add the 'latitude' and 'longitude' properties returned from getCoOrdinatesFromSiteId()
			//into the reginObject.
			//So that each place in the regionObject now has grid coOrdinate values as well.
			//Build in some fallback if location could not be found in observationSiteList?
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

//In order of data array from Met Office
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

//Roughly Geographically Ordered
// "UK"
// "Northern Ireland"
// "Orkney & Shetland"
// "Highland & Eilean Siar"
// "Grampian"
// "Central Tayside & Fife"
// "Strathclyde"
// "Dumfries,Galloway,Lothian & Borders"
// "North East England"
// "Yorkshire & Humber"
// "North West England"
// "East Midlands"
// "West Midlands"
// "Wales"
// "East of England"
// "London & South East England"
// "South West England"

//**GUIDE TO DATA**
// Rainfall is 24-hour total from 