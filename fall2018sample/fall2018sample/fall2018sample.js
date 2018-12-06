/* Don't use <script> tags in a linked js file! */
$(".menuitem").click(function () {
	$(this).next(".submenu").slideToggle("fast");
});
 let verse = ("content1.txt") // sets default verse element
    $("#choose-content").val(verse); // changes menu option to default
    $("#content").load(verse); // retrieves only default element

    $("#choose-content").change(function() {
      verse = $(this).val();
      $("#content").load(verse);
    });
