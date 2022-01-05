import { checkAuth, logout, 
    updateWaterfrontId, 
    updateCastleId, 
    updateSkylineId, 
    updateName,
    updateSlogans,
    getCity,
    createDefaultCity
} from '../fetch-utils.js';

checkAuth();

const sloganForm = document.querySelector('.slogan-form');
const nameForm = document.querySelector('.name-form');
const waterfrontDropdown = document.querySelector('.waterfront-dropdown');
const skylineDropdown = document.querySelector('.skyline-dropdown');
const castleDropdown = document.querySelector('.castle-dropdown');
const cityNameEl = document.querySelector('.city-name');
const waterImgEl = document.querySelector('.water-img');
const skylineImgEl = document.querySelector('.skyline-img');
const castleImgEl = document.querySelector('.castle-img');
const sloganListEl = document.querySelector('.slogan-list');

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

waterfrontDropdown.addEventListener('change', async() => {
    const updatedCity = await updateWaterfrontId(waterfrontDropdown.value);

    displayCity(updatedCity);
});

castleDropdown.addEventListener('change', async() => {
    const updatedCity = await updateCastleId(castleDropdown.value);

    displayCity(updatedCity);
});

skylineDropdown.addEventListener('change', async() => {
    const updatedCity = await updateSkylineId(skylineDropdown.value);

    displayCity(updatedCity);
});

nameForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(nameForm);
    const name = data.get('name');
    const updatedCity = await updateName(name);
    displayCity(updatedCity);

});

sloganForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(sloganForm);
    const newSlogan = data.get('slogan');
    const city = await getCity();

    city.slogans.push(newSlogan);

    const updatedCity = await updateSlogans(city.slogans);

    displayCity(updatedCity);
});

window.addEventListener('load', async() => {
    const city = await getCity();

    if (!city) {
        const newCity = await createDefaultCity();
        displayCity(newCity);
    }
    else {
        displayCity(city);
    }
});

function displayCity(city) {

    cityNameEl.textContent = city.name;

    waterImgEl.src = `../assets/waterfront-${city.waterfront_id}.jpg`;
    castleImgEl.src = `../assets/castle-${city.castle_id}.jpeg`;
    skylineImgEl.src = `../assets/skyline-${city.skyline_id}.jpg`;

    sloganListEl.textContent = '';

    for (let slogan of city.slogans) {
        const sloganEl = document.createElement('p');
        sloganEl.classList.add('slogan');
        sloganEl.textContent = slogan;
        sloganListEl.append(sloganEl);
    }
}