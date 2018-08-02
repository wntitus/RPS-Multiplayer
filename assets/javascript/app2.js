$(document).ready(function() {

    let database = firebase.database();

    let name = "";

    let playersRef = database.ref("/players/");
    let newPlayerRef = playersRef.push();


    $("#submitName").on("click", function() {

        event.preventDefault();

        name = $("#userName").val().trim();

        database.ref().on("value", function(snapshot) {
            if (snapshot.ref("players/one/").exists() === false) {
                newPlayerRef.update({
                    name : name,
                    wins : 0,
                    losses : 0,
                })
            }
        })










    })



})