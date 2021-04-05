const submitBtn = document.getElementById('submitBtn');
let city = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
let fig = document.getElementById('fig');
let temp_status = document.getElementById('temp_status');
let middle_layer = document.querySelector('.middle_layer');

const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = city.value.toLowerCase().trim();
    if (cityVal == "") {
        city_name.innerHTML = 'Please Enter City Name';
        middle_layer.classList.add('data_hide');
    } else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=6e07b6f23c317a96a88c5f68afde2311`;
            const response = await fetch(url)
            const data = await response.json()
            let currentTemp = 0;
            middle_layer.classList.remove('data_hide');
            tempValue = data.main.temp - 273.15;
            temp_stat = data.weather[0].main;
            if (tempValue.toFixed(0) - tempValue.toFixed(2) == 0) {
                currentTemp = tempValue.toFixed(0);
            } else {
                currentTemp = tempValue.toFixed(2);
            }
            fig.innerHTML = currentTemp;
            temp_status.innerHTML = temp_stat;
            city_name.innerHTML = `${cityVal.toUpperCase()}, ${data.sys.country}`;

            function showDateData() {
                let now = new Date();
                let weekday = now.getDay();
                let day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursaday', 'Friday', 'Saturday'];
                document.getElementById('day').innerHTML = day[weekday];
                let date = now.getDate();
                let month = now.getMonth();
                date = date < 10 ? date = '0' + date : date = date;
                month = month < 10 ? month = '0' + month : month = month;
                document.getElementById('today_date').innerHTML = `${date} / ${month}`;
            }

            setTimeout(() => { showDateData() }, 10);
            setInterval(() => { showDateData() }, 1000);

            let desc = ['clear sky', 'few clouds', 'scattered clouds', 'broken clouds', 'shower rain', 'rain', 'thunderstorm', 'snow', 'mist'];
            let desc_img = ['clear_sky.png', 'few_clouds.png', 'scattered_clouds.png', 'broken_clouds.png', 'shower_rain.png', 'rain.png', 'thunderstorm.png', 'snow.png', 'mist.png'];
            let res = data.weather[0].description;
            console.log(res)
            let resId = desc.indexOf(res);
            // console.log(resId);
            resId = resId == -1 ? resId = 8 : resId = resId;
            temp_status.src = `images/${desc_img[resId]}`;
        } catch {
            middle_layer.classList.add('data_hide');
            city_name.innerHTML = 'Please Enter City Name';
        }
    }
}

submitBtn.addEventListener('click', getInfo);