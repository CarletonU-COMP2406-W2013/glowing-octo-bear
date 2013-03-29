$(function(){
	//adjusts body width and height based on browser resolution
	$("body").css("width", $(window).width());
	$("body").css("height", $(window).height());

	// auto loads drinks menu
    var drinks = $.ajax({
      url:'/drinks',
      type:'post'
    });
    drinks.done(function (data, textStatus) {
      var menuItems = $("li.menu-menu-item");
      menuItems.remove();

      for (var i = data.length - 1; i >= 0; i--) {
        var object = $("<li id=draggable class=menu-menu-item><div class=item-name><p>Tooth</p></div><div class=item-price><p>$15.99</p></div></li>")
        object.children(".item-name").children("p").text(data[i].name);
        object.children(".item-price").children("p").text("$"+data[i].price);
        object.draggable({
          connectToSortable: "#sortable",
          helper: "clone",
          revert: "invalid",
          distance: 20
        })
        object.appendTo("#menu-content-left ul");
      };
    });    
});

$(document).ready(function () {
  //sets default selected buttons
    $(".menu-category.drink").click()
    $($(".tables-menu-item")[0]).click()
});

$(window).resize(function() {
	$("body").css("width", $(window).width());
	$("body").css("height", $(window).height());
});