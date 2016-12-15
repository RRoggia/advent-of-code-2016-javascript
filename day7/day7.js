var ipAddresses = getInputs();
var supportTLS = 0;

for (var i = 0; i < ipAddresses.length; i++) {
	var ipAddress = ipAddresses[i];

	var hypernets = getHypernets(ipAddress);

	if(hasABBA(hypernets)){
		continue;
	}

	var address = getIPWithoutHypernet(ipAddress);

	if(hasABBA(address)){
		supportTLS++;
	}

};

console.log("There are ", supportTLS, " ip address that support TLS");

function getHypernets(address){
	return address.match(/\[[a-z]*\]/g);
}

function hasABBA(address){
	for (var i = 0; i < address.length; i++) {
		var hypernet = address[i];	

		for (var j = 0; j < hypernet.length; j++) {
			if(hypernet[j] !== hypernet[j+1] && hypernet[j] === hypernet[j+3] && hypernet[j+1] === hypernet[j+2]){
				return true;
			}
		}
	}
	return false;
}

function getIPWithoutHypernet(address){
	return address.split(/\[[a-z]*\]/g);
}