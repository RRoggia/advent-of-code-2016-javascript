var roomsEncryption = getInputs();
var sectorIdSum = 0;

var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

roomsEncryption.forEach(function (roomEncryption) {
	
	var room = new Room(roomEncryption);

	var fiveMostCommonLettersCheckSum = createCheckSum(room.nameWithoutDash);

	if(fiveMostCommonLettersCheckSum === room.checkSum){
		sectorIdSum += room.sectorId;
		var decryptedRoomName = decryptRoomName(room.name, room.sectorId);
		console.log("Decrypted Name: ", decryptedRoomName, " sector id: ", room.sectorId);
	}

});

console.log(sectorIdSum);

function Room(roomEncryption){
	var stringfiedSectorId = roomEncryption.match(/\d{3}/)[0];
	var stringfiedCheckSum = roomEncryption.match(/\[[a-z]{5}\]/)[0];

	var notTheName = stringfiedSectorId.length + stringfiedCheckSum.length;
	this.name = roomEncryption.substring(0, (roomEncryption.length - 1) - notTheName);
	this.nameWithoutDash = this.name.replace(/-/g,"");
	this.sectorId = parseInt(stringfiedSectorId);
	this.checkSum = stringfiedCheckSum.replace(/[^a-z]/g,"");
}

function createCheckSum(name){
	
	var timesLettersAppears = countHowManyTimesLetterAppearsIn(name);

	var checkSumOrdered = orderMapByValueAndAlphabetization(timesLettersAppears);
	
	return getReadableFiveDigitsCheckSum(checkSumOrdered);
}

function countHowManyTimesLetterAppearsIn(name){
	var timesLettersAppears = {};

	Array.from(name).forEach(function(letter){
		if(timesLettersAppears[letter]){
			timesLettersAppears[letter]++;
		}else{
			timesLettersAppears[letter] = 1;
		}
	});

	return timesLettersAppears;
}

function orderMapByValueAndAlphabetization(timesLettersAppears){

	var checkSumOrdered = [];

	for(var letter in timesLettersAppears) {
		
		if(checkSumOrdered.length > 0) {
				
			var isLastItem = true;

			for (var i = 0; i < checkSumOrdered.length; i++) {
				var orderedLetter = checkSumOrdered[i]

				if(timesLettersAppears[orderedLetter] < timesLettersAppears[letter]){
					checkSumOrdered.splice(i, 0, letter);
					isLastItem = false;
					break;
				}else if(timesLettersAppears[orderedLetter] === timesLettersAppears[letter]){
					if(letter < orderedLetter){
						checkSumOrdered.splice(i, 0, letter);
						isLastItem = false;
						break;
					}
				}						
			};

			if(isLastItem)
				checkSumOrdered.push(letter);

		}else {
			checkSumOrdered.push(letter);
		}
	}

	return checkSumOrdered;
}

function getReadableFiveDigitsCheckSum(checkSum){
	return checkSum.toString().substring(0,9).replace(/,/g,"");
}

function decryptRoomName(encryptedName, sectorId){
	var decryptedName = "";
	Array.from(encryptedName).forEach(function(letter){
		var position = 0 ;

		if(letter !== '-'){

			alphabet.forEach(function(alphabetLetter, i){
				if(letter === alphabetLetter){
					position = i;
				}
			});

			for (var i = 0; i < sectorId; i++) {
				if(position === 25){
					position = 0;		
				}else{
					position++;
				}
			}

			decryptedName += alphabet[position];
		}else{
			decryptedName += " ";
		}
	});
	return decryptedName;
}