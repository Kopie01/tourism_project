var containerEl = document.querySelector('.container');

            var mixer = mixitup(containerEl, {
                controls: {
                    toggleLogic: 'and'
                }
            });
// var places = [
// 	{
// 		name: "Nelson",
// 		visit: false,
// 		accommodation: null,
// 		nights: null
// 	},
//   {
//     name: "Kaikoura",
//     visit: false,
//     accommodation: null,
//     nights: null
//   },
//   {
//     name: "Christchurch",
//     visit: false,
//     accommodation: null,
//     nights: null
//   },
//   {
//     name: "Queenstown",
//     visit: false,
//     accommodation: null,
//     nights: null
//   },
//   {
//     name: "Wanaka",
//     visit: false,
//     accommodation: null,
//     nights: null
//   },



// ]

// Calculation

// var guests = (prompt("How many guests in total?"));
// var accom = (prompt("Which type of accommodation?"));
// var nelsonN = (prompt("How many nights will you stay in Nelson?"));
// var kaikouraN = (prompt("How many nights will you stay in Kaikoura?"));
// var christchurchN = (prompt("How many nights will you stay in Christchurch?"));
// var queenstownN = (prompt("How many nights will you stay in Queenstown?"));
// var wanakaN = (prompt("How many nights will you stay in Wanaka?"));

// alert(guests * (nelsonN + kaikouraN + christchurchN + queenstownN + wanakaN))

// var hotel = 78.50
// var motel = 45
// var hostel = 30
// var house = 60



// Map

function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: {lat: -43.147679, lng: 172.837979}
  });
  directionsDisplay.setMap(map);

  document.getElementById('submit').addEventListener('click', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var waypts = [];
  var checkboxArray = document.getElementById('waypoints');
  for (var i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray.options[i].selected) {
      waypts.push({
        location: checkboxArray[i].value,
        stopover: true
      });
    }
  }

  directionsService.route({
    origin: document.getElementById('start').value,
    destination: document.getElementById('end').value,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      var summaryPanel = document.getElementById('directions-panel');
      summaryPanel.innerHTML = '';
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
            '</b><br>';
        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      }
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

// // calculation javascript



var numberGuests= new Array();
 numberGuests["none"]=0;
 numberGuests["one"]=1;
 numberGuests["two"]=2;
 numberGuests["three"]=3;
 numberGuests["four"]=4;
 numberGuests["five"]=5;
 numberGuests["six"]=6;
 numberGuests["seven"]=7;

 var typeVenue= new Array();
 typeVenue["none"]=0;
 typeVenue["Hostel"]=30;
 typeVenue["Hotel"]=78.50;
 typeVenue["Motel"]=45;
 typeVenue["House"]=60;

 var numberNights= new Array();
 numberNights["none"]=0;
 numberNights["one"]=1;
 numberNights["two"]=2;
 numberNights["three"]=3;
 numberNights["four"]=4;
 numberNights["five"]=5;
 numberNights["six"]=6;
 numberNights["seven"]=7;
 numberNights["eight"]=8;
 numberNights["nine"]=9;
 numberNights["ten"]=10;
 numberNights["eleven"]=11;
 numberNights["twelve"]=12;
 numberNights["thirteen"]=13;
 numberNights["fourteen"]=14;
 numberNights["fifteen"]=15;
 

//This function finds the filling price based on the 
//drop down selection
function getNumberNightsNelson()
{
    var nightNumbers=0;
    //reference to the form id="totalCost"
    var theForm = document.forms["totalCost"];
    //reference to the select id="nelsonNights"
     var selectedNumber = theForm.elements["nelsonNights"];
     
    //set guest number equal to value user chose
    //For example numberNights["five".value] would be equal to 5
    nightNumbers = numberNights[selectedNumber.value];

    //return nightNumbers
    return nightNumbers;
}

//This function finds the filling price based on the 
//drop down selection
function getGuestNumbers()
{
    var guestNumbers=0;
    //reference to the form id="guests"
    var theForm = document.forms["totalCost"];
    //reference to the select id="number"
     var selectedNumber = theForm.elements["number"];
     
    //set guest number equal to value user chose
    //For example numberGuests["five".value] would be equal to 5
    guestNumbers = numberGuests[selectedNumber.value];

    //return guestNumbers
    return guestNumbers;
}

//This function finds the filling price based on the 
//drop down selection
function getVenueType()
{
    var venueType=0;
    //reference to the form id="venue"
    var theForm = document.forms["totalCost"];
    //reference to the select id="venue"
     var selectedVenue = theForm.elements["venue"];
     
    //set guest number equal to value user chose
    //For example numberGuests["five".value] would be equal to 5
    venueType = typeVenue[selectedVenue.value];

    //return venueType
    return venueType;
}
        
function calculateTotal()
{
    //get the total price by calling the functions
    var accomPrice =  getGuestNumbers() * getVenueType() * (getNumberNightsNelson());
    
    //display the result
    var total = document.getElementById('totalPrice');
    total.style.display='block';
    total.innerHTML = "Your total cost for accommodation is $"+accomPrice;

}





// Single code for buttons but unable to toggle back

// $(".buttonlo").click(function(){
//   if(nelsonList === false){
// 	var value = $(this).text().toLowerCase();
// 	$("#"+value+"Panel").show();
// 	$(this).css("background-color","#F8C113");
// 	nelsonList = true;
// }else if (nelsonlist === true){
//   var value = $(this).text().toLowerCase();
//   $("#"+value+"Panel").hide();
// }
// });

// })

var nelsonflag = false;
var kaikouraflag = false;
var christchurchflag = false;
var queenstownflag = false;
var wanakaflag = false;

$("#nelsonbutton").click(function(){
  var nelsonlist = document.getElementById("nelsonPanel");
	if (nelsonflag === false) {
		$(nelsonlist).show();
		$("#nelsonbutton").css("background-color","#F8C113");
		nelsonflag = true;
  }else{
    $(nelsonlist).hide();
    $("#nelsonbutton").css("background-color","#0091f9");
    nelsonflag = false;
  }
})

$("#kaikourabutton").click(function(){
  var kaikouralist = document.getElementById("kaikouraPanel");
  if (kaikouraflag === false) {
    $(kaikouralist).show();
    $("#kaikourabutton").css("background-color","#F8C113");
    kaikouraflag = true;
  }else{
    $(kaikouralist).hide();
    $("#kaikourabutton").css("background-color","#0091f9");
    kaikouraflag = false;
  }
})

$("#christchurchbutton").click(function(){
  var christchurchlist = document.getElementById("christchurchPanel");
  if (christchurchflag === false) {
    $(christchurchlist).show();
    $("#christchurchbutton").css("background-color","#F8C113");
    christchurchflag = true;
  }else{
    $(christchurchlist).hide();
    $("#christchurchbutton").css("background-color","#0091f9");
    christchurchflag = false;
  }
})

$("#queenstownbutton").click(function(){
  var queenstownlist = document.getElementById("queenstownPanel");
  if (queenstownflag === false) {
    $(queenstownlist).show();
    $("#queenstownbutton").css("background-color","#F8C113");
    queenstownflag = true;
  }else{
    $(queenstownlist).hide();
    $("#queenstownbutton").css("background-color","#0091f9");
    queenstownflag = false;
  }
})

$("#wanakabutton").click(function(){
  var wanakalist = document.getElementById("wanakaPanel");
  if (wanakaflag === false) {
    $(wanakalist).show();
    $("#wanakabutton").css("background-color","#F8C113");
    wanakaflag = true;
  }else{
    $(wanakalist).hide();
    $("#wanakabutton").css("background-color","#0091f9");
    wanakaflag = false;
  }
})
















