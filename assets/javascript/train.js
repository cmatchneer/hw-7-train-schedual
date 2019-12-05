$(document).ready(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyAkZKOinbfZFNseHhz_Flkn6CS1_jQV24E",
        authDomain: "matchneer-79d85.firebaseapp.com",
        databaseURL: "https://matchneer-79d85.firebaseio.com",
        projectId: "matchneer-79d85",
        storageBucket: "matchneer-79d85.appspot.com",
        messagingSenderId: "618018740933",
        appId: "1:618018740933:web:a88521e1874a4fd4292eac",
        measurementId: "G-PNVR6W0CGN"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();


    //add train button called
    $(document).on("click", "#add-train-btn", addTrain);

    function addTrain() {

        event.preventDefault();

        // Grabs user input
        var theTrain = $("#trainName").val().trim();
        var theLocation = $("#destination").val().trim();
        var theDepature = moment($("#depature").val().trim(), "HH:mm").format("hh:mm");
        var theFrequency = moment($("#frequency").val().trim(), "mm").format("mm");



        // creating a object to put into my database
        var newTrain = {
            train: theTrain,
            place: theLocation,
            depature: theDepature,
            frequency: theFrequency
        };


        // Uploads to the database
        database.ref().push(newTrain);

        // Clears all of the text-boxes
        $("#trainName").val("");
        $("#destination").val("");
        $("#depature").val("");
        $("#frequency").val("");
    }
    //this functions runs when a child is added to database
    database.ref().on("child_added", function(snapshot) {
        var theTrain = snapshot.val().train;
        var theLocation = snapshot.val().place;
        var theDepature = snapshot.val().depature;
        var theFrequency = snapshot.val().frequency;
        var firstTimeConverted = moment(theDepature, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % theFrequency;
        var tMinutesTillTrain = theFrequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        //make first letter in each word capitalized
        if (theTrain.length > 0) {
            var theTrainSplit = theTrain.toLowerCase().split(" ");
            for (var i = 0; i < theTrainSplit.length; i++) {
                theTrainSplit[i] = theTrainSplit[i].charAt(0).toUpperCase() + theTrainSplit[i].substring(1);
                theTrain = theTrainSplit.join(" ")
            }
        }
        if (theLocation.length > 0) {
            var locationSplit = theLocation.toLowerCase().split(" ");
            for (var j = 0; j < locationSplit.length; j++) {
                locationSplit[j] = locationSplit[j].charAt(0).toUpperCase() + locationSplit[j].substring(1);
                theLocation = locationSplit.join(" ");
            }
        }


        var newRow = $("<tr>").append(
            $("<td>").text(theTrain),
            $("<td>").text(theLocation),
            $("<td>").text(theFrequency),
            $("<td>").text(moment(nextTrain).format("hh:mm")),
            $("<td>").text(tMinutesTillTrain)
        );
        $("#train-table > tbody").append(newRow);


    })


})