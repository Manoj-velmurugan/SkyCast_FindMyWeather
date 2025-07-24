import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Weather = () => {
  const city = localStorage.getItem('city') || '';
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9ffddc5046ff39062159ae1c51d52b6a&units=metric`)
      .then((res) => setWeather(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [city]);

  const temperatureF = useMemo(() => {
    if (!weather) return null;
    return (weather.main.temp * 9) / 5 + 32;
  }, [weather]);

  if (!city) return <p>No city provided. Go back to <Link to="/">Home</Link>.</p>;
  if (loading) return <p>Loading...</p>;
  if (!weather) return <p>Weather data not found.</p>;

  return (
    <div className="container">
      <h2>Weather in {weather.name}</h2>
      <p>Condition: {weather.weather[0].description}</p>
      <p>Temperature: {weather.main.temp}°C / {temperatureF.toFixed(1)}°F</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default Weather;
