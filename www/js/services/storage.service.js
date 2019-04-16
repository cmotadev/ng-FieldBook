// loki.JS Offline Storage Service
// https://github.com/techfort/LokiJS/wiki/LokiJS-persistence-and-adapters#loki-indexed-adapter-interface
app.service("storageService", function ($window) {
    console.log("CRS Service loaded");
    var idbAdapter = new LokiIndexedAdapter('ngFieldBook');

    var db = new loki('surveys', {adapter: idbAdapter});

    var stations = db.addCollection("stations");

    this.indexedDBEnabled = function () {
        return Boolean($window.indexedDB);
    }

    this.retrieveStations = function () {
        return stations.find({})
    }
});