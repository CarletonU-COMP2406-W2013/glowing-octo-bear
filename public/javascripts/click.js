$(function(){
	$("#register").on("click",function(){
		var $form = $("form");
		$form.attr("action","/");
		$form.submit();
		$(".registerNotification").text("Thanks for registering!")
		$(".registerNotification").fadeOut(2000)
	});
});
