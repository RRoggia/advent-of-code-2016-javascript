var candidatesTriangles = getInputs();

var numberOfPossibleTriangles = 0;

for(var x = 0; x < candidatesTriangles.length ; x +=3){

	candidatesTriangles[x].forEach(function(side, y ){
		if(isATriangle(x, y))
			numberOfPossibleTriangles++;

	});
}

function isATriangle(x,y){
	return (candidatesTriangles[x][y] + candidatesTriangles[x + 1][y] > candidatesTriangles[x + 2][y]) &&
			(candidatesTriangles[x + 1][y] + candidatesTriangles[x + 2][y] > candidatesTriangles[x][y]) &&
			(candidatesTriangles[x + 2][y] + candidatesTriangles[x][y] > candidatesTriangles[x + 1][y]);
}

console.log(numberOfPossibleTriangles);