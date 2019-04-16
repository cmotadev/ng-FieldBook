/*
 * DIRETIVA PARA ACRESCENTAR UM BOTÃO DE ATIVAR/DESATIVAR CAMERA
 */

app.directive("cameraControl", function ($cordovaCamera, $cordovaFile, $cordovaDialogs) {
        return {
            template: '<div></div>',
            restrict: "E"
        }
    });