var db = require("../models");
var axios = require("axios");
var express = require("express");

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

  app.get("/appointments", function(req, res) {
    res.send("Welcome to the Appoinments!");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
