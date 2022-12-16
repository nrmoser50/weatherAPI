var APIkey = "57984c092f03848689bc2922b00b4d3e";
var weatherForecastEl = document.getElementById("#forecast");
var lastCitySearched;
var storedCities;
var forecastSearch = document.getElementById("#city-info");
var currentDate = dayjs().format();
var input = $(".form-control")
var cities;


// 
// Get previously stored cities
if (localStorage.getItem("cities")) {
	storedCities = JSON.parse(localStorage.getItem("cities"));
	console.log(storedCities);
	for (var i = 0; i < storedCities.length; i++) {
		lastCitySearched = storedCities.length - 1;
		var lastCity = storedCities[lastCitySearched];
	}
} else {
	cities;
}

window.localStorage.setItem("Cities", JSON.stringify(lastCity))

// search for cities
$("#search-city").on("click", function (event) {
    event.preventDefault();
    // get city input
    var city = $("#city-input").val();
    console.log(city); 
	fetchAPI()

});

function fetchAPI () {
	fetch ('https://api.openweathermap.org/data/2.5/forecast?q=' + input.val() + '&appid=' + APIkey)
	.then (function (response) {
		if (response.ok) {
			return response.json().then(function (data) {
				console.log(data)
				renderForecast(data);
				
				// renderCityName();
			});
		} else {
			alert('Error: Unable to view this city. Try again.');
		}}
		)
	}


function renderForecast(response) {
	console.log(response.list[0].main.temp);
	
	$("#temperature").text(response.list[0].main.temp);
	$("#humidity").text(response.list[0].main.humidity);
	$("#wind-speed").text(response.list[0].wind.speed);
	
	
}

// function renderCityName(response)
// 	$(".card-title").text(currentDate)
// 	var weatherIcon = $("<img>");
// 	var iconCode = a.weather[0].icon
// 	var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
// 	weatherIcon.attr("src", iconUrl);
// 	$(".card-title").attr('src', iconUrl);

