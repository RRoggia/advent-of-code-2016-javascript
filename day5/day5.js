var password = "";

var puzzleInput ="wtnhxymk";
var increassingIndex = 0;

while(password.length < 8){
	var combination = puzzleInput + increassingIndex;

	var hash = CryptoJS.MD5(combination);
	var fiveDigitsHexadecimalRepresentation = hash.toString().substring(0,5);

	if(fiveDigitsHexadecimalRepresentation == "00000")
		password += hash.toString().substring(5,6);

	increassingIndex++;
}

console.log(password);
