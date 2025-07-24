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
