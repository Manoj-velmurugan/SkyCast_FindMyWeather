# SkyCast - Find My Weather
## Date: 24/07/2025
## Objective:
To build a responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API. This project demonstrates the use of Axios for API calls, React Router for navigation, React Hooks for state management, controlled components with validation, and basic styling with CSS.
## Tasks:

#### 1. Project Setup
Initialize React app.

Install necessary dependencies: npm install axios react-router-dom

#### 2. Routing
Set up BrowserRouter in App.js.

Create two routes:

/ – Home page with input form.

/weather – Page to display weather results.

#### 3. Home Page (City Input)
Create a controlled input field for the city name.

Add validation to ensure the input is not empty.

On valid form submission, navigate to /weather and store the city name.

#### 4. Weather Page (API Integration)
Use Axios to fetch data from the OpenWeatherMap API using the city name.

Show temperature, humidity, wind speed, and weather condition.

Convert and display temperature in both Celsius and Fahrenheit using useMemo.

#### 5. React Hooks
Use useState for managing city, weather data, and loading state.

Use useEffect to trigger the Axios call on page load.

Use useCallback to optimize form submit handler.

Use useMemo for temperature conversion logic.

#### 6. UI Styling (CSS)
Create a responsive and clean layout using CSS.

Style form, buttons, weather display cards, and navigation links.

## Programs:
##Home.jsx
```
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('City name is required');
      return;
    }
    localStorage.setItem('city', city.trim());
    navigate('/weather');
  }, [city, navigate]);

  return (
    <div className="container">
      <h1>SkyCast - Know weather</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setError('');
          }}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Home;
```

##Weather.jsx
```
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
```

##App.jsx
```
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Weather from './pages/Weather';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/weather" element={<Weather />} />
    </Routes>
  );
};

export default App;
```

##index.css
```
body {
  font-family: Arial, sans-serif;
  background: #e9f4fc;
  padding: 20px;
  margin: 0;
  text-align: center;
}

.container {
  max-width: 400px;
  margin: auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
}

input {
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  cursor: pointer;
}

a {
  display: inline-block;
  margin-top: 10px;
  color: #0077cc;
}
```

## Output:
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/0206e5ca-c3a2-439b-8889-1d11b01cd192" />

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/054e00b1-036b-4dd7-b24c-9cc2a4602d07" />


## Result:
A responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API has been built successfully. 
