var polandMap; // obiekt globalny
var init = true;
var markers = [];



function startGoogleMaps() {
    var mapOption = {
        minZoom: 2,
        mapTypeId: google.maps.MapTypeId.hybrid,
        disableDefaultUI: true,
    };
    polandMap = new google.maps.Map(document.getElementById("googleMaps"), mapOption);
    setInitView();
    addPolandLine(); // funkcja do obramowki


//Tu coś próbuję z API wiki


    // Używanie XMLHttpRequest
   // Xhr .  SetRequestHeader ( 'Api-User-Agent' , 'Przykład / 1.0' );

    // Używanie jQuery
   /* $ .  Ajax ( {
        Url : remoteUrlWithOrigin ,
        Dane : queryData ,
        DataType : 'json' ,
        Wpisz : "POST" ,
        Nagłówki : { 'Api-User-Agent' : 'Przykład / 1.0' },
        Sukces : funkcja ( dane ) {
        // coś z danymi
    }
} );
*/

    // Używając mw.Api, określ go podczas tworzenia obiektu mw.Api
 /*   Var api = nowa mw .  Api ( {
        Ajax : {
            Nagłówki : { 'Api-User-Agent' : 'Przykład / 1.0' }
        }
    } );
    Api .  Get ( {...} ).  Wykonane ( funkcja ( dane ) {
        // coś z danymi
    });

*/


    // marker z dymkiem
    addMarker(50.06465, 19.94498, 'Miasto Kraków         </br><a href="krakow.html">Zobacz więcej</a>');
    addMarker(51.107885, 17.038538, 'Miasto Wrocław      </br><a href="wroclaw.html">Zobacz więcej</a>');
    addMarker(50.675107, 17.921298, 'Miasto Opole        </br><a href="opole.html">Zobacz więcej</a>');
    addMarker(50.264892, 19.023782, 'Miasto Katowice     </br><a href="katowice.html">Zobacz więcej</a>');
    addMarker(50.041187, 21.99912, 'Miasto Rzeszów       </br><a href="rzeszow.html">Zobacz więcej</a>');
    addMarker(51.246454, 22.568446, 'Miasto Lublin       </br><a href="lublin.html">Zobacz więcej</a>');
    addMarker(50.866077, 20.628568, 'Miasto Kielce       </br><a href="kielce.html">Zobacz więcej</a>');
    addMarker(51.759249, 19.455983, 'Miasto Łódź         </br><a href="lodz.html">Zobacz więcej</a>');
    addMarker(52.406374, 16.925168, 'Miasto Poznań       </br><a href="poznan.html">Zobacz więcej</a>');
    addMarker(51.935621, 15.506186, 'Miasto Zielona Góra </br><a href="zielona_gora.html">Zobacz więcej</a>');
    addMarker(53.428544, 14.552812, 'Miasto Szczecin     </br><a href="szczecin.html">Zobacz więcej</a>');
    addMarker(53.01379, 18.598444, 'Miasto Toruń         </br><a href="torun.html">Zobacz więcej</a>');
    addMarker(52.229676, 21.012229, 'Miasto Warszawa     </br><a href="warszawa.html">Zobacz więcej</a>');
    addMarker(53.132489, 23.16884, 'Miasto Białystok     </br><a href="../bialystok.html">Zobacz więcej</a>');
    addMarker(53.778422, 20.480119, 'Miasto Olsztyn      </br><a href="olsztyn.html">Zobacz więcej</a>');
    addMarker(54.352025, 18.646638, 'Miasto Gdańsk       </br><a href="gdansk.html">Zobacz więcej</a>');
    addStateLine(); // obramowka wojewodztwa
}

function addPolandLine() {
    new google.maps.Polygon({
        map: polandMap,
        paths: [polandPoint], // w osobnym pliku point
        strokeColor: '#ff0000',
        strokeWeight: 4,
        strokeOpacity: 0.7,
        fillColor: '#ff0000',
        fillOpacity: 0.2
    });
}

function addStateLine() { //wojewodztwa
    new geoXML3.parser({map: polandMap, zoom: false}).parse('StatesOfPoland.kml');
}

function addMarker(lat, lng, txt) {
    // tworzymy marker
    var markerOption =
        {
            position: new google.maps.LatLng(lat, lng),
            map: polandMap
        }
    var marker = new google.maps.Marker(markerOption);

    var markerText = new google.maps.InfoWindow();// dymek do markera
    markerText.setContent(txt);
    markers.push(markerText);
    google.maps.event.addListener(marker, "click", function () {

        $.each(markers, function( index, value ) {
            value.close();
        });

        markerText.open(polandMap, marker);// wywolanie markera
    });
    return marker;
}

function setInitView() {
    var initialBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(49.963404, 15.842683), // max lewy dol  czyli poludnie zachod
        new google.maps.LatLng(54.732558, 23.497754)  // max prawa gora czyli polnoc wschod
    );

    google.maps.event.addListener(polandMap, 'bounds_changed', function (event) {
        if(init) {
            polandMap.setOptions({minZoom: polandMap.zoom});
            init = false;
        }
    });

    polandMap.fitBounds(initialBounds);

    var centerBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(51.277231, 17.534812), // max lewy dol  czyli poludnie zachod
        new google.maps.LatLng(53.497035, 21.855902)  // max prawa gora czyli polnoc wschod
    );

    var lastValidCenter = polandMap.getCenter();

    google.maps.event.addListener(polandMap, 'center_changed', function() {
        if (centerBounds.contains(polandMap.getCenter())) {
            // still within valid bounds, so save the last valid position
            lastValidCenter = polandMap.getCenter();
            return;
        }

        // not valid anymore => return to last valid position
        polandMap.panTo(lastValidCenter);
    });

}
