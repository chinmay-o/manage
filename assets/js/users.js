let data = null;
let join = [];
let uidno = [];
let user = [];
var gender = [];
var seller = [];
var sub = [];
var index = false;
var url = "https://sheets.googleapis.com/v4/spreadsheets/1NiVS-pqDY44ErWGiyaRQaxBDurUa96b33Tm7r9-P1yA/values/responses?key="
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

  document.getElementById("userStat").innerHTML = '<div class="row text-center"><div class="col-6"><h6>Subscribed</h6><h1>' + userbaseStat()[0] + '</h1></div><div class="col-6"><h6>Unsubscribed</h6><h1>' + userbaseStat()[1] + '</h1></div></div>'

  for (var a = 0; a < uidno.length; a++) {

    if (sub[a] == "Subscribed") {

      document.getElementById("userbase").innerHTML += '<div class="card mt-2 col-lg-4 col-sm-4 p-2" id="' + uidno[a] + '" data-bs-toggle="modal" data-bs-target="#userRefillModal"><div class="row"><h6 class="col-6">' + join[a] + '</h6><h6 class="col-6">Seller: ' + seller[a] + '</h6></div><h4 class="userDetails">' + user[a] + '</h4><div class="row"><div class="col-6"><span class="getUID">' + uidno[a] + '</span></div><div class="col-6">' + gender[a] + '</div></div></div>';
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

var interv = setInterval(endLoader, 500);