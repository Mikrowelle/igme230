/*Flips the exband and hide arrows*/
$(".hideshow").click(function () {
	    $(this).next(".projgallery").slideToggle("slow");
	    /*OMG IT TOOK ME SO LONG TO FIGURE OUT HOW TO TARGET THIS*/
	    $(this).children(".hideshowicon").children("i").toggle();

	});

/*Navigation Scroll Behaviors*/
	$(window).scroll(function () {
	    var $height = $(window).scrollTop();
	    if ($height > 50) {
	        $("nav").css({
	            "background-color": "black",
	            "opacity": ".8"
	        });
	        $("a").css({
	            "color": "#fafafa",
	            "opacity": "1"
	        });
	        $(".site_name").css({
	            "color": "#fafafa",
	            "opacity": "1"
	        });
	        $("header div").css({
	            "opacity": "0"
	        });
	        $("#return_button").css({
	            "opacity": ".8"
	        });
	    } else {
	        $("nav").css({
	            "opacity": "1",
	            "background": "none"
	        });
	        $("a").css({
	            "color": "#333333"
	        });
	        $(".site_name").css({
	            "color": "#333333"
	        });
	        $("header h1").css({
	            "opacity": ".8"
	        });
	        $("header div").css({
	            "opacity": ".8"
	        });
	        $("#return_button").css({
	            "opacity": "0"
	        });
	    }
	});

/*Smooth Scroll*/
	$('header a').click(function () {
	    let target = $(this.hash);
	    $('html, body').animate({
	        scrollTop: target.offset().top - 65
	    }, 600);
	});
	$('#return_button a').click(function () {
	    let target = $(this.hash);
	    $('html, body').animate({
	        scrollTop: target.offset().top
	    }, 600);
	});

/*Side Nav Panel*/
	$("#close").click(function () {
	    $("#navpanel").animate({
	        left: '-250'
	    }, "slow");
	    $("#close").toggle();
	    $("#open").toggle();
	    $("#navpanel").css({
	        "opacity": ".5"
	    });
	});

	$("#open").click(function () {
	    $("#navpanel").animate({
	        left: '0px'
	    }, "slow");
	    $("#close").toggle();
	    $("#open").toggle();
	    $("#navpanel").css({
	        "opacity": ".8"
	    });
	});


	$(".submenu").click(function () {
	    $(this).next(".submenu-panel").toggle();
	});
