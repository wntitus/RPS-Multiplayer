 $(document).ready(function() {
 
 
    let database = firebase.database();

    let name = "";


    let rockBtn = $("<button type = 'button' class = 'rockBtn'>");
    let paperBtn = $("<button type = 'button' class = 'paperBtn'>");
    let scissorsBtn = $("<button type = 'button' class = 'scissorsBtn'>");

    let playersFull = false;


    $(".submitName").on("click", function () {
        event.preventDefault();

        name = $("#userName").val().trim();


        database.ref().once("value", function(snapshot) {
            if (snapshot.child("players/one/").exists() == false) {
                database.ref('players/').update({
                        one : {
                            name : name,
                            wins: 0,
                            losses: 0,
                        }
                })
                database.ref("players/one/").onDisconnect().remove();
            } else {
                database.ref('players/').update({
                        two : {
                            name: name,
                            wins: 0,
                            losses: 0,
                        }
                    })
                    database.ref("players/two/").onDisconnect().remove();
                
            }

        });

        $("form").detach();

    });
    database.ref("players/one/name").on("value", function(snap) {
        $("#playerOneName").text(snap.val());
    })
    database.ref("players/one/wins").on("value", function(snap) {
        $("#playerOneWins").text(snap.val());
    })
    database.ref("players/one/losses").on("value", function(snap) {
        $("#playerOneLosses").text(snap.val());
    })
    database.ref("players/two/name").on("value", function(snap) {
        $("#playerTwoName").text(snap.val());
    })
    database.ref("players/two/wins").on("value", function(snap) {
        $("#playerTwoWins").text(snap.val());
    })
    database.ref("players/two/losses").on("value", function(snap) {
        $("#playerTwoLosses").text(snap.val());
    })

    database.ref().on("value", function(snapshot) {
        if (snapshot.child("players/one/").exists() && snapshot.child("players/two/").exists()) {
            database.ref().update({
                turn : 1,
            })
            playersFull = true;
            console.log(playersFull);
        }
        if (snapshot.child("players/one/").exists() == false && snapshot.child("players/two/").exists() == false) {
            $("#playerOneName").text("Waiting for Player One");
            $("#playerTwoName").text("Waiting for Player Two");
        }

    })








 });