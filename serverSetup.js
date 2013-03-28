// start your instance of mongodb - $ mongod
// then run - $ mongo OrderUp serverSetup.js

// BEVERAGES
db.menu.save({
	_id: 100,
	name: "Soda",
	price: 2.99,
	type: "Beverage"
});
db.menu.save({
	_id: 101,
	name: "James Ready",
	price: 1.49,
	type: "Beverage"
});
db.menu.save({
	_id: 102,
	name: "Budweiser",
	price: 3.99,
	type: "Beverage"
});
db.menu.save({
	_id: 103,
	name: "Iron City",
	price: 3.99,
	type: "Beverage"
});
db.menu.save({
	_id: 104,
	name: "Smithwick's",
	price: 4.99,
	type: "Beverage"
});
db.menu.save({
	_id: 105,
	name: "Foster's",
	price: 3.99,
	type: "Beverage"
});
db.menu.save({
	_id: 106,
	name: "Stella Artois",
	price: 4.99,
	type: "Beverage"
});
db.menu.save({
	_id: 107,
	name: "Paulaner",
	price: 5.99,
	type: "Beverage"
});
db.menu.save({
	_id: 108,
	name: "Samuel Adams",
	price: 3.99,
	type: "Beverage"
});
db.menu.save({
	_id: 109,
	name: "Yuengling",
	price: 5.99,
	type: "Beverage"
});
db.menu.save({
	_id: 110,
	name: "Guinness",
	price: 4.99,
	type: "Beverage"
});
db.menu.save({
	_id: 111,
	name: "Westvleteren",
	price: 6.99,
	type: "Beverage"
});
db.menu.save({
	_id: 112,
	name: "Water",
	price: 0.00,
	type: "Beverage"
});

// MAIN COURSES
db.menu.save({
	_id: 200,
	name: "Double Bacon Whiskey BBQ Burger",
	price: 12.99,
	type: "Food"
});
db.menu.save({
	_id: 201,
	name: "Chicken Parmesan",
	price: 15.99,
	type: "Food"
});
db.menu.save({
	_id: 202,
	name: "Chargrilled Pork",
	price: 35.99,
	type: "Food"
});
db.menu.save({
	_id: 203,
	name: "Quail Eggs",
	price: 6.99,
	type: "Food"
});
db.menu.save({
	_id: 204,
	name: "Chilli Lamb",
	price: 16.99,
	type: "Food"
});
db.menu.save({
	_id: 205,
	name: "Pulled Pork",
	price: 17.99,
	type: "Food"
});
db.menu.save({
	_id: 206,
	name: "Seseri Skewers",
	price: 13.99,
	type: "Food"
});
db.menu.save({
	_id: 207,
	name: "Fish Taco",
	price: 10.99,
	type: "Food"
});
db.menu.save({
	_id: 208,
	name: "Fried Green Tomatoes",
	price: 11.99,
	type: "Food"
});
db.menu.save({
	_id: 209,
	name: "Lobster Coral Xiao Long Bao",
	price: 45.99,
	type: "Food"
});
db.menu.save({
	_id: 210,
	name: "Handcut Ligurian Pasta",
	price: 22.99,
	type: "Food"
});
db.menu.save({
	_id: 211,
	name: "Matsutake Meshi",
	price: 15.99,
	type: "Food"
});
db.menu.save({
	_id: 212,
	name: "Salted Anchovies",
	price: 19.99,
	type: "Food"
});
db.menu.save({
	_id: 213,
	name: "Shrimp Rice",
	price: 17.99,
	type: "Food"
});
db.menu.save({
	_id: 214,
	name: "Grilled Rib Eye",
	price: 28.99,
	type: "Food"
});
db.menu.save({
	_id: 215,
	name: "Poutine",
	price: 13.99,
	type: "Food"
});
db.menu.save({
	_id: 216,
	name: "Marzipan",
	price: 12.99,
	type: "Food"
});
db.menu.save({
	_id: 217,
	name: "Pho",
	price: 11.99,
	type: "Food"
});
db.menu.save({
	_id: 218,
	name: "Fajitas",
	price: 10.99,
	type: "Food"
});
db.menu.save({
	_id: 219,
	name: "Sheperd's Pie",
	price: 15.99,
	type: "Food"
});
db.menu.save({
	_id: 220,
	name: "Tom Yum Goong",
	price: 9.99,
	type: "Food"
});

// DESSERTS
db.menu.save({
	_id: 300,
	name: "Triple Chocolate Cheesecake ",
	price: 6.99,
	type: "Dessert"
});
db.menu.save({
	_id: 301,
	name: "Pumpkin Pie",
	price: 5.99,
	type: "Dessert"
});
db.menu.save({
	_id: 302,
	name: "Cassava Cake",
	price: 7.99,
	type: "Dessert"
});
db.menu.save({
	_id: 303,
	name: "Pie",
	price: 5.99,
	type: "Dessert"
});
db.menu.save({
	_id: 304,
	name: "Chocolate Truffles",
	price: 5.99,
	type: "Dessert"
});
db.menu.save({
	_id: 305,
	name: "Cacao Nibs",
	price: 3.99,
	type: "Dessert"
});
db.menu.save({
	_id: 306,
	name: "Jello",
	price: 2.99,
	type: "Dessert"
});