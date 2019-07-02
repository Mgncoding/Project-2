var db = require("../models");
var express = require("express");
var app = express();
var axios = require("axios");

module.exports = function(app) {
  // ? Get all users
  app.get("/api/user", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  // ? Create User
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  // ? Delete User
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  // ? Update User
  app.put("/api/users", function(req, res) {
    db.User.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  // TODO GOOGLE PLACES API
  app.post("/api/appointments", function(req, res) {
    console.log(
      "My Cordinates: " + req.body.latitude + "," + req.body.longitude
    );
    var baseURL =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";

    // console.log(baseURL)
    var queryURL;
    var location =
      "location=" + req.body.latitude + "," + req.body.longitude + "&";
    var radius = "radius=4000&";
    var type = "type=car_repair&";
    var keyword = "keyword=alignment&";
    // var keyword = "keyword=" + req.body.input + "&";
    var key = "key=AIzaSyCReYUHB_r_e1waSDFZsZemuNPUMksfWY4";
    queryURL = baseURL + location + radius + type + keyword + key;

    console.log(queryURL);
    // First Call
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
      })
      .catch(function(err) {
        console.log(err.message, "No available fields in this type.");
      });
  });
  // TODO MAIN
  app.post("/api/getMaintenance", function(req, res) {
    console.log(req.body.year);
    //   var BASEURL = "http://api.carmd.com/v3.0/maint?";
    // // console.log(BASEURL)
    // var queryURL;
    // var year = `year=${req.query.year}&`;
    // var make = `make=${req.query.make}&`;
    // var model = `model=${req.query.model}&`;
    // var mileage = `mileage=${req.query.mileage}`;
    // var vin = `vin=${req.query.vin}&`;
    // // If statement, User only wants to put in the vin and miles
    // // if (queryURL = BASEURL + vin + mileage) {
    // // } else if (
    //     // queryURL = BASEURL + year + make + model + mileage
    //     queryURL = "http://api.carmd.com/v3.0/maint?"
    // // );
    // console.log(response);
    // axios
    //     .get(queryURL, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "Basic YjEzN2NlZWMtM2E5OS00MjVkLTg3NTktZWQ5Y2Q2NTNmMDg5",
    //             "Partner-Token": "0b515ac66a9246af95901cf07d9a47a1"
    //         }
    //     })
    //     .then(function (response) {
    //         // console.log(response.data);
    //         // Starting object to send to the db
    //         var maintenanceData = {};
    //         // An array for maintenance services with its properties
    //         maintenanceData.maintenanceServices = [];
    //             var res = response.data.data
    //         for (var i = 0; i < res.length; i++) {
    //             maintenanceServiceItem = {};
    //             maintenanceServiceItem.description = res[i].desc;
    //             maintenanceServiceItem.dueMileage = res[i].due_mileage;
    //             maintenanceServiceItem.totalCost =  res[i].repair.total_cost, res[i].repair_difficulty, res[i].repair.repair_hours;
    //             maintenanceServiceItem.parts = res[i].parts.desc, res[i].parts.price, res[i].parts.qty
    //             maintenanceServiceItem.completed = false;
    //             maintenanceData.maintenanceServices.push(maintenanceServiceItem);
    //         }
    //         console.log(res[i])
    //     })
    //     .catch(function (err) {
    //         console.log(err.message, "No available fields in")
    //     })
  });
};
