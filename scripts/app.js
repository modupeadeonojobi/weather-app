const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = data => {
    //destructure properties
    const { cityDets, weather } = data;
    
    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>   
        </div>
    `;

    //update day/night and icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc); 

    /*  ternary operator, an alternative to if check
    const timeScr = weather.IsDayTime ?  'img/day.svg' :  'img/night.svg';  */

    let timeScr = null;
    if(weather.IsDayTime){
        timeScr = 'img/day.svg';
    } else {
        timeScr = 'img/night.svg';
    }
    time.setAttribute('src', timeScr);

    //remove the d-none if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

}


const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    //using object shorthand notation
    return { cityDets, weather }
};

//add submit event listener to the form
cityForm.addEventListener('submit', e => {
    //prevent default
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));


    // set local storage
    //localStorage.setItem('city', city);
});

// if(localStorage.getItem('city')){
//     updateCity(localStorage.getItem('city'))
//         .then(data => updateUI(data))
//         .catch(err => console.log(err));
// }
