import { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("Delhi");  // Default city
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError("");
    try {
      const API_KEY = "1002f0477fb5da5e603859e3e546cbbb"; // Replace with your API Key
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (err) {
      setError("City not found. Try another.");
      setWeather(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    if (city.trim() !== "") {
      fetchWeather(city);
    }
  };

  return (
    <div className="p-4 bg-gray-300 rounded">
      <input
        type="text"
        placeholder="Enter city..."
        className="border p-2"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 ml-2">
        Get Weather
      </button>

      {loading ? (
        <p>Loading Weather...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : weather ? (
        <p>🌦 {weather.name}: {weather.main.temp}°C | {weather.weather[0].description}</p>
      ) : null}
    </div>
  );
};

export default Weather;
