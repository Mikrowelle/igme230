	$(".hideshow").click(function () {
	    $(this).next(".projgallery").slideToggle("slow");
	});

	function myFunction() {
	    var x = document.getElementById("myTopnav");
	    if (x.className === "links") {
	        x.className += " responsive";
	    } else {
	        x.className = "links";
	    }
	}
