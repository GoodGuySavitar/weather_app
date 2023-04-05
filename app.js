const submit= document.querySelector(".searchForm");
submit.addEventListener("submit", async function (e) {
    e.preventDefault();
    const userCity = submit.elements.city.value;
    const latNlong = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${userCity}&appid=ffdd7bce5c1ded5022b34953c02a5b69/`);
    const latitude = latNlong.data[0].lat;
    const longitude = latNlong.data[0].lon;
    
    const config = { params : { lat: latitude, lon: longitude, appid: "ffdd7bce5c1ded5022b34953c02a5b69"}}   
    const temp = await axios.get(`https://api.openweathermap.org/data/2.5/weather/`,config)
    const currTemp = Math.trunc(temp["data"].main.temp - 273.15)
    const feelsLike = Math.trunc(temp["data"].main.feels_like - 273.15)
    const humid = temp["data"].main.humidity;
    const icon = temp["data"].weather[0].icon;
    const desc = temp["data"].weather[0].description;
    // const maxTemp = Math.trunc(temp["data"].main.temp_max - 273.15)
    // const minTemp = Math.trunc(temp["data"].main.temp_min - 273.15)
    // const pressure = temp["data"].main.pressure;
    let output = `<div class="info-container"> 
    <div class="header">
        <div class="header-buffer">${userCity}</div> 
    </div>
    <div class="loc-header">
        <div class="weather-icon"><img src="https://openweathermap.org/img/wn/${icon}@2x.png"></div>
        <div class="temp-info">${currTemp}°C</div> 
    </div>
    <div class="info-city">
        <div class="city-loc">${desc}</div>
    </div>
    <div class="info-others">
        <div class="feelsLike-info">
            <div><img src="https://img.icons8.com/stickers/100/null/temperature-low.png"/></div>
            <div class="feelsLike-container">
                <div class="feelsLike">${feelsLike}°C</div>
                <div class="feelsLike-text">Feels Like</div>
            </div>
        </div>
            <div class="humidity-info">
            <div><img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/null/external-humidity-weather-justicon-lineal-color-justicon-1.png"/></div>
            <div class="humidity-container">
                <div class="humidity">${humid}%</div>
                <div class="humidity-text">Humidity</div>
            </div>
            </div>    
            </div>
        </div>`
            
            const li = document.createElement("li")
            li.classList.add("weather-app")
    li.innerHTML = output;
    document.querySelector(".new-info").appendChild(li)
    document.querySelector(".city-name").value = "";
    
})

