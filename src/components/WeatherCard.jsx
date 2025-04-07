import React from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

const WeatherCard = ({ weatherData, onAddToFavorites, isFavorite }) => {
  const { 
    name, 
    country, 
    temp, 
    feels_like, 
    humidity, 
    description, 
    icon, 
    wind 
  } = weatherData;

  const formattedDescription = description
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{name}, {country}</h2>
        <button 
          className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
          onClick={onAddToFavorites}
          disabled={isFavorite}
          title={isFavorite ? "Already in favorites" : "Add to favorites"}
        >
          {isFavorite ? <MdFavorite fill='#dc3545' /> : <MdFavoriteBorder />}
        </button>
      </div>

      <div className="weather-body">
        <div className="weather-icon">
          <img 
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`} 
            alt={description}
          />
          <p className="weather-description">{formattedDescription}</p>
        </div>

        <div className="weather-info">
          <div className="temperature">
            <h3>{Math.round(temp)}°C</h3>
            <p>Feels like: {Math.round(feels_like)}°C</p>
          </div>

          <div className="details">
            <p>Humidity: {humidity}%</p>
            <p>Wind Speed: {wind} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;