const APIkey = "57984c092f03848689bc2922b00b4d3e";
// var weatherForecastEl = document.getElementById("#forecast");
var lastCitySearched;
var storedCities = JSON.parse(localStorage.getItem("Cities")) || []
// var forecastSearch = document.getElem= JSON.parse(localStorage.getItem("Cities"))entById("#city-info");
let currentDate = new Date();
let input = $(".form-control")
var user = document.getElementById("#city-input");

let timeData = []
// let forecastDiv = $(".forecast")
var forecastContainer = document.querySelector(".forecast-container")



// Get previously stored cities
function init () { 
		console.log(storedCities)
		var ulEl = document.querySelector(".list-group");
		ulEl.innerHTML = ""
		for (var i = 0; i < storedCities.length; i++) {
		var liEl = document.createElement("li");
		liEl.setAttribute("class", "list-group-item")
		liEl.textContent = storedCities[i]
		liEl.setAttribute("data-cityName", storedCities[i])
		liEl.onclick = function(){
			var cityName = $(this).attr("data-cityName")
			getCoordinates(cityName);
		}
		ulEl.append(liEl)	
		} 		
}; 
// display previously searched cities


// search for cities
$("#search-city").on("click", function (event) {
    event.preventDefault();
    // get city input
    var city = $("#city-input").val()
    if (!storedCities.includes(city)) {
		storedCities.push(city)
		localStorage.setItem("Cities", JSON.stringify(storedCities))
	}
	getCoordinates(city); 
	
	
	// window.localStorage.removeItem(city);
	
	
	
	
	});

function getCoordinates (cityName) {
	init();
	console.log(cityName);
	fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${APIkey}&units=imperial`)
	.then(function (response) {
		if (response.ok) {
			return response.json().then(function (data) {
				// console.log(data)
				// console.log(data[0].lat)
				// console.log(data[0].lon)
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
				// console.log(data.list)
				timeData = []
				let weatherData = []
				for (i = 0; i < data.list.length; i++){
					// console.log(dayjs(data.list[i].dt_txt).hour());
					if (12 === dayjs(data.list[i].dt_txt).hour()) {
						// console.log("strings")
						weatherData.push(data.list[i]);
					}
				}
				console.log(data);
				
				renderForecast(weatherData);
				// renderIcons();
				
				// renderCurrentSearch();
			});
		} else {
			alert('Error: Unable to view this city. Try again.');
		}}
		)
		fetchCurrentWeather(lat, lon)
	}

function fetchCurrentWeather(lat, lon) {
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)
	.then (function (response) {
		if (response.ok) {
			return response.json().then(function (data){
				console.log(data)
			})
		}})

}



function renderForecast(weatherData) {
	console.log(weatherData)
	forecastContainer.innerHTML = ""
	
	
	for (var i = 0; i < weatherData.length; i++) {
		var cardDiv = document.createElement("div")
		cardDiv.setAttribute("class", "forecast card")
		
		var pTemp = document.createElement("p")
		pTemp.setAttribute("class", "card-text temperature")
		pTemp.textContent = "Temperature = " + weatherData[i].main.temp + " F";
		
		var pHumidity = document.createElement("p")
		pHumidity.setAttribute("class", "card-text humidity")
		pHumidity.textContent = "Humidity = " + weatherData[i].main.humidity + "%";
		
		var pWindSpeed = document.createElement("p");
		pWindSpeed.setAttribute("class", "card-text wind speed");
		pWindSpeed.textContent = "Wind speed = " + weatherData[i].wind.speed + " MPH";
		
		cardDiv.append(pTemp)
		cardDiv.append(pHumidity)
		cardDiv.append(pWindSpeed);
		
		forecastContainer.append(cardDiv)
		
		renderIcons(weatherData[i].weather[0].icon)
	}
	// if(forecastContainer.style.display === "none") {
	// 	forecastContainer.style.display = "block"
	// } else {
	// 	forecastContainer.style.display = "none";
	// }

	
	
}

function renderIcons(iconCode) {
	
var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
$('.forecast').attr('src', iconURL);
}

init ();

//w3 schools date object method to pass in unix timpestamp. Format out a date.