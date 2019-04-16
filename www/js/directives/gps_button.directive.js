/*
 * DIRETIVA PARA ACRESCENTAR UM BOTÃO DE ATIVAR/DESATIVAR GPS
 *
 * DIRETIVA NÃO UTILIZADA
 *
 * A API Leaflet dispõe de dois métodos para o objeto Map -> Locate e StopLocate e os eventos locationfound e locationerror
 * para manipular o location diretamente do device. Ele implementa os mesmos métodos do Cordova GPS
 *
 * https://leafletjs.com/reference-1.4.0.html
 */

app.directive("gpsButton", function ($rootScope, $cordovaGeolocation, $cordovaDialogs) {
        return {
            templateUrl: "js/directives/templates/gps_button.html",
            restrict: "E",
            link: function (scope, element, attrs, controller) {
                scope.watchID = null;

                scope.gpsEnabled = function () {
                    return Boolean(scope.watchID)
                }

                scope.toggleGPS = function (watchID) {
                    if (watchID) {
                        watchID.clearWatch();
                        scope.watchID = null;
                        scope.position = {}
                        console.log("Cleaned Successfully");
                    } else {
                        console.log("Watching")

                        scope.watchID = $cordovaGeolocation.watchPosition({
                            timeout: 10000,
                            maximumAge: 3000,
                            enableHighAccuracy: true
                        });

                        scope.watchID.then(
                            null,
                            function (error) {
                                console.log("Result FAIL");

                                scope.watchID.clearWatch();
                                scope.watchID = null;

                                $cordovaDialogs.alert(
                                    'code: ' + error.code + '\n' +
                                    'message: ' + error.message + '\n'
                                )
                            },
                            function (result) {
                                console.log("GPS Position Broadcast OK");

                                $rootScope.$broadcast("positionAcquired", {
                                    x: result.coords.longitude,
                                    y: result.coords.latitude,
                                    srid: 4326,
                                    accuracy: result.coords.accuracy,
                                    altitude: result.coords.altitude,
                                    altitudeAccuracy: result.coords.altitudeAccuracy,
                                    heading: result.coords.heading,
                                    speed: result.coords.speed,
                                    timestamp: result.timestamp
                                });
                            }
                        );
                    }
                }
            }
        }
    });