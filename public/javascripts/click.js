$(function(){
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

	$( "#sortable" ).sortable({
      revert: true,
      stop: function(event, ui) {
        $(ui.item).switchClass("menu-menu-item", "orders-menu-item");
      }
    });

    $( "#draggable" ).draggable({
      connectToSortable: "#sortable",
      helper: "clone",
      revert: "invalid",
      distance: 20
    });
});
