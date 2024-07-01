import './App.css';
import { useState } from 'react';

function App() {
  const [weather, setWeather] = useState([]);

  function getCityCoordinate(e) {
    e.preventDefault();
    let lat, lng = 0;
    let city = '';
    city = document.getElementById('cities').value;
    switch (city) {
      case 'JKT':
        lat = 10.0; lng = 9.0; break;
      case 'KL':
        lat = 10.0; lng = 9.0; break;
      case 'SG':
        lat = 10.0; lng = 9.0; break;
      case 'MNL':
        lat = 10.0; lng = 9.0; break;
      case 'HAN':
        lat = 10.0; lng = 9.0; break;
      default:
        lat = 0; lng = 0;
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
    if(!lat || ! lng) {
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
    console.log(weather)
    let url = `https://www.7timer.info/bin/api.pl?lon=${lng}&lat=${lat}&product=civil&output=json`
    await fetch(url).then(
      (response) => response.json()
    ).then(
      (data) => setWeather([data.dataseries])
    ).catch(
      (err) => console.log(err)
    )
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
          <option value='MNL'>Manila, Phillipines</option>
        </select>
        <button type='submit'>Search for Forecast</button>
      </form><br/>

      <form onSubmit={getWeatherFromCoordinate} id='input-form'>
        <label htmlFor="input-lat">Latitude</label>
        <input type='text' id='input-lat' name='input-lat' />
        <label htmlFor="city-lng">Longitude</label>
        <input type='text' id='input-lng' name='input-lng' />
        <button type='submit'>Search for Forecast</button>
      </form>

      <div>
        {/* {weather} */}
      </div>
    </div>
  )

}

export default App;
