$(document).ready(function() {
	
});

 $('.button-collapse').sideNav({
      menuWidth: 285,
      edge: 'left', 
      closeOnClick: true 
    }
  );
var divMapa= document.getElementById("mapa");
navigator.geolocation.getCurrentPosition(fn_ok, fn_mal);
function fn_mal(){}
function fn_ok(rta){
	var lat = rta.coords.latitude;
	var lon = rta.coords.longitude;

	var gLatLon = new google.maps.LatLng( lat , lon );
	var objConfig = {
		zoom: 12,
		center: gLatLon
	}
	var gMapa = new google.maps.Map( divMapa , objConfig );
	var objConfigMarker = {
		position:gLatLon,
		map:gMapa,
		title:"Usted está aquí"
	}
	var gMarker = new google.maps.Marker(objConfigMarker);
	var gCoder = new google.maps.Geocoder();
	var objInformacion ={
		address: "Calle José Galvez,Perú"
	}
		gCoder.geocode(objInformacion ,fn_coder);

		function fn_coder(datos){
			var coordenadas = datos[0].geometry.location; //obj LatLong
			var config = {
				map: gMapa,
				position: coordenadas,
				title: "Calle José Galvez"
			}
			var gMarkerDV = new google.maps.Marker( config)
		}
		//var gIW = new google.maps.InfoWindow(objHTML);
		var objConfigDR = {
			map:gMapa
		}
		var objConfigDs = {
			origin:gLatLon,
			destination:objInformacion.address,
			travelMode: google.maps.TravelMode.DRIVING
		}
		
		var ds = new google.maps.DirectionsService() //obtener cooordenadas
		var dr = new google.maps.DirectionsRenderer(objConfigDR) // traduce entre el punto A y B
			ds.route(objConfigDs ,fnRutear);

			function fnRutear(resultados,status){
				//mostrar la linea entre A y B
				if(status == "OK"){
					dr.setDirections(resultados);
				}else{
					alert("Error" + status);
				}
			}
	}
