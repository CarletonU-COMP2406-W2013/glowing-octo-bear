//jQuery 1.9.1

$(document).ready(function(){
	$(".tables-menu-item").click(function(){
	  $(".content-wrapper").find(".selected-tables-menu-item").switchClass("selected-tables-menu-item","tables-menu-item")
      $(this).switchClass("tables-menu-item","selected-tables-menu-item")
	});
	$(".menu-category").click(function(){
	  $(".content-wrapper").find(".selected-menu-category").switchClass("selected-menu-category","menu-category")
      $(this).switchClass("menu-category","selected-menu-category")
	});

	$(".send-button").mousedown(function(){
	  $(this).switchClass("send-button","pressed-send-button")
	});
	$(".send-button").mouseup(function(){
	  $(this).switchClass("pressed-send-button","send-button")
	});
	$('body').disableSelection();
});