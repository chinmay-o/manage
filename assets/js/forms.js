

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
      loadSpinner("none");
    },
    error: function(err) {
      $(".error-message-user").css("display", "block");
      fadeOut(".error-message-user");
      loadSpinner("none");
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
      loadSpinner("none");
    },
    error: function(err) {
      $(".error-message-history").css("display", "block");
      fadeOut(".error-message-history");
      loadSpinner("none");
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
      loadSpinner("none");
    },
    error: function(err) {
      $(".error-message-non").css("display", "block");
      fadeOut(".error-message-non");
      loadSpinner("none");
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
      loadSpinner("none");
    },
    error: function(err) {
      $(".error-message-history").css("display", "block");
      fadeOut(".error-message-history");
      loadSpinner("none");
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
      loadSpinner("none");
    },
    error: function(err) {
      $(".error-message-history").css("display", "block");
      fadeOut(".error-message-history");
      loadSpinner("none");
    }
  })
})

$("#factForm").submit((e) => {
  e.preventDefault()
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbxirkoZYAZaJ0jLeyOVerEvYAlugC4FdJOYWyUG/exec",
    data: $("#factForm").serialize(),
    type: "POST",
    success: function(response) {
      $(".success-message-fact").css("display", "block");
      $('#factForm')[0].reset();
      fadeOut(".success-message-fact");
      loadSpinner("none");
    },
    error: function(err) {
      $(".error-message-fact").css("display", "block");
      fadeOut(".error-message-fact");
      loadSpinner("none");
    }
  })
})

$("#orderForm").submit((e) => {
  e.preventDefault()
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbx5FjPL1FvSShLMLyaAF8yrB51LvALSl3yQVtAYZnQAYtudBFg/exec",
    data: $("#orderForm").serialize(),
    type: "POST",
    success: function(response) {
      $(".success-message-order").css("display", "block");
      $('#orderForm')[0].reset();
      fadeOut(".success-message-order");
      loadSpinner("none");
    },
    error: function(err) {
      $(".error-message-order").css("display", "block");
      fadeOut(".error-message-order");
      loadSpinner("none");
    }
  })
})

$("#dispatchForm").submit((e) => {
  e.preventDefault()
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbyG1UE4UbHzb0o46Zv2lak_1JtAJNjj-lJkwlgq3A/exec",
    data: $("#dispatchForm").serialize(),
    type: "POST",
    success: function(response) {
      $(".success-message-dispatch").css("display", "block");
      $('#dispatchForm')[0].reset();
      fadeOut(".success-message-dispatch");
      loadSpinner("none");
    },
    error: function(err) {
      $(".error-message-dispatch").css("display", "block");
      fadeOut(".error-message-dispatch");
      loadSpinner("none");
    }
  })
})

$("#dispatchStatusForm").submit((e) => {
  e.preventDefault()
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbyR4biu3RBkdol8ioEInwT7vhpE9SFMxXL--6-L0Q/exec",
    data: $("#dispatchStatusForm").serialize(),
    type: "POST",
    success: function(response) {
      $(".success-message-d-status").css("display", "block");
      $('#dispatchStatusForm')[0].reset();
      fadeOut(".success-message-d-status");
      loadSpinner("none");
    },
    error: function(err) {
      $(".error-message-d-status").css("display", "block");
      fadeOut(".error-message-d-status");
      loadSpinner("none");
    }
  })
})

$("#addNewStock").submit((e) => {
  e.preventDefault()
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbzzySLJoLP7Uds3t4vF2WNjIRCj--NNHOJTexqy/exec",
    data: $("#addNewStock").serialize(),
    type: "POST",
    success: function(response) {
      $(".success-message-newStock").css("display", "block");
      $('#addNewStock')[0].reset();
      fadeOut(".success-message-newStock");
      loadSpinner("none");
    },
    error: function(err) {
      $(".error-message-newStock").css("display", "block");
      fadeOut(".error-message-newStock");
      loadSpinner("none");
    }
  })
})

$('.custom-submit').click(function() {

  loadSpinner("block");
});

function loadSpinner(attribute) {

  $(".loadingScreen").css("display", attribute);
}

function fadeOut(className) {
  setTimeout(function(){
    $(className).css("display", "none");
  }, 6000);
}
