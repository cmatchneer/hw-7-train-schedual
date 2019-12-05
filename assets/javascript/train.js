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

        if (theTrain.length > 0) {
            firstTrainLetter = theTrain.charAt(0);
            firstTrainLetterCap = theTrain.charAt(0).toUpperCase();
            theTrain = theTrain.replace(firstTrainLetter, firstTrainLetterCap);
            for (var i = 0; i < theTrain.length; i++) {
                if (theTrain.charAt(i) === " ") {
                    trainLetter = theTrain.charAt(i + 1);
                    trainLetterCap = theTrain.charAt(i + 1).toUpperCase();
                    theTrain = theTrain.replace(trainLetter, trainLetterCap);
                    console.log(trainLetterCap);
                }
            }
        }
        if (theLocation.length > 0) {

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