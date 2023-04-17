const appCont = document.querySelector(".container");
const locationSearch = document.querySelector(".search-wrapper button");
const weatherShell = document.querySelector(".weather-shell");
const weatherInfo = document.querySelector(".weather-info");
const error404 = document.querySelector(".not-found");

locationSearch.addEventListener("click", () => {
    //Insert API key from openweathermap.org
    const APIkey = "############################";
    const location = document.querySelector(".search-wrapper input").value;

    if (location === "") {
        return;
    }

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.cod === 404) {
                appCont.style.display = "400px";
                weatherShell.style.display = "none";
                weatherInfo.style.display = "none";
                error404.style.display = "block";
                return;
            }

            error404.style.display = "none";
            error404.classList.remove("FadeIn");

            const image = document.querySelector(".weather-shell img");
            const temp = document.querySelector(".weather-shell .temp");
            const desc = document.querySelector(".weather-shell .desc");
            const humidity = document.querySelector(".weather-info .humidity span");

            const wind = document.querySelector(".weather-info .wind span");

            switch (data.weather[0].main) {
                case "Clear":
                    image.src = "images/clear.png";
                    break;

                case "Rain":
                    image.src = "images/rain.png";
                    break;

                case "Snow":
                    image.src = "images/snow.png";
                    break;

                case "Clouds":
                    image.src = "images/cloud.png";
                    break;

                case "Haze":
                    image.src = "images/mist.png";
                    break;

                default:
                    image.src = "";
            }

            temp.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
            desc.innerHTML = `${data.weather[0].description}`;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;

            weatherShell.style.display = "";
            weatherInfo.style.display = "";
            weatherShell.classList.add("fadeIn");
            weatherInfo.classList.add("fadeIn");
            appCont.style.height = "590px";
        });
});
