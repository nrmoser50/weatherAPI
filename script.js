const APIkey = "57984c092f03848689bc2922b00b4d3e";
let storedCities = JSON.parse(localStorage.getItem("Cities")) || []
let user = document.getElementById("#city-input");
let forecastContainer = document.querySelector(".forecast-container");
let currentContainer = document.querySelector(".card-body");

window.onload = function() {
	init();
};
// Get previously stored cities on page load
function init () { 
		
		let ulEl = document.querySelector(".list-group");
		ulEl.innerHTML = ""
		for (var i = 0; i < storedCities.length; i++) {
		let liEl = document.createElement("li");
		liEl.setAttribute("class", "list-group-item")
		liEl.textContent = storedCities[i]
		liEl.setAttribute("data-cityName", storedCities[i])
		liEl.onclick = function(){
			var cityName = $(this).attr("data-cityName")
			getCoordinates(cityName);
		}
		ulEl.append(liEl)
		// console.log(storedCities)	
		} 	
		
}; 

// search for cities
$("#search-city").on("click", function (event) {
    event.preventDefault();
    let city = $("#city-input").val()
    if (!storedCities.includes(city)) {
		storedCities.push(city)
		localStorage.setItem("Cities", JSON.stringify(storedCities))
	}
	getCoordinates(city); 
	
	});


function getCoordinates (cityName) {
	init();
	// console.log(cityName);
	fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${APIkey}&units=imperial`)
	.then(function (response) {
		if (response.ok) {
			return response.json().then(function (data) {
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
				
				let weatherData = [];

				for (var i = 0; i < data.list.length; i++){
					// console.log(dayjs(data.list[i].dt_txt).hour());
					if (12 === dayjs(data.list[i].dt_txt).hour()) {

						weatherData.push(data.list[i]);
					}
				}
				// console.log(data);
				
				renderForecast(weatherData);
				
			});
		} else {

			alert('Error: Unable to view this city. Try again.');

		}}
		)

		fetchCurrentWeather(lat, lon)
	}

function fetchCurrentWeather(lat, lon) {
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`)
	.then (function (response) {
		if (response.ok) {
			return response.json().then(function (data) {
				renderCurrent(data)
			})
		}}); 

}

function renderCurrent(currentConditions) {
	// console.log(currentConditions);
	currentContainer.innerHTML = ""
	var cityTitle = document.createElement("h3")
	cityTitle.textContent = currentConditions.name
	var imgEl = document.createElement("img")
	imgEl.setAttribute("src", `http://openweathermap.org/img/wn/${currentConditions.weather[0].icon}@2x.png`)
	cityTitle.appendChild(imgEl);
	currentContainer.append(cityTitle);
	var tempEl = document.createElement("p")
	tempEl.textContent = "Temperature: " + Math.round(currentConditions.main.temp) + " F"
	currentContainer.append(tempEl);
	var windEl = document.createElement("p")
	windEl.textContent = "Wind Speed: " + currentConditions.wind.speed + " mph"
	currentContainer.append(windEl)
	var humidityEl = document.createElement("p")
	humidityEl.textContent = "Humidity: " + currentConditions.main.humidity + "%"
	currentContainer.append(humidityEl);

	
}



function renderForecast(weatherData) {
	// console.log(weatherData)
	forecastContainer.innerHTML = ""
	
	
	for (var i = 0; i < weatherData.length; i++) {
		var date = weatherData[i].dt_txt.split(" ")[0]
		// console.log(date);
		var year = date.split("-")[0];
		var month = date.split("-")[1];
		var day = date.split("-")[2];
		var formattedDate = new Date(month + "/" + day + "/" + year).toString().split(" ")[0]
		// console.log(formattedDate);
		var cardDiv = document.createElement("div")
		cardDiv.setAttribute("class", "forecast card")
		var cardTitle = document.createElement("h5")
		cardTitle.textContent = formattedDate
		var pTemp = document.createElement("p")
		pTemp.setAttribute("class", "card-text temperature")
		pTemp.textContent = "Temperature: " + weatherData[i].main.temp + " F";
		
		var pHumidity = document.createElement("p")
		pHumidity.setAttribute("class", "card-text humidity")
		pHumidity.textContent = "Humidity: " + weatherData[i].main.humidity + "%";
		
		var pWindSpeed = document.createElement("p");
		pWindSpeed.setAttribute("class", "card-text wind speed");
		pWindSpeed.textContent = "Wind speed: " + weatherData[i].wind.speed + " MPH";

		var imgEl = document.createElement("img")
		imgEl.setAttribute("src", `http://openweathermap.org/img/wn/${weatherData[i].weather[0].icon}@2x.png`)
		cardTitle.appendChild(imgEl);
		
		cardDiv.append(cardTitle)
		cardDiv.append(pTemp)
		cardDiv.append(pHumidity)
		cardDiv.append(pWindSpeed);

		forecastContainer.append(cardDiv)

	}
}

init ();