const temp = document.querySelectorAll(".temp");
const currLocation = document.querySelectorAll(".location");
const others = document.querySelectorAll(".others");
const day = document.querySelector(".dayContainer");
const night = document.querySelector(".nightContainer")
const weatherImg = document.querySelector("#weatherImg");

function success(position) {
    const currLatitude = position.coords.latitude;
    const currLongitude = position.coords.longitude;
    async function getWeather() {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=3a98a1009a63448aa50164401232606&q=${currLatitude},${currLongitude}&aqi=no`);
        const data = await response.json();
        if(data.current.is_day){
            day.classList.remove("minimal");
        }
        else {
            night.classList.remove("minimal")
        }
        currLocation.forEach(element => element.innerText = data.location.name)
        temp.forEach(element => element.innerText = data.current.temp_c);
        others[0].innerText = data.current.wind_kph;
        others[1].innerText = data.current.humidity;
        others[2].innerText = data.current.precip_mm;
        others[3].innerHTML = others[0].innerHTML;
        others[4].innerHTML = others[1].innerHTML;
        others[5].innerHTML = others[2].innerHTML;
        let srcImg;
        switch(data.current.condition.code){
            case 1000:
                srcImg = "/weather-icons/Sunny.svg"
                break;
            case 1003:
                srcImg = "/weather-icons/PartlyCloudy.svg"
                break;
            default:
                srcImg = "/weather-icons/Rainy.svg"
                break;
        }
        weatherImg.src = srcImg;
    }
    getWeather();
}
const error = (err) => {
    console.log(err);
}
navigator.geolocation.getCurrentPosition(success, error);

day.addEventListener("click", () => {
    day.classList.remove("minimal")
    night.classList.add("minimal")
})

night.addEventListener("click", () => {
    night.classList.remove("minimal")
    day.classList.add("minimal")
})