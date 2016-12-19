var compressedFile = getInputs();

var decompressedFile = "";

var isWhitinMarker = false;

var marker = {
	
	subsequentChar: 0,
	repeat:0,

	hasSubsequentChar: function () {
		return this.subsequentChar > 0;
	}
}


for (var i = 0; i < compressedFile.length; i++) {
	if(!isWhitinMarker){
		if(compressedFile[i] === '('){

		}
			for (var j = 0; j <  ; j++) {
				
			}
		}else{
			decompressedFile += compressedFile[i];
		}

	}else{

	}


}



