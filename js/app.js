(function(root) {

		//Get data from API
	if (metOfficeData.extremesData === null
		&& metOfficeData.observationSiteList === null) {
		metOfficeData.getExtremesData();
		//metOfficeData.getObservationsSiteList();
	}

	var regionObject;

	//Called by apigetdata.js when extremes data is returned from Met Office API
	function init(region) {
 		regionObject = createRegionObject(region);
 		logExtremes(regionObject);
 		metOfficeData.getObservationsSiteList();
 	}

	function addCoOrds() {
		regionObject = addCoOrdinatesToRegionObject(regionObject);
		weatherApp.regionObject = regionObject;
	}

	

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
			returnObj.extremes = {};
			returnObj.extremes.HMAXT = extremesArr[getIndexByProperty(extremesArr, 'type', 'HMAXT')];
			returnObj.extremes.LMAXT = extremesArr[getIndexByProperty(extremesArr, 'type', 'LMAXT')];
			returnObj.extremes.LMINT = extremesArr[getIndexByProperty(extremesArr, 'type', 'LMINT')];
			returnObj.extremes.HRAIN = extremesArr[getIndexByProperty(extremesArr, 'type', 'HRAIN')];
			returnObj.extremes.HSUN = extremesArr[getIndexByProperty(extremesArr, 'type', 'HSUN')];

			return returnObj;
		}

		//Logs data to the console for selected region object
		function logExtremes(regionObject) {

			console.log('Data released by the Met Office at ' + regionObject.issuedAt);
			console.log('Data is for the following date: ' + regionObject.date);
			console.log('Data is for the following region: ' + regionObject.region);
			console.log('The highest maximum temperature was ' + regionObject.extremes.HMAXT.$ + 
				regionObject.extremes.HMAXT.uom + ' recorded at ' + regionObject.extremes.HMAXT.locationName);
			console.log('The lowest maximum temperature was ' + regionObject.extremes.LMAXT.$ + 
				regionObject.extremes.LMAXT.uom + ' recorded at ' + regionObject.extremes.LMAXT.locationName);
			console.log('The lowest minimum temperature was ' + regionObject.extremes.LMINT.$ + 
				regionObject.extremes.LMINT.uom + ' recorded at ' + regionObject.extremes.LMINT.locationName);		
			console.log('The highest rainfall total was ' + regionObject.extremes.HRAIN.$ + 
				regionObject.extremes.HRAIN.uom + ' recorded at ' + regionObject.extremes.HRAIN.locationName);		
			console.log('The sunniest place was ' + regionObject.extremes.HSUN.locationName +
			 ' which had ' + regionObject.extremes.HSUN.$ + ' ' + regionObject.extremes.HSUN.uom + ' of sunshine.');
		}

		function addCoOrdinatesToRegionObject(regionObject) {
			//Loops through the relevant properties in regionObject
			var extremesData = regionObject.extremes;
			for (var prop in extremesData) {
				var locationId = extremesData[prop].locId;
				var coOrdsObject = getCoOrdinatesFromSiteId(locationId);

				if (coOrdsObject) {
					extremesData[prop].coOrds = coOrdsObject;
				}
				
			}
			//i.e. HMAXT, LMAXT, LMINT, HRAIN, HSUN
			//Grabs the 'locId' property from each one.
			function getCoOrdinatesFromSiteId(locId) {
				//Trim off any zeros at the beginning of the locID value
				//e.g. '03529' => '3529'
				locId = String(Number(locId));
				var coOrdsObject = {}

				//Loops through the array in metOfficeData.observationSiteList.Locations.Location
				var locationsArray = metOfficeData.observationSiteList.Locations.Location;
				//Utilise getIndexByProperty helper function?
				var matchingLocationIndex = getIndexByProperty(locationsArray, 'id', locId);
				//If 'id' property in array object === locID value,
				if(matchingLocationIndex) {
					//Return the 'latitude' and 'longitude' properties from the array object.
					coOrdsObject.latitude = locationsArray[matchingLocationIndex].latitude;
					coOrdsObject.longitude = locationsArray[matchingLocationIndex].longitude;
					return coOrdsObject;
				} else {
					console.log('location id could not be found in site list: ' + locId);
				}
				
			};
			
			return regionObject;
			//Add the 'latitude' and 'longitude' properties returned from getCoOrdinatesFromSiteId()
			//into the regionObject.
			//So that each place in the regionObject now has grid coOrdinate values as well.
			//****Build in some fallback if location could not be found in observationSiteList****?
		}

	

	//Global methods to attempt to get API data and to access contents of returned data.
	var lib = {

		init: init,
		addCoOrds: addCoOrds,
		createRegionObject: createRegionObject,
		logExtremes: logExtremes,
		addCoOrdinatesToRegionObject: addCoOrdinatesToRegionObject,
		regionObject: regionObject

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