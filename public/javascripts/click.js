$(function(){
  // Home Page
  // handles clicking on the registion button
	$("#register").on("click",function(){
		var $form = $("form");
		var $inputs = $form.find("input, select, button, textarea")
		var serializedData = $form.serialize();
		$inputs.prop("disabled", true)
		var register = $.ajax({
			url:'/register',
			type:'post',
			data: serializedData
		});
		register.done(function (data, textStatus) {
			$(".registerNotification").text("Thanks for registering!");
      $(".registerNotification").fadeOut(2000, function() {
      	$(".registerNotification").text("").fadeIn(0);
      	window.location = 'waiter'
  		});
    });
	});

  // Home Page
  // handles clicking on the login button
	$("#login").on("click",function(){
		var $form = $("form");
		var serializedData = $form.serialize();
		var login = $.ajax({
			url:'/login',
			type:'post',
			data: serializedData
		});
		login.done(function (data, textStatus) {
			$(".registerNotification").text("Logging in...");
          	$(".registerNotification").fadeOut(700, function() {
          		$(".registerNotification").text("").fadeIn(0);
          		window.location = 'waiter'
      		});
        });
    login.fail(function (data, textStatus) {
    	if(textStatus === 400) {
    		$(".registerNotification").text("User doesn't exist in database");
    	} else {
    		$(".registerNotification").text("Incorrect Password");
    	}

      $(".registerNotification").fadeOut(2000, function() {
      			$(".registerNotification").text("").fadeIn(0);
      });
    });
	});

  // /waiter Page
  // loads drink data from MongoDB and displays it in menu
  $(".menu-category.drink").on("click",function(){
    var drinks = $.ajax({
      url:'/drinks',
      type:'post'
    });

    drinks.done(function (data, textStatus) {
      createMenuItem(data, textStatus);
    });

  });

  // /waiter Page
  // loads Food data from MongoDB and displays it in menu
  $(".menu-category.food").on("click",function(){
    var foods = $.ajax({
      url:'/food',
      type:'post'
    });

    foods.done(function (data, textStatus) {
      createMenuItem(data, textStatus);
    });

  });

  // /waiter Page
  // loads Dessert data from MongoDB and displays it in menu
  $(".menu-category.dessert").on("click",function(){
    var desserts = $.ajax({
      url:'/dessert',
      type:'post'
    });

    desserts.done(function (data, textStatus) {
      createMenuItem(data, textStatus);
    });
    
  });

  //private helper function for loading menu items
  function createMenuItem(data, textStatus) {
    var menuItems = $("li.menu-menu-item");
      menuItems.remove();

      for (var i = data.length - 1; i >= 0; i--) {
        var object = $("<li id=draggable class=menu-menu-item><div class=item-name><p>Tooth</p></div><div class=item-price><p>$15.99</p></div></li>")
        object.children(".item-name").children("p").text(data[i].name);
        object.children(".item-price").children("p").text("$"+data[i].price);
        object.appendTo("#menu-content-left ul");
      };
  }

  // /waiter Page
  // creates array from order list
  $(".send-button").on("click",function(){
    var orderItems = $("li.orders-menu-item");
    var order = {
      data: []
    }
    var cnt = 0;
    orderItems.each(function(idx, li) {
        cnt+=1;
        var listItem = $(li);
        // create object to use for each item in the order
        var orderItem = {
          _id: cnt,
          table: 1,
          name: "",
          price: ""
        }
        // change object's properties
        orderItem.name = listItem.children(".item-name").children().text();
        orderItem.price = listItem.children(".item-price").children().text();
        order.data.push(orderItem);
    });
    // AJAX call that sends order array to server
    var sendOrder = $.ajax({
      url:'/sendorder',
      type:'post',
      data: order
    });
    sendOrder.done(function (data, textStatus) {
      console.log("done");
    });
  });

});
