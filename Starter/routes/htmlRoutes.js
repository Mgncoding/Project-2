var db = require("../models");
var axios = require("axios");
var express = require("express");
var path = require("path");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Google Places API
  app.get("/info", function(req, res) {
    console.log("The: " + req + res);
    var baseURL =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
    // console.log(baseURL)
    var queryURL;
    var location = "location=28.5705477,-81.6058133&";
    var radius = "radius=4000&";
    var type = "type=car_repair&";
    var keyword = "keyword=alignment&";
    var key = "key=AIzaSyCReYUHB_r_e1waSDFZsZemuNPUMksfWY4";
    queryURL = baseURL + location + radius + type + keyword + key;
    console.log(queryURL);
    axios
      .get(queryURL, {})
      .then(function(response) {
        var resp = response.data.results;
        // console.log(response.data);
        for (i = 0; i < response.data.results.length; i++) {
          console.log(
            "Name: " + resp[i].name + ", Vicinity: " + resp[i].vicinity
          );
        }
        console.log(response.data.results);
        res.send("Car Repairs Working");
      })
      .catch(function(err) {
        console.log(err.message, "No available fields in this type.");
      });
  });
      // Second call for user location
      queryURL2 =
      "https://maps.googleapis.com/maps/api/js?" + key + "&callback=initMap";
    axios
      .get(queryURL2, {})
      .then(function(response) {
        console.log("location" + response);
        // console.log(response.data);
      })
      .catch(function(err) {
        console.log(err.message, "No available fields in this type.");
      });
  
  // TODO Second Page
  app.get("/info2", function(req, res) {
    console.log("The: " + req + res);
    // console.log(baseURL)
    var queryURL =
      "http://api.carmd.com/v3.0/repair?vin=1GNALDEK9FZ108495&mileage=51000&dtc=p0420";
    console.log(queryURL);
    axios
      .get(queryURL, {
        headers: {
          "content-type": "application/json",
          authorization:
            "Basic MjJhMTY2YjktY2YxZC00NmRmLTkzOGMtZTdhMDdkZGZmYzM1",
          "partner-token": "113b01f3793b4d1f8f0547be7b659ee8"
        }
      })
      .then(function(response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function(err) {
        console.log(err.message, "No available fields in this type.");
      });
  });


  app.get("/appointments", function(req, res) {
    res.send("Welcome to the Appointments!");
  });
  // TODO Maint
  app.get("/getMaintenance", function (req, res) {
    var BASEURL = "http://api.carmd.com/v3.0/maint?";
    // console.log(BASEURL)
    var queryURL;
    var year = `year=${req.query.year}&`;
    var make = `make=${req.query.make}&`;
    var model = `model=${req.query.model}&`;
    var mileage = `mileage=${req.query.mileage}`;
    var vin = `vin=${req.query.vin}&`;

    // If statement, User only wants to put in the vin and miles
    if (queryURL = BASEURL + vin + mileage) {
    } else if (
        queryURL = BASEURL + year + make + model + mileage
    );
    console.log(response);
    axios
        .get(queryURL, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic YjEzN2NlZWMtM2E5OS00MjVkLTg3NTktZWQ5Y2Q2NTNmMDg5",
                "Partner-Token": "0b515ac66a9246af95901cf07d9a47a1"
            }
        })
        .then(function (response) {
            // console.log(response.data);

            // Starting object to send to the db
            var maintenanceData = {};
            // An array for maintenance services with its properties
            maintenanceData.maintenanceServices = [];
                var res = response.data.data

            for (var i = 0; i < res.length; i++) {
                maintenanceServiceItem = {};
                maintenanceServiceItem.description = res[i].desc;
                maintenanceServiceItem.dueMileage = res[i].due_mileage;
                maintenanceServiceItem.totalCost =  res[i].repair.total_cost, res[i].repair_difficulty, res[i].repair.repair_hours;
                maintenanceServiceItem.parts = res[i].parts.desc, res[i].parts.price, res[i].parts.qty   
                maintenanceServiceItem.completed = false;
                maintenanceData.maintenanceServices.push(maintenanceServiceItem);
            }
            console.log(res[i])
        })
        .catch(function (err) {
            console.log(err.message, "No available fields in")
        })


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
});
};