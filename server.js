var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.Promise = Promise;

var app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

mongoose.connect("mongodb://heroku_s4q0pmcb:j9ivchidfr5rv4oia6mqqrdgsf@ds159033.mlab.com:59033/heroku_s4q0pmcb");
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
