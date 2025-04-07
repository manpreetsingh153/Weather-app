
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
// // src/App.js
// import React from "react";
// import { Route, Switch } from "react-router";
// import HomePage from "./component/HomePage";
// import FavoriteCitiesPage from "./component/FavoriteCitiesPage";

// function App() {
//   return (

//     <div className="App">
//       <Switch>
//         <Route  path="/" component={HomePage} />
//         <Route path="/favorites" component={FavoriteCitiesPage} />
//       </Switch>
//     </div>

//   );
// }

// export default App;


// // import logo from "./logo.svg";
// // import "./App.css";
// // import axios from "axios";
// // import { useEffect, useState } from "react";

// // function App() {
// //   const [city, setCity] = useState("");
// //   const [weatherData, setWeatherData] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [favoriteCities, setFavoriteCities] = useState([]);

// //   // Correctly access the API key from the .env file
// //   const apiKey = process.env.REACT_APP_API_KEY; // This should be 'REACT_APP_API_KEY'
// //   console.log(apiKey);

// //   // Function to fetch weather data for a specific city
// //   const fetchWeatherForCity = async (cityName) => {
// //     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
// //     try {
// //       const response = await axios.get(apiUrl);
// //       return response.data;
// //     } catch (err) {
// //       console.error("Error fetching data for city:", cityName);
// //       return null;
// //     }
// //   };

// //   // Fetch favorite cities' weather on page load
// //   useEffect(() => {
// //     const savedFavorites = sessionStorage.getItem("favoriteCities");
// //     if (savedFavorites) {
// //       const cities = JSON.parse(savedFavorites);
// //       setFavoriteCities(cities);

// //       // Fetch updated weather data for each city in the favorites list
// //       const updateFavoriteCitiesWeather = async () => {
// //         const updatedCities = await Promise.all(
// //           cities.map(async (city) => {
// //             const updatedCityData = await fetchWeatherForCity(city.name);
// //             if (updatedCityData) {
// //               return updatedCityData;
// //             }
// //             return city; // Return original city data if the update failed
// //           })
// //         );

// //         setFavoriteCities(updatedCities);
// //         sessionStorage.setItem("favoriteCities", JSON.stringify(updatedCities)); // Update sessionStorage
// //       };

// //       updateFavoriteCitiesWeather();
// //     }
// //   }, [apiKey]); // Add `apiKey` as dependency to refetch if needed

// //   // Function to fetch weather for the entered city
// //   const fetchWeather = async () => {
// //     if (!city) return;

// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const response = await axios.get(
// //         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
// //       );
// //       setWeatherData(response.data);
// //     } catch (err) {
// //       setError("City not found or error in fetching data.");
// //     }
// //     setLoading(false);
// //   };

// //   // Function to add a city to the favorites list
// //   const addToFavorites = () => {
// //     if (
// //       weatherData &&
// //       !favoriteCities.some((fav) => fav.name === weatherData.name)
// //     ) {
// //       const updatedFavorites = [...favoriteCities, weatherData];
// //       setFavoriteCities(updatedFavorites);
// //       sessionStorage.setItem(
// //         "favoriteCities",
// //         JSON.stringify(updatedFavorites)
// //       ); // Save to sessionStorage
// //     }
// //   };

// //   // Function to remove a city from the favorite list
// //   const removeFromFavorites = (cityName) => {
// //     const updatedFavorites = favoriteCities.filter(
// //       (fav) => fav.name !== cityName
// //     );
// //     setFavoriteCities(updatedFavorites);
// //     sessionStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites)); // Save to sessionStorage
// //   };

// //   return (
// //     <div className="weather-dashboard">
// //       <h1>Weather Dashboard</h1>

// //       <div className="search">
// //         <input
// //           type="text"
// //           value={city}
// //           onChange={(e) => setCity(e.target.value)}
// //           placeholder="Enter city"
// //         />
// //         <button onClick={fetchWeather}>Get Weather</button>
// //       </div>

// //       {loading && <div>Loading...</div>}
// //       {error && <div className="error">{error}</div>}

// //       {weatherData && !loading && (
// //         <div className="weather-info">
// //           <h2>{weatherData.name}</h2>
// //           <p>{weatherData.main.temp}°C</p>
// //           <p>{weatherData.weather[0].description}</p>
// //           <img
// //             src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
// //             alt="Weather Icon"
// //           />
// //           <button onClick={addToFavorites}>Add to Favorites</button>
// //         </div>
// //       )}

// //       <h2>Favorite Cities</h2>
// //       <div className="favorites">
// //         {favoriteCities.map((fav, index) => (
// //           <div key={index} className="favorite-item">
// //             <h3>{fav.name}</h3>
// //             <p>{fav.main.temp}°C</p>
// //             <p>{fav.weather[0].description}</p>
// //             <img
// //               src={`http://openweathermap.org/img/wn/${fav.weather[0].icon}.png`}
// //               alt="Weather Icon"
// //             />
// //             <button onClick={() => removeFromFavorites(fav.name)}>
// //               Remove
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;
