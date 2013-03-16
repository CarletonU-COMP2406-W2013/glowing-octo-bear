// start your instance of mongodb - $ mongod
// then run - $ mongo localhost:27017/OrderUp serverSetup.js

// BEVERAGES
db.menu.save({
	_id: 100,
	name: "Root Beer",
	price: "$2.99",
	type: "Beverage"
});
db.menu.save({
	_id: 101,
	name: "Real Beer",
	price: "$5.99",
	type: "Beverage"
});

// MAIN COURSES
db.menu.save({
	_id: 200,
	name: "Double Bacon Whiskey BBQ Burger",
	price: "$12.99",
	type: "Food"
});
db.menu.save({
	_id: 201,
	name: "Chicken Parmesan",
	price: "$15.99",
	type: "Food"
});

// DESSERTS
db.menu.save({
	_id: 300,
	name: "Triple Chocolate Cheesecake ",
	price: "$6.99",
	type: "Dessert"
});
db.menu.save({
	_id: 301,
	name: "Pumpkin Pie",
	price: "$5.99",
	type: "Dessert"
});