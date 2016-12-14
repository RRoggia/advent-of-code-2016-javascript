var repeatedlyMessages = getInputs();

var password = "";

for(var y = 0; y < 8 ; y++){
	var mostFrequent = {};

	for (var x = 0; x < repeatedlyMessages.length; x++) {
		if(mostFrequent[repeatedlyMessages[x][y]]){
			mostFrequent[repeatedlyMessages[x][y]]++;
		}else {
			mostFrequent[repeatedlyMessages[x][y]] = 1;
		}
	}
	var higherValue = 0;
	var higherLetter = "";
	
	for(var letter in mostFrequent){
		if(higherValue < mostFrequent[letter]){
			higherValue = mostFrequent[letter];
			higherLetter = letter;
		}
	}

	password += higherLetter;
}
console.log(password);