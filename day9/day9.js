var compressedFile = getInputs();

debugger;
	
do {

	var hasDataToDecompress = true;
	var decompressedFile = "";

    while(hasDataToDecompress){
		if(!compressedFile || compressedFile.match(/\((.?){4}x.(.?){3}\)/) === null){
			decompressedFile += compressedFile;
			compressedFile = "";
			hasDataToDecompress = false;
			continue;
		}

		var nextMarker = compressedFile.match(/\((.?){4}x.(.?){3}\)/);

		for (var i = 0; i < nextMarker.index; i++) {
			decompressedFile += compressedFile[i];
		}

		var marker = new Marker(nextMarker[0]);
		console.log(marker);

		var stringToRepeat = compressedFile.substring(nextMarker.index + marker.length, nextMarker.index + marker.length + marker.subsequentChar);

		for (var j = 0; j < marker.repeatTimes; j++) {
			decompressedFile += stringToRepeat;
		}

		compressedFile = compressedFile.substring(nextMarker.index + marker.length + marker.subsequentChar, compressedFile.length);
	}

	compressedFile = decompressedFile;

}
while (decompressedFile.match(/\((.?){4}x.(.?){3}\)/));

console.log(decompressedFile.length);

function Marker(string){
	var marker = string.split('x');
	this.length = string.length;
	this.subsequentChar = parseInt(marker[0].replace('(',''));
	this.repeatTimes = parseInt(marker[1].replace(')',''));
}