$(function(){
	$("body").css("width", $(window).width());
	$("body").css("height", $(window).height());
	$("#login").focus();
});

$(window).resize(function() {
	$("body").css("width", $(window).width());
	$("body").css("height", $(window).height());
});