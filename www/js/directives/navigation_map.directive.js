app.directive("navigationMap", function () {
    // Define mapa como Objeto
    /* TODO: Fazer este objeto ser carregado a partir de um arquivo JSON de camadas/mapas-base.
    *  Este arquivo deverá ser salvo como um arquivo de configuração
    */
    return {
        templateUrl: 'js/directives/templates/navigation_map.html',
        restrict: "E",
        // TODO: Trocar latitude/longitude por Bounds do projeto
        scope: {
            station: "=",
            longitude: "@",
            latitude: "@"
        },
        link: function (scope, element, attrs, controller) {
            // GPS por padrão é desligado
            scope.gpsEnabled = false;

            // centro da visada
            var _center = [scope.latitude, scope.longitude];

            // MAx Zoom
            var _maxZoom = 19;

            // Marcador centralizado
            var _marker = L.marker(_center, {keyboard: false});

            // marcador GPS
            var _gpsMarker = L.circle(_center);

            // camadas disponíveis
            var _basemaps = {
                "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }),
                "ESRI World": L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/WMTS/tile/1.0.0/World_Imagery/default/default028mm/{z}/{y}/{x}.jpg', {
                    attribution: '&copy; <a href="http://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9">ESRI</a>'
                })
            };

            // overlays disponíveis
            var _overlays = {};

            // Main MAP
            var _m = L.map("map", {
                center: _center,
                zoom: 6,
                minZoom: 3,
                maxZoom: _maxZoom,
                layers: [_basemaps["OpenStreetMap"], _marker]
            });

            // Attach Controls
            L.control.scale({imperial: false}).addTo(_m);  // scalebar
            L.control.layers(_basemaps, _overlays).addTo(_m); // layers and overlays
            (function () {
                var _c = L.Control.extend({
                    options: {
                        position: 'topleft'
                    },
                    onAdd: function (map) {
                        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom leaflet-control-locate');

                        var link = L.DomUtil.create('a', null, container);
                        link.setAttribute('aria-label', 'Locate');
                        link.href = "#";
                        link.title = "Locate";
                        link.role = "button";
                        link.innerText = "GPS";

                        container.onclick = function (event) {
                            event.preventDefault();

                            if (!scope.gpsEnabled) {
                                map.locate({
                                    watch: true,
                                    setView: true,
                                    maxZoom: _maxZoom - 2,
                                    enableHighAccuracy: true
                                });
                                _gpsMarker.addTo(map);

                                link.style.color = "red";
                                scope.gpsEnabled = true;
                            } else {
                                map.stopLocate();
                                map.removeLayer(_gpsMarker);

                                link.style.color = "black";
                                scope.gpsEnabled = false;
                            }
                        };

                        return container;
                    },
                    onRemove: function (map) {
                        console.log("control removed");
                    }
                });

                return new _c;
            })().addTo(_m); // Locate button


            // Attach map events
            _m.on("move", function (event) {
                // Reposition center marker
                _marker.setLatLng(event.target.getCenter())
            });

            _m.on("locationfound", function (event) {
                _gpsMarker.setLatLng(event.latlng).setRadius(event.accuracy);
            });

            _m.on("locationerror", function (event) {
                console.log("Leaflet Location Error")
            });

            // Speed dial button events
            // TODO: Colocar campos padrões para o formulário (datum, projeção, geoposicionamento, etc)
            scope.useMapButtonClicked = function(){
                var _c = _m.getCenter()
                scope.$emit("useMapButtonClicked", {x: _c.lng, y: _c.lat, srid: 4326, gpsEnabled: scope.gpsEnabled})
            };

            scope.writePositionButtonClicked = function(){
                scope.$emit("writePositionButtonClicked");
            };

            // Change position event
            // TODO: DEpois que concluir esta diretiva, testar 2-way data-binding da estação com isso.
            scope.$watch("station",function(newValue, oldValue) {
                console.log("Watching position on Scope");
                scope.$emit("positionChanged");
            });
        }
    }
});