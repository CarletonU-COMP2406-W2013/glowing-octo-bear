$(function(){
	$("#register").on("click",function(){
		var $form = $("form");
		var $inputs = $form.find("input, select, button, textarea")
		var serializedData = $form.serialize();
		$inputs.prop("disabled", true)
		var request = $.ajax({
			url:'/register',
			type:'post',
			data: serializedData
		});
		request.done(function (data, textStatus) {
			$(".registerNotification").text("Thanks for registering!");
          	$(".registerNotification").fadeOut(2000, function() {
          		window.location = 'waiter'
      		});
        });
	});
});
