
var trainData = new Firebase("https://hw-7.firebaseio.com/");

$("#addTrainButton").on("click",function(){

	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();

	var firstTrainTime = $("#firstTimeInput").val().trim();
	firstTrainTime = moment(firstTrainTime, "HH:mm").format("HH:mm");

	var frequency = parseInt($("#frequencyInput").val().trim());

	console.log("Train Name: " + trainName);
	console.log("Destination: "+ destination);
	console.log("Frequency: "+ frequency);
	console.log(firstTrainTime);

	var newTrain = {
		trainName: trainName,
		destination: destination,
		frequency: frequency,
		start: firstTrainTime
	}

	trainData.push(newTrain);

	return false;
});


trainData.on("child_added", function(childSnapshot, prevChildKey){
	console.log(childSnapshot.val());

	var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var frequency = childSnapshot.val().frequency;
	var start = childSnapshot.val().start;

	var firstMoment = moment(start, "HH:mm").subtract(1,"years");

	var differenceTime = moment().diff(moment(firstMoment), "minutes");

	var timeRemaining = differenceTime % frequency;

	var timeOfNext = frequency - timeRemaining;

	var nextTrainTime = moment().add(timeOfNext,"minutes");

    $("#scheduleTable > tbody").append("<tr><td>" + trainName + "</td><td>" +
destination + "</td><td>" + frequency + "</td><td>" + moment(nextTrainTime).format("HH:mm") + "</td><td>"
+ timeOfNext + "</td></tr>");

})


