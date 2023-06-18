let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours<10) {hours = `0${hours}`;} 
let minutes = now.getMinutes();
if (minutes<10) {minutes = `0${minutes}`;}
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day}, ${hours}:${minutes}`;

function getForecast (response) { let searchInput = document.querySelector("#city-input");
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${searchInput.value}`;
    let apiKey = "aa612t472390ab13eb3ff34a1f280o26";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${searchInput.value}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }
  
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[day];
  }

  function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = row>`;
  let forecast = response.data.daily;
  
  forecast.forEach(function (forecastDay, index) {
  if (index < 6) {
  forecastHTML = forecastHTML + `<div class="col-2">
  <div class="weather-forecast-date">
  ${formatDay(forecastDay.time)}
</div>

<img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt="" width = "36" id = "forecast-icon">


  <div class="weather-forecast-temperature">
<span class="weather-forecast-temperature-max">${Math.round(forecastDay.temperature.maximum)}°</span>
<span class="weather-forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}°</span>
</div>
</div>`;}});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#city-input");
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${searchInput.value}`;
    let apiKey = "aa612t472390ab13eb3ff34a1f280o26";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=${apiKey}&units=metric`;
    function showTemperature(response) {
      let celsiusTemperature = document.querySelector("#celsius-temperature");
      celsiusTemperature.innerHTML = `${Math.round(response.data.temperature.current)}°C`;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = Math.round(response.data.temperature.humidity);
    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed);
    let description = document.querySelector("#description");
    description.innerHTML = response.data.condition.description;
    let icon = document.querySelector("#icon");
    icon.setAttribute("src", response.data.condition.icon_url);
    icon.setAttribute("alt", response.data.condition.description);
    getForecast();
    }
    axios.get(apiUrl).then(showTemperature);
  

  }
  let form = document.querySelector("form");
  form.addEventListener("submit", search);

  