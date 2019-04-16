/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = angular.module('ng-FieldBook', ['ngRoute', 'ngMaterial', 'ngCordova', 'deviceready']);

// Config
app.config(function ($mdIconProvider, $routeProvider) {
    // Icons
    $mdIconProvider
        .icon('gps_off', 'img/icons/gps_off.svg')
        .icon('gps_on', 'img/icons/gps_on.svg')
        .icon('marker', 'img/icons/marker.svg')
        .icon('menu', 'img/icons/menu.svg')
        .icon('more_vert', 'img/icons/more_vert.svg')
        .icon('position_off', 'img/icons/position_off.svg')
        .icon('position_on', 'img/icons/position_on.svg')
        .icon('write', 'img/icons/write.svg')
        .icon('use_map', 'img/icons/use_map.svg')
        .icon('cancel', 'img/icons/cancel.svg');

    //routes
    $routeProvider
        .when("/", {
            templateUrl: "js/routes/main.html"
        })
        .when("/profile", {
            templateUrl: "js/routes/profile.html"
        })
        .when("/stations", {
            templateUrl: "js/routes/stations.html"
        })
        .when("/summaries", {
            templateUrl: "js/routes/summaries.html"
        })
        .when("/navigation", {
            templateUrl: "js/routes/navigation.html"
        })
        // TODO: Transformar device info em diretiva separada (?)
        .when("/device_info", {
            templateUrl: "js/routes/device_info.html"
        })
        .when("/configurations", {
            templateUrl: "js/routes/configurations.html"
        })
        .when("/about", {
            templateUrl: "js/routes/about.html"
        })
        .when("/login", {
            templateUrl: "js/routes/login.html"
        })
        .when("/logout", {
            templateUrl: "js/routes/logout.html"
        });
});

// Cordova Event listeneres and other configs
app.run(function ($rootScope, $cordovaDevice, $cordovaBatteryStatus, $cordovaNetwork, $cordovaDialogs) {
    document.addEventListener("deviceready", function () {
        $rootScope.device = {}

        // device properties
        $rootScope.device.properties = $cordovaDevice.getDevice();
        console.log("Device properties OK");

        // battery
        $rootScope.device.batteryCritical = false;

        // Only Critical matters (Critical is >5% and no plugged)
        $rootScope.$on('$cordovaBatteryStatus:critical', function (result) {
            var _level = result.level;
            var _isPlugged = result.isPlugged

            if (!_isPlugged) {
                $rootScope.device.batteryCritical = true;
                console.log("Battery Critical -> Plugged: " + _isPlugged + ", Level: " + _level);
                $cordovaDialogs.alert("Too little energy, please plug-in the device to recharge it");
            }
        });
        console.log("Battery OK");

        // Network Information
        // BUG: Cordova Network doesn't play well with browsers on detect network changes.
        $rootScope.device.isOnline = $rootScope.device.properties.platform == "browser" ? true : $cordovaNetwork.isOnline();
        console.log("Network BUG? Assert device model " + $rootScope.device.properties.model + " is Online? " + $cordovaNetwork.isOnline())

        console.log("Network OK. Device " + ($rootScope.device.isOnline ? "ONLINE" : "OFFLINE"))

        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
            console.log("Network: Device ONLINE event fired - " + networkState);
            $rootScope.device.isOnline = true;
        })

        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
            console.log("Network: Device OFFLINE event fired- " + networkState);
            $rootScope.device.isOnline = false;
        })

    }, false);
});




