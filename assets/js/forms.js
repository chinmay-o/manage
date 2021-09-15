

$("#userData").submit((e) => {
  e.preventDefault()
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbxwUUaaJnaFF4wTw-mwUdcj08-ob6D3ReJzYTxs/exec",
    data: $("#userData").serialize(),
    type: "POST",
    success: function(response) {
      $(".success-message-user").css("display", "block");
      $('#userData')[0].reset();
      fadeOut(".success-message-user");
    },
    error: function(err) {
      console.log("Failed");
    }
  })
})

$("#userHistory").submit((e) => {
  e.preventDefault()
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbymUOCpG7EjAvGPW_uGFolceBVLfQmrUoRVS2z6sw/exec",
    data: $("#userHistory").serialize(),
    type: "POST",
    success: function(response) {
      $(".success-message-history").css("display", "block");
      $('#userData')[0].reset();
      fadeOut(".success-message-history");
    },
    error: function(err) {
      console.log("Failed");
    }
  })
})
