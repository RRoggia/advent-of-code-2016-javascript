var compressedFile = getInputs();
	
var decompressedFile = "";

var hasDataToDecompress = true;

while(hasDataToDecompress){
	if(!compressedFile){
		hasDataToDecompress = false;
		continue;
	}

	var nextMarker = compressedFile.match(/\((.?){4}x.(.?){3}\)/);

	var marker = new Marker(nextMarker[0]);
	console.log(marker);

	var stringToRepeat = compressedFile.substring(marker.length, marker.length + marker.subsequentChar);

	for (var j = 0; j < marker.repeatTimes; j++) {
		decompressedFile += stringToRepeat;
	}

	compressedFile = compressedFile.substring(marker.length + marker.subsequentChar, compressedFile.length);

}

console.log(decompressedFile.length);

function Marker(string){
	var marker = string.split('x');
	this.length = string.length;
	this.subsequentChar = parseInt(marker[0].replace('(',''));
	this.repeatTimes = parseInt(marker[1].replace(')',''));
}