
//--------------- 00 - Introducion ----------------------//

//Solución 1 - BinarioADecimal
function BinarioADecimal(num) {
 return num.split('').reverse().reduce(function(x, y, i)
    {
      if(y==='1')       // El elemento extraído es un "1"
    return x + Math.pow(2, i); //2 elevado a i
     else       // El elemento extraído es un "0"
    return x;
    }, 0);
}

//Solución 2 - BinarioADecimal
function BinarioADecimal(num) {
   const arra = Array.from(num.toString()).map(Number);
   var acc=0;
 	for(let i=0; i<arra.length;i++) {
 	  acc = acc + arra[i]*(2 **(arra.length-(i+1)))
 	}
 return acc;
 	
}

//Solución 1 - DecimalABinario
function DecimalABinario(num) {
var arra = []
    while( num >= 1 ) {
        arra.unshift(num%2);
        num=Math.floor(num/2);
    }

 return arra.join('')
}

//--------------- 01 ----------------------//
