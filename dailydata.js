
const dailyData = {
    date: '22-01-92',
    mainImageSrc: './assets/cloud.png',
    temperature: {
        value: '33',
        unit: '°C'
    },
    minMaxTemperature: {
        min: {
            value: '31',
            unit: '°C'
        },
        max: {
            value: '35',
            unit: '°C'
        }
    },
    condition: 'Partly cloudy',
    description: 'romantic day',
    otherData: [
        {
            iconSrc: 'https://img.icons8.com/stickers/100/temperature-high.png',
            value: '35',
            unit: '°C'
        },
        {
            iconSrc: 'https://img.icons8.com/officel/40/pressure.png',
            value: '1000',
            unit: 'mBar'
        },
        {
            iconSrc: 'https://img.icons8.com/officel/80/rain.png',
            value: '35',
            unit: 'mm'
        },
        {
            iconSrc: 'https://img.icons8.com/officel/80/rain.png',
            value: '10',
            unit: 'km'
        },
        {
            iconSrc: 'https://img.icons8.com/stickers/100/humidity.png',
            value: '70',
            unit: '%'
        },
        {
            iconSrc: 'https://img.icons8.com/ios-filled/100/compass-north.png',
            value: 'North-South'
        },
        {
            iconSrc: 'https://www.animatedimages.org/data/media/150/animated-windmill-image-0030.gif',
            value: '15',
            unit: 'km/h'
        },
        {
            iconSrc: './assets/icons8-sunrise.gif',
            value: '06:30'
        },
        {
            iconSrc: './assets/icons8-sunset.gif',
            value: '06:00'
        },
        {
            iconSrc: 'https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/external-Dew-nature-smashingstocks-flat-smashing-stocks.png',
            value: '10',
            unit: '°C'
        }
    ]
};

// Function to create a single day's HTML structure
function createDailyHTML(data) {
    const dailyElement = document.createElement('div');
    dailyElement.classList.add('eachday');

    // Create and append HTML elements for a single day using data
    // Date
    const dateElement = document.createElement('div');
    dateElement.classList.add('fdate');
    dateElement.textContent = data.date;
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

    data.otherData.forEach((item) => {
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
    });

    dailyElement.appendChild(otherDataElement);

    return dailyElement;
}

const dailyDataContainer = document.getElementById('daily-data');


for (let i = 0; i < 15; i++) {
    const dailyElement = createDailyHTML(dailyData);
    dailyDataContainer.appendChild(dailyElement);
}
