var db = require("../models");
var axios = require("axios");
var express = require("express");
var path = require("path");
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

module.exports = function(app) {
  app.get("/", function(req, res) {
    console.log("in /api/appoint.");
    res.sendFile(path.join(__dirname, "../index.html"));
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

  // TODO Maint
  app.get("/api/getMaintenance", function(req, res) {
    console.log("in /api/main.");
    res.sendFile(path.join(__dirname, "../jindex.html"));
  });

  app.get("/api/users", function(req, res) {
    console.log("in /api/users.");
    res.sendFile(path.join(__dirname, "../index.html"));
  });

  app.get("/proSearch", function(req, res) {
    res.render("pro");
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
