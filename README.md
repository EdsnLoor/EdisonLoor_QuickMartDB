
# DEFT CODE CHALLENGE EDISON LOOR

## Description

The architecture of the project follows the principles of Clean Architecture. It is a simple quick mart app. We have an Inventory.txt file in the ./db folder, this one contains all the descriptions of the products from the store.

I convert the .txt file into a json file but I keep all the information from the initial file.

I star with a initial menu which is the user's menu. The next menu is the cart menu we have a list of items we can add and remove them from the cart. We also have a "view cart" option in which shows all the items and the total value of the transaction.

The "checkout" option includes a confirmation question, once we confirm a "checkout.txt" file is created. This file is located at ./db and is the final receipt of the transaction.


## Running
run npm install

`node app.js`

### *core* package

This module contains the domain entities and use cases.
