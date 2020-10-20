$(document).ready(function (){


});

function displayMovieInfo() {

    var movie = $(this).attr("data-name");
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      
      var movieDiv = $("<div>");
      console.log(response);
      var pRating = $("<p>");
      pRating.text(response.Rated);
     
      var pYear = $("<p>");
      pYear.text(response.Year);
     
      var pPlot = $("<p>");
      pPlot.text(response.Plot);
      
      var pImg = $("<img>").attr("src",response.Poster);
      
      
      movieDiv.append(pRating, pYear, pPlot, pImg);
      
      $("#movies-view").prepend(movieDiv);
    });

  }

  function renderButtons() {

    
    $("#buttons-view").empty();
   
    for (var i = 0; i < movies.length; i++) {

      
      var a = $("<button>");
      
      a.addClass("movie");
  
      a.attr("data-name", movies[i]);
      
      a.text(movies[i]);
      
      $("#buttons-view").append(a);
    }
  }

 
  $("#add-movie").on("click", function(event) {
    event.preventDefault();
    
    var movie = $("#movie-input").val().trim();

    
    movies.push(movie);

 
    renderButtons();
  });

 
  $(document).on("click", ".movie", displayMovieInfo);

 
  renderButtons();
