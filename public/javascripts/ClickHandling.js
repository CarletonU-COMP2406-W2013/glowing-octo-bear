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
        // clears localstorage
        localStorage.clear();
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

  // Home Page
  // handles clicking on the logout button
  $("#logout-button").on("click",function(){
    var logout = $.ajax({
      url:'/logout',
      type:'post'
    });

    logout.done(function (data, textStatus) {
      window.location = ""
    });
  });

  // Home Page
  // handles clicking on the kitchen view button
  $("#kitchen-button").on("click",function(){
    var kitchen = $.ajax({
      url:'/switchview',
      type:'post'
    });

    kitchen.done(function (data, textStatus) {
      window.location = "kitchen"
    });
  });

  // Home Page
  // handles clicking on the waiter view button
  $("#waiter-button").on("click",function(){
    var waiter = $.ajax({
      url:'/switchview',
      type:'post'
    });

    waiter.done(function (data, textStatus) {
      window.location = "waiter"
    });
  });


  // /waiter PAge
  // stlye changes for slected or click elements
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

  // /waiter Page
  // loads drink data from MongoDB and displays it in menu
  $(".menu-category.drink").on("click",function(){
    if (localStorage.getItem("menuBeverage") === null) {
      var drinks = $.ajax({
        url:'/drinks',
        type:'post'
      });

      drinks.done(function (data, textStatus) {
        createMenuItems(data, textStatus);
      });
    }
    else {
      loadLocalMenu("menuBeverage");
    }

  });

  // /waiter Page
  // loads Food data from MongoDB and displays it in menu
  $(".menu-category.food").on("click",function(){
    if (localStorage.getItem("menuFood") === null) {
      var foods = $.ajax({
        url:'/food',
        type:'post'
      });
      
      foods.done(function (data, textStatus) {
        createMenuItems(data, textStatus);
      });
    }
    else {
      loadLocalMenu("menuFood");
    }

  });

  // /waiter Page
  // loads Dessert data from MongoDB and displays it in menu
  $(".menu-category.dessert").on("click",function(){
    if (localStorage.getItem("menuDessert") === null) {
      var desserts = $.ajax({
      url:'/dessert',
      type:'post'
      });

      desserts.done(function (data, textStatus) {
        createMenuItems(data, textStatus);
      });
    }
    else {
      loadLocalMenu("menuDessert");
    }
  });

  //helper function for grabing locally stored menus
  function loadLocalMenu(menuName) {
    var menuItems = $("li.menu-menu-item");
    menuItems.remove();

    var menu = JSON.parse(localStorage.getItem(menuName));
    if (menu) {
      for (var i = 0; i <= menu.length - 1; i++) {
        var object = $("<li class=menu-menu-item><div class=item-name><p>Tooth</p></div><div class=item-price><p>$15.99</p></div></li>")
        object.children(".item-name").children("p").text(menu[i].name);
        object.children(".item-price").children("p").text("$" + menu[i].price);
        object.draggable({
        connectToSortable: "#sortable",
        helper: "clone",
        revert: "invalid",
        distance: 20
      })
        object.appendTo("#menu-content-left ul");
      };
    } 

  }

  //helper function for loading menu items
  function createMenuItems(data, textStatus) {
    var menu = [];

    var menuItems = $("li.menu-menu-item");
    menuItems.remove();

    for (var i = data.length - 1; i >= 0; i--) {
      var objectHTML = $("<li class=menu-menu-item><div class=item-name><p>Tooth</p></div><div class=item-price><p>$15.99</p></div></li>")
      var orderObj = {
        name: "???",
        price: "-1.11"
      }
      objectHTML.children(".item-name").children("p").text(data[i].name);
      orderObj.name = data[i].name
      objectHTML.children(".item-price").children("p").text("$"+data[i].price);
      orderObj.price = data[i].price
      objectHTML.draggable({
        connectToSortable: "#sortable",
        helper: "clone",
        revert: "invalid",
        distance: 20
      })
      objectHTML.appendTo("#menu-content-left ul");
      menu.push(orderObj);
    };

    localStorage["menu" + data[0].type] = JSON.stringify(menu);
  }

  // /waiter Page
  // creates array from order list and posts to /sendorder
  $(".send-button").on("click",function(){
    var orderItems = $("li.orders-menu-item");
    var order = {
      data: []
    }
    orderItems.each(function(idx, li) {
        var listItem = $(li);
        // create object to use for each item in the order
        var orderItem = {
          _id: $(".selected-tables-menu-item").text()+(idx+1),
          table: parseInt($(".selected-tables-menu-item").text()),
          name: "",
          price: 0.00
        }
        // change object's properties
        orderItem.name = listItem.children(".item-name").children().text();
        orderItem.price = parseFloat(listItem.children(".item-price").children().text().replace("$",""));
        order.data.push(orderItem);
    });
    // AJAX call that sends order array to server
    var sendOrder = $.ajax({
      url:'/sendorder',
      type:'post',
      data: order
    });
    sendOrder.done(function (data, textStatus) {
      
    });
  });

  // /waiter Page
  // loads current table as order data
  $(".tables-menu-item").on("click",function(){
    var localTableText = "table" + $(".selected-tables-menu-item").text()
    var ordersList = $("li.orders-menu-item");
    for (var i = ordersList.length - 1; i >= 0; i--) {
      ordersList[i].remove()
    };

    var orders = JSON.parse(localStorage.getItem(localTableText));
    if (orders) {
      for (var i = 0; i <= orders.length - 1; i++) {
        var object = $("<li class=orders-menu-item><div class=item-name><p>Ice</p></div><div class=item-price><p>$1.99</p></div></li>")
        object.children(".item-name").children("p").text(orders[i].name);
        object.children(".item-price").children("p").text(orders[i].price);
        object.appendTo("ul#sortable.ui-sortable");
      };
    }
  });
  
});
