var containerEl = document.querySelector('.container');

            var mixer = mixitup(containerEl, {
                controls: {
                    toggleLogic: 'and'
                }
            });




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

 var typeVenue= new Array();
 typeVenue["none"]=0;
 typeVenue["Hostel"]=30;
 typeVenue["Hotel"]=78.50;
 typeVenue["Motel"]=45;
 typeVenue["House"]=60;


 var numberN= new Array();
 numberN["none"]=0;
 numberN["one"]=1;
 numberN["two"]=2;
 numberN["three"]=3;
 numberN["four"]=4;
 numberN["five"]=5;
 numberN["six"]=6;
 numberN["seven"]=7;
 numberN["eight"]=8;
 numberN["nine"]=9;
 numberN["ten"]=10;
 numberN["eleven"]=11;
 numberN["twelve"]=12;
 numberN["thirteen"]=13;
 numberN["fourteen"]=14;
 numberN["fifteen"]=15;
 
//This function finds the number of nights based on the 
//drop down selection
function getNumber(name)
{
    var nightNumbers=0;
    //reference to the form id="totalCost"
    var theForm = document.forms["totalCost"];
    //reference to the select id="nelsonNights"
     var selectedNumber = theForm.elements[name + "Nights"];
     
    //set guest number equal to value user chose
    //For example numberN["five".value] would be equal to 5
    nightNumbers = numberN[selectedNumber.value];

    //return nightNumbers
    return nightNumbers;
}


//This function finds the number of guests based on the 
//drop down selection
function getGuestNumbers()
{
    var guestNumbers=0;
    //reference to the form id="guests"
    var theForm = document.forms["totalCost"];
    //reference to the select id="number"
     var selectedNumber = theForm.elements["number"];
     
    //set guest number equal to value user chose
    //For example numberN["five".value] would be equal to 5
    guestNumbers = numberN[selectedNumber.value];

    //return guestNumbers
    return guestNumbers;
}

//This function finds the type of venue based on the 
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
    var accomPrice =  getGuestNumbers() * getVenueType() * (getNumber("nelson") + getNumber("kaikoura") + getNumber("christchurch") + getNumber("queenstown") + getNumber("wanaka")) ;
    
    //display the result
    var total = document.getElementById('totalPrice');
    total.style.display='block';
    total.innerHTML = "Your total cost for accommodation is $"+accomPrice;

}


function showPanel(option){
  console.log(option.value);

  var s = option.value;
  var n = s.indexOf(",");
  s = s.substring(0, n != -1 ? n : s.length);
  s = s.toLowerCase();
  // if (nelsonflag === false) {
  // selectPlace.show();
  $("#"+s+"Panel").show();
    
}






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
















