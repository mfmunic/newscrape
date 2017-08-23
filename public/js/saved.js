$(document).ready(function(){
  $('.parallax').parallax();
  $('.modal').modal();
});

$.getJSON("/saved", function(data) {

    if(data.length == 0){
      $(".articleList").append("<div class='noArticles'>No Articles To View :(</div>")
    }

    for (var i = 0; i < data.length; i++) {
      if (data[i].saved == true){
        $(".articleList").append("<div class='row row"+i+"'>")
        $(".row"+i).append("<div class='col s12 m12 col"+i+"'>")
        $(".col"+i).append("<div class='card blue-grey darken-1 card"+i+"'>")
        $(".card"+i).append("<div class='card-content white-text cc"+i+"'>")
        $(".cc"+i).append("<span class='card-title'>" + data[i].title + "</span>")
        $(".cc"+i).append("<p>" + data[i].link + "</p>")
        $(".card"+i).append("<div class='card-action action"+i+"'>")
        $(".action"+i).append("<a class='waves-effect waves-light btn red deleteArt' data-id=" + data[i]._id + ">Delete From Saved</a>")
        $(".action"+i).append("<a class='waves-effect waves-light btn  modal-trigger notes' href='#modal2' data-id=" + data[i]._id + ">Notes</a>")
      }
    }
});

//-----------------------------------------------

$(document).on("click", ".deleteArt", function() {
  
  var thisId = $(this).attr("data-id");
  console.log(thisId)

  $.ajax({
    method: "POST",
    url: "/remove/" + thisId,
  })
    .done(function(data) {
      location.reload()
    });

    
});

$(document).on("click", ".notes", function() {
  
  var thisId = $(this).attr("data-id");
  console.log(thisId)
  $(".savenote").attr("data-id", thisId)

  $.ajax({
    method: "get",
    url: "/saved/" + thisId,
  })
    .done(function(data) {
      $(".noteTitle").text(data[0].title)
      
      console.log(data);
    });
});




$(document).on("click", ".savenote", function() {

  var thisId = $(this).attr("data-id");
  console.log(thisId)

  $.ajax({
    method: "POST",
    url: "/submit/" + thisId,
    data: {
      body: $("#bodyinput").val()
    }
  })
    .done(function(data) {
      console.log(data)
      $("#bodyinput").val("");
    });
});