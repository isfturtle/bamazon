var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
	host: "localhost",
	port: "3306",
	user: "root",
	password: "BetsyRobert",
	database: "bamazon"
});

function ask(){
	inquirer.prompt([{
	message: "What would you like to do?",
	type: "list",
	choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
	name: "choices"
}]).then(function(r){
	if(r.choices === "View Products for Sale"){
		connection.query("SELECT * FROM products", function(err, res){
			if(err){
				console.log(err);
			}
			else{
				console.table(res);
			}
		});
		ask();

	}
	else if(r.choices === "View Low Inventory"){
		connection.query("SELECT * FROM products WHERE stock_quantity<=5", function(err, res){
			if(err){
				console.log(err);
			}
			else{
				console.table(res);
			}
		});	
		ask();
	}
	else if(r.choices ==="Add to Inventory"){
		connection.query("SELECT * FROM products", function(err, res){
			if(err){
				console.log(err);
			}
			else{
				console.table(res);
				inquirer.prompt([
				{
					message: "Please enter the id of the item you would like to add.",
					type: "input",
					name: "id"
				},
				{
					message: "How many would you like to add to inventory?",
					type: "input",
					name: "number"
				}
				]).then(function(toAdd){
					//connection.query("UPDATE products SET ? WHERE ?", [stock_quantity: res.])
				});
			}
		});

	}
	else if(r.choices ==="Add New Product"){
		inquirer.prompt([
		{
			message: "Product:",
			type: "input",
			name: "product"
		},
		{
			message: "Department:",
			type: "input",
			name: "department"
		},
		{
			message: "Price:",
			type: "input",
			name: "price"
		},
		{
			message: "Stock:",
			type: "input",
			name: "stock"
		}
		]).then(function(newProduct){
			connection.query("INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES(?, ?, ?, ?)", [newProduct.product, newProduct.department, newProduct.price, newProduct.stock], function(err, res){
				if(err){console.log(err);}
			});
			ask();
		});
	}
	else{
		connection.end();
	}
});
}

ask();