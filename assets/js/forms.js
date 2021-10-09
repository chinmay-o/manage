

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
      $(".error-message-user").css("display", "block");
      fadeOut(".error-message-user");
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
      $('#userHistory')[0].reset();
      fadeOut(".success-message-history");
    },
    error: function(err) {
      $(".error-message-history").css("display", "block");
      fadeOut(".error-message-history");
    }
  })
})

$("#nonUserHistory").submit((e) => {
  e.preventDefault()
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbyzeJNQ2xMb-3s8KxWW1kyxktY92qe4oFB0AyKw/exec",
    data: $("#nonUserHistory").serialize(),
    type: "POST",
    success: function(response) {
      $(".success-message-non").css("display", "block");
      $('#nonUserHistory')[0].reset();
      fadeOut(".success-message-non");
    },
    error: function(err) {
      $(".error-message-non").css("display", "block");
      fadeOut(".error-message-non");
    }
  })
})

$("#userRefill").submit((e) => {
  e.preventDefault()
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbymUOCpG7EjAvGPW_uGFolceBVLfQmrUoRVS2z6sw/exec",
    data: $("#userRefill").serialize(),
    type: "POST",
    success: function(response) {
      $(".success-message-history").css("display", "block");
      $('#userRefill')[0].reset();
      fadeOut(".success-message-history");
    },
    error: function(err) {
      $(".error-message-history").css("display", "block");
      fadeOut(".error-message-history");
    }
  })
})

$("#userbaseRefill").submit((e) => {
  e.preventDefault()
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbymUOCpG7EjAvGPW_uGFolceBVLfQmrUoRVS2z6sw/exec",
    data: $("#userbaseRefill").serialize(),
    type: "POST",
    success: function(response) {
      $(".success-message-history").css("display", "block");
      $('#userbaseRefill')[0].reset();
      fadeOut(".success-message-history");
    },
    error: function(err) {
      $(".error-message-history").css("display", "block");
      fadeOut(".error-message-history");
    }
  })
})

function fadeOut(className) {
  setTimeout(function(){
    $(className).remove();
  }, 6000);
}
