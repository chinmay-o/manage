
deliveryData = new Set();
dispatchData = new Set();
orderData = new Set();
refillData = new Set();
counterData = new Set();

var loader = false;

orderIDs = new Set();
const deliveryValues = [];
const dispatchValues = [];
const orderValues = [];
const refillValues = [];
const counterValues = [];

const entries = [];

var deliveryURL = "https://sheets.googleapis.com/v4/spreadsheets/1vFdxDclS7UwUCzD3x7iW_ByQZzsEkBAAm8Y9VGqodXA/values/responses?key="
var dispatchURL = "https://sheets.googleapis.com/v4/spreadsheets/1vmQwuUtbKgYP-lrI7YTtWapUKyhQ5jip60SWV2_KDBY/values/responses?key="
var orderURL = "https://sheets.googleapis.com/v4/spreadsheets/1uBitdF4y3c9EAKdJjeBPaorP1p3znoM-jb51FM4WsMw/values/responses?key="
var refillURL = "https://sheets.googleapis.com/v4/spreadsheets/1vY10J4tjRwF3fa3j0pqdMNuYGwrdP78tFAiPTwwPCV4/values/responses?key="
var counterURL = "https://sheets.googleapis.com/v4/spreadsheets/15KO8s8IjaT92ZmGDJiydcCGvvnaqcCiLYwt-A_JVe8k/values/responses?key="
var apiKey = "AIzaSyBpaORBU9bCcAMmAbawXlxTpXr1LuAGjWw";

function fetchAPIdata() {

  deliveryData.clear();
  dispatchData.clear();
  orderData.clear();
  refillData.clear();
  counterData.clear();

  orderIDs.clear();

  fetch(deliveryURL + apiKey).then((response) => response.json()).then((values) => {
    let data = values;
    deliveryData.add(data.values);
  });

  fetch(dispatchURL + apiKey).then((response) => response.json()).then((values) => {
    let data = values;
    dispatchData.add(data.values);
  });

  fetch(orderURL + apiKey).then((response) => response.json()).then((values) => {
    let data = values;
    orderData.add(data.values);
  });

  fetch(refillURL + apiKey).then((response) => response.json()).then((values) => {
    let data = values;
    refillData.add(data.values);
  });

  fetch(counterURL + apiKey).then((response) => response.json()).then((values) => {
    let data = values;
    counterData.add(data.values);
  });
}

fetchAPIdata();
deliveryDataLoop();

setTimeout(function() {

  for (var i = 1; i < (deliveryData.values().next().value).length; i++) {

    orderIDs.add(deliveryData.values().next().value[i][1]);
    deliveryValues.push({key:deliveryData.values().next().value[i][1], date: deliveryData.values().next().value[i][0], additionalCost: deliveryData.values().next().value[i][2]});
  }
}, 1200);

setTimeout(function() {

  for (var j = 1; j < (dispatchData.values().next().value).length; j++) {

    var total = sum([dispatchData.values().next().value[j][4], dispatchData.values().next().value[j][5]]);
    dispatchValues.push({key:dispatchData.values().next().value[j][1], total});
  }
}, 1400);

setTimeout(function() {

  for (var k = 1; k < (orderData.values().next().value).length; k++) {

    var orderDate = orderData.values().next().value[k][0];
    var name = orderData.values().next().value[k][2];
    var product = orderData.values().next().value[k][5];
    var quantity = orderData.values().next().value[k][6];
    var price = orderData.values().next().value[k][7];
    var seller = orderData.values().next().value[k][8];
    var userID = orderData.values().next().value[k][9];
    orderValues.push({key:orderData.values().next().value[k][1], orderDate, name, product, quantity, price, seller, userID});
  }
}, 1600);

setTimeout(function() {

  for (var j = 1; j < (refillData.values().next().value).length; j++) {

    refillValues.push({key:refillData.values().next().value[j][8]});
  }
}, 1800);

setTimeout(function() {

  for (var m = 1; m < (counterData.values().next().value).length; m++) {

    counterValues.push({key:counterData.values().next().value[m][8]});
  }
}, 2000);

function sum(array) {

  var result = 0;
  for (var i = 0; i < array.length; i++) {

    result = result + parseFloat(array[i]);
  }
  return result;
}

function deliveryDataLoop() {

  setTimeout(function() {

    let orderArray = Array.from(orderIDs);
    for (var a = 0; a < orderArray.length; a++) {

      var deliveryIndex = deliveryValues.findIndex(deliver => deliver.key == orderArray[a]);
      var dispatchIndex = dispatchValues.findIndex(dispatch => dispatch.key == orderArray[a]);
      var orderIndex = orderValues.findIndex(order => order.key == orderArray[a]);

      if (orderValues[orderIndex].userID == undefined) {

        if (counterValues.some(counter => counter.key == orderArray[a]) == false) {

          entries.push({key: orderArray[a], name: orderValues[orderIndex].name, product: orderValues[orderIndex].product, quantity: orderValues[orderIndex].quantity, price: sum([orderValues[orderIndex].price, dispatchValues[dispatchIndex].total, deliveryValues[deliveryIndex].additionalCost]), seller: orderValues[orderIndex].seller, type: "non-user"});
          document.getElementById("deliveryDatabase").innerHTML += '<div id="'+ orderArray[a] +'" class="card mt-2 col-lg-4 col-sm-4 p-2" data-bs-toggle="modal" data-bs-target="#nonUserModal"><div class="row"><h6 class="col-6">'+ orderArray[a] +'</h6><h6 class="col-6"> Ordered on '+ moment(orderValues[orderIndex].orderDate, "DD/MM/YYYY").format("DD/MM/YYYY") +'</h6><h6 class="col-6">'+ orderValues[orderIndex].name +'</h6><h6 class="col-6">'+ orderValues[orderIndex].product +' x '+ orderValues[orderIndex].quantity +'</h6><h6 class="col-6">₹'+ sum([orderValues[orderIndex].price, dispatchValues[dispatchIndex].total, deliveryValues[deliveryIndex].additionalCost]) +'</h6><h6 class="col-6">Delivered on '+ moment(deliveryValues[deliveryIndex].date, "DD/MM/YYYY").format("DD/MM/YYYY") +'</h6><h6 class="col-6"></h6><h6 class="col-6">'+ orderValues[orderIndex].seller +'</h6></div></div>';
          fetchIDs();
        }
      }
      else if (refillValues.some(refill => refill.key == orderArray[a]) == false) {

        entries.push({key: orderArray[a], uniqueID: orderValues[orderIndex].userID, quantity: orderValues[orderIndex].product, price: sum([orderValues[orderIndex].price, dispatchValues[dispatchIndex].total, deliveryValues[deliveryIndex].additionalCost]), type: "user"});
        document.getElementById("deliveryDatabase").innerHTML += '<div id="'+ orderArray[a] +'" class="card mt-2 col-lg-4 col-sm-4 p-2" data-bs-toggle="modal" data-bs-target="#productFillModal"><div class="row"><h6 class="col-6 orderUID" id='+ orderArray[a] +'>'+ orderArray[a] +'</h6><h6 class="col-6"> Ordered on '+ moment(orderValues[orderIndex].orderDate, "DD/MM/YYYY").format("DD/MM/YYYY") +'</h6><h6 class="col-6">'+ orderValues[orderIndex].name +'</h6><h6 class="col-6">'+ orderValues[orderIndex].product +' x '+ orderValues[orderIndex].quantity +'</h6><h6 class="col-6">₹'+ sum([orderValues[orderIndex].price, dispatchValues[dispatchIndex].total, deliveryValues[deliveryIndex].additionalCost]) +'</h6><h6 class="col-6">Delivered on '+ moment(deliveryValues[deliveryIndex].date, "DD/MM/YYYY").format("DD/MM/YYYY") +'</h6><h6 class="col-6"></h6><h6 class="col-6">'+ orderValues[orderIndex].seller +'</h6></div></div>';
        fetchIDs();
      }
    }
    loader = true;
  }, 2400);
}

function fetchIDs() {

  $('div .card').click(function() {

    orderUID = $(this).attr('id');
    if (entries.find(entry => entry.key == orderUID).type == "user") {

      document.getElementById('refillOrderID').value = orderUID;
      document.getElementById('refillUserID').value = entries.find(entry => entry.key == orderUID).uniqueID;
      if (entries.find(entry => entry.key == orderUID).quantity == "Almonds(100g)") {

        document.getElementById('refillQuantity').value = "100 Grams";
      } else if (entries.find(entry => entry.key == orderUID).quantity == "Almonds(200g)") {

        document.getElementById('refillQuantity').value = "200 Grams";
      } else if (entries.find(entry => entry.key == orderUID).quantity == "Almonds(500g)") {

        document.getElementById('refillQuantity').value = "500 Grams";
      }
      document.getElementById('refillPrice').value = entries.find(entry => entry.key == orderUID).price;

    } else if (entries.find(entry => entry.key == orderUID).type == "non-user") {

      document.getElementById('counterOrderID').value = orderUID;
      document.getElementById('counterName').value = entries.find(entry => entry.key == orderUID).name;
      document.getElementById('counterProduct').value = entries.find(entry => entry.key == orderUID).product;
      document.getElementById('counterQuantity').value = entries.find(entry => entry.key == orderUID).quantity;
      document.getElementById('counterPrice').value = entries.find(entry => entry.key == orderUID).price;
      document.getElementById('counterSeller').value = entries.find(entry => entry.key == orderUID).seller;
    }
  });
}

$('.custom-close').click(function() {

  location.reload();
})

function endLoader(){

  if (loader) {

    $(".preloader").css("display", "none");
    $(".orders").css("display", "block");
    clearInterval(interv);
  }
}

var interv = setInterval(endLoader, 500);
