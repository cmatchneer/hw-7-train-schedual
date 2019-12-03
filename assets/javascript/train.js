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
        console.log("test");
        event.preventDefault();

        // Grabs user input
        var theTrain = $("#trainName").val().trim();
        var theLocation = $("#destination").val().trim();
        var theDepature = moment($("#depature").val().trim(), "hh:mm:ss").format("X");
        var theFrequency = moment($("#frequency").val().trim(), "hh:mm:ss").format("X");

        // Creates local "temporary" object
        var newTrain = {
            train: theTrain,
            place: theLocation,
            depature: theDepature,
            frequency: theFrequency
        };
        console.log(newTrain);

        // Uploads to the database
        database.ref().push(newTrain);
        console.log(newTrain.train);
        // Clears all of the text-boxes
        $("#trainName").val("");
        $("#destination").val("");
        $("#depature").val("");
        $("#frequency").val("");
    }


})