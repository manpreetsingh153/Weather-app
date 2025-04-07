
import React, { useState } from 'react';
import WeatherDashboard from './components/WeatherDashboard';
import FavoritesList from './components/FavoritesList';
import './App.css';

function App() {
  const [view, setView] = useState('dashboard'); 
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  
  const addToFavorites = (weatherData) => {
    if (!favorites.some(city => city.name === weatherData.name)) {
      const newFavorites = [...favorites, weatherData];
      setFavorites(newFavorites);
      
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };


  const removeFromFavorites = (cityName) => {
    const newFavorites = favorites.filter(city => city.name !== cityName);
    setFavorites(newFavorites);

    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Weather Dashboard</h1>
        <div className="nav-buttons">
          <button 
            className={view === 'dashboard' ? 'active' : ''} 
            onClick={() => setView('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={view === 'favorites' ? 'active' : ''} 
            onClick={() => setView('favorites')}
          >
            Favorites
          </button>
        </div>
      </header>

      <main>
        {view === 'dashboard' ? (
          <WeatherDashboard 
            addToFavorites={addToFavorites} 
            favorites={favorites}
          />
        ) : (
          <FavoritesList 
            favorites={favorites} 
            removeFromFavorites={removeFromFavorites} 
          />
        )}
      </main>
    </div>
  );
}

export default App;