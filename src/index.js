let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let todaysday = document.querySelector("#current-day");
todaysday.innerHTML = `${day}`;
let todaysmonth = document.querySelector("#current-month-date");
todaysmonth.innerHTML = `${month} ${date}`;
let todaystime = document.querySelector("#current-time");
todaystime.innerHTML = `${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
         <div class="col"> <div class="weather-forecast-day">
           ${formatDay(forecastDay.dt)}</div>
           <img
           src="http://openweathermap.org/img/wn/${
             forecastDay.weather[0].icon
           }@2x.png"
           alt=""
           width="42"
           />
           <div class="col degrees">
             <span class="temp-max">${Math.round(forecastDay.temp.max)}</span>° 
             <span class="temp-min">${Math.round(forecastDay.temp.min)}</span>°
           </div>
         </div>
       `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  if (response.data.rain !== undefined && response.data.rain !== null) {
    document.querySelector("#rain").innerHTML = Math.round(
      response.data.rain["1h"]
    );
  } else {
    document.querySelector("#rain").innerHTML = 0;
  }

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].main);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "a6dcf296a7bc5180a9f85cbe8bc75e79";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function clickCity(event) {
  event.preventDefault();
  let city = event.target.id;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "a6dcf296a7bc5180a9f85cbe8bc75e79";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "a6dcf296a7bc5180a9f85cbe8bc75e79";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

let dateElement = document.querySelector;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let nextCityOslo = document.querySelector("#oslo");
nextCityOslo.addEventListener("click", clickCity);

let nextCityLondon = document.querySelector("#london");
nextCityLondon.addEventListener("click", clickCity);

let nextCitySingapore = document.querySelector("#singapore");
nextCitySingapore.addEventListener("click", clickCity);

let nextCityNewYork = document.querySelector("#newyork");
nextCityNewYork.addEventListener("click", clickCity);

searchCity("Stockholm");
