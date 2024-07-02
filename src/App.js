import { useState } from 'react';
import './App.css';

function App() {
  const [ weathers, setWeathers ] = useState([]);

  function getCityCoordinate(e) {
    e.preventDefault();
    let lat, lng = 0;
    let city = '';
    city = document.getElementById('cities').value;
    switch (city) {
      case 'JKT':
        lat = -6.1944; lng = 106.8229; break;
      case 'KL':
        lat = 3.1319; lng = 101.6841; break;
      case 'SG':
        lat = 1.3521; lng = 103.8198; break;
      case 'MNL':
        lat = 14.5995; lng = 120.9842; break;
      case 'HAN':
        lat = 21.0278; lng = 105.8342; break;
        case 'BSB':
        lat = 4.8923; lng = 114.9419; break;
        case 'PNP':
        lat = 11.5564; lng = 104.9282; break;
        case 'DIL':
        lat = -8.5563; lng = 125.5798; break;
        case 'VT':
        lat = 17.9757; lng = 102.6331; break;
        case 'NPD':
        lat = 19.7633; lng = 96.0785; break;
        case 'BKK':
        lat = 13.7563; lng = 100.5018; break;
      default:
        lat = 0; lng = 0;

    requestAPI(lat, lng);
    }

    requestAPI(lat, lng);
    // read from input (city,country format)
    // get latitude and longitude from dict or key-value pair
    // send request to API server (next function)
  }

  function getWeatherFromCoordinate(e) {
    e.preventDefault()
    let lat = document.getElementById('input-lat').value;
    let lng = document.getElementById('input-lng').value;
    if (!lat || !lng) {
      alert("Please enter the correct location");
      return;
    }
    requestAPI(lat, lng);
    // read from input (latitude and longitude)
    // send request to API server
    // print data for user (other function)
  }

  async function requestAPI(lat, lng) {
    console.log("latitude:", lat);
    console.log("longitude:", lng);
    let url = `https://www.7timer.info/bin/api.pl?lon=${lng}&lat=${lat}&product=civil&output=json`
    let temp = [];
    await fetch(url).then(
      (response) => response.json()
    ).then((data) => {
      for (let i = 0; i < data.dataseries.length; i += 8) {
        temp.push(data.dataseries[i])
      }
      setWeathers(temp);
      // printWeather();
    }).catch(
      (err) => console.log(err)
    )
  }
  function printWeather() {
    // console.log(weather)
    weathers.forEach((weat) => console.log(weat));
  }

  return (
    <div id='weather-forecast'>
      <h1 id='title-main'>SEAcast</h1>
      <h2 id='title-sub'>South East Asia Weather Forecast</h2>

      <form onSubmit={getCityCoordinate} id='city-form'>
        <select name='cities' id='cities'>
          <option value='JKT'>Jakarta, Indonesia</option>
          <option value='SG'>Singapore, Singapore</option>
          <option value='KL'>Kuala Lumpur, Malaysia</option>
          <option value='HAN'>Hanoi, Vietnam</option>
          <option value='MNL'>Manila, Philippines</option>
          <option value='BSB'>Bandar Seri Begawan, Brunei</option>
          <option value='BKK'>Bangkok, Thailand</option>
          <option value='NPD'>Naypyidaw, Myanmar</option>
          <option value='DIL'>Dili, Timor Leste</option>
          <option value='VT'>Vientiane, Laos</option>
          <option value='PNP'>Phnom Penh, Cambodia</option>
        </select>
        <button type='submit'>Search for Forecast</button>
      </form><br />

      <form onSubmit={getWeatherFromCoordinate} id='input-form'>
        <label htmlFor="input-lat">Latitude</label>
        <input type='text' id='input-lat' name='input-lat' />
        <label htmlFor="city-lng">Longitude</label>
        <input type='text' id='input-lng' name='input-lng' />
        <button type='submit'>Search for Forecast</button>
      </form>

      <div className='container mt-5'>
        {weathers.map((weather) => (
          <div key={weather.timepoint} className="col-md-4 mb-4">
            <div className="card">
              <div className='card-body'>
                <h5 className='card-title'>
                  {weather.weather}
                </h5>
                <div className='card-text'>
                  <span>Temperature: {weather.temp2m}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

}

export default App;
