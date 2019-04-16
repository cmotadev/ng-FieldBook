/* Controller */
app.controller('uiController', function ($scope, $timeout, $cordovaDialogs, $mdBottomSheet, $mdSidenav, $mdDialog) {
    /*
     * UI Manipulation
     */

    // Sidenav
    $scope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {
       return function () {
            $mdSidenav(componentId).toggle();
        };
    };

    /*$scope.showAdvanced = function (event) {
        $mdDialog.show({
            controller: function ($scope, $mdDialog) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.answer = function (answer) {
                    $mdDialog.hide(answer);
                    console.log("answered");
                };
            },
            templateUrl: 'js/controllers/templates/station_form.html',
            parent: angular.element(document.body),
            targetEvent: event,
            scope: $scope.$new(),
            clickOutsideToClose: true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        }).then(function (answer) {
            console.log('You said the information was "' + answer + '".');
        }, function () {
            console.log('You cancelled the dialog.');
        });
    };*/

    // Bind SpeedDial Buttons
    $scope.$on("useMapButtonClicked", function (event, args) {
        console.log("useMapButtonClicked");
        console.log(args);
    });

    $scope.$on("writePositionButtonClicked", function (event) {
        console.log("writePositionButtonClicked")
    });
});