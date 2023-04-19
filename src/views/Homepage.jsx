import React, { useState } from "react";
import { carData } from "../data/Appdata";
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Homepage() {
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [year, setYear] = useState('');
  const [km, setKm] = useState('');
  const [selectedTransmission, setSelectedTransmission] = useState('');

  const handleManufacturerSelect = (event) => {
    setSelectedManufacturer(event.target.value);
    setSelectedModel('');
    setSelectedTransmission('');
  };

  const handleTransmissionSelect = (event) => {
    setSelectedTransmission(event.target.value);
  };
  const handleModelSelect = (event) => {
    setSelectedModel(event.target.value);
    setSelectedTransmission('');
  };
  const handleYearInput = (event) => {
    const value = event.target.value.replace(/\D/g, ''); // only allow digits
    setYear(value);
  };
  
  const handleKmInput = (event) => {
    const value = event.target.value.replace(/\D/g,'');
    setKm(value);
  }

  const getManufacturerOptions = () => {
    return carData.map((item, index) => (
      <option key={index} value={item.manufacturer}>
        {item.manufacturer}
      </option>
    ));
  };

  const getModelOptions = () => {
    if (!selectedManufacturer) {
      return null;
    }

    const manufacturer = carData.find(item => item.manufacturer === selectedManufacturer);
    if (!manufacturer) {
      return null;
    }

    return manufacturer.models.map((model, index) => (
      <option key={index} value={model}>
        {model}
      </option>
    ));
  };

  return (
    <div>
      <Form.Select onChange={handleManufacturerSelect}>
        <option>Select Manufacturer</option>
        {getManufacturerOptions()}
      </Form.Select>
      {selectedManufacturer && (
        <Form.Select onChange={handleModelSelect}>
          <option>Select Model</option>
          {getModelOptions()}
        </Form.Select>
      )}
      {
        <Form.Select onChange={handleTransmissionSelect}>
            <option>Select Transmission</option>
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </Form.Select>
      }
      
      {selectedModel && (
        <Form.Control
          type="text"
          placeholder="Enter year (integer only)"
          value={year}
          onChange={handleYearInput}
        />
      )}
      {selectedModel && (
        <Form.Control
          type = "text"
          placeholder="Enter Kilmeter driven (integer only)"
          value={km}
          onChange={handleKmInput}
        />
      )}
    </div>
  );

}

export default Homepage