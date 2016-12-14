var password = [];

var puzzleInput ="wtnhxymk";
var increassingIndex = 0;
console.log("start");
var passwordLenghtWithoutUndefined=0;

while(passwordLenghtWithoutUndefined < 8){
	var combination = puzzleInput + increassingIndex;

	var hash = CryptoJS.MD5(combination);
	var fiveDigitsHexadecimalRepresentation = hash.toString().substring(0,5);

	if(fiveDigitsHexadecimalRepresentation == "00000"){
		var possiblePasswordIndex = parseInt(hash.toString().substring(5,6));
		if( possiblePasswordIndex !== NaN && possiblePasswordIndex < 8 ){
			if(!password[possiblePasswordIndex]){
				password[possiblePasswordIndex] = hash.toString().substring(6,7);
				passwordLenghtWithoutUndefined++;
			}
		}
	}

	increassingIndex++;
}

console.log(password.toString().replace(/,/g,""));
