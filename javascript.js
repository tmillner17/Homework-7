  "use strict";
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBnHKlI0OUvomzYhu1RkDhpYd9ieEJIJjc",
    authDomain: "homework-7-1cdcf.firebaseapp.com",
    databaseURL: "https://homework-7-1cdcf.firebaseio.com",
    projectId: "homework-7-1cdcf",
    storageBucket: "",
    messagingSenderId: "346154671288",
    appId: "1:346154671288:web:064a5d03dbbbe584"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let trainData = firebase.database();

$('#button').on('click', function(event) {
    event.preventDefault();
    let trainName = $('#train-name').val().trim();
    let destination = $('#train-destination').val().trim();
    let firstTrain = $('#train-time').val().trim();
    let frequency = $('#train-frequency').val().trim();

    let newTrain = {
        name: trainName, 
        destination: destination,
        firstTrain: firstTrain, 
        frequency: frequency,
    };

    trainData.ref().push(newTrain);

    console.log(newTrain.name)
    console.log(newTrain.destination)
    console.log(newTrain.firstTrain)
    console.log(newTrain.frequency)

    alert('Your Train Has Been Added!')

    $('#train-name').val("");
    $("train-destination").val("");
    $("train-time").val("");
    $("train-frequency").val("");    
    
})

trainData.ref().on("child_added", function(childAdded, prevChildKey){
    console.log(childAdded.val());

    let tname = childAdded.val().name;
    let tdestination = childAdded.val().destination;
    let tfirstTrain = childAdded.val().firstTrain;
    let tFrequency = childAdded.val().frequency;
    let timeArr = tfirstTrain.split(":");
    let trainTime = moment()
        .hours(timeArr[0])
        .minutes(timeArr[1]);
    let timeMax = moment.max(moment(), trainTime);
    let tMinutes;
    let tArrival;

    if (timeMax === trainTime) {
        tArrival = rainTime.format("hh:mm");
        tMinutes = trainTime.diff(moment(), "minutes");
    } else{
        let differentTimes = moment().diff(trainTime, "minutes");
        let tRemainding = differentTimes % tFrequency;
        tMinutes = tFrequency - tRemainding;
        tArrival = moment()
        .add(tMinutes, "m")
        .format("hh:mm A")
    }
console.log("tMinutes", tMinutes)
console.log("tArrival", tArrival)

    $("#train-table > tbody").append(
        $("<tr>").append(
            $("<td>").text(tname),
            $("<td>").text(tdestination),
            $("<td>").text(tfirstTrain),
            $("<td>").text(tFrequency),
            $("<td>").text(tMinutes + " minutes")
        )
    )
})