var containerEl = document.querySelector('.container');

            var mixer = mixitup(containerEl, {
                controls: {
                    toggleLogic: 'and'
                }
            });


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


// calculation javascript


