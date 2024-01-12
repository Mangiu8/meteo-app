import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const WeatherApp = ({ onCoordinatesChange }) => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  let timeoutId;

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fetchCoordinates(newCity);
    }, 1000);
  };

  const apiKey = "7f7be181fc2dcbc7cc83339af3c5e567";

  const fetchCoordinates = async (city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      const data = await response.json();

      const { coord } = data;
      const newCoordinates = { latitude: coord.lat, longitude: coord.lon };
      onCoordinatesChange(newCoordinates);

      navigate("/weather");
    } catch (error) {
      console.error("Errore durante la fetch:", error);
    }
  };

  return (
    <Container className="weather-app mt-3">
      <h1 className="display-4">Il miglior sito di previsioni</h1>
      <p>Cerca la tua Citta'</p>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <input className="form-control" type="text" placeholder="Cerca..." value={city} onChange={handleCityChange} />
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherApp;
