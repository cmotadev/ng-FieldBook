var isDeviceReady = false;

document.addEventListener('deviceready', function () {
  isDeviceReady = true;
});

angular.module('deviceready', [])
  .factory('deviceReady', ['$rootScope', function ($rootScope) {
    document.addEventListener('deviceready', function () {
      $rootScope.$apply(function () {});
    });

    var obj = {};

    Object.defineProperty(obj, 'isDeviceReady', {
      get: function () {
        return isDeviceReady;
      }
    });

    return obj;
  }]);
