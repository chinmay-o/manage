let data = null;
let dataA = null;
let join = [];
let uidno = [];
let uidBase = [];
let purchase = [];
let etr = [];
let ete = [];
let user = [];
var gender = [];
var seller = [];
var sub = [];
var index = false;
var url = "https://sheets.googleapis.com/v4/spreadsheets/1NiVS-pqDY44ErWGiyaRQaxBDurUa96b33Tm7r9-P1yA/values/responses?key="
var urlA = "https://sheets.googleapis.com/v4/spreadsheets/1vY10J4tjRwF3fa3j0pqdMNuYGwrdP78tFAiPTwwPCV4/values/responses?key="
var apiKey = "AIzaSyBpaORBU9bCcAMmAbawXlxTpXr1LuAGjWw";

moment.locale('in')

fetch(url + apiKey).then((response) => response.json()).then((values) => {

  data = values;
  for (var i = 1; i < data.values.length; i++) {

    join.push(data.values[i][0]);
    uidno.push(data.values[i][2]);
    user.push(data.values[i][1]);
    gender.push(data.values[i][3]);
    seller.push(data.values[i][4]);
    sub.push(data.values[i][5]);
  }
});


setTimeout(function() {

  fetch(urlA + apiKey).then((response) => response.json()).then((values) => {
      dataA = values;
      for (var g = dataA.values.length-1; g > 0; g--) {

        let repeat = 0;
        let number = dataA.values[g][1];
        let bought = dataA.values[g][0];
        let etrDate = dataA.values[g][4];
        let eteDate = dataA.values[g][6];

        for (var j = 0; j <= uidBase.length; j++) {
          if (number == uidBase[j]) {

            repeat += 1;
          }
        }
        if (repeat == 0) {

          uidBase.push(number);
          purchase.push(bought);
          etr.push(etrDate);
          ete.push(eteDate);
        }
      }
    });

}, 2000);


setTimeout(function() {

  document.getElementById("userStat").innerHTML = '<div class="row text-center"><div class="col-6"><h6>Subscribed</h6><h1>' + userbaseStat()[0] + '</h1></div><div class="col-6"><h6>Unsubscribed</h6><h1>' + userbaseStat()[1] + '</h1></div></div>'

  for (var a = 0; a < uidno.length; a++) {

    if (sub[a] == "Subscribed") {

      document.getElementById("userbase").innerHTML += '<div class="card mt-2 col-lg-4 col-sm-4 p-2" id="' + uidno[a] + '" data-bs-toggle="modal" data-bs-target="#userRefillModal"><div class="row"><h6 class="col-6">' + join[a] + '</h6><h6 class="col-6">Seller: ' + seller[a] + '</h6></div><h4 class="userDetails">' + user[a] + '</h4><div class="row"><div class="col-6"><span class="getUID">' + uidno[a] + '</span></div><div class="col-6">' + gender[a] + '</div></div>'+ progress(uidno[a]) +'</div>';

      index = true;
      fetchUID();
    }
  }
}, 3000);

function endLoader(){

  if (index) {

    $(".preloader").css("display", "none");
    $(".userDatabase").css("display", "block");
    clearInterval(interv);
  }
}

function userbaseStat() {

  var unsub = 0;
  for (var x = 0; x < uidno.length; x++) {

    if (sub[x] == "Unsubscribed") {

      unsub += 1;
    }
  }

  return [uidno.length-unsub, unsub];
}

var autofillUID;

function fetchUID() {

  $('div .card').click(function() {

      autofillUID = $(this).attr('id');
      document.getElementById('autoUID').value = autofillUID;

   });
}

function progress(uniqueID) {

  for (var f = 0; f < uidBase.length; f++) {
    if (uidBase[f] == uniqueID) {

      var totalDays = moment(ete[f], "DD/MM/YYYY").diff(moment(purchase[f], "DD/MM/YYYY"), 'days');
      var tillDays = moment(Date.now()).diff(moment(purchase[f], "DD/MM/YYYY"), 'days');
      purchaseDate = moment(purchase[f], "DD/MM/YYYY").format("DD/MM/YYYY");
      
      var usagePer = (tillDays/totalDays) * 100;
      return '<div class="inlined"><div class="progress-meter"><div class="track"><span class="progress" style="width:' + usagePer + '%"></span></div><ol class="progress-points" data-current="3"><li class="progress-point"><span class="label">' + purchaseDate + '</span></li><li class="progress-point"><span class="label">' + etr[f] + '</span></li><li class="progress-point"><span class="label">' + ete[f] + '</span></li></ol></div></div>'
    }
  }
}

var interv = setInterval(endLoader, 500);
