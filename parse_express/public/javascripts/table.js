$(document).ready(function(){
	$("div").scroll(function(){
    $("div:not(this)").scrollTop($(this).scrollTop());
		$("div:not(this)").scrollLeft($(this).scrollLeft());
	});
	

	
	var table = $('#dattable').DataTable( {} );	

	//var headercellsfirstrow = document.getElementById("tableHeader").children[0].children;
	//var contentcellsfirstrow = document.getElementById("tableBody").children[0].children;
	
	//for(var i = 0; i<headercellsfirstrow.length;i++){
		//headercellsfirstrow[i].clientLeft(contentcellsfirstrow[i].clientLeft);
		//console.log("succes")
	//}
	
//alert(headerChildren.childNodes[1].childNodes.length);
	 
	//var contentChildren = document.getElementById("#tableBody").children;
	//alert("test3");

	// $('td').each(function(){
			// if($(this).width() == 100){
					// alert(this.textContent + " width = 100");
			// }
	// });
})
