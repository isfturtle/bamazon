CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INT(10) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(50),
price DECIMAL(10,4),
stock_quantity INT(10),
PRIMARY KEY ( item_id )
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES
("Rainbow Hat", "Clothing", 25, 4),
("Timothy Hay", "Pet Supplies", 10, 20),
("Girl Scout Cookies", "Food", 4, 35),
("Electric Piano", "Musical Instruments", 200, 5),
("Guitar", "Musical Instruments", 100, 10),
("Milk", "Food", 3, 50),
("Colored Pencils", "Art Supplies", 5, 30),
("Yarn", "Art Supplies", 4, 50),
("Russian Tortoise", "Pets", 130, 3),
("Red-Eared Slider", "Pets", 20, 10);
