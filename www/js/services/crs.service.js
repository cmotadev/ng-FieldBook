app.service("crsService", function () {
    console.log("CRS Service loaded");

        this.geoCRS = [
            {srid: 4326, name: "WGS-84", proj4: null},
            {srid: 4291, name: "SAD-69", proj4: null},
            {srid: 4225, name: "Córrego Alegre", proj4: null},
            {srid: 4674, name: "SIRGAS 2000", proj4: null}
        ]
    });