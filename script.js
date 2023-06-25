const nightTemperatura = document.getElementById("temperatura");

function success(position) {
    const currLatitude = position.coords.latitude;
    const currLongitude = position.coords.longitude;
    async function getWeather() {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${currLatitude}&longitude=${currLongitude}&current_weather=true&timezone=auto`);
        const data = await response.json();
        const temperature = await data.current_weather.temperature;
        
    }
    getWeather();
}
const error = (err) => {
    console.log(err);
}
navigator.geolocation.getCurrentPosition(success, error);