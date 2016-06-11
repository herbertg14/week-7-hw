
// access firebase
var trainData = new Firebase("https://hw-7.firebaseio.com/");

// when add a train button is clicked 
$("#addTrainButton").on("click",function(){

	//get info from form
	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();

	var firstTrainTime = $("#firstTimeInput").val().trim();
	firstTrainTime = moment(firstTrainTime, "HH:mm").format("HH:mm");

	var frequency = parseInt($("#frequencyInput").val().trim());

	//create object
	var newTrain = {
		trainName: trainName,
		destination: destination,
		frequency: frequency,
		start: firstTrainTime
	}

	//add object to firebase
	trainData.push(newTrain);

	// reset values on form
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTimeInput").val("");
	$("#frequencyInput").val("");


	//prevent the page from refreshing
	return false;
});

//adds data to table on page from firebase when page is loaded
function loadPage(childSnapshot, prevChildKey){

	var key = childSnapshot.key();
	var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var frequency = childSnapshot.val().frequency;
	var start = childSnapshot.val().start;

	var firstMoment = moment(start, "HH:mm").subtract(1,"years");

	var differenceTime = moment().diff(moment(firstMoment), "minutes");

	var timeRemaining = differenceTime % frequency;

	var timeOfNext = frequency - timeRemaining;

	var nextTrainTime = moment().add(timeOfNext,"minutes");

    $("#scheduleTable > tbody").append("<tr id=" + key + "><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(nextTrainTime).format("LT") + "</td><td>" + timeOfNext + "</td></tr>");
}

//load data on page
trainData.on("child_added", loadPage);

//refeshes data on the table from firebase
function refresh(childSnapshot, prevChildKey){
	var key = childSnapshot.key();

	var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var frequency = childSnapshot.val().frequency;
	var start = childSnapshot.val().start;

	var firstMoment = moment(start, "HH:mm").subtract(1,"years");

	var differenceTime = moment().diff(moment(firstMoment), "minutes");

	var timeRemaining = differenceTime % frequency;

	var timeOfNext = frequency - timeRemaining;

	var nextTrainTime = moment().add(timeOfNext,"minutes");

    $("#" + key).html("<td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(nextTrainTime).format("LT") + "</td><td>" + timeOfNext + "</td></tr>");
}

//calls on refresh function
function autoRefresh() {
	trainData.on("child_added", refresh);
}

//time interval for refreshing page
setInterval('autoRefresh()', 60000);


