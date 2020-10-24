$(document).ready(function (){


});

function displayWeatherInfo() {

    var weather = $(this).attr("data-name");
    var queryURL = "api.openweathermap.org/data/2.5/weather?q={city name}" + weather + "&apikey=fa8b4ae438dc565e3349aaeb6215b208";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      
      var weatherDiv = $("<div>");
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
    
    var weather = $("#weather-input").val().trim();

    
    weathers.push(weather);

 
    renderButtons();
  });

 
  $(document).on("click", ".movie", displayWeatherInfo);

 
  renderButtons();
