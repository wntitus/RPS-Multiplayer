 $(document).ready(function() {
 
 
    let database = firebase.database();

    let name = "";

    let playerOneName = "";
    let playerTwoName = "";


    let pOneRock = $("<button type = 'button' class = 'oneRock'>ROCK");
    let pOnePaper = $("<button type = 'button' class = 'onePaper'>PAPER");
    let pOneScissors = $("<button type = 'button' class = 'oneScissors'>SCISSORS");

    let playersFull = false;

    let connectedRef = database.ref(".info/connected");


    $(".submitName").on("click", function () {
        event.preventDefault();

        name = $("#userName").val().trim();

        database.ref().once("value", function(snapshot) {
            if (snapshot.child("players/1/").exists() == false) {
                database.ref('players/').update({
                        1 : {
                            name : name,
                            wins: 0,
                            losses: 0,
                        }
                })
                playerOneName = name;

                $(".playerOneBox").append(pOneRock);
                $(".playerOneBox").append(pOnePaper);
                $(".playerOneBox").append(pOneScissors);
                database.ref("players/1/").onDisconnect().remove();
            } else {
                database.ref('players/').update({
                        2 : {
                            name: name,
                            wins: 0,
                            losses: 0,
                        }
                    })
                    playerTwoName = name;
                    database.ref("players/2/").onDisconnect().remove();
                
            }



        });

        $("form").detach();

    });
    database.ref("players/1/name").on("value", function(snap) {
        $("#playerOneName").text(snap.val());
    });
    // database.ref("players/1/wins").on("value", function(snap) {
    //     $("#playerOneWins").text(snap.val());
    // })
    // database.ref("players/1/losses").on("value", function(snap) {
    //     $("#playerOneLosses").text(snap.val());
    // })
    database.ref("players/2/name").on("value", function(snap) {
        $("#playerTwoName").text(snap.val());
    });
    // database.ref("players/2/wins").on("value", function(snap) {
    //     $("#playerTwoWins").text(snap.val());
    // })
    // database.ref("players/2/losses").on("value", function(snap) {
    //     $("#playerTwoLosses").text(snap.val());
    // })

    database.ref().on("value", function(snapshot) {
        if (snapshot.child("players/1/").exists() == false && snapshot.child("players/2/").exists() == false) {
            $("#playerOneName").text("Waiting for Player One");
            $("#playerTwoName").text("Waiting for Player Two");
        } else if (snapshot.child("players/1/").exists() && snapshot.child("players/2/").exists() == false) {
            $("#playerTwoName").text("Waiting for Player Two");
        } else if (snapshot.child("players/1/").exists() == false && snapshot.child("players/2/").exists()) {
            $("#playerOneName").text("Waiting for Player One");
        };
    })

    database.ref("players/").on("value", function(snapshot) {
        if (snapshot.child("1/").exists() && snapshot.child("2/").exists()) {
            database.ref().update({
                turn: 1,
            })
            console.log("player one first turn");
            $(pOneRock).css("display", "inline-block");
            $(pOnePaper).css("display", "inline-block");
            $(pOneScissors).css("display", "inline-block");
        }
    })









 });