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

connection.query("SELECT * FROM products", function(err, res){
	if(err){
		console.log(err);
	}
	else{
		purchaseItems(res);
		
	}
});
function purchaseItems(queryResults){
	var table =[]
		for(i = 0; i<queryResults.length; i++){
			table.push({id: i, item: queryResults[i].product_name, department: queryResults[i].department_name, price: queryResults[i].price, stock: queryResults[i].stock_quantity});
		}
		console.table(table);
	inquirer.prompt([
		{
			message: "Please select the id of the item you would like to purchase.",
			type: "input",
			name: "id"
		},
		{
			message: "How many would you like to purchase?",
			type: "input",
			name: "quantity"
		}
			]).then(function(response){
				if(response.quantity>queryResults[response.id].stock_quantity){
					console.log("Insufficient quantity");
					console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
				}
				else{
					var cost = response.quantity*queryResults[response.id].price;
					var newStock = parseInt(queryResults[response.id].stock_quantity) - parseInt(response.quantity);
					console.log(newStock);
					 connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newStock}, {item_id: queryResults[response.id].item_id}], function(err, resp){
					 	if(err){conosle.log(err);}
					 	//else{console.log("database updated")}
					 });
					console.log("You have purchased "+response.quantity +" units of " +queryResults[response.id].product_name +" at a cost of $"+cost);
					console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
				}
				inquirer.prompt([{
					message: "Would you like to buy another item?",
					type: "list",
					choices: ["Yes", "No"],
					name: "again"
				}]).then(function(res){
					if(res.again === "Yes"){
						connection.query("SELECT * FROM products", function(err, res){
							if(err){
								console.log(err);
							}
							else{
								purchaseItems(res);
		
							}
						});
					}
					else{
						connection.end();
					}
				});
			});
		
}