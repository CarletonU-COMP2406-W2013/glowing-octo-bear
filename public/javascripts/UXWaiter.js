
$(function() {
// /waiter Page
  // makes menu items draggable and sortable
	$( "#sortable" ).sortable({
    revert: true,
    stop: function(event, ui) {
      $(ui.item).switchClass("menu-menu-item", "orders-menu-item").toggleClass("ui-draggable");
      if (($("li.orders-menu-item").size() * $("li.orders-menu-item").height()) > ($("ul#sortable").height() - $("li.orders-menu-item").height())) {
        $("ul#sortable").height($("ul#sortable").height() + $("li.orders-menu-item").height());
      }
    }
  });

  $( "#draggable" ).draggable({
    connectToSortable: "#sortable",
    helper: "clone",
    revert: "invalid",
    distance: 20
  });

});