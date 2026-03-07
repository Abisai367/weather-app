
const weatherform = document.querySelector('.weatherform');
const userinput = document.getElementById('userinput');
const apiKey = "bfc216f67b8f6ca2aef3b901798e0554";
const apiKey2 = "60f03420128e498b8ef28037b8434f1d";
let emoji;
let emoji6;
let emoji12;
let emoji18;
const display = document.querySelectorAll(".display");
const loader = document.getElementsByClassName("loader")[0]
display.forEach(el => {el.style.display = 'none'})
loader.style.display = 'none';


weatherform.addEventListener('submit', async event =>{
    event.preventDefault();
    loader.style.display = 'flex';

    display.forEach(el => {el.style.display = 'none'})

    document.getElementById("city").textContent = "";
    document.getElementsByClassName('tempDisplay')[0].textContent = "";
    document.getElementsByClassName('humidty')[0].textContent = "";
    document.getElementsByClassName('descdisplay')[0].textContent = "";
    document.getElementsByClassName("weatherEmoji")[0].textContent = "";
    document.getElementsByClassName("windspeed")[0].textContent = "";
    document.getElementById("errorDisplay").textContent = "";

    const city = userinput.value;

    if(city){
        try {
            const weatherData = await getweatherData(city);
            displayError("");
            displayWeatherInfo(weatherData);
        } 
        catch (error) {
            displayError("Could not Get the weather of your specified place");
        }
        finally {
            loader.style.display = 'none';
            // display.forEach(el => {el.style.display = 'block'})
            
        }
    }
    else{
        displayError("Enter A valid city");
        loader.style.display = 'none';
        display[0].style.display = 'block'
    }
});

async function getweatherData(city) {
    const locationResponse = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&appid=${apiKey2}&format=json`);
    const locationData = await locationResponse.json();
    const lat = locationData[0].lat;
    const lon = locationData[0].lon;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    if(!response.ok){
        throw new Error("City not found");
    }
    const data = await response.json();
    const comingdata = await forecastResponse.json();
    console.log(data);
    console.log(comingdata);

    return {
            city: data.name,
            temperature: data.main.temp, 
            description: data.weather[0].description, 
            humidity: data.main.humidity,
            id: data.weather[0].id,
            speed: data.wind.speed,

            tempin6: comingdata.list[2].main.temp,
            descin6: comingdata.list[2].weather[0].description,
            humidin6: comingdata.list[2].main.humidity,
            idin6: comingdata.list[2].weather[0].id,
            speedin6: comingdata.list[2].wind.speed,

            tempin12: comingdata.list[4].main.temp,
            descin12: comingdata.list[4].weather[0].description,
            humidin12: comingdata.list[4].main.humidity,
            idin12: comingdata.list[4].weather[0].id,
            speedin12: comingdata.list[4].wind.speed,  

            tempin18: comingdata.list[8].main.temp,
            descin18: comingdata.list[8].weather[0].description,
            humidin18: comingdata.list[8].main.humidity,
            idin18: comingdata.list[8].weather[0].id,
            speedin18: comingdata.list[8].wind.speed
    };
}

function displayWeatherInfo(weatherData){
    const{city, temperature, description, humidity, id, speed, tempin6, descin6, humidin6, idin6, speedin6, tempin12, descin12, humidin12, idin12, speedin12, tempin18, descin18, humidin18, idin18, speedin18,} = weatherData;

    document.getElementById("city").textContent = `${city}`;
    document.getElementsByClassName('tempDisplay')[0].textContent = `${temperature.toFixed(1)}ºC`
    document.getElementsByClassName('humidty')[0].textContent = `Humidity: ${humidity}%`
    document.getElementsByClassName('descdisplay')[0].textContent = `${description}`
    document.getElementsByClassName("windspeed")[0].textContent = `Wind: ${speed}m/s`

    document.getElementsByClassName('tempDisplay')[1].textContent = `${tempin6.toFixed(1)}ºC`
    document.getElementsByClassName('humidty')[1].textContent = `Humidity: ${humidin6}%`
    document.getElementsByClassName('descdisplay')[1].textContent = `${descin6}`
    document.getElementsByClassName("windspeed")[1].textContent = `Wind: ${speedin6}m/s`

    document.getElementsByClassName('tempDisplay')[2].textContent = `${tempin12.toFixed(1)}ºC`
    document.getElementsByClassName('humidty')[2].textContent = `Humidity: ${humidin12}%`
    document.getElementsByClassName('descdisplay')[2].textContent = `${descin12}`
    document.getElementsByClassName("windspeed")[2].textContent = `Wind: ${speedin12}m/s`

    document.getElementsByClassName('tempDisplay')[3].textContent = `${tempin18.toFixed(1)}ºC`
    document.getElementsByClassName('humidty')[3].textContent = `Humidity: ${humidin18}%`
    document.getElementsByClassName('descdisplay')[3].textContent = `${descin18}`
    document.getElementsByClassName("windspeed")[3].textContent = `Wind: ${speedin18}m/s`
    

    getWeatherEmoji(id, idin6, idin12, idin18)
    display.forEach(el => {el.style.display = 'block'})

}
function getWeatherEmoji(weatherId, weatherId6, weatherId12, weatherId18){

    switch(true){
        case(weatherId > 950):
            emoji = "🌬️";
            break;

        case(weatherId > 800):
            emoji = "☁️";
            break;
    
        case(weatherId == 800):
            emoji = "☀️";
            break;
        
        case(weatherId > 700):
            emoji = "🌫️";
            break;
        
        case(weatherId > 599):
            emoji = "❄️";
            break;
        case(weatherId > 499):
            emoji = "🌧️";
            break;
        case (weatherId > 299):
            emoji = "🌦️";
            break;
        case(weatherId > 199):
            emoji = "⛈️";
            break;
        default:
            emoji = "☀️";
        
    }
    switch(true){
        case(weatherId6 > 950):
            emoji6 = "🌬️";
            break;

        case(weatherId6 > 800):
            emoji6 = "☁️";
            break;
    
        case(weatherId6 == 800):
            emoji6 = "☀️";
            break;
        
        case(weatherId6 > 700):
            emoji6 = "🌫️";
            break;
        
        case(weatherId6 > 599):
            emoji6 = "❄️";
            break;
        case(weatherId6 > 499):
            emoji6 = "🌧️";
            break;
        case (weatherId6 > 299):
            emoji6 = "🌦️";
            break;
        case(weatherId6 > 199):
            emoji6 = "⛈️";
            break;
        default:
            emoji6 = "☀️";
        
    }
    switch(true){
        case(weatherId12 > 950):
            emoji12 = "🌬️";
            break;

        case(weatherId12 > 800):
            emoji12 = "☁️";
            break;
    
        case(weatherId12 == 800):
            emoji12 = "☀️";
            break;
        
        case(weatherId12 > 700):
            emoji12 = "🌫️";
            break;
        
        case(weatherId12 > 599):
            emoji12 = "❄️";
            break;
        case(weatherId12 > 499):
            emoji12 = "🌧️";
            break;
        case (weatherId12 > 299):
            emoji12 = "🌦️";
            break;
        case(weatherId12 > 199):
            emoji12 = "⛈️";
            break;
        default:
            emoji12 = "☀️";
        
    }
    switch(true){
        case(weatherId18 > 950):
            emoji18 = "🌬️";
            break;

        case(weatherId18 > 800):
            emoji18 = "☁️";
            break;
    
        case(weatherId18 == 800):
            emoji18 = "☀️";
            break;
        
        case(weatherId18 > 700):
            emoji18 = "🌫️";
            break;
        
        case(weatherId18 > 599):
            emoji18 = "❄️";
            break;
        case(weatherId18 > 499):
            emoji18 = "🌧️";
            break;
        case (weatherId18 > 299):
            emoji18 = "🌦️";
            break;
        case(weatherId18 > 199):
            emoji18 = "⛈️";
            break;
        default:
            emoji18 = "☀️";
        
    }
    
    document.getElementsByClassName("weatherEmoji")[0].textContent = `${emoji}`
    document.getElementsByClassName("weatherEmoji")[1].textContent = `${emoji6}`
    document.getElementsByClassName("weatherEmoji")[2].textContent = `${emoji12}`
    document.getElementsByClassName("weatherEmoji")[3].textContent = `${emoji18}`
}
function displayError(message){
    document.getElementById("errorDisplay").textContent = message;
    display.forEach(el => {el.style.display = 'block'})

    display.forEach((el, index) => {
        if(index !== 0){
            el.style.display = "none";
        }
    });
}