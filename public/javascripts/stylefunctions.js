//jQuery 1.9.1

$(document).ready(function(){
	$(".tables-menu-item").click(function(){
	  $(".content-wrapper").find(".selected-tables-menu-item").toggleClass("selected-tables-menu-item").toggleClass("tables-menu-item")
      $(this).toggleClass("tables-menu-item").toggleClass("selected-tables-menu-item")
	});
	// $(".orders-menu-item").click(function(){
	//   $(".content-wrapper").find(".selected-orders-menu-item").toggleClass("selected-orders-menu-item").toggleClass("orders-menu-item")
 //      $(this).toggleClass("orders-menu-item").toggleClass("selected-orders-menu-item")
	// });
	$(".menu-menu-item").click(function(){
	  $(".content-wrapper").find(".selected-menu-menu-item").toggleClass("selected-menu-menu-item").toggleClass("menu-menu-item")
      $(this).toggleClass("menu-menu-item").toggleClass("selected-menu-menu-item")
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