console.log("test GMaps");

var map;
var markerst = [];
//varible para objeto de informacion del marcador 
var infoWindowCustom;

//coordenadas iniciales
var cucutalat=  7.8890971;
var cucutalng= -72.49668959999997;

var urlMarker ;
//este campo es usado por el metodo buscarMarcador para asignar el marcador mas cercano
var markerNear;

//coordenadas usadas para establecer la ubicacion actual
var currentLat;
var currentLng;
var distanciaActual;


//informacion y coordenada de sucursales
//--esto se debe reemplazar por un servicio...
var sucursales = [
	['Dromedicas del Oriente SAS', 7.908388743984923, -72.491574883461, 'Avenida 11 Be # 8Bn - 10  Guaimaral', '5740075','5777762', 'CUCUTA','','', '', '', '', 1],
	['Farmanorte 01', 7.840764903473619, -72.5028133392334, 'Calle 33 Con Avenida 4 Esquina Brr La Sabana', '5808800','3167409253', 'LOS PATIOS','','7:30am', '22:30', '7:30am', '22:30', 2],
	['Farmanorte 02', 7.923595410892432, -72.52201795578003, 'Avenida 5 Con Calle 2N Pescadero', '5780727','3166909962', 'CUCUTA','','8am', '23:30', '8am', '2pm', 3],
	['Farmanorte 03', 7.917091999388589, -72.49572694301605, 'Avenida 4 Con Calle 20An Esquina Brr Prados Del Norte', '5796888','3166909583', 'CUCUTA','true', '', '', '', '', 4],
	['Farmanorte 04', 7.9049350202970805, -72.51519441604614, 'Avenida Kennedy Con 2Da Esquina Brr La Victoria', '5787878','3183353570', 'CUCUTA','','7:30am', '21', '7:30am', '9pm', 5],
	['Farmanorte 05', 7.898048740341691, -72.52727508544922, 'Calle 2 Con Avenida 6 Esquina Brr Ceci', '5870555','3168309523', 'CUCUTA','true', '', '', '', '', 6],
	['Farmanorte 06', 7.87261944, -72.52802511, 'Avenida 26 Con Calle 28 Esquina Brr Belen', '5828280','3155888094', 'CUCUTA','true', '', '', '', '', 7],
	['Farmanorte 07', 7.8904609470678055, -72.49629020690918, 'Calle 8 # 1E-76 Junto Cafesalud La Salle', '5744094','3153437725', 'CUCUTA','true', '', '', '', '', 8],
	['Farmanorte 08', 7.373990247532279, -72.64909029006958, 'Crr 6 # 7-99 Calle Real', '5682217','3183437726', 'PAMPLONA','','7:30am', '22', '7:30am', '10pm', 9],
	['Farmanorte 09', 7.929875568608961, -72.50390768051147, 'Avenida 2 Con Calle 4 Esquina Brr Aeropuerto', '5818245','3166910544', 'CUCUTA','true', '', '', '', '', 10],
	['Farmanorte 10', 7.912830721471756, -72.48752474784851, 'Avenida Libertadores # 18N-181 Brr Santa Elena Bloques Del Zulima', '5776206','3155997099', 'CUCUTA','','7:30am', '22', '7:30am', '9pm', 11],
	['Farmanorte 11', 7.8871853, -72.49622654, 'Cll 11 Con Av 2E Esquina Diagonal C.C. Ventura Plaza', '5711737','3173643955', 'CUCUTA','true', '', '', '', '', 12],
	['Farmanorte 12', 7.88983925194856, -72.49102771282196, 'Av. 9E Con Cll 9 Esq Fte Col. Domingo Savio Brr La Riviera', '5751377','3185166993', 'CUCUTA','','7am', '22', '7am', '10pm', 13],
	['Farmanorte 13', 7.886720134976074, -72.51558065414429, 'Av 3E # 1-108 Local 1 Frente Al Parque La Ceiba', '577770','3185166990', 'CUCUTA','','8am', '21', '8am', '9pm', 14],
	['Farmanorte 14', 7.88912722, -72.51350731, 'Cll 6 # 13-61 Fte Ese Loma Bolivar', '5739782','3155120028', 'CUCUTA','true', '', '', '', '', 15],
	['Farmanorte 15', 7.91121118, -72.51772667, 'Avenida 0 # 4-68 Esquina Barrio Comuneros', '5796173','3154372258', 'CUCUTA','true', '', '', '', '', 16],
	['Farmanorte 16', 7.607999367664449, -72.59926557540894, 'Cll 3 # 3-34  Parq Prpal Chinacota', '5864324','3173660022', 'CHINACOTA','true', '', '', '', '', 17],
	['Farmanorte 17', 7.92706246, -72.51931541, 'Avenida 5 Con Calle 24 Ospina Perez Esquina', '5781108','3153084801', 'CUCUTA','true', '', '', '', '', 18],
	['Farmanorte 18', 7.88198692, -72.4986197, 'Avendad 1 #15-87 Barrio La Playa', '5710546','3176410633', 'CUCUTA','','7am', '21:30', '8am', '2pm', 19],
	['Farmanorte 19', 7.87879545, -72.49714686, 'Avenida 0 Con Calle 19 Esquina', '5831554','3174378532', 'CUCUTA','true', '', '', '', '', 20],
	['Farmanorte 20', 7.88715719, -72.5027738, 'Calle 10 Con Avenida 4 Esquina', '5730318','3175020642', 'CUCUTA','','7:30am', '20', '8am', '2pm', 21],
	['Farmanorte 21', 7.88680822, -72.5048961, 'Av 6 Con Calle 10# 5-94  Frente Al Parque Santander Centro', '5719113','3174380134', 'CUCUTA','','7am', '20', '8am', '2pm', 22],
	['Farmanorte 22', 8.23596841, -73.35418615, 'Calle 10 # 12-87 Frente Al Parque - Ocaña', '5691839','3153926643', 'OCAÑA','','7:30am', '21', '7:30am', '5pm', 23],
	['Farmanorte 23', 7.88755082, -72.50502387, 'Avenida 6 # 9-21', '5730526','3183380633', 'CUCUTA','','7am', '20', '8am', '2pm', 24],
	['Farmanorte 24', 7.88765518, -72.49848544, 'Avenida 0 · 10-14', '5711114','3175021518', 'CUCUTA','true', '', '', '', '', 25],
	['Farmanorte 25', 7.8666476, -72.49764258, 'Centro Cial Pinar Del Rio Local 10', '5842555','3174333572', 'CUCUTA','true', '', '', '', '', 26],
	['Farmanorte 26', 7.87187112, -72.52892628, 'Avenida 26 No 29-48 Br Belen', '5754140','3162331144', 'CUCUTA','','7:30am', '21:30', '7:30am', '9:30pm', 27],
	['Farmanorte 27', 7.91694492, -72.4727475, 'El Escobal, Anillo Vial, Plaza Del Este Local 6', '5847808','3188135356', 'CUCUTA','','7am', '22', '7am', '10pm', 28],
	['San Antonio del Norte', 7.88749215, -72.50609315, 'Av 7 Calle 9 Esquina Centro', '5727091','3155997098', 'CUCUTA','','7am', '20', '8am', '2pm', 29],

];

//metodo principa
function iniciar(){

	//crea el mapa con las coordenada iniciales y el zoom
	map = new GMaps({
		div: '#map',
		lat:  cucutalat,
		lng:  cucutalng,
		zoom: 14,
		zoomControl : true,
		// scrollwheel:false,		
		// panControl: false,
		// streetViewControl: true,
		mapTypeControl: false,
		overviewMapControl: false,
		// clickable: false
	});

	//metodo para geolocalizacion y trazo de la ruta
	setCurrentCoords();
	//creando los marcadores
	createMarkers();
	//registrando manejo de evento de cierre de infowindow clic en el mapa	
	google.maps.event.addListener(map.map, "click", function() {
		map.hideInfoWindows();
	});
	
	//registro de manejo de evento del boton de menu
	var menuboton = document.getElementById('buttonmenu');
	menuboton.addEventListener('click', ocultarMostrar, false );

	var opcionSuc = document.getElementById('sucursales');
	opcionSuc.addEventListener('click', mostrarSucursales, false );

	var opcionSuc = document.getElementById('close');
	opcionSuc.addEventListener('click', mostrarSucursales, false );

	var marCerca = document.getElementById('mascercana');
	marCerca.addEventListener('click', findMe, false);
	
	var marCerca = document.getElementById('resetmapa');
	marCerca.addEventListener('click', resetMapa, false);
	
	var marCerca = document.getElementById('resetButton');
	marCerca.addEventListener('click', resetMapa, false);

	var marCerca = document.getElementById('cercabutton');
	marCerca.addEventListener('click', function(){ mostrarSucursales(); findMe();}, false);

	
}//fin del metodo iniciar

//los suguientes dos metdos de jquery implementan el scrroll para infosucursales
$('.contentsuc').impulse();
$(".encuentranos").fancy_scroll({
  innerWrapper: ".contentsuc"
});

$( function() {
    $( "#encuentranos" ).draggable();
  } );

function resetMapa(){
	//centra el mapa
	map.setCenter(cucutalat, cucutalng);
	//actualiza el zoom
	map.setZoom(14);
	//oculta el cuadro de sucursales
	// mostrarSucursales();
	//elimina todas las rutas 
	map.cleanRoute();
	//elimina el marker de ubicacion actual
	
	for(var i = 0 ; i < map.markers.length ; i++){
		if(map.markers[i].title =='Mi ubicación'){
			map.markers[i].setMap(null);
		}
	}	

	//oculta todos los infowindow
	map.hideInfoWindows();
}

function ocultarMostrar() {	
    document.getElementById("menu").classList.toggle("active");
}

// cierra el menu cuando el usuario hace click por dentro y fuera de el
window.onclick = function(event) {
	
  if (!event.target.matches('.burgermenu') ) {  	
    	var dropdowns = document.getElementById("menu");    	
    	dropdowns.classList.remove('active'); 
    	
    }  
}//fin del manejador de evento


function cerrarSucursales(){	
	 document.getElementById("encuentranos").remove('eactive');
}


function mostrarSucursales(){
	var control = document.getElementById('sucursalesControl').value;	
	if(control === 'false'){
		cargarSucursales();
	}	
	document.getElementById('encuentranos').classList.toggle("eactive");
}


function cargarSucursales(){
	for (var i = 1; i < sucursales.length; i++) {
	// for (var i = 1; i < 3; i++) {
		//creacion de la sucursal en el menu de sucursales
		crearSucursal(  sucursales[i][1],//latitud
						sucursales[i][2],//longitud
						sucursales[i][0],//nombre de la sucursal								 
						sucursales[i][3],//direccion		
						i,				 //indice usado para el id de la sucursal
						map.markers[i]	//marcador de la sucursal				 
					);
	}//fin del for
	document.getElementById('sucursalesControl').value = 'true';
}


function createMarkers(){
	//iteramos la coleccion de sucursales
	for (var i = 0; i < sucursales.length; i++) {
		//se crea un objeto coordenadas para crear nuestro marcador
		var coordenadas = new google.maps.LatLng(sucursales[i][1], sucursales[i][2]);
		//variables creadas para comparar determinar cual es la ppal
		var principal = new String(sucursales[i][0]);
		var sucursalt = new String('Dromedicas del Oriente SAS');
		
		if (principal.localeCompare(sucursalt) === 0) {	
		 	addMarkerWithTimeoutPpal(coordenadas, i * 100, 
										sucursales[i][0], i, sucursales[i][3], sucursales[i][4], sucursales[i][5] );			
		} else {
						
			//creando los marcadores del mapa
			addMarkerWithTimeout(coordenadas,	  //coordenadas del marker
								 i * 50,		  //temporizador para la caida
								 sucursales[i][0],//nombre de la sucursal
								 i, 			  //posicion en la coleccion
								 sucursales[i][3],//direccion
								 sucursales[i][4],//tel fijo 
								 sucursales[i][5],//celular
								 sucursales[i][6],//ciudad
								 sucursales[i][7],//24horas
								 sucursales[i][8],//apertura l-v
								 sucursales[i][9],//cierre l-v
								 sucursales[i][10],//apertura d-f
								 sucursales[i][11]//cierre apertura d-f
								);			
		}
	} //fin del for
}//fin del metodo createMarkers


//anade el marcardor "Marker" al mapa y registra el evento click sobre el marcador
//para mostrar la informacion de la sucursal en un objeto InfoWindow
function addMarkerWithTimeout(position, timeout, suc, i, dir, telefono, celular, ciudad, _24H, aLS, cLS, aDF,cDF) {

		var contents = 
			'<div id="iw-container">' +
                '<div class="iw-title">'+
					'<img src="images/iconoFarmanorte.png" alt="logoFarmanorte">'+
					'<h3>Droguería '+ suc +'</h3>'+
				'</div>'+
				'<div class="iw-content">'+
						'<div class="row-content"><span class="icon-home"></span><div class="infocontent">'+ dir +'</div></div>'+
						'<div class="row-content"><a href="tel:(037)'+ telefono +'" class="footertext"><span class="icon-phone"></span><span class="infocontent">'+ telefono +'</span></a></div>'+	
						'<div class="row-content"><a href="tel:'+ celular +'" class="footertext"><span class="icon-mobile"></span><span class="infocontent">'+celular+'</span></a></div>'+	
						'<div class="row-content final"></div>'	+					
						'<div class="layoutcontent">'+
							'<div class="titlesection"><h3>Horarios</h3></div>';		
		
		var _24_horas= 	'<div class="_24horas"><h4>Servicicio 24 Horas</h4></div>';
						
		var complementoHora = 	'<div class="contentestado">'+
									'<div class="titleestado"><h4>Estado</h4></div>'+
									'<div class="infoestado"><i id="iconestado" class="zmdi zmdi-circle"></i>&nbsp;<span id="estadosuc"></span></div>'+
								'</div>'+
							'</div><!-- fin de layoutcontentbutton de horarios-->'+
						'</div><!-- fin de layoutcontent-->';
						
		var footer =	'<div class="row-content final"></div>'	+
						'<div class="layoutcontentbutton">'+
							'<div class="titlesection"><h3>Como Llegar</h3></div>'+
							'<div class="layoutcontentbutton">'+
								'<button class="buttonruta" id="btnCar" data-lat="'+position.lat()+'" data-lng="'+position.lng()+'"><i class="zmdi zmdi zmdi-car zmdi-hc-2x"></i>&nbsp;Carro</button>'+
								'<button class="buttonruta" id="btnWalk" data-lat="'+position.lat()+'" data-lng="'+position.lng()+'"><i class="zmdi zmdi-walk zmdi-hc-2x"></i>&nbsp;Caminando</button>'+
								'<button class="buttonruta" id="btnBus" data-lat="'+position.lat()+'" data-lng="'+position.lng()+'"><i class="zmdi zmdi-bus zmdi-hc-2x"></i>&nbsp;Bus</button>'+
							'</div>'+							
						'</div><!-- fin de layoutcontent-->'+						
					'</div><!--fin de contenedor de horarios -->'+
				'</div>'+
            '</div>';

        //con base en el dia comparamos el rango de horas icluyendo minutos
        //genero el contenido dinamicamente
        //revisa que sea 24 horas   
        if( _24H === 'true'){
        	contents +=   _24_horas + complementoHora + footer ;
        	//registro del manejo de evento click para desplegar el objeto InfoWindow
			window.setTimeout(function(){
					//añadir un marker con GMap
					urlMarker = "images/markFarmaAbierto.png";
					var mark = map.createMarker ({	
					    position: position,
					    icon: urlMarker,
						title: suc,
						infoWindow: {content:contents, maxWidth:345,},
						animation: google.maps.Animation.DROP,
					});
					//obteniendo el infowindow del objeto GMap
					infoWindowCustom = mark.infoWindow;
					//editando el css del infowindow
					editCssInfoWindow();
					//añadiendo la marca al mapa	
					map.addMarker(mark);
					markerst.push(mark);
				}, i * 50);
        }else{
        //si no es 24h, obtenemos el dia y hora actual        	
        	var fechaActual = new Date();
        	var horaActual = fechaActual.getHours();
        	var diaDeLaSemana = fechaActual.getDay();
        	var urlMarker2;
         	//valida si el dia actual esta entre lunes y Sabado

			if (diaDeLaSemana >= 1 && diaDeLaSemana <= 6) {
				var est;
				if( abierto(fechaActual, aLS, cLS) ){
					urlMarker2 = "images/markFarmaAbierto.png";
					est = 'abierto';					
				}else{
					urlMarker2 = "images/markFarmaCerrado.png";
					est = 'cerrado';					
				}//fin del else 
				var hOrdinario ='<div class="layoutcontentbutton">'+
								'<div class="contentestado">'+
								'<input id="estadoSucursal" type="hidden" value="'+est+'">'+
									'<div class="titleestado"><h4>Lunes - Sabado</h4></div>'+
									'<div class="infoestado">' + formatAMPM(getRealHour(aLS)) + ' - ' + formatAMPM(getRealHour(cLS)) +'</div>'+
								'</div>'+
								'<div class="contentestado">'+
									'<div class="titleestado"><h4>Domingos - Festivos</h4></div>'+
									'<div class="infoestado">'+ formatAMPM(getRealHour(aDF)) +' - '+ formatAMPM(getRealHour(cDF)) +' </div>'+
								'</div>';
				contents += hOrdinario + complementoHora + footer;
				//registro del manejo 
				window.setTimeout(function() {
					var markd = map.createMarker({
						position: position,
						icon: urlMarker2,
						title: suc,
						infoWindow: {
							content: contents,
							maxWidth: 330,
						},
						animation: google.maps.Animation.DROP,
					});
					//obteniendo el infowindow del objeto GMap
					infoWindowCustom = markd.infoWindow;
					//editando el css del infowindow
					editCssInfoWindowNormal();
					//añadiendo la marca al mapa	
					map.addMarker(markd);
					markerst.push(markd);
				}, i * 50);

			}//fin del if de horario lunes - sabado

			//valida si el dia actual es domingo
			if (diaDeLaSemana = 0 ) {
				var est;
				if( abierto(fechaActual, aDF, cDF) ){
					urlMarker2 = "images/markFarmaAbierto.png";
					est = 'abierto';					
				}else{
					urlMarker2 = "images/markFarmaCerrado.png";
					est = 'cerrado';

				}//fin del else 
				var hOrdinario ='<div class="layoutcontentbutton">'+
								'<div class="contentestado">'+
								'<input id="estadoSucursal" type="hidden" value="'+est+'">'+
									'<div class="titleestado"><h4>Lunes - Sabado</h4></div>'+
									'<div class="infoestado">' + formatAMPM(getRealHour(aLS)) + ' - ' + formatAMPM(getRealHour(cLS)) +'</div>'+
								'</div>'+
								'<div class="contentestado">'+
									'<div class="titleestado"><h4>Domingos - Festivos</h4></div>'+
									'<div class="infoestado">'+ formatAMPM(getRealHour(aDF)) +' - '+ formatAMPM(getRealHour(cDF)) +' </div>'+
								'</div>';
				contents += hOrdinario + complementoHora + footer; 
				//registro del manejo 
				window.setTimeout(function() {
					//añadir un marker con GMap					
					var markd = map.createMarker({
						position: position,
						icon: urlMarker2,
						title: suc,
						infoWindow: {
							content: contents,
							maxWidth: 330,
						},
						animation: google.maps.Animation.DROP,
					});
					//obteniendo el infowindow del objeto GMap
					infoWindowCustom = markd.infoWindow;
					//editando el css del infowindow
					editCssInfoWindowNormal();
					//añadiendo la marca al mapa	
					map.addMarker(markd);
					markerst.push(mark);
				}, i * 50);
			}//fin del if de horario para domingo
			
        }//fin del else	
}

//metodo predicado que determina si la hora actual esta dentro del rango
// de dos horas. El metodo tiene encuenta la hora y los minutos
function abierto(hActual, hApertura, hCierre){
	var abierto = false;
	//hora actual es mayor a la hora de apertura?
	if( hActual.getHours() > getRealHour(hApertura).getHours() && hActual.getHours()<getRealHour(hCierre).getHours() ){
		abierto = true;
	}
		
	if( hActual.getHours() == getRealHour(hApertura).getHours() ){
			if(hActual.getMinutes() >= getRealHour(hApertura).getMinutes())
				abierto = true;
	}

	if (hActual.getHours() == getRealHour(hCierre).getHours()) {
		if (hActual.getMinutes() < getRealHour(hCierre).getMinutes())
			abierto = true;
	}
	return abierto;	
}

//formato de hora 
function formatAMPM(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}// fin del metodo formatAMPM 


//recibe una hora como String y la retorna en formato hora
// puede recibir la hora en cualquier de esto formatos 
//'1:00 pm','1:00 p.m.','1:00 p','1:00pm','1:00p.m.','1:00p','1 pm','1 p.m.','1 p','1pm','1p.m.', '1p','13:00','13'
function getRealHour(stringHour){
	var time = stringHour.match(/(\d+)(?::(\d\d))?\s*(p?)/);
	var dateHour = new Date();
	dateHour.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
	dateHour.setMinutes(parseInt(time[2]) || 0);
	return dateHour;
}//fin del metodo getRealHour

//anade el marcardor "Marker" al mapa y registra el evento click sobre el marcador
//para mostrar la informacion de la sucursal en un objeto InfoWindow
function addMarkerWithTimeoutPpal(position, timeout, suc, i, dir, telefono, celular) {
		
		var contents = 
			'<div id="iw-container">' +
                '<div class="iw-titleppal">'+
					'<img src="images/iconoDromedicas.png" alt="logoFarmanorte">'+
					'<h3>'+ suc +'</h3>'+
				'</div>'+
				'<div class="iw-contentppal">'+
					'<p><span class="icon-home"></span>'+ dir +'</p>'+
					'<p><a href="tel:(037)'+ telefono +'" class="footertext"><span class="icon-phone"></span>'+ telefono +'</a></p>'+	
					'<p><a href="tel:'+celular+'" class="footertext"><span class="icon-phone"></span>'+celular+'</a></p>'+	
					// '<h3>Horarios</h3>'+
					// '<p class="horario">24 Horas.</p>'+
				'</div>'+
            '</div>';
        
		//registro del manejo de evento click para desplegar el objeto InfoWindow
		window.setTimeout(function(){
					//añadir un marker con GMap
					var mark = map.createMarker ({	
					    position: position,
					    icon: "images/markDromedicas.png",
						title: 'Dromedicas del Oriente',
						infoWindow: {content:contents},
						animation: google.maps.Animation.DROP,
					});
					//obteniendo el infowindow del objeto GMap
					infoWindowCustom = mark.infoWindow;
					//editando el css del infowindow
					editCssInfoWindow();					
					//añadiendo la marca al mapa	
					map.addMarker(mark);
					// markers.push(mark);
			}, i * 50);
}//fin del metodo  addMarkerWithTimeoutPpal


function clearMarkers() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
} //fin del metodo  clearMarkers

function generarRutaCar(lat, lng, opcionTransporte){
	map.setCenter(lat, lng);	
	map.setZoom(17);
	map.addMarker({
				title: 'Mi ubicación',
				lat: currentLat,
				lng: currentLng,
				});
	map.drawRoute({
				origin: [currentLat, currentLng],
				destination: [lat, lng],
				// destination: [7.908388743984923, -72.491574883461],
				travelMode: opcionTransporte,
				strokeColor: '#0060F1',
				strokeOpacity: 0.8,
				strokeWeight: 6
			});
}

function generarRutaWalk(lat, lng, opcionTransporte){
	map.setCenter(lat, lng);	
	map.setZoom(17);
	map.addMarker({
				title: 'Mi ubicación',
				lat: currentLat,
				lng: currentLng,
				});	
	map.drawRoute({
				origin: [currentLat, currentLng],
				destination: [lat, lng],
				// destination: [7.908388743984923, -72.491574883461],
				travelMode: opcionTransporte,
				strokeColor: '#FF0006',
				strokeOpacity: 0.65,
				strokeWeight: 6
			});
}

function generarRutaSucursal(lat, lng, opcionTransporte){
	map.setCenter(lat, lng);	
	mostrarSucursales();
	map.setZoom(17);
	map.addMarker({
				title: 'Mi ubicación',
				lat: currentLat,
				lng: currentLng,
				});
	map.drawRoute({
				origin: [currentLat, currentLng],
				destination: [lat, lng],
				// destination: [7.908388743984923, -72.491574883461],
				travelMode: opcionTransporte,
				strokeColor: '#0005D1',
				strokeOpacity: 0.7,
				strokeWeight: 6
			});
}



//Geolocalizacion y trazo de ruta
function findMe(){
	map.hideInfoWindows();//cierra el anterior infowindow
	map.cleanRoute();//limpia toda la ruta
	map.setCenter(currentLat, currentLng);
	map.setZoom(16);
	map.addMarker({
				title: 'Mi ubicación',
				lat: currentLat,
				lng: currentLng,
				});
	var coordsMarker = buscarMarcador( currentLat, currentLng);
	map.drawRoute({
				origin: [currentLat, currentLng],
				destination: coordsMarker,
				// destination: [7.908388743984923, -72.491574883461],
				travelMode: 'driving',
				strokeColor: '#0000FF',
				strokeOpacity: 0.7,
				strokeWeight: 6
			});
	markerNear.infoWindow.open(map, markerNear);
}

//Edicion del CSS para el objeto InfoWindows
function editCssInfoWindowNormal(){
			
	//Desde aca se comienza la manipulacion del DOM del objeto Info Window
	//nos apoyamos de jQuery
	google.maps.event.addListener(infoWindowCustom, 'domready', function() {
		
		// Reference to the DIV that wraps the bottom of infowindow
		var iwOuter = $('.gm-style-iw');
		iwOuter.children(':nth-child(1)').css({'display' : 'block'});	
		/* Since this div is in a position prior to .gm-div style-iw.
		* We use jQuery and create a iwBackground variable,
		* and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
		*/		
		var iwBackground = iwOuter.prev();		
		// Removes background shadow DIV
		iwBackground.children(':nth-child(2)').css({'display' : 'none'});
		// Removes white background DIV
		iwBackground.children(':nth-child(4)').css({'display' : 'none'});
		// Moves the infowindow 115px to the right.
		iwOuter.parent().parent().css({left: '0px'});
		// Changes the desired tail shadow color.
		iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(0, 10, 123, .5) 0px 1px 6px', 'z-index' : '1'});
		// Reference to the div that groups the close button elements.
		var iwCloseBtn = iwOuter.next();
		// Apply the desired effect to the close button
		iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid rgba(0, 10, 123, 1.0)', 'border-radius': '5px', 'box-shadow': '0 0 5px rgba(0, 10, 123, .9)'});
		// If the content of infowindow not exceed the set maximum height, then the gradient is removed.
		// if($('.iw-content').height() < 140){
		// $('.iw-bottom-gradient').css({display: 'none'});
		// }
	    // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
	    iwCloseBtn.mouseout(function(){
	      $(this).css({opacity: '1'});
	    });
	    //aca se registran eventos para infowindow
	    var estado = document.getElementById('estadoSucursal').value;
	    document.getElementById('estadosuc').innerHTML = '';
		if (estado === 'abierto') {
			abiertoCerrado = 'Abierto';
			var iconoAbierto = document.getElementById('iconestado');				
			iconoAbierto.setAttribute("class", "zmdi zmdi-circle iconestadoabierto");
			var infoes = document.getElementById('estadosuc');
			infoes.appendChild(document.createTextNode(abiertoCerrado));
		} else {
			var iconoCerrado = document.getElementById('iconestado');
			abiertoCerrado = 'Cerrado';
			iconoCerrado.setAttribute("class", "zmdi zmdi-circle iconestadocerrado");
			var infoes = document.getElementById('estadosuc');
			infoes.appendChild(document.createTextNode(abiertoCerrado));
		}//fin del else

		var btnCars = document.getElementById('btnCar');
		btnCars.addEventListener('click', function(){ generarRutaCar(btnCars.getAttribute('data-lat'),
																 btnCars.getAttribute('data-lng'),
																 'driving')}, false);
		var btnWalk = document.getElementById('btnWalk');
		btnWalk.addEventListener('click', function(){ generarRutaWalk(btnWalk.getAttribute('data-lat'),
																 btnWalk.getAttribute('data-lng'),
																 'walking')}, false);
		var btnBus = document.getElementById('btnBus');
		btnBus.addEventListener('click', function(){ generarCar(btnBus.getAttribute('data-lat'),
																 btnBus.getAttribute('data-lng'),
																 'bus')}, false);


  	});
}// fin del metodo editCssInfoWindow


//Edicion del CSS para el objeto InfoWindows
function editCssInfoWindow(){
	//Desde aca se comienza la manipulacion del DOM del objeto Info Window
	//nos apoyamos de jQuery
	google.maps.event.addListener(infoWindowCustom, 'domready', function() {
		// Reference to the DIV that wraps the bottom of infowindow
		var iwOuter = $('.gm-style-iw');
		iwOuter.children(':nth-child(1)').css({'display' : 'block'});		

		/* Since this div is in a position prior to .gm-div style-iw.
		* We use jQuery and create a iwBackground variable,
		* and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
		*/		
		var iwBackground = iwOuter.prev();		
		// Removes background shadow DIV
		iwBackground.children(':nth-child(2)').css({'display' : 'none'});
		// Removes white background DIV
		iwBackground.children(':nth-child(4)').css({'display' : 'none'});
		// Moves the infowindow 115px to the right.
		iwOuter.parent().parent().css({left: '0px'});
		// Changes the desired tail shadow color.
		iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(0, 10, 123, .5) 0px 1px 6px', 'z-index' : '1'});
		// Reference to the div that groups the close button elements.
		var iwCloseBtn = iwOuter.next();
		// Apply the desired effect to the close button
		iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid rgba(0, 10, 123, 1.0)', 'border-radius': '5px', 'box-shadow': '0 0 5px rgba(0, 10, 123, .9)'});
		// If the content of infowindow not exceed the set maximum height, then the gradient is removed.
		// if($('.iw-content').height() < 140){
		// $('.iw-bottom-gradient').css({display: 'none'});
		// }
	    // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
	    iwCloseBtn.mouseout(function(){
	      $(this).css({opacity: '1'});
	    });	
	    document.getElementById('estadosuc').innerHTML = '';
	    var iconoAbierto = document.getElementById('iconestado');				
			iconoAbierto.setAttribute("class", "zmdi zmdi-circle iconestadoabierto");
			var infoes = document.getElementById('estadosuc');
			infoes.appendChild(document.createTextNode("Abierto"));

		var btnCars = document.getElementById('btnCar');
		btnCars.addEventListener('click', function(){ generarRutaCar(btnCars.getAttribute('data-lat'),
																 btnCars.getAttribute('data-lng'),
																 'driving')}, false);
		var btnWalk = document.getElementById('btnWalk');
		btnWalk.addEventListener('click', function(){ generarRutaWalk(btnWalk.getAttribute('data-lat'),
																 btnWalk.getAttribute('data-lng'),
																 'walking')}, false);
		var btnBus = document.getElementById('btnBus');
		btnBus.addEventListener('click', function(){ generarCar(btnBus.getAttribute('data-lat'),
																 btnBus.getAttribute('data-lng'),
																 'bus')}, false);
  	});
}// fin del metodo editCssInfoWindow

//crea los div de las sucursales y los inserta en el contenedor
function crearSucursal(lat, lng, suc,  dir, i, marker){
	//1. creo los elementos
	//obtengo el contenedor 
	var contenedorSucursales = document.getElementById('contenedorSucursales');		
	//creo el elemento ancla class linkdiv
	var id = "linkdivsuc" + i;
	var linkdivAncla  = document.createElement("a");
	linkdivAncla.setAttribute("class", "linkdiv");
	linkdivAncla.setAttribute("id", id);
	linkdivAncla.setAttribute("data-lat", lat);
	linkdivAncla.setAttribute("data-lng", lng);
		//creo el element div class divsucursal
		var divsucursalElement  = document.createElement("div");
		divsucursalElement.setAttribute("class", "divsucursal");
			//creo el div clase infosuc
			var infosucElement  = document.createElement("div");
			infosucElement.setAttribute("class", "infosuc");
				//creo el div clase divmarker
				var divmarkerElement  = document.createElement("div");
				divmarkerElement.setAttribute("class", "divmarker");				
					//creo el elemento img con el marker
					var markerElement  = document.createElement("img")
					markerElement.setAttribute("src", "images/markFarmaAbierto.png");
				//creo el div clase detallesuc
				var detallesucElement  = document.createElement("div");				
				detallesucElement.setAttribute("class", "detallesuc");
					//creo el h3 id sucursalNombre
					var sucursalNombreElement  = document.createElement("h3");
					sucursalNombreElement.setAttribute("id", "sucursalNombre");
					sucursalNombreElement.appendChild( document.createTextNode( suc ) );
					//creo el p id dirSucursal
					var dirSucursalElement  = document.createElement("p");				
					dirSucursalElement.setAttribute("id", "dirSucursal");	
					dirSucursalElement.appendChild( document.createTextNode( dir ) );
			//creo el div clase distancediv
			var distancedivElement  = document.createElement("div");
			distancedivElement.setAttribute("class", "distancediv");
				//creo el elemento p id distanciaSuc	
				var distanciaSucElement  = document.createElement("p");
				distanciaSucElement.setAttribute("id", "distanciaSuc");

				//ACA DEBO TRAER LA DISTANCIA DE LA SUCURSAL
				var service = new google.maps.DistanceMatrixService;
				var origin = {
					lat: currentLat,
					lng: currentLng
				};
				var dest = {
					lat: lat,
					lng: lng
				};				
				service.getDistanceMatrix({
						origins: [origin],
						destinations: [dest],
						travelMode: google.maps.TravelMode.DRIVING,
						unitSystem: google.maps.UnitSystem.METRIC,
						avoidHighways: false,
						avoidTolls: false
					},
					function(response, status) {
						if (status !== google.maps.DistanceMatrixStatus.OK) {
							//implementar div
						} else {							

							var d = response.rows[0].elements[0].distance.text;
							distanciaSucElement.appendChild( document.createTextNode( d ) );							
						}
					}
				);

		//2. los inserto en los contenedores respectivos	
		distancedivElement.appendChild(distanciaSucElement);
		detallesucElement.appendChild(sucursalNombreElement);
		detallesucElement.appendChild(dirSucursalElement);
		divmarkerElement.appendChild(markerElement);
		infosucElement.appendChild(divmarkerElement);
		infosucElement.appendChild(detallesucElement);
		divsucursalElement.appendChild(infosucElement);
		divsucursalElement.appendChild(distancedivElement);
		linkdivAncla.appendChild(divsucursalElement);
		contenedorSucursales.appendChild(linkdivAncla);
		
		var sucursal = document.getElementById(id);
		sucursal.addEventListener('click', 
						function(){ generarRutaSucursal(sucursal.getAttribute('data-lat'), 
												sucursal.getAttribute('data-lng'), 'driving');
									map.hideInfoWindows();//cierra el anterior infowindow
									map.cleanRoute();//limpia toda la ruta
									console.log(map.markers[i].title);
									map.markers[i].infoWindow.open(map, map.markers[i]);},
								  false);
}// fin del metodo crearSucursal



/***************************
 Metodos de Geolocalizacion
****************************/

// tomado de http://stackoverflow.com/a/4060721
function rad(x) {return x*Math.PI/180;}
function buscarMarcador( lat, lng ) {
	var lat = lat;
    var lng = lng;
    var R = 6371; // radio de la tierra en kilometros
    var distances = [];
    var closest = -1;
    for( i=0;i<markerst.length; i++ ) {
    	var mlat = markerst[i].position.lat();
        var mlng = markerst[i].position.lng();
        var dLat  = rad(mlat - lat);
        var dLong = rad(mlng - lng);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        distances[i] = d;
        if ( closest == -1 || d < distances[closest] ) {
            closest = i;
        }
    }
    markerNear = markerst[closest];
    return [markerst[closest].position.lat(),  markerst[closest].position.lng()];    
}

//establece las coordenadas de la ubicacion actual a las variables globales de longitud y latitud
function setCurrentCoords(){
	GMaps.geolocate({
		success: function(position) {
			currentLat = position.coords.latitude;
			currentLng = position.coords.longitude;				
		},
		error: function(error) {	
		console.log("error al establecer las coordenadas")		;
		},
		not_supported: function() {			
		},		
	});
}

//Consuta la distancia entre la aubicacion actual y las coordenadas enviadas como parametros
function getCurrentDistanceGoogleMaps(lat, lng){//----este metodo no se usa... :-(
	var service = new google.maps.DistanceMatrixService;
	var origin = {lat: currentLat, lng: currentLng};
	var dest = {lat: lat, lng: lng};
	service.getDistanceMatrix(
	    {
	        origins: [origin ],
	        destinations: [dest],
	        travelMode: google.maps.TravelMode.DRIVING,
    		unitSystem: google.maps.UnitSystem.METRIC,
    		avoidHighways: false,
    		avoidTolls: false
	    }, 
		function(response, status) {
			if (status !== google.maps.DistanceMatrixStatus.OK) {
				//implementar div
			} else {
				
				var d = response.rows[0].elements[0].distance.text;
				setDistancia(d);
				console.log(distanciaActual);
			}
		}
	);	
}//fin del metodo getCurrentDistanceGoogleMaps


window.addEventListener('load',iniciar,false);
