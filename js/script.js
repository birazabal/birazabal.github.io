function kudeatzaileakHasieratu()
{
	
	var berrasi = false ;

	var irudia = document.getElementById("irudia");
	irudia.onclick = function(){
		
		//garbitu bueltaka dabilen funtzioa
			clearInterval(errepikakorra);	
		// hemendik 7 segundutara berriro deitu
			setTimeout(sortuErrepika,7000);
		// berriro hasieratu dugula jakiteko...
			berrasi = true ;					
	}

	var erabiltzaile = document.getElementById("erabiltzaile");
	erabiltzaile.value = 'zure@emaila';

	erabiltzaile.onblur = function(){
		if (erabiltzaile.value == ''){
			erabiltzaile.value = "zure@emaila";
		}
	}

	erabiltzaile.onfocus = function(){
		if (erabiltzaile.value == 'zure@emaila'){
			erabiltzaile.value = '';
		}
	}

	var item = document.getElementById("combobox");
	item.addEventListener("change", zerrendaKud);

	function zerrendaKud(){
		console.log(item.value);
		console.log(item.options[item.selectedIndex].text);
		console.log(item.selectedIndex);
	} 

	var inprimaki = document.getElementById('inprimaki');
	inprimaki.onsubmit = function(){
		console.log("Submit botoia sakatu da");
		return false;
	}
	
	// img karpetako irudiak erabili ditut... 
	
   var irudiizenak = ['limoia','mandarinak','marrubiak','meloia','sagarra','sesamo'];
	
	function karrusela(){		 		
			// dudan arraira moldatuta..
			indizea = parseInt(indizeaEman());
		if ( berrasi == true ){
			indizeaAldatu(0);
			indizea = parseInt(indizeaEman());
			berrasi = false ;
			//alert("berriro hasi");
		}	 		
			if ((indizea < 6)){
				irudia.style.backgroundImage = "url(images/" + irudiizenak[indizea] + ".jpg)";	
				//console.log("irudiak/" + irudiizenak[indizea] + ".jpg");	
				indizea = indizea + 1 ;					
				indizeaAldatu(indizea);			
			}else { 
				irudia.style.backgroundImage = "url(images/" + irudiizenak[0] + ".jpg)";			   
			   indizeaAldatu(1);
		
			}	
	}
	
	var errepikakorra;
		
	function sortuErrepika(){	
			 
		 errepikakorra = setInterval(karrusela, 5000);
	}	
	function indizeaAldatu(zkia){
		localStorage.setItem("indizea",zkia);		
		//console.log("balioa aldatu da " + zkia );	
	}
	function indizeaEman(){
		var indi = localStorage.getItem("indizea");
		//console.log("indizea eskatu da, bere balioa" + indi );
		return indi;	
	}
	// lehen exekuzioan irudiak biraka hasi daitezen. 

	sortuErrepika();
}

window.onload = kudeatzaileakHasieratu;
