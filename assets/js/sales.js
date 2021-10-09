let dataA = null;
let dataB = null;
let uidno = [];
let user = [];
let since = [];
let sales = [];
var index = false;

var urlA = "https://sheets.googleapis.com/v4/spreadsheets/1NiVS-pqDY44ErWGiyaRQaxBDurUa96b33Tm7r9-P1yA/values/responses?key="
var urlB = "https://sheets.googleapis.com/v4/spreadsheets/1vY10J4tjRwF3fa3j0pqdMNuYGwrdP78tFAiPTwwPCV4/values/responses?key="
var apiKey = "AIzaSyBpaORBU9bCcAMmAbawXlxTpXr1LuAGjWw";


fetch(urlA + apiKey).then((response) => response.json()).then((values) => {
  dataA = values;

  for (var i = 1; i < dataA.values.length; i++) {

    uidno.push(dataA.values[i][2]);
    user.push(dataA.values[i][1]);
    since.push(dataA.values[i][0]);
  }
});

fetch(urlB + apiKey).then((response) => response.json()).then((values) => {
  dataB = values;

  for (var x = 0; x < dataB.values.length; x++) {

    sales.push(dataB.values[x]);
  }
});

setTimeout(function() {

  document.getElementById("salesStat").innerHTML += totalSalesStat();

  for (var m = 0; m < uidno.length; m++) {

    var totalValue = 0;
    var totalPaid = 0;
    var refills = 0;
    for (var n = 1; n < sales.length; n++) {

      if (uidno[m] == sales[n][1]) {

        totalValue += parseInt((sales[n][2]).replace(/₹/, ""));
        if (sales[n][5] == "Paid") {

          totalPaid += parseInt((sales[n][2]).replace(/₹/, ""));
        }
        refills += 1;
      }
    }

    document.getElementById("userSalesData").innerHTML += '<div class="card salesCard mt-2 col-12 p-2" id=' + uidno[m] + ' data-bs-toggle="modal" data-bs-target="#salesDataModal"><div class="row"><div class="col-4"><h6 class="mb-3">' + uidno[m] + '</h6><h2>' + user[m] + '</h2><h6>' + refills + ' Refill</h6></div><div class="col-8"><div class="row"><div class="col-3"><h6 class="totalLeft">₹' + (totalValue-totalPaid) + '</h6></div>' + paymentProgress(totalValue, totalPaid) + '<div class="col-3"><h6 class="totalRight">₹' + totalPaid + '</h6></div></div></div></div></div>';
    fetchUID();
  }

  $(".preloader").css("display", "none");
  $(".salesData").css("display", "block");
}, 2000);


function totalSalesStat() {

  var totalAmount = 0;
  var totalPaidAmount = 0;
  for (var a = 1; a < sales.length; a++) {

    totalAmount += parseInt((sales[a][2]).replace(/₹/, ""));
    if (sales[a][5] == "Paid") {

      totalPaidAmount += parseInt((sales[a][2]).replace(/₹/, ""));
    }
  }
  return '<div class="row"><div class="col-4"><h6>Net Sale<br>Value</h6><h1>₹' + totalAmount + '</h1></div><div class="col-4"><h6>Payment Recieved</h6><h1>₹' + totalPaidAmount + '</h1></div><div class="col-4"><h6>Pending Payments</h6><h1>₹' + (totalAmount - totalPaidAmount) + '</h1></div></div>';
}

function salesRefillDetail(token) {

  $('#salesDetails').empty();
  for (var j = 0; j < sales.length; j++) {
    if (token == sales[j][1]) {

      document.getElementById("salesDetails").innerHTML += '<div class="card mt-2 col-12 p-2"><div class="row"><div class="col-3">Date:</div><div class="col-3">Quantity:</div><div class="col-3">Price:</div><div class="col-3">Payment:</div></div><div class="row"><div class="col-3">' + sales[j][0] + '</div><div class="col-3">' + sales[j][3] + '</div><div class="col-3">' + sales[j][2] + '</div><div class="col-3">' + sales[j][5] + '</div></div></div>';
    }
  }
}

function fetchUID() {

  $('div .salesCard').click(function() {
      autoFetchUID = $(this).attr('id');
      salesRefillDetail(autoFetchUID);
   });
}

function paymentProgress(amount, paid) {

  var percent = (paid/amount)*100;

  return '<div class="col-6"><div class="progress" data-percentage="' + percent + '"><span class="progress-left"><span class="progress-bar"></span></span><span class="progress-right"><span class="progress-bar"></span></span><div class="progress-value"><div>₹' + amount + '<br><span>Total Buy</span></div></div></div></div>'
}
