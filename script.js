var APIkey = "57984c092f03848689bc2922b00b4d3e";
// var weatherForecastEl = document.getElementById("#forecast");
var lastCitySearched;
var storedCities = []
// var forecastSearch = document.getElementById("#city-info");
var currentDate = dayjs().format();
var input = $(".form-control")
var user = document.getElementById("#city-input")

init ();

// Get previously stored cities
function init () {
	localStorage.getItem("Cities") 
		storedCities = JSON.parse(localStorage.getItem("Cities"));
		console.log(storedCities);
		// for (var i = 0; i < storedCities.length; i++) {
		// 	lastCitySearched = storedCities.length - 1;
		// 	var lastCity = storedCities[lastCitySearched];
//}
};

// 



// search for cities
$("#search-city").on("click", function (event) {
    event.preventDefault();
    // get city input
    var city = $("#city-input").val();
    console.log(city);
	getCoordinates(city); 
	
	localStorage.setItem("Cities", JSON.stringify(city))

});

function getCoordinates (cityName) {
	console.log(cityName);
	fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${APIkey}&units=imperial`)
	.then(function (response) {
		if (response.ok) {
			return response.json().then(function (data) {
				// console.log(data)
				console.log(data[0].lat)
				console.log(data[0].lon)
				fetchAPI(data[0].lat, data[0].lon);
			})
		}
		
	})
	} 
	
function fetchAPI (lat, lon) {
	fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`)
	.then (function (response) {
		if (response.ok) {
			return response.json().then(function (data) {
				console.log(data)
				renderForecast(data);
				// renderIcons();
				
				// renderCityName();
			});
		} else {
			alert('Error: Unable to view this city. Try again.');
		}}
		)
	}


function renderForecast(response) {
	
	$("#temperature").text(response.list[0].main.temp);
	$("#humidity").text(response.list[0].main.humidity);
	$("#wind-speed").text(response.list[0].wind.speed);
	// for (let i = 6; i < list.length; i++) 
}

function renderIcons(response) {
var iconCode = a.weather[0].icon;
console.log(iconCode);
var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
$('#forecast').attr('src', iconURL);
}

