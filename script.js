$(document).ready(function (){


});

function getLocation() {
  var x = document.getElementById("recent-search");
  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
 lat = position.coords.latitude;
 lon =  position.coords.longitude;
 console.log(lat);
 console.log(lon);

  var APIkey = "d95fc1da79853f3038b9424209b7d6ab"
  var uvWeatherURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIkey;
  var localWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=d95fc1da79853f3038b9424209b7d6ab";
 
 // Get the local 5 day forecast for the user's current location
 function localWeather(){
     $.ajax({
         url: localWeatherURL,
         method: "GET"
       }).then(function(localResponse) {
         console.log(localResponse);
         // Get values for main local weather section and append them to the display
         var localCity = localResponse.city.name;
         var localDate = localResponse.list[0].dt_txt;
         var localIcon = "https://openweathermap.org/img/w/" + localResponse.list[0].weather[0].icon + ".png";
         var localTemp = localResponse.list[0].main.temp;
         var localHumid = localResponse.list[0].main.humidity;
         var localWind = localResponse.list[0].wind.speed;
         $("#local-area").prepend(localCity);
         $("#local-date").prepend(localDate);
         $("#local-icon").attr("src", localIcon);
         $("#local-temp").prepend(localTemp);
         $("#local-humid").prepend(localHumid);
         $("#local-wind").prepend(localWind);

        // Get values for local 5 day forecast sections
       
 // Get the UV value 
 function localUv(){
  $.ajax({
    url: uvWeatherURL,
    method: "GET"
    }).then(function(localUV) {
      console.log(localUV);
      var localUvItem = localUV.value;
      $("#local-uv").prepend(localUvItem);
    });
 }

 localUv();

 localWeather();
}
getLocation();

// Get 5 day forecast via city search
var cities = [];
function citySearch() {

$("#search-selected").css("display", "block");
var cityinput = $("#search-field").val();
console.log(cityinput);
var value = $(this).data("name");
var APIkey = "d95fc1da79853f3038b9424209b7d6ab"
var queryURL = "https://api.openweathermap.org/data/2.5/find?q=" + value + "&units=imperial&appid=" + APIkey;

  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response2) {
  console.log(response2);

  // Parameter Results go here.
  // Get values for search city section and append them to the display
  var selectCity = response2.list[0].name;
  var selectIcon = "https://openweathermap.org/img/w/" + response2.list[0].weather[0].icon + ".png";
  var selectTemp = response2.list[0].main.temp;
  var selectHumid = response2.list[0].main.humidity;
  var selectWind = response2.list[0].wind.speed;
  $("#select-area").text(selectCity);
  $("#select-icon").attr("src", selectIcon);
  $("#select-temp").text(selectTemp);
  $("#select-humid").text(selectHumid);
  $("#select-wind").text(selectWind);


}

var retrieveHistory = localStorage.getItem("Search Result");
// This function determines is retriveHistory is null or already exists
if (retrieveHistory) {
cities = retrieveHistory.split(",");
renderButtons();
}

// Clear Search History Function
$("#clear-history").click(function() {
  localStorage.clear();
  cities = [];
  $("button.city-name").remove();
});


// Function for displaying recent searches
function renderButtons() {

// Deleting the cities prior to adding new ones
// (this is necessary otherwise you will have repeat buttons)
$("#recent-search").empty();

// Looping through the array of cities
for (var i = 0; i < cities.length; i++) {

  // Then dynamicaly generating buttons for each movie in the array
  // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
  var a = $("<button>");
  // Adding a class of movie-btn to our button
  a.addClass("city-name");
  // Adding a data-attribute
  a.attr("data-name", cities[i]);
  // Providing the initial button text
  a.text(cities[i]);

  var history = localStorage.getItem("Search Result") || 0;
  localStorage.setItem("Search Result", cities);

  // Adding the button to the buttons-view div
  $("#recent-search").append(a);
}
}

// This function handles events where a button is clicked
$("#search-button").on("click", function(event) {
event.preventDefault();
// This line grabs the input from the textbox
var city = $("#search-field").val().trim();
var savedCity = $("#search-field").val().trim();


// Adding movie from the textbox to our array
cities.push(city);

// Calling renderButtons which handles the processing of our cities array
renderButtons();
});

// Adding a click event listener to all elements with a class of "city-name"
$(document).on("click", ".city-name", citySearch);

// Calling the renderButtons function to display the initial buttons
renderButtons();