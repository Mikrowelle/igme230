	$(".hideshow").click(function () {
	    $(this).next(".projgallery").slideToggle("slow");
        /*OMG IT TOOK ME SO LONG TO FIGURE OUT HOW TO TARGET THIS*/
        $(this).children(".hideshowicon").children("i").toggle();

	});
