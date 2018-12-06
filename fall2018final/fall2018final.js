$(".mainmenu").click(function () {
	$(this).next(".submenu").slideToggle("fast");
});

let verse = ("article0.txt") // sets default verse element
$("content").val(verse); // changes menu option to default
$("article").load(verse); // retrieves only default element

$('input[type=radio][name=content]').change(function () {
	verse = $(this).val();
	$("article").load(verse);
});
