
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

document.addEventListener('DOMContentLoaded', function(){
  var latitude;
  var longitude;
  const locationBar = document.querySelector("#location");
  const searchBtn = document.querySelector("#search-btn");
  const searchBar = document.querySelector('#search-container');
  const searchResults = document.getElementById("currentWeather");
  const main = document.querySelector("main");
  const foreCast = document.querySelector("#forecast")

  const dailyForecastButton = document.getElementById("dailyforecast");

  dailyForecastButton.addEventListener(
    'click', ()=>{
      
        foreCast.scrollIntoView({ behavior: 'smooth' });
    });
   
  
  
  const includes =
    "days,hours,alerts,current,events,obs,remote,fcst,stats,statsfcst";
  const forecastBasisDate = "2023-05-01";
  const elements = 
    "temp,datetime,tempmax,tempmin,cloudcover,conditions,description,datetimeEpoch,tzoffset,dew,feelslike,feelslikemax,feelslikemin,humidity,icon,moonphase,offsetSeconds,precip,precipcover,precipprob,preciptype,pressure,snow,snowdepth,source,stations,sunrise,sunset,sunriseEpoch,moonrise,moonriseEpoch,uvindex,visibility,winddir,windgust,windspeed,windspeedmax,windspeedmean,windspeedmin,solarradiation,solarenergy,serverrisk,cape,cin";
 
  const address = document.querySelector("#locationName")
  let locationName = document.querySelector("#locationName p");
  
  let temperatureValue = document.querySelector("#temperature #value p");
  let temperatureUnit = document.querySelector("#temperature #unit p");
  
  let condition = document.querySelector("#condition p");
  
  let tempmax = document.querySelector("#temperatureMaxMin #temperatureMax #value p");
  let tempmaxUnit = document.querySelector("#temperatureMaxMin #temperatureMax #unit p");
  let tempmin = document.querySelector("#temperatureMaxMin #temperatureMin #value p");
  let tempminUnit = document.querySelector("#temperatureMaxMin #temperatureMin #unit p");
  
  let description = document.querySelector('#description p')

  let visibility = document.querySelector("#visibility #value p")

  let windDirection = document.querySelector('#wind #info #winddirection #value p');
  let windSpeedValue = document.querySelector('#wind #info #windspeed #value p');
  let windSpeedUnit = document.querySelector('#wind #info #windspeed #unit p');
  
  let sunrise = document.querySelector("#sunmoonriseset #rise #sun #value p");
  let sunset = document.querySelector("#sunmoonriseset #set #sun #value p");
  let moonrise = document.querySelector("#sunmoonriseset #rise #moon #value p");
  let moonset = document.querySelector("#sunmoonriseset #set #moon #value p");
  
  
  let feelsLike = document.querySelector('#feelslike #temperatureFeelsLike #value p');
  let feelsLikeUnit = document.querySelector('#feelslike #temperatureFeelsLike #unit p');
  let feelsLikeMax = document.querySelector('#feelslike #temperatureMaxMinFeelsLike #temperatureMaxFeelsLike #value p');
  let feelsLikeMaxUnit = document.querySelector('#feelslike #temperatureMaxMinFeelsLike #temperatureMaxFeelsLike #unit p');
  let feelsLikeMin = document.querySelector('#feelslike #temperatureMaxMinFeelsLike #temperatureMinFeelsLike #value p');
  let feelsLikeMinUnit = document.querySelector('#feelslike #temperatureMaxMinFeelsLike #temperatureMinFeelsLike #unit p');
  
  
  
  let humidity = document.querySelector('#subothers #humidity #humidityValue #value p');
  let humidityUnit = document.querySelector('#subothers #humidity #humidityValue #unit p');
  
  
  let uvIndex = document.querySelector('#subothers #uvindex #uvindexValue #value p');
  
  let pressure = document.querySelector('#subothers #pressure #pressureValue #value p');
  let pressureUnit = document.querySelector('#subothers #pressure #pressureValue #unit p');
  
  let rain = document.querySelector('#subothers #precipitation #precipitationValue #value p');
  let rainUnit = document.querySelector('#subothers #precipitation #precipitationValue #unit p');
  
  
  let dew = document.querySelector('#subothers #dew #dewValue #value p');
  let dewUnit = document.querySelector('#subothers #dew #dewValue #unit p');
  
  let compassImage = document.querySelector('#wind #compass img');
  
  let temperatureImage = document.querySelector('#weatherIcon img');
  
  
  
  
  
  
  function getWeatherData(location) {
    return fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=3AVDR8VQAEGSNJKQSAALXWPDL&include=${includes}&elements=${elements}&contentType=json`)
  
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  
  searchBtn.addEventListener("click", () => {
    const location = locationBar.value;
    getWeatherData(location)
      .then((weatherData) => {
        updateData(weatherData);
        updateForecastDaily(weatherData);
        UIbehaviour();
      });
  });
  
  function updateData(weatherData) {
    console.log("Updating data...");
      locationName.textContent = weatherData.resolvedAddress;
   
    temperatureImage.src = `./assets/3rd Set - Color/${weatherData.currentConditions.icon}.png`;
    temperatureValue.textContent = weatherData.currentConditions.temp;
    tempmax.textContent = weatherData.days[0].tempmax;
    tempmin.textContent = weatherData.days[0].tempmin;
    visibility.textContent = weatherData.currentConditions.visibility;
    feelsLike.textContent = weatherData.currentConditions.feelslike;
    feelsLikeMax.textContent = weatherData.days[0].feelslikemax;
    feelsLikeMin.textContent = weatherData.days[0].feelslikemin;
    humidity.textContent = weatherData.currentConditions.humidity;
    rain.textContent = weatherData.currentConditions.precip;
    windSpeedValue.textContent = weatherData.currentConditions.windspeed;
    pressure.textContent = weatherData.currentConditions.pressure;
    const windDir = weatherData.currentConditions.winddir;
  
    const windDirectionText =
      windDir === 0 || windDir === 360 ? "North" :
        windDir > 0 && windDir < 90 ? "North-East" :
          windDir === 90 ? "East" :
            windDir > 90 && windDir < 180 ? "South-East" :
              windDir === 180 ? "South" :
                windDir > 180 && windDir < 270 ? "South-West" :
                  windDir === 270 ? "West" :
                    windDir > 270 && windDir < 360 ? "North-West" :
                      "Unknown";
  
    windDirection.textContent = windDirectionText;
    compassImage.style.transform = `rotate(${windDir}deg)`;
    uvIndex.textContent = weatherData.currentConditions.uvindex;
    sunrise.textContent = weatherData.currentConditions.sunrise;
    sunset.textContent = weatherData.currentConditions.sunset;
    condition.textContent = weatherData.currentConditions.conditions;
    description.textContent = weatherData.currentConditions.description;
  dew.textContent = weatherData.currentConditions.dew
  console.log("Data updated successfully");
  }
  
  
  
  function UIbehaviour() {
    const searchTerm = locationBar.value.trim();
  
    if (searchTerm !== "") {
      address.style.display = "flex";
      searchResults.style.display = "flex";
      foreCast.style.display = "flex"
      main.style.paddingBlock = "50px";
    } else {
      address.style.display = "none";
      searchResults.style.display = "none";
      foreCast.style.display = "none";
      main.style.paddingBlock = "0px";
    }
  }
  
})




// Function to create a single day's HTML structure
function createDailyHTML(data, winddir) {
  const dailyElement = document.createElement('div');
  dailyElement.classList.add('eachday');

  // Create and append HTML elements for a single day using data
  // Date
  const dateElement = document.createElement('div');
  dateElement.classList.add('fdate');
  dateElement.textContent = `${new Date(data.date).toLocaleDateString('en-GB')}, ${days[new Date(data.date).getDay()]}`;
  dailyElement.appendChild(dateElement);

  // Main Content
  const mainElement = document.createElement('div');
  mainElement.classList.add('fmain');

  // Main Image
  const mainImageElement = document.createElement('div');
  mainImageElement.classList.add('fmainimg');
  const mainImage = document.createElement('img');
  mainImage.setAttribute('height', '30');
  mainImage.setAttribute('width', '30');
  mainImage.setAttribute('src', data.mainImageSrc);
  mainImage.setAttribute('alt', '');
  mainImageElement.appendChild(mainImage);
  mainElement.appendChild(mainImageElement);

  // Main Text
  const mainTextElement = document.createElement('div');
  mainTextElement.classList.add('fmaintext');

  // Temperature
  const temperatureElement = document.createElement('div');
  temperatureElement.classList.add('ftemp');
  const temperatureValueElement = document.createElement('p');
  temperatureValueElement.classList.add('ftempValue');
  temperatureValueElement.textContent = data.temperature.value;
  const temperatureUnitElement = document.createElement('p');
  temperatureUnitElement.classList.add('ftempUnit');
  temperatureUnitElement.textContent = data.temperature.unit;
  temperatureElement.appendChild(temperatureValueElement);
  temperatureElement.appendChild(temperatureUnitElement);
  mainTextElement.appendChild(temperatureElement);

  // Min/Max Temperature
  const minMaxTemperatureElement = document.createElement('div');
  minMaxTemperatureElement.classList.add('fminmax');
  const minTemperatureElement = document.createElement('div');
  minTemperatureElement.classList.add('fmin');
  const minTemperatureValueElement = document.createElement('p');
  minTemperatureValueElement.classList.add('value');
  minTemperatureValueElement.textContent = data.minMaxTemperature.min.value;
  const minTemperatureUnitElement = document.createElement('p');
  minTemperatureUnitElement.classList.add('unit');
  minTemperatureUnitElement.textContent = data.minMaxTemperature.min.unit;
  minTemperatureElement.appendChild(minTemperatureValueElement);
  minTemperatureElement.appendChild(minTemperatureUnitElement);
  minMaxTemperatureElement.appendChild(minTemperatureElement);
  minMaxTemperatureElement.appendChild(document.createTextNode('/'));
  const maxTemperatureElement = document.createElement('div');
  maxTemperatureElement.classList.add('fmax');
  const maxTemperatureValueElement = document.createElement('p');
  maxTemperatureValueElement.classList.add('value');
  maxTemperatureValueElement.textContent = data.minMaxTemperature.max.value;
  const maxTemperatureUnitElement = document.createElement('p');
  maxTemperatureUnitElement.classList.add('unit');
  maxTemperatureUnitElement.textContent = data.minMaxTemperature.max.unit;
  maxTemperatureElement.appendChild(maxTemperatureValueElement);
  maxTemperatureElement.appendChild(maxTemperatureUnitElement);
  minMaxTemperatureElement.appendChild(maxTemperatureElement);
  mainTextElement.appendChild(minMaxTemperatureElement);

  // Condition
  const conditionElement = document.createElement('div');
  conditionElement.classList.add('fcondition');
  conditionElement.textContent = data.condition;
  mainTextElement.appendChild(conditionElement);

  // Description
  const descriptionElement = document.createElement('div');
  descriptionElement.classList.add('fdesc');
  descriptionElement.textContent = data.description;
  mainTextElement.appendChild(descriptionElement);

  mainElement.appendChild(mainTextElement);
  dailyElement.appendChild(mainElement);

  // Other Data
  const otherDataElement = document.createElement('div');
  otherDataElement.classList.add('fothers');

  data.otherData.forEach((item, index) => {
      const otherDataItemElement = document.createElement('div');
      otherDataItemElement.classList.add('fothersGridElement');
      const labelElement = document.createElement('label');
      const iconElement = document.createElement('img');
      iconElement.setAttribute('width', '30');
      iconElement.setAttribute('height', '30');
      iconElement.setAttribute('src', item.iconSrc);
      iconElement.setAttribute('alt', '');
      labelElement.appendChild(iconElement);

      const valueWithUnitElement = document.createElement('div');
      valueWithUnitElement.classList.add('valueWithUnit');
      const valueElement = document.createElement('p');
      valueElement.classList.add('value');
      valueElement.textContent = item.value;
      const unitElement = document.createElement('p');
      unitElement.classList.add('unit');
      unitElement.textContent = item.unit;
      valueWithUnitElement.appendChild(valueElement);
      valueWithUnitElement.appendChild(unitElement);

      otherDataItemElement.appendChild(labelElement);
      otherDataItemElement.appendChild(valueWithUnitElement);
      otherDataElement.appendChild(otherDataItemElement);

      if (index==5) iconElement.style.transform = `rotate(${winddir}deg)`
  });

  dailyElement.appendChild(otherDataElement);

  return dailyElement;
}


// Loop to create and append 15 days of data

let dailyDataContainer = document.getElementById('daily-data'); // Declare it here

// Loop to create and append 15 days of data
function updateForecastDaily(weatherData) {
  var dailyData;
  for (let i = 0; i < 15; i++) {
    const dayData = weatherData.days[i];
    const windDir = dayData.winddir;

    // Determine wind direction text
    const windDirectionText =
      windDir === 0 || windDir === 360
        ? "North"
        : windDir > 0 && windDir < 90
        ? "North-East"
        : windDir === 90
        ? "East"
        : windDir > 90 && windDir < 180
        ? "South-East"
        : windDir === 180
        ? "South"
        : windDir > 180 && windDir < 270
        ? "South-West"
        : windDir === 270
        ? "West"
        : windDir > 270 && windDir < 360
        ? "North-West"
        : "Unknown";

    // Create dailyData object
    dailyData = {
      date: dayData.datetime,
      mainImageSrc: `./assets/3rd Set - Color/${weatherData.days[i].icon}.png`,
      temperature: {
        value: dayData.temp,
        unit: "°C",
      },
      minMaxTemperature: {
        min: {
          value: dayData.tempmin,
          unit: "°C",
        },
        max: {
          value: dayData.tempmax,
          unit: "°C",
        },
      },
      condition: dayData.condition,
      description: dayData.description,
      otherData: [
        {
          iconSrc: "https://img.icons8.com/stickers/100/temperature-high.png",
          value: dayData.feelslike,
          unit: "°C",
        },
        {
          iconSrc: "https://img.icons8.com/officel/40/pressure.png",
          value: dayData.pressure,
          unit: "mBar",
        },
        {
          iconSrc: "https://img.icons8.com/officel/80/rain.png",
          value: dayData.precip,
          unit: "mm",
        },
        {
          iconSrc: "https://img.icons8.com/officel/80/visible.png",
          value: dayData.visibility,
          unit: "km",
        },
        {
          iconSrc: "https://img.icons8.com/stickers/100/humidity.png",
          value: dayData.humidity,
          unit: "%",
        },
        {
          iconSrc: "https://img.icons8.com/ios-filled/100/compass-north.png",
          value: windDirectionText,
        },
        {
          iconSrc:
            "https://www.animatedimages.org/data/media/150/animated-windmill-image-0030.gif",
          value: dayData.windspeed,
          unit: "km/h",
        },
        {
          iconSrc: "./assets/icons8-sunrise.gif",
          value: dayData.sunrise,
        },
        {
          iconSrc: "./assets/icons8-sunset.gif",
          value: dayData.sunset,
        },
        {
          iconSrc:
            "https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/external-Dew-nature-smashingstocks-flat-smashing-stocks.png",
          value: dayData.dew,
          unit: "°C",
        },
      ],
    };

    const dailyElement = createDailyHTML(dailyData, windDir);


    dailyDataContainer.appendChild(dailyElement);
  }
}



