let orderData = null;
let orderID = [];
let userName = [];
let pincode = [];
let product = [];
let quantity = [];
let price = [];
var index = false;

var orderURL = "https://sheets.googleapis.com/v4/spreadsheets/1uBitdF4y3c9EAKdJjeBPaorP1p3znoM-jb51FM4WsMw/values/responses?key="
var apiKey = "AIzaSyBpaORBU9bCcAMmAbawXlxTpXr1LuAGjWw";


fetch(orderURL + apiKey).then((response) => response.json()).then((values) => {
  orderData = values;

  for (var i = 1; i < orderData.values.length; i++) {

    orderID.push(orderData.values[i][1]);
    userName.push(orderData.values[i][2]);
    pincode.push(orderData.values[i][4]);
    product.push(orderData.values[i][5]);
    quantity.push(orderData.values[i][6]);
    price.push(orderData.values[i][7]);
  }
});

setTimeout(function() {

  for (var a = 0; a < orderID.length; a++) {

    document.getElementById("ordersDatabase").innerHTML += '<div id='+ orderID[a] +' class="card mt-2 col-lg-4 col-sm-4 p-2" data-bs-toggle="modal" data-bs-target="#dispatchModal"><h6>'+ orderID[a] +'</h6><div class="row"><h6 class="col-6">'+ userName[a] +'</h6><h6 class="col-6">'+ pincode[a] +'</h6></div><div class="row"><h6 class="col-6">'+ product[a] +' X '+ quantity[a] +'</h6><h6 class="col-6">'+ price[a] +'</h6></div><div class="row"><h6 class="col-12">Status</h6></div></div>';
  }
}, 2000);
