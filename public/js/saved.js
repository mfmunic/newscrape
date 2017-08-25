$(document).ready(function(){
  $('.parallax').parallax();
  $('.modal').modal({dismissible: false});
});

$(".modal-close").on("click", function(){
  $(".oldNotes").empty()
  $(".savenote").css("background-color", "#fafafa");
  $(".savenote").text("Add Note");
})

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
      if (data[0].note.length>0){
        for(i = 0; i<data[0].note.length; i++){
          $(".oldNotes").append("<div class=lastNote id='lastNote"+i+"' data-id="+data[0].note[i]._id+">"+data[0].note[i].body+"</div>")
          $("#lastNote"+i).append("<a class='waves-effect waves-light btn red noteTrash' data-id=" + data[0].note[i]._id + "><i class='material-icons large trashIcon'>delete_forever</i></a>")
          console.log(data[0].note[i])
        }
      }

      console.log(data);
    });
});




$(document).on("click", ".savenote", function() {

  if ($("#bodyinput").val().length>0){
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
        $(".savenote").css("background-color", "green");
        $(".savenote").text("Note Added");
      });
  }

});

$(document).on("click", ".noteTrash", function() {
  $(this).text("Note Deleted")
  var thisId = $(this).attr("data-id");
  console.log(thisId)

  $.ajax({
    method: "POST",
    url: "/notes/" + thisId,
  })
    .done(function(data) {
      console.log(data);
      
    });
});