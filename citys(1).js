//Ross Teviotdale

function initialise() {

var watchID = navigator.geolocation.watchPosition(function(position) {
			document.getElementById('geo').innerHTML ="" + position.coords.latitude + "," + position.coords.longitude
			
			p1=position.coords.latitude;
			p2=position.coords.longitude;
			
			drawmap(p1,p2);
			converttocity(p1,p2);			
		},
		function(position) {
			
		}
		, {enableHighAccuracy:true, maximumAge:30000, timeout:27000}
		);

function converttocity(p1,p2)
{
	url="http://where.yahooapis.com/geocode?q=" + p1 + "," + p2 + "&gflags=R&appid=ilbsgu7a&flags=J"
	$.getJSON(url,function(data) {
		city=data.ResultSet.Results[0].city;
				
		document.getElementById('state').innerHTML = "" + data.ResultSet.Results[0].state;
		document.getElementById('street').innerHTML = "" + data.ResultSet.Results[0].line1;
		document.getElementById('city').innerHTML = "" + city;
		document.getElementById('zip').innerHTML = "" + data.ResultSet.Results[0].uzip;
				
	});
}

function drawmap(p1,p2)
{
	var latlng = new google.maps.LatLng(p1,p2);
	
	var mapOptions = {
			zoom: 17,
			center: latlng,
			mapTypeControl: true,
			navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
			mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var map = new google.maps.Map(document.getElementById('map'),mapOptions);
	
	var marker = new google.maps.Marker({
		position: latlng,
		map: map,
                animation:google.maps.Animation.BOUNCE,
		icon: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png'
	});
	

	
	var infowindow = new google.maps.InfoWindow({
		content: 'You are here!<br><br><a href="event.html" target="blank">View events</a><br> '
		});
	

	google.maps.event.addListener(marker, 'click', function() {
	  infowindow.open(map,marker);
	  });
}
}