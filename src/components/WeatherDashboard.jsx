import React, { useState } from 'react';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import LoadingSpinner from './LoadingSpinner';

const WeatherDashboard = ({ addToFavorites, favorites }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeatherData = async (city) => {
        setLoading(true);
        setError(null);

        const API_KEY = process.env.API_KEY || 'dd1c1682bb8cd71e91a1957bb36d8488';
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(
                    response.status === 404
                        ? 'City not found.'
                        : 'Please try again later.'
                );
            }

            const data = await response.json();
            setWeatherData({
                name: data.name,
                country: data.sys.country,
                temp: data.main.temp,
                feels_like: data.main.feels_like,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                wind: data.wind.speed
            });
        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    const isFavorite = weatherData ? favorites.some(city => city.name === weatherData.name) : false;

    return (
        <div className="weather-dashboard">
            <SearchBar onSearch={fetchWeatherData} />

            {loading && <LoadingSpinner />}

            {error && !loading && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}
            <div className="weather-dashboard-grid">

                {weatherData && !loading && (
                    <WeatherCard
                        weatherData={weatherData}
                        onAddToFavorites={() => addToFavorites(weatherData)}
                        isFavorite={isFavorite}
                    />
                )}
            </div>
        </div>
    );
};

export default WeatherDashboard;