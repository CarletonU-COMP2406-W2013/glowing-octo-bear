
$(function() {
// /waiter Page
  // makes menu items draggable and sortable
	$( "#sortable" ).sortable({
    revert: true,
    stop: function(event, ui) {
      //changes class so it matches other order items css
      $(ui.item).switchClass("menu-menu-item", "orders-menu-item")
      //scales the height of the orders ul to be slightly bigger than all order li's combined
      if (($("li.orders-menu-item").size() * $("li.orders-menu-item").height()) > ($("ul#sortable").height() - $("li.orders-menu-item").height())) {
        $("ul#sortable").height($("ul#sortable").height() + $("li.orders-menu-item").height());
      }
      //stores table order in browser local storage
      var orderHTML = $("li.orders-menu-item")
      var orders = []

      for (var i = orderHTML.length - 1; i >= 0; i--) {
        var order = {
          name: "default",
          price: "-1.11"
        }
        order.name = $(orderHTML[i]).children(".item-name").text()
        order.price = $(orderHTML[i]).children(".item-price").text()
        orders[i] = order;
      };

      localStorage["table" + $(".selected-tables-menu-item").text()] = JSON.stringify(orders);
    }
  });

  $( "#draggable" ).draggable({
    connectToSortable: "#sortable",
    helper: "clone",
    revert: "invalid",
    distance: 20
  });

});