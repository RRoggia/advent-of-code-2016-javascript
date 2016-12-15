var ipAddresses = getInputs();
var supportSSL = 0;

for (var i = 0; i < ipAddresses.length; i++) {
	var ipAddress = ipAddresses[i];

	var address = getIPWithoutHypernet(ipAddress);
	var abas = getXYX(address);

	if(abas === null){
		continue;
	}
		
	var hypernets = getHypernets(ipAddress);
	var babs = getXYX(hypernets);
	
	if(babs === null){
		continue;
	}

	if(supportsSSL(abas,babs)){
		supportSSL++;	
	}

};

console.log("There are ", supportSSL, " ip address that support TLS");

function getHypernets(address){
	return address.match(/\[[a-z]*\]/g);
}

function getXYX(address){
	var aba = [];
	for (var i = 0; i < address.length; i++) {
		var hypernet = address[i];	

		for (var j = 0; j < hypernet.length; j++) {
			if(hypernet[j] !== hypernet[j+1] && hypernet[j] === hypernet[j+2]){
				aba.push(hypernet[j] + hypernet[j+1] + hypernet[j+2]);
			}
		}
	}
	return aba;
}

function supportsSSL(abas, babs){
	for (var i = 0; i < abas.length; i++) {
		var aba = abas[i];
		for (var j = 0; j < babs.length; j++) {
			var bab = babs[j];

			if(aba[0] === bab[1] && aba[1] === bab[0]){
				return true;
			}
		}
	}
	return false;
}

function getIPWithoutHypernet(address){
	return address.split(/\[[a-z]*\]/g);
}