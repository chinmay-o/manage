let orderData = null;
let orderID = [];
let userName = [];
let pincode = [];
let product = [];
let quantity = [];
let price = [];
var loader = false;

let orderIDs;

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
  orderIDs = orderData.values;
});

var dispatchURL = "https://sheets.googleapis.com/v4/spreadsheets/1vmQwuUtbKgYP-lrI7YTtWapUKyhQ5jip60SWV2_KDBY/values/responses?key=";
var deliveryURL = "https://sheets.googleapis.com/v4/spreadsheets/1vFdxDclS7UwUCzD3x7iW_ByQZzsEkBAAm8Y9VGqodXA/values/responses?key=";
dispatchData = null;
deliveryData = null;

let dispatchIDs;
let deliveryIDs;

function dispatchAPI() {

  fetch(dispatchURL + apiKey).then((response) => response.json()).then((values) => {
    dispatchData = values;
    dispatchIDs = dispatchData.values;
  });

  return dispatchIDs;
}

function deliveryAPI() {

  fetch(deliveryURL + apiKey).then((response) => response.json()).then((values) => {
    deliveryData = values;
    deliveryIDs = deliveryData.values;
  });

  return deliveryIDs;
}

dispatchAPI();
deliveryAPI();

function orderStatus(uniqueID) {

  var statusReturn = [];
  if (dataAcknowledger(uniqueID, dispatchIDs, 3)[0]) {

    statusReturn.push("Dispatched");
    statusReturn.push("dispatchStatusModal");
    statusReturn.push(dataAcknowledger(uniqueID, dispatchIDs, 3)[1]);
  } else if (dataAcknowledger(uniqueID, orderIDs, 3)[0]) {

    statusReturn.push("Dispatch Pending");
    statusReturn.push("dispatchModal");
    statusReturn.push(dataAcknowledger(uniqueID, orderIDs, 3)[1]);
  }

  return statusReturn;
}

function dataAcknowledger(searchID, dataArray, index) {

  var boolean = false;
  for (var i = 1; i < dataArray.length; i++) {

    if(jQuery.inArray(searchID, dataArray[i]) != -1) {

      boolean = true;
      return [true, dataArray[i][index]];
    }
  }
  if (boolean == false) {

    return false;
  }
}

setTimeout(function() {

  for (var a = 0; a < orderID.length; a++) {

    if (dataAcknowledger(orderID[a], deliveryIDs, 3) == false) {

      document.getElementById("ordersDatabase").innerHTML += '<div id='+ orderID[a] +' class="card mt-2 col-lg-4 col-sm-4 p-2" data-bs-toggle="modal" data-bs-target="#'+ orderStatus(orderID[a])[1] +'"><h6>'+ orderID[a] +'</h6><div class="row"><h6 class="col-6">'+ userName[a] +'</h6><h6 class="col-6">'+ pincode[a] +'</h6></div><div class="row"><h6 class="col-6">'+ product[a] +' x '+ quantity[a] +'</h6><h6 class="col-6">'+ price[a] +'</h6></div><div class="row"><h6 id="logisticsStatus" class="col-12">'+ orderStatus(orderID[a])[0] + ' - ' + orderStatus(orderID[a])[2] +'</h6></div></div>';
      fetchLogisticsID();
    }
  }
  loader = true;
}, 2000);


function fetchLogisticsID() {

  $('div .card').click(function() {

      logisticsID = $(this).attr('id');
      document.getElementById('logisticsID').value = logisticsID;
      document.getElementById('dispatchID').value = logisticsID;
   });
}

function endLoader(){

  if (loader) {

    $(".preloader").css("display", "none");
    $(".deliveries").css("display", "block");
    clearInterval(interv);
  }
}

var interv = setInterval(endLoader, 500);
