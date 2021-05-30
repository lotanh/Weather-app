const btn = document.getElementById('btn')
let currentWeather =[]
var toggleBtn = document.getElementById("switchValue")
toggleBtn.checked = true
let toggleDiv = document.querySelector('.temp')
toggleDiv.style.display = 'NONE'
// console.log(isChecked);

let userType = document.getElementById('inp')

btn.addEventListener('click', (event) => {
    let userInput = userType.value;
    userType.value = ''
    if (userInput == '') {
        alert('Please write a city!');

    } else {
        userInput = userInput.toLowerCase();
        console.log(userInput);
    
        let x = new XMLHttpRequest();
    
        x.open('get' ,`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=6bc236fa8bd5e7e03f83fd8cea3eac74`);
        
        x.send();
        
        x.onload = function() {
            if(x.status != 200){
                console.log(x.status);
                if (x.status == 404) {
                    alert('not found')
                }
            }
            else{
                var weatherData = JSON.parse(x.response);
                console.log(weatherData);
                currentWeather.push(weatherData);
                // console.log(currentWeather)
                createCityCard(weatherData);
            }
        }  
    }
    // userInput.reset()
    event.preventDefault() 
})

const checkList = currentWeather.filter(item => {
    return item.includes(userType)
})

const createCityCard = (city) => {
    // creating element
    let container = document.getElementById('container')
    let div = document.createElement('div')
    let divHeader = document.createElement('div')
    divHeader.classList.add('divHeader')
    div.classList.add('city-div')
    div.classList.add('fade-in')
    let cityName = document.createElement('p')
    cityName.classList.add('city-p')
    let icon = document.createElement('img')
    icon.classList.add('weather-icon')
    let temp = document.createElement('p')
    temp.classList.add('temp')
    let tempStatus = document.createElement('p')
    tempStatus.classList.add('temp')
    let deleteCity = document.createElement('button')
    deleteCity.classList.add('delete')

    // adding value to them

    cityName.innerText = `${city.name}, ${city.sys.country}`
    let iconWeather = city.weather[0].icon
    icon.src = `http://openweathermap.org/img/wn/${iconWeather}@2x.png`
    // console.log(icon)
    let tempK = city.main.temp
    let tempC = Math.round(tempK - 273.15)
    temp.innerText = tempC + "°"
    tempStatus.innerText = city.weather[0].description
    deleteCity.innerText = 'x'

    toggleDiv.style.display = 'block'


    // appending them

    divHeader.appendChild(cityName)
    div.appendChild(divHeader)
    div.appendChild(icon)
    div.appendChild(temp)
    div.appendChild(tempStatus)
    div.appendChild(deleteCity)
    container.appendChild(div)

    // delete div

    deleteCity.addEventListener('click', () => {
        div.style.display = 'NONE'
    })

    //  Changing the temp view
    
    toggleBtn.addEventListener('click' , () => {
        if (toggleBtn.checked == false) {
            temp.innerText = Math.round(tempK) + "K";
        } else {
            temp.innerText = tempC + "°";
        }
    })
}

