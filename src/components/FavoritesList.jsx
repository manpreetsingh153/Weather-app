import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import LoadingSpinner from './LoadingSpinner';

const FavoritesList = ({ favorites, removeFromFavorites }) => {
  const [loading, setLoading] = useState(false);
  const [refreshedData, setRefreshedData] = useState({});
  const [error, setError] = useState(null);
    console.log(favorites , 'favourate')
    console.log(process.env.API_KEY)
  const refreshWeather = async (cityName) => {
    setLoading(true);
    setError(null);

    const API_KEY = process.env.API_KEY || 'dd1c1682bb8cd71e91a1957bb36d8488';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error('Failed to refresh weather data');
      }

      const data = await response.json();
      console.log(data , 'data weajher')
      setRefreshedData(prevData => ({
        ...prevData,
        [cityName]: {
          name: data.name,
          country: data.sys.country,
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          wind: data.wind.speed
        }
      }));
    } catch (err) {
      setError(`Error refreshing data for ${cityName}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getCityData = (city) => {
    console.log(refreshedData[city.name])
    console.log(city)
    return refreshedData[city.name] || city;
  };
// console.log(refreshedData)
  return (
    <div className="favorites-list">
      <h2>Favorite Cities</h2>
      
      {favorites.length === 0 ? (
        <p className="no-favorites">You haven't added any cities to favorites yet.</p>
      ) : (
        <>
          {error && <p className="error-message">{error}</p>}
          
          <div className="favorites-grid">
            {favorites.map(city => (
              <div key={city.name} className="favorite-item">
                <WeatherCard 
                  weatherData={getCityData(city)} 
                  isFavorite={true}
                  onAddToFavorites={() => {}} 
                />
                <div className="favorite-actions">
                  <button 
                    className="refresh-button" 
                    onClick={() => refreshWeather(city.name)}
                    disabled={loading}
                  >
                    Refresh
                  </button>
                  <button 
                    className="remove-button" 
                    onClick={() => removeFromFavorites(city.name)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {loading && <LoadingSpinner />}
    </div>
  );
};

export default FavoritesList;