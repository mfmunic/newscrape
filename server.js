var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.Promise = Promise;

var app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/week18day3mongoose");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

require("./routes/api-routes.js")(app);

app.listen(3000, function() {
  console.log("App running on port 3000!");
});
