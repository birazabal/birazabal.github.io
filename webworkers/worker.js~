// zaharra: lehena da funtzioak aztertuko dituen balioak, kasu honetan bi balio aztertuko ditu

//var num0 = 22;
//var num = 2227644437;

// bigarren bertsioan parametro moduan jasotzen dugu zenbakia, eta ondoren is Lehena funtzioari pasa
onmessage = function (event) {
	
	var zenbakia = parseInt(event.data);
	//postMessage(event.data);
	isLehena(zenbakia);
}



 	
// isLehena funtzioa, ia zki bat lehena den ikusten du eta horren arabera postMessage ezberdina bidaltzen du.
function isLehena(n) {
	//console.log("funtzio barruan");
	//postMessage("kaixo");	
	var i = 2;

	// erabiltzaileak sartutako balioak aztertzeko
	
	if (n == 2){ 
		postMessage(i + " lehena da !!");
		postMessage("bukatuda");
		return true;
	}
	for (; i < n; ++i) {
		if (n % i == 0) {
					postMessage( n + " ez da lehena !!");
					postMessage("bukatuda");
			      return false;
			      
			      
		}
		// console.log("Kalkulatzen:" + i);
	}


   postMessage(i + " lehena da !!");
	postMessage("bukatuda");	
	return true;
		
	
}
//isLehena(num0);
	//isLehena(num);
//isLehena(num);
