 $(document).ready(function() {
 
 
    let database = firebase.database();

    let name = "";

    sessionStorage.setItem("playerJoined", "no");

    let joined = sessionStorage.getItem("playerJoined");

    database.ref().once("value", function(snapshot) {
        if (joined == "no" && snapshot.child("players/one/").exists() == true && snapshot.child("players/two/").exists() == true) {
            database.ref("players/one/").remove();
        } else if (joined == "no" && snapshot.child("players/two/").exists() == true) {
            database.ref("players/two/").remove();
        }
    })




    $(".submitName").on("click", function () {
        event.preventDefault();

        name = $("#userName").val().trim();

        database.ref().once("value", function(snapshot) {
            if (snapshot.child("players/one/").exists() == false) {
                database.ref().set({
                    players :{
                        one : {
                            name : name,
                            wins: 0,
                            losses: 0,
                        }
                    }
                })
                sessionStorage.setItem("playerJoined", "yes");
            } else {
                database.ref('players/').update({
                        two : {
                            name: name,
                            wins: 0,
                            losses: 0,
                        }
                    })
                    sessionStorage.setItem("playerJoined", "yes");
                
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