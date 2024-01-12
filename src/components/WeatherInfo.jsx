import React, { useState, useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

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
  const getIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  };
  return (
    <div>
      {loading && <p>Caricamento...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <Container>
          <Card bg="success">
            <Card.Body>
              <Card.Title>Meteo {weatherData.name}</Card.Title>
              <Card.Img variant="top" src={getIcon(weatherData.weather[0].icon)} style={{ width: "60px" }} />
              {weatherData.weather && weatherData.weather[0] && (
                <Card.Text>
                  <strong>{weatherData.weather[0].description}</strong>{" "}
                </Card.Text>
              )}
              <Card.Text>
                Temperature, Min: <strong>{weatherData.main.temp_min}°C</strong> , Max:{" "}
                <strong>{weatherData.main.temp_max}°C</strong> , Generale <strong> {weatherData.main.temp} °C</strong>
              </Card.Text>
              <Card.Text>
                Perceived temperature: <strong>{weatherData.main.feels_like}°C</strong>
              </Card.Text>
              <Card.Text>
                Umidity: <strong>{weatherData.main.humidity}%</strong>
              </Card.Text>
              <Card.Text>
                Wind speed:<strong> {weatherData.wind && weatherData.wind.speed} KM/H</strong>
              </Card.Text>
              <Link to="/">
                <Button variant="primary">Home</Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      )}
    </div>
  );
};

export default WeatherInfo;
