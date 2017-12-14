/*API Key = AIzaSyCTMZtcPkh9C9NldNVJVht18Lai1L9VqD0*/

//--------------------------------------------------Getting The Map
function initMap() {
  //var userLocation = {lat: 40.585258, lng: -105.084419};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    //center: userLocation
  });


//--------------------------------------------------Geolocation and centering the map
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
          initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          map.setCenter(initialLocation);
      });
  }else{
  	alert("Can't find your location");
  }




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

		//on screen view of lat/ long
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

		//output to page
			document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
			document.getElementById('geometry').innerHTML = geometryOutput;

	})
	.catch(function(error){
		console.log("error");
	})
}




	//if checkbox true make blue else white
	//make all values one element in array
	//append data to array
//----------------------------------------------------checkbox make icon color


/*
//after form submitted then do if statement?
function checkValue () {
	//get buisness/ owner radio button info
		var buisness = document.getElementById("buisness").checked;
		var owner = document.getElementById("owner").checked;

		//make sure it is a boolian
		//console.log(typeof buisness);
		if( buisness == false && owner == false){
			//select error section
			//place text to choose a sale from option
		}else if(buisness == true){
			//make object iconColor buisnessMarker
		}else if (owner ==true){
			//make object iconColor ownerMarker
		}

}*/

//function if one is true
// if one is false
// if both false
//-------------------------------------------------Marker types
var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
var buisnessMarker = 'http://maps.google.com/mapfiles/kml/pushpin/blue-pushpin.png';
var ownerMarker = 'http://maps.google.com/mapfiles/kml/pushpin/wht-pushpin.png';

//----------------------------------------------------Marker on maps
// Single Marker object
//function Marker( coords, iconColor, content){
//	this.coords = coords;
//	this.iconColor = iconColor;
//	this.content = content;
//}

//var caliHouse = new Marker({lat: 38.440429, lng: -122.7140548}, ownerMarker, title);

//marker.coords = position; ???

//Array of Markers

var markers = [
	{
	  	coords:{lat: 36.9741171, lng: -122.0307963},
	  	iconColor: ownerMarker,
	  	content: '<a href="https://sfbay.craigslist.org/scz/tro/d/beautiful-custom-tiny-home/6423385870.html" target="_blank">Cali Tiny house 2</a>'
  	},
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


