import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherInfo from "./components/WeatherInfo";
import WeatherApp from "./components/WeatherApp";
import MyHeader from "./components/MyHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
const App = () => {
  const [cityCoordinates, setCityCoordinates] = useState({ latitude: null, longitude: null });

  return (
    <div className="App">
      <BrowserRouter>
        <MyHeader />
        <Routes>
          <Route
            path="/weather"
            element={<WeatherInfo latitude={cityCoordinates.latitude} longitude={cityCoordinates.longitude} />}
          />
          <Route
            path="/"
            element={<WeatherApp onCoordinatesChange={(newCoordinates) => setCityCoordinates(newCoordinates)} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
