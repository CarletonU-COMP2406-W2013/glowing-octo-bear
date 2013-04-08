function adjustStyle(width) {
    width = parseInt(width);
    if (width < 1500) {
      $("#size-stylesheet").attr("href", "/stylesheets/1440.css");
    }
    else {
      $("#size-stylesheet").attr("href", "/stylesheets/style.css"); 
    }
}

$(function(){
  adjustStyle($(this).width());
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

    //sets default selected buttons
    $(".menu-category.drink").click()
    $($(".tables-menu-item")[0]).click()

    // disables highlighting any of the html's body
    $('body').disableSelection();

    // loads kitchen view with new order data every 2 seconds.
    // this time can be changed later to a longer time
    // since I doubt cooks need updates this often
    window.setInterval(function(){
      var kitchenUpdate = $.ajax({
        url:'/pollKitchen',
        type:'post'
      });
      kitchenUpdate.done(function (data, textStatus) {
        var ordersList1 = $("li.order-content-1");
        for (var i = ordersList1.length - 1; i >= 0; i--) {
          ordersList1[i].remove()
        };
        var ordersList2 = $("li.order-content-2");
        for (var i = ordersList2.length - 1; i >= 0; i--) {
          ordersList2[i].remove()
        };

        if (data) {
          for (var i = 0; i <= data.length - 1; i++) {
            if (i%2 === 0) {
              var object = $("<li class=order-content-1><div class=order-name>Ice</div><div class=order-time>0:0:0</div></li>");
            }
            else {
              var object = $("<li class=order-content-2><div class=order-name>Ice</div><div class=order-time>0:0:0</div></li>");
            }
            object.children(".order-name").text(data[i].name);
            object.children(".order-time").text(data[i].time);
            object.appendTo("ul.kitchenOrders");
          };
        }
      });
    }, 2000);
});

// on browser resize, check for stylesheet change
// and then adjust for new width and height
$(window).resize(function() {
  adjustStyle($(this).width());
	$("body").css("width", $(window).width());
	$("body").css("height", $(window).height());
});