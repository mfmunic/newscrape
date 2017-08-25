$(document).ready(function(){
  $('.parallax').parallax();
  $('.modal').modal();

  

});

$.getJSON("/articles", function(data) {

    if(data.length == 0){
      $(".articleList").append("<div class='noArticles'>No Articles To View :(</div>")
    }

    for (var i = 0; i < data.length; i++) {
      if (data[i].saved == false){
        $(".articleList").append("<div class='row row"+i+"'>")
        $(".row"+i).append("<div class='col s12 m12 col"+i+"'>")
        $(".col"+i).append("<div class='card blue-grey darken-1 card"+i+"'>")
        $(".card"+i).append("<div class='card-content white-text cc"+i+"'>")
        $(".cc"+i).append("<span class='card-title'>" + data[i].title + "</span>")
        $(".cc"+i).append("<p>" + data[i].link + "</p>")
        $(".card"+i).append("<div class='card-action action"+i+"'>")
        $(".action"+i).append("<a class='waves-effect waves-light btn save' data-id=" + data[i]._id + ">Save</a>")
      }
    }
  });


// ---------------------------------------------------------------------
$(".scraper").on("click", function() {
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
    .done(function(data) {

      $(".noArticles").remove()
      $(".resNo").text("New York Times has been scraped. :)")
      console.log(data);
    });

})

$(".removeAll").on("click", function() {
  $.ajax({
    method: "GET",
    url: "/remove"
  })
    .done(function(data) {

      console.log(data);
      location.reload()
    });

})


$(document).on("click", ".save", function() {
  
  var thisId = $(this).attr("data-id");
  console.log(thisId)

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
  })
    .done(function(data) {
      console.log(data);
    });

  location.reload()
});

$(document).on("click", ".modal-action", function() {
  location.reload()
});