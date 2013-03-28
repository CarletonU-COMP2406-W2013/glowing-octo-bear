//jQuery 1.9.1

$(document).ready(function(){
	$(".tables-menu-item").click(function(){
	  $(".content-wrapper").find(".selected-tables-menu-item").toggleClass("selected-tables-menu-item").toggleClass("tables-menu-item")
      $(this).toggleClass("tables-menu-item").toggleClass("selected-tables-menu-item")
	});
	$(".menu-category").click(function(){
	  $(".content-wrapper").find(".selected-menu-category").toggleClass("selected-menu-category").toggleClass("menu-category")
      $(this).toggleClass("menu-category").toggleClass("selected-menu-category")
	});
	$(".send-button").mousedown(function(){
      $(this).toggleClass("send-button").toggleClass("pressed-send-button")
	});
	$(".send-button").mouseup(function(){
      $(this).toggleClass("pressed-send-button").toggleClass("send-button")
	});
	$('body').disableSelection();
});