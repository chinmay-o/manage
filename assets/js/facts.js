
let factData = null;
let factDate = [];
var autofillDate;

var factURL = "https://sheets.googleapis.com/v4/spreadsheets/1wV7x9oDaBEOt5oONE82T_hgxyJyXLEoS7fK98zYfWow/values/responses?key="
var apiKey = "AIzaSyBpaORBU9bCcAMmAbawXlxTpXr1LuAGjWw";

fetch(factURL + apiKey).then((response) => response.json()).then((values) => {

  factData = values;
  finalDate = moment(factData.values[factData.values.length-1][1], "DD-MM-YYYY")
  factDate.push(moment(finalDate).add(1, 'days'));
  autofillDate = factDate[0].format("DD-MM-YYYY");
  document.getElementById('factDate').value = autofillDate;
});
