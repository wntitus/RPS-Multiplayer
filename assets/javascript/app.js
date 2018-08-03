 $(document).ready(function() {
 
 
    let database = firebase.database();

    let name = "";

    let pOneRock = $("<button type = 'button' class = 'oneRock'>");
    $(pOneRock).text("ROCK");
    let pOnePaper = $("<button type = 'button' class = 'onePaper'>");
    $(pOnePaper).text("PAPER");
    let pOneScissors = $("<button type = 'button' class = 'oneScissors'>");
    $(pOneScissors).text("SCISSORS");

    let oneWins = 0;
    let twoWins = 0;
    let oneLosses = 0;
    let twoLosses = 0;

    let playerOneWin = false;
    let playerTwoWin = false;

    let pTwoRock = $("<button type = 'button' class = 'twoRock'>");
    $(pTwoRock).text("ROCK");
    let pTwoPaper = $("<button type = 'button' class = 'twoPaper'>");
    $(pTwoPaper).text("PAPER");
    let pTwoScissors = $("<button type = 'button' class = 'twoScissors'>");
    $(pTwoScissors).text("SCISSORS");

    let playersFull = false;
    let gameComplete = false;

    database.ref("turn/").remove();
    $(".middleBox").append("<h3 id = 'oneWaiting'>");
    $("#oneWaiting").text("Waiting for Player One...")
    $(".middleBox").append("<h3 id = 'twoWaiting'>");
    $("#twoWaiting").text("Waiting for Player Two...");


// WARNING!!!!! EXTREMELY WET CODE BELOW. WATCH YOUR STEP.

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
                    $(".playerTwoBox").append(pTwoRock);
                    $(".playerTwoBox").append(pTwoPaper);
                    $(".playerTwoBox").append(pTwoScissors);
                    database.ref("players/2/").onDisconnect().remove();
                
            }



        });

        $("form").detach();

    });
    database.ref("players/1/name").on("value", function(snap) {
        $("#playerOneName").text(snap.val());
    });
    database.ref("players/1/wins").on("value", function(snap) {
        $("#playerOneWins").text(snap.val());
    })
    database.ref("players/1/losses").on("value", function(snap) {
        $("#playerOneLosses").text(snap.val());
    })
    database.ref("players/2/name").on("value", function(snap) {
        $("#playerTwoName").text(snap.val());
    });
    database.ref("players/2/wins").on("value", function(snap) {
        $("#playerTwoWins").text(snap.val());
    })
    database.ref("players/2/losses").on("value", function(snap) {
        $("#playerTwoLosses").text(snap.val());
    })

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
        if (snapshot.child("1/").exists() && snapshot.child("2/").exists() && playersFull === false) {
            database.ref().update({
                turn: 1,
            })
            playersFull = true;
            console.log("player one first turn");
            $(pOneRock).css("display", "inline-block");
            $(pOnePaper).css("display", "inline-block");


            
            database.ref("turn/").once("value", function(snap) {
                if (snap.val() == 1) {
                    $(pOneScissors).css("display", "inline-block");
                    $("#oneWaiting").css("display", "inline-block");
                    $(".oneRock").on("click", function() {
                        database.ref("players/1").update({
                            choice : "rock",
                        })
                        database.ref().update({
                            turn : 2,
                        })
                        $(pOneRock).css("display", "none");
                        $(pOnePaper).css("display", "none");
                        $(pOneScissors).css("display", "none");

                    })
                    $(".onePaper").on("click", function() {
                        database.ref("players/1").update({
                            choice : "paper",
                        })
                        database.ref().update({
                            turn : 2,
                        })
                        $(pOneRock).css("display", "none");
                        $(pOnePaper).css("display", "none");
                        $(pOneScissors).css("display", "none");

                    })
                    $(".oneScissors").on("click", function() {
                        database.ref("players/1").update({
                            choice : "scissors",
                        })
                        database.ref().update({
                            turn : 2,
                        })
                        $(pOneRock).css("display", "none");
                        $(pOnePaper).css("display", "none");
                        $(pOneScissors).css("display", "none");

                    })
                }
            })
        }
        database.ref("turn/").on("value", function(snap) {
            if (snap.val() == 2) {
                $(pTwoRock).css("display", "inline-block");
                $(pTwoPaper).css("display", "inline-block");
                $(pTwoScissors).css("display", "inline-block");
                $("#oneWaiting").detach();
                $("#twoWaiting").css("display", "inline-block");

                $(".twoRock").on("click", function() {
                    database.ref("players/2").update({
                        choice : "rock",
                    })
                    database.ref().update({
                        turn : 3,
                    })
                    $(pTwoRock).css("display", "none");
                    $(pTwoPaper).css("display", "none");
                    $(pTwoScissors).css("display", "none");
                })

                $(".twoPaper").on("click", function() {
                    database.ref("players/2").update({
                        choice : "paper",
                    })
                    database.ref().update({
                        turn : 3,
                    })
                    $(pTwoRock).css("display", "none");
                    $(pTwoPaper).css("display", "none");
                    $(pTwoScissors).css("display", "none");
                })

                $(".twoScissors").on("click", function() {
                    database.ref("players/2").update({
                        choice : "scissors",
                    })
                    database.ref().update({
                        turn : 3,
                    })
                    $(pTwoRock).css("display", "none");
                    $(pTwoPaper).css("display", "none");
                    $(pTwoScissors).css("display", "none");
                })
            }
        })

        database.ref("turn/").on("value", function(snap) {
            if (snap.val() == 3 && gameComplete === false) {
                $("#twoWaiting").detach();
                database.ref("players/").once("value", function(snap) {
                    if (snap.child("1/choice").val() === "rock" && snap.child("2/choice").val() === "scissors") {
                        console.log("PLAYER ONE WINS");
                        oneWins += 1;
                        twoLosses += 1;
                        gameComplete = true;
                        playerOneWin = true;
                        $("#oneWin").css("display", "inline-block");
                    } else if (snap.child("1/choice").val() === "rock" && snap.child("2/choice").val() === "paper") {
                        console.log("PLAYER TWO WINS");
                        twoWins += 1;
                        oneLosses += 1;
                        gameComplete = true;
                        playerTwoWin = true;
                        $("#twoWin").css("display", "inline-block");
                    } else if (snap.child("1/choice").val() === "rock" && snap.child("2/choice").val() === "rock") {
                        console.log("TIE");
                        gameComplete = true;
                        $("#tie").css("display", "inline-block");
                    } else if (snap.child("1/choice").val() === "paper" && snap.child("2/choice").val() === "scissors") {
                        console.log("PLAYER TWO WINS");
                        twoWins += 1;
                        oneLosses += 1;
                        gameComplete = true;
                        playerTwoWin = true;
                        $("#twoWin").css("display", "inline-block");
                    } else if (snap.child("1/choice").val() === "paper" && snap.child("2/choice").val() === "paper") {
                        console.log("TIE");
                        gameComplete = true;
                        $("#tie").css("display", "inline-block");
                    } else if (snap.child("1/choice").val() === "paper" && snap.child("2/choice").val() === "rock") {
                        console.log("PLAYER ONE WINS");
                        oneWins += 1;
                        twoLosses += 1;
                        gameComplete = true;
                        playerOneWin = true;
                        $("#oneWin").css("display", "inline-block");
                    } else if (snap.child("1/choice").val() === "scissors" && snap.child("2/choice").val() === "scissors") {
                        console.log("TIE");
                        gameComplete = true;
                        $("#tie").css("display", "inline-block");
                    } else if (snap.child("1/choice").val() === "scissors" && snap.child("2/choice").val() === "paper") {
                        console.log("PLAYER ONE WINS");
                        oneWins += 1;
                        twoLosses += 1;
                        gameComplete = true;
                        playerOneWin = true;
                        $("#oneWin").css("display", "inline-block");
                    } else if (snap.child("1/choice").val() === "scissors" && snap.child("2/choice").val() === "rock") {
                        console.log("PLAYER TWO WINS");
                        twoWins += 1;
                        oneLosses += 1;
                        gameComplete = true;
                        playerTwoWin = true;
                        $("#twoWin").css("display", "inline-block");
                    }
                })
            }
            if (playerOneWin === true) {
                database.ref("players/1").update({
                    wins : oneWins,
                })
                database.ref("players/2").update({
                    losses : twoLosses,
                })
                playerOneWin = false;

            } else if (playerTwoWin === true) {
                database.ref("players/2").update({
                    wins : twoWins,
                })
                database.ref("players/1").update({
                    losses : oneLosses,
                })
            }
        })
    })









 });