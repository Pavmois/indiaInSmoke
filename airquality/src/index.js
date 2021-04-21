import data from './data/english.json';
let city;
const heading = data['p_5_value'];
const dataToArray = Object.entries(data);
const citiesData = getData(dataToArray);
const cities = Object.keys(citiesData);
const select = blockCreation();
document.querySelector('h1').textContent = heading;
document.body.insertAdjacentElement('beforeend', select);

function getData(array) {
    return array.reduce((acc, val) => {
        const key = val[0];
        const value = val[1];

        if (
            /compare-tabs_1_city_/.test(key)
            && /(name|aqi|cigg)$/.test(key)
        ) {
            if (/name/.test(key)) {
                city = value;
                acc[value] = [];
            }
            else if (city) acc[city] = [...acc[city], value];
        }
        return acc;
    }, {});
}

function blockCreation() {
    const select = document.createElement('select');
    const selectData = getSelectData(cities);
    select.innerHTML = selectData;
    select.addEventListener('change', ({ target }) => {
        const ciggQuantity = citiesData[target.value] && citiesData[target.value][1];
        const pollutionMeter = citiesData[target.value] && citiesData[target.value][0];

        if (ciggQuantity && pollutionMeter) {
            const header = document.querySelector('h1');
            header.textContent = pollutionMeter;
        }
    })
    return select;
}
function getSelectData(array) {
    let selectData = `
        <option value="none" selected disabled hidden>
            Select a city 
        </option>    
    `;
    array.forEach(city => {
        selectData += `<option value=${city}> ${city} </option>`;
    });
    return selectData;
}

