/*API Key = AIzaSyCTMZtcPkh9C9NldNVJVht18Lai1L9VqD0*/
/*
//Get location
function getLocation(){
  if ("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(function(position) {
        //console.log(position.coords.latitude, position.coords.longitude);


        var latitude = position.coords[5];
        longitude = position.coords[6];
        console.log(latitude);
      });
  }else{
  	console.log("Can't find your location");
  }
}


getLocation();*/

/* -----Getting The Map-----*/
function initMap() {
  var userLocation = {lat: 40.585258, lng: -105.084419};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: userLocation
  });
  var marker = new google.maps.Marker({
    position: userLocation,
    map: map
  });
}

/*Geocode*/

//call geocode
geocode();
function geocode(){
	var address = '112 North Grant Ave Fort Collins CO'
	axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
		params:{
			address:address,
			key:'AIzaSyCTMZtcPkh9C9NldNVJVht18Lai1L9VqD0'
		}
	})
	.then(function(response){
		//log full responce
		console.log(response);

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

		var geometryOutput = `
			<ul class="list-group">
				<li class=" list-group-item">Lattitude: ${lat}</li>
				<li class=" list-group-item">Longitude: ${lng}</li>
			</ul>
		`;
		//console.log(location);


		//Address Components ( individual part of address)

		var addressComponents = response.data.results[0].address_components;
		var addressComponentsOutput = '<ul class="list-group">';
			for( var i = 0; i < addressComponents.length; i++){
				addressComponentsOutput += `
					<li class="list-group-item">${addressComponents[i].types[0]
					}: ${addressComponents[i].long_name} </li>
				`;
			}
			addressComponentsOutput += '</ul>';

		//output to app
			document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
			document.getElementById('address-components').innerHTML = addressComponentsOutput;
			document.getElementById('geometry').innerHTML = geometryOutput;
	})
	.catch(function(error){
		console.log("error");
	})
}

