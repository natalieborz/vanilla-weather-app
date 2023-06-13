let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day}, ${hours}:${minutes}`;

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
    }
    axios.get(apiUrl).then(showTemperature);
  

  }
  let form = document.querySelector("form");
  form.addEventListener("submit", search);

  