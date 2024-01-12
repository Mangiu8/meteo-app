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

    // Cancella il timer precedente se presente
    clearTimeout(timeoutId);

    // Imposta un nuovo timer per attendere un po' prima di effettuare la chiamata API
    timeoutId = setTimeout(() => {
      fetchCoordinates(newCity);
    }, 1000); // Attendere 1 secondo prima di effettuare la chiamata API (puoi regolare il valore a tuo piacimento)
  };

  const apiKey = "7f7be181fc2dcbc7cc83339af3c5e567";

  const fetchCoordinates = async (city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      const data = await response.json();

      // Estrai le coordinate dalla risposta della API
      const { coord } = data;
      const newCoordinates = { latitude: coord.lat, longitude: coord.lon };
      onCoordinatesChange(newCoordinates);

      // Naviga alla pagina WeatherInfo dopo il cambio delle coordinate
      navigate("/weather");
    } catch (error) {
      console.error("Errore durante la fetch:", error);
    }
  };

  return (
    <Container className="weather-app mt-3">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <input
            className="form-control"
            type="text"
            placeholder="Cerca la città..."
            value={city}
            onChange={handleCityChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherApp;
