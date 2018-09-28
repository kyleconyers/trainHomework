

  var config = {
    apiKey: "AIzaSyCY6KU--P4eMF3tm24HAHSIz-BRi556NEA",
    authDomain: "traintimesuw.firebaseapp.com",
    databaseURL: "https://traintimesuw.firebaseio.com",
    projectId: "traintimesuw",
    storageBucket: "traintimesuw.appspot.com",
    messagingSenderId: "639509713558"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var name;
  var role;
  var startDate;
  var monthlyRate;
  var monthsWorked;
  var totalBilled;
  var now = moment().format("YYYYMMDD");

  var trainData={
    name:
    "",
    destination:
    "",
    frequency:
    "",
    firstDeparture:
    "",

  }

  $("#submit-button").on("click", function (){
        event.preventDefault();
        trainData.name = $("#trainName").val().trim();
        trainData.destination = $("#destination").val().trim();
        trainData.frequency = $("#frequency").val();
        trainData.firstDeparture = $("#firstDeparture").val().trim();
        database.ref().push(trainData)
        // console.log(trainData)
        trainData={
            name:
            "",
            destination:
            "",
            frequency:
            "",
            firstDeparture:
            "",}
  })

  function calmonthsworked(date){
    var duration = Math.floor(moment(now).diff(moment(date), "months"));
    return duration;
  }

  function editData(){
    var spans = document.getElementsByTagName("td"),
    index,
    span;

    for (index = 0; index < spans.length; ++index) {
    span = spans[index];
    if (span.contentEditable) {
        span.onblur = function() {
            var text = this.innerHTML;
            text = text.replace(/&/g, "&amp").replace(/</g, "&lt;");
            console.log("Content committed, span " +
                    (this.id || "anonymous") +
                    ": '" +
                    text + "'");
        };
    }
}
  }



  database.ref().on("child_added", function(data){
    //   console.log(data.val())
    //   display(data);
  })

  
$(document).on("click",".delete-button", function(){
    var thisKey = $(this).attr("data-key");
    database.ref().child(thisKey).remove();
    $("#" + thisKey).remove();
})

database.ref().once("value")
.then(function(snapshot){
    // console.log(snapshot.val())
    snapshot.forEach(function(train){
        var trainEl = buildTrainHtml(train.val())

        // console.log(trainEl)
        $("#add-articles-here").append(trainEl)
    })
})

function buildTrainHtml(trainData){
    // console.log(trainData)
    var nextArrivalTime = 
    calculateNextArrival(trainData.firstDeparture, trainData.frequency)
    
    calculateMinutesAway(nextArrivalTime)
    
    var row = $("<tr>")
    var name = $("<td>").text(trainData.name)
    var destination = $("<td>").text(trainData.destination)
    var frequency = $("<td>").text(trainData.frequency)

    var nextArrival = $("<td>").text(nextArrivalTime)
    var minutesAway = null

    row.append(name, destination, frequency, nextArrival, minutesAway)
    return row
}

function calculateNextArrival(firstDeparture, frequency){
    var currentTime = moment.now()
    var departure = moment(firstDeparture, "HH:mm")
    console.log(currentTime, departure)
    if(departure.isAfter(currentTime)){
        return firstDeparture
    }console.log("beginloop")
    while(departure.isBefore(currentTime)){
        departure.add(frequency, "m")
    }
    console.log(departure.format("HH:mm"))
    return departure.format("HH:mm")
}  

function calculateMinutesAway(nextArrivalTime){
    var currentTime = moment.now()
    // var nextArrival = moment(nextArrivalTime, "HH:mm")
    // var duration = nextArrival.duration(currentTime, "minutes")
    // .log(duration)
}
 

// 1. build HTML element for trainData
// get first departure, get current time, frequency
// if(firstDeparture > currnetTime){
//     return(firstDeparture)
// }
// while departure is beofre currentTime, departure = departure+frequency
// departure = nextArrival



// 1.1 store name, destination, frequency, 
// 1.2 calculate next arrival
// 1.3 calculate minutes away
// 1.4 append element to dom