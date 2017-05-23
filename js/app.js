(function(root) {

	if (extremesData.returnedData === null) {
		extremesData.sendForData();
	}


	function presentUKExtremes() {

			//Array representing regions of UK
		var extremesRegions = extremesData.returnedData.UkExtremes.Regions.Region,
			ukWideRegionIndex = getUKindex(extremesRegions);

		//Finds the index number for data representing entire UK.
		function getUKindex (array) {
			for (var i = 0; i < array.length; i++) {
				if (array[i].id === 'uk') {
					return i;
				}
			}
		}

		var UkWideExtremes = extremesRegions[ukWideRegionIndex].Extremes.Extreme;

		//Finds the index number for matching 'type' property.
		function getDataTypeindex (array, type) {
			for (var i = 0; i < array.length; i++) {
				if (array[i].type === type) {
					return i;
				}
			}
		}

		var highestMaxTempObj = UkWideExtremes[getDataTypeindex(UkWideExtremes, 'HMAXT')];
		var lowestMaxTempObj = UkWideExtremes[getDataTypeindex(UkWideExtremes, 'LMAXT')];
		var lowestMinTempObj = UkWideExtremes[getDataTypeindex(UkWideExtremes, 'LMINT')];
		var highestRainfallObj = UkWideExtremes[getDataTypeindex(UkWideExtremes, 'HRAIN')];
		var longestSunObj = UkWideExtremes[getDataTypeindex(UkWideExtremes, 'HSUN')];		

		console.log('Yesterdays highest maximum temperature was ' + highestMaxTempObj.$ + 
			' celcius which was recorded at ' + highestMaxTempObj.locationName);

		console.log('Yesterdays lowest maximum temperature was ' + lowestMaxTempObj.$ + 
			' celcius which was recorded at ' + lowestMaxTempObj.locationName);

		console.log('Yesterdays lowest minimum temperature was ' + lowestMinTempObj.$ + 
			' celcius which was recorded at ' + lowestMinTempObj.locationName);		

		console.log('Yesterdays highest rainfall total was ' + highestRainfallObj.$ + 
			'mm which was recorded at ' + highestRainfallObj.locationName);		

		console.log('Yesterdays sunniest place was ' + longestSunObj.locationName +
		 ' which had ' + longestSunObj.$ + ' hours of sunshine.');

	}	

	//Global methods to attempt to get API data and to access contents of returned data.
	var lib = {

		presentUKExtremes: presentUKExtremes
		
	}

	//lib object is made available to global scope via extremesData.
	root.weatherApp = lib;

})(this);