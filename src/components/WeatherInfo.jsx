import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

const WeatherInfo = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = "7f7be181fc2dcbc7cc83339af3c5e567";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`Errore durante la richiesta: ${response.status}`);
        }

        const data = await response.json();

        if (data.main && data.main.temp_min) {
          data.main.temp_min = (data.main.temp_min - 273.15).toFixed(2);
        }

        if (data.main && data.main.temp_max) {
          data.main.temp_max = (data.main.temp_max - 273.15).toFixed(2);
        }

        if (data.main && data.main.temp) {
          data.main.temp = (data.main.temp - 273.15).toFixed(2);
        }

        if (data.main && data.main.feels_like) {
          data.main.feels_like = (data.main.feels_like - 273.15).toFixed(2);
        }

        setWeatherData(data);
        setError(null);
      } catch (error) {
        console.error("Errore durante la fetch del meteo:", error);
        setError("Si è verificato un errore durante la richiesta meteo.");
      } finally {
        setLoading(false);
      }
    };

    if (latitude !== null && longitude !== null) {
      fetchWeatherData();
    }
  }, [latitude, longitude, apiKey]);

  return (
    <div>
      {loading && <p>Caricamento...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <Card bg="success">
          <Card.Body>
            <Card.Title>Meteo {weatherData.name}</Card.Title>
            {weatherData.weather && weatherData.weather[0] && (
              <Card.Text>{weatherData.weather[0].description}</Card.Text>
            )}
            <Card.Text>
              Temperature, Min: {weatherData.main.temp_min}°C , Max: {weatherData.main.temp_max}°C , Generale{" "}
              {weatherData.main.temp} °C
            </Card.Text>
            <Card.Text>Perceived temperature: {weatherData.main.feels_like}°C</Card.Text>
            <Card.Text>Umidity: {weatherData.main.humidity}%</Card.Text>
            <Card.Text>Wind speed: {weatherData.wind && weatherData.wind.speed} KM/H</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default WeatherInfo;
