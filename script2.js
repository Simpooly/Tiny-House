/*API Key = AIzaSyCTMZtcPkh9C9NldNVJVht18Lai1L9VqD0*/
//Get location
/*function getLocation(){
  if ("geolocation" in navigator){

        navigator.geolocation.getCurrentPosition(function(position) {
          //console.log(position.coords.latitude, position.coords.longitude);
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      return pos;
        });
  }else{
    alert("Can't find your location");
  }
}
var positgetLocation();
//var x = document.getElementById("demo");
var position = {};
//Get location
function getLocation(){
  if ("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(showPosition)

  }else{
    console.log("Can't find your location");
  }
}
function showPosition(position) {
  *console.log(position.coords.latitude, position.coords.longitude);
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    position = {lat: position.coords.latitude, lng: position.coords.longitude};
    //console.log(position);
}
console.log(position);
getLocation();*/

var pos;
//Get location
function getLocation(){
  if ("geolocation" in navigator){

        navigator.geolocation.getCurrentPosition(function(position) {
        	//console.log(position.coords.latitude, position.coords.longitude);
			pos = {
			  lat: position.coords.latitude,
			  lng: position.coords.longitude
			};
console.log(pos);
        });
  }else{
  	alert("Can't find your location");
  }
}
//console.log(pos);
getLocation();

//--------------------------------------------------Getting The Map
function initMap() {
  var userLocation = {lat: 40.585258, lng: -105.084419};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: userLocation
  });



//-------------------------------------------------Marker types
var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
var buisnessMarker = 'http://maps.google.com/mapfiles/kml/pushpin/blue-pushpin.png';
var ownerMarker = 'http://maps.google.com/mapfiles/kml/pushpin/wht-pushpin.png';

//----------------------------------------------------Manipulate Text from Form

//get form info title, building company, address-> geocode lat/long
//geocode address
//if tiny house building company box makrked iconColor == bluePushpin, else iconColor == whitePushpin
//push entire element to array

//get values from input do they need .value at end?
//var locationInput = document.getElementById("location-input"); now in geolocation

var titleInput = document.getElementById("title-input");

//-----------------------------------------------------Geocode/ location


//get location Form
var locationForm = document.getElementById('location-form');

//listen for submit event
locationForm.addEventListener('submit', geocode);


//-----------------------------------------------------Geocode/ location


//get location Form
var locationForm = document.getElementById('location-form');

//listen for submit event
locationForm.addEventListener('submit', geocode);



function geocode(e){
  //Prevent actual submit
  e.preventDefault();

  var address = document.getElementById('location-input').value;
  axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
    params:{
      address:address,
      key:'AIzaSyCTMZtcPkh9C9NldNVJVht18Lai1L9VqD0'
    }
  })
  .then(function(response){
    //log full responce
    //console.log(response);

    //formatted address
    var formattedAddress = response.data.results[0].formatted_address;
    var formattedAddressOutput = `
      <ul class="list-group">
        <li class=" list-group-item">${formattedAddress}</li>
      </ul>
    `;

    // location lattitude/ longitude
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;

    //original tutorial
    var geometryOutput = `
      <ul class="list-group">
        <li class=" list-group-item">Address Lattitude: ${lat}</li>
        <li class=" list-group-item">Address Longitude: ${lng}</li>
      </ul>
    `;

    var position = {lat: lat , lng: lng};
    console.log(position);

    //eventually add to object as coords-key then push to array
    //marker.coords = position;

  /*  //Address Components ( individual part of address)
    var addressComponents = response.data.results[0].address_components;
    var addressComponentsOutput = '<ul class="list-group">';
      for( var i = 0; i < addressComponents.length; i++){
        addressComponentsOutput += `
          <li class="list-group-item">${addressComponents[i].types[0]
          }: ${addressComponents[i].long_name} </li>
        `;
      }
      addressComponentsOutput += '</ul>';*/

    //output to page
      document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
      //document.getElementById('address-components').innerHTML = addressComponentsOutput;
      document.getElementById('geometry').innerHTML = geometryOutput;

    //Output Push to array marker
    //marker.push(position);
  })
  .catch(function(error){
    console.log("error");
  })
}

//----------------------------------------------------Marker on maps
// Single Marker

var marker = {};

//Array of Markers

var markers = [
	{
	  	coords:{lat: 38.440429, lng: -122.7140548},
	  	iconColor: ownerMarker,
	  	content: '<a href="https://sfbay.craigslist.org/nby/tro/d/tiny-house/6418617772.html" target="_blank">Cali Tiny house</a>'
  	},
  	{
  	  	coords:{lat: 34.3978054, lng: -112.2362734},
  	  	iconColor: ownerMarker,
  	  	content: '<a href="https://sacramento.craigslist.org/rvs/d/tiny-house/6420053666.html" target="_blank"> Craigslist Tiny house</a>'
  	},
  	{
  		coords:{lat: 40.6182182, lng: -105.0807318},
  		iconColor: buisnessMarker,
  		content: '<a href="http://mitchcrafttinyhomes.com/" target="_blank">Mitch Craft</a>'
  	},
  	{
  		coords:{lat: 37.245194, lng: -107.868196},
  		iconColor: buisnessMarker,
  		content: '<a href="https://www.tumbleweedhouses.com/" target="_blank">Tumbleweed Tiny House</a>'
  	},
  	{
  		coords:{lat:  38.8523091, lng: -104.7143793},
  		iconColor: buisnessMarker,
  		content: '<a href="http://rockymountaintinyhouses.com/plans/durango/" target="_blank">Rocky Mountain Tiny House</a>'
  	}
];

//Loop Thorugh Markers then addMarker funtion
for(var i = 0; i < markers.length; i++){
	addMarker(markers[i]);
}


  	//Add Marker Function
  	function addMarker(props){
  		var marker = new google.maps.Marker({
  		  position: props.coords,
  		  map: map,
  		  //icon: props.iconColor,
  		  //shadow: props.iconShadow
  		});

  		//Check for color Icon
  		if(props.iconColor){
  			marker.setIcon(props.iconColor);
  		}

  		//Check for Content or Name
  		if(props.content){
  			var infoWindow = new google.maps.InfoWindow({
  				content: props.content
  			});

  			marker.addListener('click', function(){
  				infoWindow.open(map, marker);
  			});
  		}
  	}
}
//style snazzy maps
[
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": -16
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "hue": "#2bff00"
            },
            {
                "lightness": -39
            },
            {
                "saturation": 8
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "saturation": -100
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 100
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "saturation": -100
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "saturation": -100
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "saturation": -100
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 100
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 100
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": -100
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "lightness": -100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": 100
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": 100
            },
            {
                "hue": "#006eff"
            },
            {
                "lightness": -19
            }
        ]
    }
]
