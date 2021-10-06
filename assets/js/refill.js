let dataA = null;
let dataB = null;
let uidno = [];
let user = [];
var etr = [];
var ete = [];
var index = false;
var urlA = "https://sheets.googleapis.com/v4/spreadsheets/1vY10J4tjRwF3fa3j0pqdMNuYGwrdP78tFAiPTwwPCV4/values/responses?key="
var urlB = "https://sheets.googleapis.com/v4/spreadsheets/1NiVS-pqDY44ErWGiyaRQaxBDurUa96b33Tm7r9-P1yA/values/responses?key="
var apiKey = "AIzaSyBpaORBU9bCcAMmAbawXlxTpXr1LuAGjWw";

moment.locale('in')

fetch(urlA + apiKey).then((response) => response.json()).then((values) => {
    dataA = values;
    for (var i = 1; i < dataA.values.length; i++) {
      let repeat = 0;
      let number = dataA.values[i][1];
      let etrDate = dataA.values[i][4];
      let eteDate = dataA.values[i][6];
      for (var j = 0; j <= uidno.length; j++) {
        if (number == uidno[j]) {

          repeat += 1;
        }
      }
      if (repeat == 0) {

        uidno.push(number);
        etr.push(etrDate);
        ete.push(eteDate);
      }
    }
  });

setTimeout(function() {

  fetch(urlB + apiKey).then((response) => response.json()).then((values) => {
      dataB = values;

      for (var x = 0; x < uidno.length; x++) {

        for (var y = 1; y < dataB.values.length; y++) {

          if (uidno[x] == dataB.values[y][2]) {

            user.push(dataB.values[y][1]);
          }
        }
      }
    });
}, 1500);


setTimeout(function() {

  for (var a = 0; a < uidno.length; a++) {

    etrFormat = moment(etr[a],"DD/MM/YYYY");
    eteFormat = moment(ete[a],"DD/MM/YYYY");
    if (moment(Date.now()).isAfter(etrFormat) && moment(Date.now()).isBefore(eteFormat)) {

      document.getElementById("refillTable").innerHTML += '<div class="card mt-2 col-lg-4 col-sm-4 p-2"><h6>Estimated Refill Period:</h6><h4>' + moment(etrFormat).format("DD MMM YYYY") + " to " + moment(eteFormat).format("DD MMM YYYY") + '</h4><h6 class="userDetails">Customer Details:</h6><div class="row"><div class="col-6" id="uidnoCopy">' + uidno[a] + '</div><div class="col-6">' + user[a] + '</div></div></div>';

      index = true;
    }
  }
}, 3000);

function endLoader(){

  if (index) {

    $(".preloader").css("display", "none");
    $(".upcomingRefills").css("display", "block");
    clearInterval(interv);
  }
}

var interv = setInterval(endLoader, 500);


// <a onclick="myFunction()"><i class="fa fa-clone" aria-hidden="true"></i></a>
