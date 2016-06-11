
var trainData = new Firebase("https://hw-7.firebaseio.com/");

$("#addTrainButton").on("click",function(){

	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();

	var firstTrainTime = $("#firstTimeInput").val().trim();
	firstTrainTime = moment(firstTrainTime, "hh:mm").subtract(1,"years");

	var frequency = parseInt($("#frequencyInput").val().trim());

	console.log("Train Name: " + trainName);
	console.log("Destination: "+ destination);
	console.log("Frequency: "+ frequency);
	console.log(firstTrainTime);


	var nextArrival = "soon";
	var minutesAway = 10;
	var newTrain = {
		trainName: trainName,
		destination: destination,
		frequency: frequency,
		nextArrival: nextArrival,
		minutesAway: minutesAway
	}

	trainData.push(newTrain);

	return false;
});

trainData.on("child_added", function(childSnapshot, prevChildKey){
	console.log(childSnapshot.val());

	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().destination;
	var frequency = childSnapshot.val().frequency;
	var nextArrival = childSnapshot.val().nextArrival;
	var minutesAway = childSnapshot.val().minutesAway;

    $("#scheduleTable > tbody").append("<tr><td>" + trainName + "</td><td>" +
destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>"
+ minutesAway + "</td></tr>");

})


