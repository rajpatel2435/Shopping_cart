"use strict"

// GLOBAL constants
const GST_RATE = 5 / 100 // Canada general sales tax
const PST_RATE = 7.5 / 100 // Quebec provincial sales tax

// GLOBAL variables
// list of 6 products as it would be retrieved from server database
let products = [
    {
        'id': 0,
        'name': 'Red Jersey',
        'description': 'Manchester United Home Jersey, red, sponsored by Chevrolet',
        'price': 59.99,
        'pic': 'red_jersey.jpg',
        'qty_in_stock': 200
    },
    {
        'id': 1,
        'name': 'White Jersey',
        'description': 'Manchester United Away Jersey, white, sponsored by Chevrolet',
        'price': 49.99,
        'pic': 'white_jersey.jpg',
        'qty_in_stock': 133
    },
    {
        'id': 2,
        'name': 'Black Jersey',
        'description': 'Manchester United Extra Jersey, black, sponsored by Chevrolet',
        'price': 54.99,
        'pic': 'black_jersey.jpg',
        'qty_in_stock': 544
    },
    {
        'id': 3,
        'name': 'Blue Jacket',
        'description': 'Blue Jacket for cold and raniy weather',
        'price': 129.99,
        'pic': 'blue_jacket.jpg',
        'qty_in_stock': 14
    },
    {
        'id': 4,
        'name': 'Snapback Cap',
        'description': 'Manchester United New Era Snapback Cap- Adult',
        'price': 24.99,
        'pic': 'cap.jpg',
        'qty_in_stock': 655
    },


    {
        'id': 5,
        'name': 'Champion Flag',
        'description': 'Manchester United Champions League Flag',
        'price': 24.99,
        'pic': 'champion_league_flag.jpg',
        'qty_in_stock': 326
    }
]

// array of products ordered initally empty
let cart = []


$(document).ready(function () {

    let htmlContent = ""
    //for loop go to each and every product here
    for (let i = 0; i < products.length; i++) {
        if (products[i].qty_in_stock > 0) {
            htmlContent += '<div class="product">'
            htmlContent += '<img src="products_images/' + products[i].pic + '"alt="' + products[i].name + '">'
            htmlContent += '<p class="name">' + products[i].name + '</p>'
            htmlContent += '<p class="description">' + products[i].description + '</p>'
            htmlContent += '<p class="price">$' + products[i].price + '</p>'
            htmlContent += '<button class="button_grey" onclick="addToCart(' + products[i].id + ')">BUY</button>'
            htmlContent += '</div>'

            $("#catalog").html(htmlContent)

        } else {                           //if product is out of stock
            htmlContent += '<div class="product" ">'
            htmlContent += '<img src="products_images/' + products[i].pic + '"alt="' + products[i].name + '" style="opacity:0.4;z-index:999;">'
            htmlContent += '<p class="name">' + products[i].name + '</p>'
            htmlContent += '<p class="description">' + products[i].description + '</p>'
            htmlContent += '<p class="price">$' + products[i].price + '</p>'
            htmlContent += '<p style="font-size:20px">OUT OF STOCK!!</p>'
            htmlContent += '</div>'

            $("#catalog").html(htmlContent)
        }
    }

})

// function to get the user input of the qty
function addToCart(productId) {
    let inputQty

    do {
        inputQty = prompt("Enter the number of " + products[productId].name + " you want to buy!! ")
        if (isNaN(inputQty)) {
            alert("Please enter a valid Quantity!")

        } else if (inputQty) {
            if (inputQty > 0) {
                alert("Your Shopping Cart has been updated!")
            } else if (inputQty == 0) {
                alert("please enter a valid quantity")
                return 0
            }
            else {
                alert("Please enter a valid Quantity!")
                continue
            }

        } else {
            return
        }

    } while (isNaN(inputQty) || inputQty < 0)


    let nbItems = cart.length

    //storing values in the array
    cart[nbItems] = {
        productId: productId,
        qty: inputQty
    }

    //substracting the quantity ordered from the total quantity to keep a record of things
    products[productId].qty_in_stock -= cart[nbItems].qty

    checkIf()
}

//function to check if the shopping cart is empty
function checkIf() {
    if (cart.length == 0) {
        document.getElementById("cart").innerHTML = "No items in shopping cart"
        return
    }

    displayCart()
}


//function to display the shopping cart!
function displayCart() {

    let subtotal = 0                 //initialization
    let htmlContent = '<table style="border:5px solid green">'
    htmlContent += '<tr> <th>Id</th> <th>Name</th> <th>Price</th> <th>Qty</th> <th>Subtotal</th> </tr>'  //table included to show the table in webpage with quantity
    for (let i = 0; i < cart.length; i++) {

        //make a table of products the user wanna buy
        let productId = cart[i].productId
        for (let j = 0; j < products.length; j++) {
            if (products[j].id == productId) {
                console.log("im in")
                htmlContent += '<tr><td>' + products[j].id + '</td>'
                htmlContent += '<td>' + products[j].name + '</td>'
                htmlContent += '<td>$' + products[j].price + '</td>'
                htmlContent += '<td><input class="data" id="' + cart[i].productId + '" type="number" min="0" step="1" value="' + cart[i].qty + '" onchange="changeCartQty(' + cart[i].productId + ')"></td>'
                htmlContent += '<td>$' + (products[j].price * cart[i].qty).toFixed(2) + '</td></tr>'

                subtotal += products[j].price * cart[i].qty
                break

            }
        }
    }



    htmlContent += '</table>'
    $("#cart").html(htmlContent)
    // output subtotal to screen
    $("#subtotal").html(subtotal.toFixed(2))

    // compute GST of 0.05 and display on screen
    let GST = subtotal * GST_RATE
    $("#GST").html(GST.toFixed(2))

    // compute PST of 0.075 and display on screen
    let PST = (subtotal + GST) * PST_RATE
    $("#PST").html(PST.toFixed(2))

    //compute grand total and display on screen
    let total = subtotal + GST + PST
    $("#total").html(total.toFixed(2))

    // if subtotal above $200 display "free shipping"
    if (subtotal >= 200) {
        $("#message").html("You get free shipping !")
    } else {
        // else display "Order $200 or more to get free shipping"
        $("#message").html("Order $200 or more to get free shipping")
    }
}

//--------------------------------------------------
function changeCartQty(productId) {

    // read qty entered in input box
    let qty = document.getElementById(productId).value
    if (qty == "") {
        qty = 0
        alert("You must enter a number or click cancel")

    }

    //find product in cart and set new qty
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].productId == productId) {
            cart[i].qty = qty
            break
        }
    }

    // refresh the display to recompute everything
    displayCart()
}