 $(document).ready(function() {
 
 
 
 


  let database = firebase.database();

  let name = "";







  $(".submitName").on("click", function () {
    event.preventDefault();

    name = $("#userName").val().trim();

    database.ref().once("value", function(snapshot) {
        if (snapshot.child("players").exists() == false) {
            database.ref().set({
                players :{
                    one : {
                        name : name,
                        wins: 0,
                        losses: 0,
                    }
                }
            })
        } else {
            database.ref('players/').update({
                    two : {
                        name: name,
                        wins: 0,
                        losses: 0,
                    }
                })
             
        }


    });


    $("#userName").val("");


    $("#userName").detach();
    $(".submitName").detach();

  });

  database.ref('players/one').on("value", function(snapshot) {
    $("#playerOneName").text(snapshot.val().name);
  }, function(errorObject) {
    console.log(errorObject.code);
  
  })

  database.ref('players/two').on("value", function(snapshot) {
      $("#playerTwoName").text(snapshot.val().name);
  }, function(errorObject) {
      console.log(errorObject.code);
  })




 });