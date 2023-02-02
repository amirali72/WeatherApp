const submitBtn = document.getElementById('submitBtn');
const cityname = document.getElementById('cityname');
const citynameopt = document.getElementById('citynameopt');
const temp_status = document.getElementById('temp_status');
const temp = document.getElementById('temp');
const day = document.getElementById('day');
const date = document.getElementById('date');


const currDay = () => {
    const weekday = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
    var day = new Date().getDay();;
    var today = weekday[day];
    return today;
}

const currDate = () => {
    var mS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];
    let day = new Date().getDate();
    let month = new Date().getMonth();
    let monthName = mS[month];
    console.log(monthName);

    return `${day} ${monthName}`
}

day.innerText = currDay();
date.innerText = currDate();

const getInfo = async (event) => {
    event.preventDefault();
    const citynameval = cityname.value;
    if (citynameval==="") {
        citynameopt.innerText = "Please enter city name";
    }
    else{
            let url = `http://api.weatherapi.com/v1/current.json?key=ada6b966c6de4196b3e140425232301&q=${citynameval}&aqi=no`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            
            citynameopt.innerText =` ${arrData[0].location.name}, ${arrData[0].location.country}`;

            temp.innerText = `${arrData[0].current.temp_c}° C `
            if (arrData[0].current.condition.text === "Mist" ||
                arrData[0].current.condition.text === "Cloudy" || 
                arrData[0].current.condition.text === "Clear" || 
                arrData[0].current.condition.text === "Partly cloudy"){
                temp_status.innerHTML = '<i class="fa fa-cloud" aria-hidden="true"></i>';
            }
            if (arrData[0].current.condition.text === "Sunny") {
                temp_status.innerHTML = '<i class="fa fa-sun" aria-hidden="true"></i>';
            }
            if (arrData[0].current.condition.text === "Overcast") {
                temp_status.innerHTML = '<i class="fa fa-cloud"></i>';
            }
        }
}

submitBtn.addEventListener('click', getInfo);