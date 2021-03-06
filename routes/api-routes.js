var Article = require("../models/Article.js");
var Note = require("../models/Note.js");
var request = require("request");
var cheerio = require("cheerio");

module.exports = function(app){
  app.get("/scrape", function(req, res) {
    request("https://www.nytimes.com/", function(error, response, html) {
      
      var $ = cheerio.load(html);
      $("article h2").each(function(i, element) {
        var result = {};

        result.title = $(this).children("a").text();
        result.link = $(this).children("a").attr("href");

        var entry = new Article(result);

        Article.find({ title:result.title }, function(error, found){
          if (error) {
            console.log(entry);
          } else {
            console.log(found)
            if (found.length === 0){
              entry.save(function(err, doc) {
                if (err) {
                  console.log(err);
                }
              });
            }
          }
        });
      });
    res.send("Scrape Complete");
    });
  });


  app.get("/articles", function(req, res) {

    Article.find({}, function(error, doc) {
      if (error) {
        res.send(error);
      }
      else {
        res.send(doc);
      }
    });

  });

  app.post("/submit/:id", function(req, res) {

    var newNote = new Note(req.body);
    newNote.save(function(err, doc){
      if (err){
        console.log(err)
      } else {
        
        Article.findOneAndUpdate({_id:req.params.id}, { $push: { "note": doc._id } }, {new: true}, function(error, doc) {
          if (error) {
            res.send(error);
          }
          else {
            res.send(doc);
          }
        });
      }
    })
  });

  app.get("/saved", function(req, res) {

    Article.find({saved:true}, function(error, doc) {
      if (error) {
        res.send(error);
      }
      else {
        res.send(doc);
      }
    });

  });

  app.get("/saved/:id", function(req, res) {

    Article.find({_id:req.params.id})
      .populate("note")
      .exec(function(error, doc) {
        if (error) {
          res.send(error);
        }
        else {
          res.send(doc);
        }
      });
  });

  app.post("/articles/:id", function(req, res) {
    Article.findOneAndUpdate({_id:req.params.id}, {$set:{"saved":true}}, function(error, doc) {
          if (error) {
            res.send(error);
          }
          else {
            res.send(doc);
          }
    });
  });

  app.post("/remove/:id", function(req, res) {
    Article.remove({_id:req.params.id}, function(error, doc) {
          if (error) {
            res.send(error);
          }
          else {
            res.send(doc);
          }
    });
  });

  app.get("/remove", function(req, res) {

    Article.remove({}, function(error, doc) {
      if (error) {
        res.send(error);
      }
      else {
        res.send(doc);
      }
    });

  });

  app.get("/notes", function(req, res) {

    Note.find({}, function(error, doc) {
      if (error) {
        res.send(error);
      }
      else {
        res.send(doc);
      }
    });

  });

  app.post("/notes/:id", function(req, res) {

    Note.deleteOne({_id:req.params.id}, function(error, doc){
        if (error) {
          res.send(error);
        }
        else {
          res.send(doc);
        }
      });
  });

}