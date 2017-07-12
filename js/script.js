

var containerEl = document.querySelector('.container');

var mixer = mixitup(containerEl, {
    controls: {
                 toggleLogic: 'and'
                }
            });

var typeVenue= new Array();
typeVenue["none"]=0;
typeVenue["hostel"]=30;
typeVenue["hotel"]=78.50;
typeVenue["motel"]=45;
typeVenue["house"]=60;

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

//This function finds the type of venue based on the 
//drop down selection
function getVenueType(name)
{
    var venueType=0;
    var theForm = document.forms["totalCost"];
    var selectedVenue = theForm.elements[name +"Venue"];
    venueType = typeVenue[selectedVenue.value];
    return venueType;
}

//This function finds the number of guests based on the 
//drop down selection
function getGuestNumbers()
{
    var guestNumbers=0;
    var theForm = document.forms["totalCost"];
    var selectedNumber = theForm.elements["number"];
    guestNumbers = numberN[selectedNumber.value];
    return guestNumbers;
}

function calculateTotal()
{
    //get the total price by calling the functions
    var accomPrice =  getGuestNumbers() * ((getNumber("nelson") * getVenueType("nelson"))
      + (getNumber("kaikoura")* getVenueType("kaikoura"))
      + (getNumber("christchurch")* getVenueType("christchurch"))
      + (getNumber("queenstown")* getVenueType("queenstown"))
      + (getNumber("wanaka")* getVenueType("wanaka")));
      

    //display the result
    var total = document.getElementById('totalPrice');
    total.style.display='block';
    total.innerHTML = "Your total cost for accommodation is $"+accomPrice;

}


// Code to link places to map
var places = [];
var multiNames = [];
var startName;
var endName;


$("#start").change(function(){

  $("#waypoints option, #end option").each(function(){
    if($(this).attr("value") === $("#start, #end").val()){
      $(this).removeAttr("selected").hide();
    }
    else $(this).show();
  });


});

$("#waypoints").change(function(){
  var selectedOptions = $(this).val();

  $(selectedOptions).each(function(id, value){
    $("#end option[value=\""+ value +"\"").removeAttr("selected").hide();
  });
  
});



$("#submit").click(function(){
  places = [];

  var start = $("#start").val();
  places.push(start);
  var end = $("#end").val();
  places.push(end);

  var waypoints = $("#waypoints").val();
  for (var i = 0; i < waypoints.length; i++) {
    places.push(waypoints[i]);
  }
  console.log(places);
  var newPlaces = [];

  for (var i = 0; i< places.length; i++){

    console.log();

    var name = places[i].split(",")[0];
    name = name.toLowerCase();
    newPlaces.push(name);
    console.log(places)
  }

  places = newPlaces;
  console.log(places);

  for (var i = 0; i< places.length; i++) {
  
    $("#"+places[i]+"Panel").show();
  
}
  
})

// Code to change Accommodation options based on number of guests selected


$("#number").change(function(){

var selectedNoGuests = $(this).val();
console.log(selectedNoGuests);


// Nelson
if (selectedNoGuests === "one" || selectedNoGuests === "five" || selectedNoGuests === "six"){
  $("#nelsonVenue option[value='motel']").hide();
  
}else {$("#nelsonVenue option[value='motel']").show();}

if (selectedNoGuests === "three" || selectedNoGuests === "four" || selectedNoGuests === "five" || selectedNoGuests === "six"){
  $("#nelsonVenue option[value='hotel']").hide();
  
}else {$("#nelsonVenue option[value='hotel']").show();}

if (selectedNoGuests === "five" || selectedNoGuests === "six"){
  $("#nelsonVenue option[value='house']").hide();
  
}else {$("#nelsonVenue option[value='house']").show();}

// Kaikoura
if (selectedNoGuests === "one" || selectedNoGuests === "five" || selectedNoGuests === "six"){
  $("#kaikouraVenue option[value='motel']").hide();
  
}else {$("#kaikouraVenue option[value='motel']").show();}

if (selectedNoGuests === "three" || selectedNoGuests === "four" || selectedNoGuests === "five" || selectedNoGuests === "six"){
  $("#kaikouraVenue option[value='hotel']").hide();
  
}else {$("#kaikouraVenue option[value='hotel']").show();}

if (selectedNoGuests === "five" || selectedNoGuests === "six"){
  $("#kaikouraVenue option[value='house']").hide();
  
}else {$("#kaikouraVenue option[value='house']").show();}

// Christchurch
if (selectedNoGuests === "one" || selectedNoGuests === "five" || selectedNoGuests === "six"){
  $("#christchurchVenue option[value='motel']").hide();
  
}else {$("#christchurchVenue option[value='motel']").show();}

if (selectedNoGuests === "three" || selectedNoGuests === "four" || selectedNoGuests === "five" || selectedNoGuests === "six"){
  $("#christchurchVenue option[value='hotel']").hide();
  
}else {$("#christchurchVenue option[value='hotel']").show();}

if (selectedNoGuests === "five" || selectedNoGuests === "six"){
  $("#christchurchVenue option[value='house']").hide();
  
}else {$("#christchurchVenue option[value='house']").show();}

// Queenstown
if (selectedNoGuests === "one" || selectedNoGuests === "five" || selectedNoGuests === "six"){
  $("#queenstownVenue option[value='motel']").hide();
  
}else {$("#queenstownVenue option[value='motel']").show();}

if (selectedNoGuests === "three" || selectedNoGuests === "four" || selectedNoGuests === "five" || selectedNoGuests === "six"){
  $("#queenstownVenue option[value='hotel']").hide();
  
}else {$("#queenstownVenue option[value='hotel']").show();}

if (selectedNoGuests === "five" || selectedNoGuests === "six"){
  $("#queenstownVenue option[value='house']").hide();
  
}else {$("#queenstownVenue option[value='house']").show();}

// Wanaka
if (selectedNoGuests === "one" || selectedNoGuests === "five" || selectedNoGuests === "six"){
  $("#wanakaVenue option[value='motel']").hide();
  
}else {$("#wanakaVenue option[value='motel']").show();}

if (selectedNoGuests === "three" || selectedNoGuests === "four" || selectedNoGuests === "five" || selectedNoGuests === "six"){
  $("#wanakaVenue option[value='hotel']").hide();
  
}else {$("#wanakaVenue option[value='hotel']").show();}

if (selectedNoGuests === "five" || selectedNoGuests === "six"){
  $("#wanakaVenue option[value='house']").hide();
  
}else {$("#wanakaVenue option[value='house']").show();}



})

// Code to change Accommodation options based on number of nights selected for Nelson


$("#nelsonVenue").change(function(){

var selectedVenue = $(this).val();
console.log(selectedVenue);

if (selectedVenue === "motel"){

  $("#nelsonNights option[value='one'],[value='two'],[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").hide();
  $("#nelsonNights option[value='three'],[value='four'],[value='five'],[value='six'],[value='seven'],[value='eight'],[value='nine'],[value='ten']").show();
  $(".nelsonHotel").hide();
  
}else if (selectedVenue === "hotel"){
  $("#nelsonNights option[value='one'],[value='two'],[value='three'],[value='four'],[value='five']").show();
  $("#nelsonNights option[value='six'],[value='seven'],[value='eight'],[value='nine'],[value='ten']").hide();
  $("#nelsonNights option[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").hide();

}else if (selectedVenue === "hostel"){
  $("#nelsonNights option[value='one'],[value='two'],[value='three'],[value='four'],[value='five'],[value='six']").show();
  $("#nelsonNights option[value='seven'],[value='eight'],[value='nine'],[value='ten']").show();
  $("#nelsonNights option[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").hide();

}else if (selectedVenue === "house"){
  $("#nelsonNights option[value='one']").hide();
  $("#nelsonNights option[value='two'],[value='three'],[value='four'],[value='five'],[value='six'],[value='seven'],[value='eight']").show();
  $("#nelsonNights option[value='nine'],[value='ten'],[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").show();
}

else{
  $("#nelsonNights option[value='one'],[value='two'],[value='three'],[value='four'],[value='five'],[value='six'],[value='seven'],[value='eight']").show();
  $("#nelsonNights option[value='nine'],[value='ten'],[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").show();

}

})

// Code to change Accommodation options based on number of nights selected for Kaikoura


$("#kaikouraVenue").change(function(){

var selectedVenue = $(this).val();
console.log(selectedVenue);

if (selectedVenue === "motel"){

  $("#kaikouraNights option[value='one'],[value='two'],[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").hide();
  $("#kaikouraNights option[value='three'],[value='four'],[value='five'],[value='six'],[value='seven'],[value='eight'],[value='nine'],[value='ten']").show();
 
}else if (selectedVenue === "hotel"){
  $("#kaikouraNights option[value='one'],[value='two'],[value='three'],[value='four'],[value='five']").show();
  $("#kaikouraNights option[value='six'],[value='seven'],[value='eight'],[value='nine'],[value='ten']").hide();
  $("#kaikouraNights option[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").hide();

}else if (selectedVenue === "hostel"){
  $("#kaikouraNights option[value='one'],[value='two'],[value='three'],[value='four'],[value='five'],[value='six']").show();
  $("#kaikouraNights option[value='seven'],[value='eight'],[value='nine'],[value='ten']").show();
  $("#kaikouraNights option[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").hide();

}else if (selectedVenue === "house"){
  $("#kaikouraNights option[value='one']").hide();
  $("#kaikouraNights option[value='two'],[value='three'],[value='four'],[value='five'],[value='six'],[value='seven'],[value='eight']").show();
  $("#kaikouraNights option[value='nine'],[value='ten'],[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").show();
}

else{
  $("#kaikouraNights option[value='one'],[value='two'],[value='three'],[value='four'],[value='five'],[value='six'],[value='seven'],[value='eight']").show();
  $("#kaikouraNights option[value='nine'],[value='ten'],[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").show();

}

})

// Code to change Accommodation options based on number of nights selected for Christchurch


$("#christchurchVenue").change(function(){

var selectedVenue = $(this).val();
console.log(selectedVenue);

if (selectedVenue === "motel"){

  $("#christchurchNights option[value='one'],[value='two'],[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").hide();
  $("#christchurchNights option[value='three'],[value='four'],[value='five'],[value='six'],[value='seven'],[value='eight'],[value='nine'],[value='ten']").show();
 
}else if (selectedVenue === "hotel"){
  $("#christchurchNights option[value='one'],[value='two'],[value='three'],[value='four'],[value='five']").show();
  $("#christchurchNights option[value='six'],[value='seven'],[value='eight'],[value='nine'],[value='ten']").hide();
  $("#christchurchNights option[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").hide();

}else if (selectedVenue === "hostel"){
  $("#christchurchNights option[value='one'],[value='two'],[value='three'],[value='four'],[value='five'],[value='six']").show();
  $("#christchurchNights option[value='seven'],[value='eight'],[value='nine'],[value='ten']").show();
  $("#christchurchNights option[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").hide();

}else if (selectedVenue === "house"){
  $("#christchurchNights option[value='one']").hide();
  $("#christchurchNights option[value='two'],[value='three'],[value='four'],[value='five'],[value='six'],[value='seven'],[value='eight']").show();
  $("#christchurchNights option[value='nine'],[value='ten'],[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").show();
}

else{
  $("#christchurchNights option[value='one'],[value='two'],[value='three'],[value='four'],[value='five'],[value='six'],[value='seven'],[value='eight']").show();
  $("#christchurchNights option[value='nine'],[value='ten'],[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").show();

}

})

// Code to change Accommodation options based on number of nights selected for Queenstown


$("#queenstownVenue").change(function(){

var selectedVenue = $(this).val();
console.log(selectedVenue);

if (selectedVenue === "motel"){

  $("#queenstownNights option[value='one'],[value='two'],[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").hide();
  $("#queenstownNights option[value='three'],[value='four'],[value='five'],[value='six'],[value='seven'],[value='eight'],[value='nine'],[value='ten']").show();
 
}else if (selectedVenue === "hotel"){
  $("#queenstownNights option[value='one'],[value='two'],[value='three'],[value='four'],[value='five']").show();
  $("#queenstownNights option[value='six'],[value='seven'],[value='eight'],[value='nine'],[value='ten']").hide();
  $("#queenstownNights option[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").hide();

}else if (selectedVenue === "hostel"){
  $("#queenstownNights option[value='one'],[value='two'],[value='three'],[value='four'],[value='five'],[value='six']").show();
  $("#queenstownNights option[value='seven'],[value='eight'],[value='nine'],[value='ten']").show();
  $("#queenstownNights option[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").hide();

}else if (selectedVenue === "house"){
  $("#queenstownNights option[value='one']").hide();
  $("#queenstownNights option[value='two'],[value='three'],[value='four'],[value='five'],[value='six'],[value='seven'],[value='eight']").show();
  $("#queenstownNights option[value='nine'],[value='ten'],[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").show();
}

else{
  $("#queenstownNights option[value='one'],[value='two'],[value='three'],[value='four'],[value='five'],[value='six'],[value='seven'],[value='eight']").show();
  $("#queenstownNights option[value='nine'],[value='ten'],[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").show();

}

})

// Code to change Accommodation options based on number of nights selected for Wanaka


$("#wanakaVenue").change(function(){

var selectedVenue = $(this).val();
console.log(selectedVenue);

if (selectedVenue === "motel"){

  $("#wanakaNights option[value='one'],[value='two'],[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").hide();
  $("#wanakaNights option[value='three'],[value='four'],[value='five'],[value='six'],[value='seven'],[value='eight'],[value='nine'],[value='ten']").show();
 

}else if (selectedVenue === "hotel"){
  $("#wanakaNights option[value='one'],[value='two'],[value='three'],[value='four'],[value='five']").show();
  $("#wanakaNights option[value='six'],[value='seven'],[value='eight'],[value='nine'],[value='ten']").hide();
  $("#wanakaNights option[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").hide();

}else if (selectedVenue === "hostel"){
  $("#wanakaNights option[value='one'],[value='two'],[value='three'],[value='four'],[value='five'],[value='six']").show();
  $("#wanakaNights option[value='seven'],[value='eight'],[value='nine'],[value='ten']").show();
  $("#wanakaNights option[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").hide();

}else if (selectedVenue === "house"){
  $("#wanakaNights option[value='one']").hide();
  $("#wanakaNights option[value='two'],[value='three'],[value='four'],[value='five'],[value='six'],[value='seven'],[value='eight']").show();
  $("#wanakaNights option[value='nine'],[value='ten'],[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").show();
}

else{
  $("#wanakaNights option[value='one'],[value='two'],[value='three'],[value='four'],[value='five'],[value='six'],[value='seven'],[value='eight']").show();
  $("#wanakaNights option[value='nine'],[value='ten'],[value='eleven'],[value='twelve'],[value='thirteen'],[value='fourteen'],[value='fifteen']").show();

}

})
