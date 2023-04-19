import React, { useState } from "react";
import { carData } from "../data/Appdata";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';


function Homepage() {
    const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  const handleManufacturerChange = (e) => {
    setSelectedManufacturer(e);
    setSelectedModel(''); // reset selected model
  };

  const handleModelChange = (e) => {
    setSelectedModel(e);
  };

  const manufacturerOptions = carData.map((data) => (
    <Dropdown.Item key={data.manufacturer} eventKey={data.manufacturer}>
      {data.manufacturer}
    </Dropdown.Item>
  ));

  const modelOptions =
    selectedManufacturer &&
    carData.find((data) => data.manufacturer === selectedManufacturer).models.map((model) => (
      <Dropdown.Item key={model} eventKey={model}>
        {model}
      </Dropdown.Item>
    ));

  return (
    <div>
      <h2>Select your car</h2>
      <Dropdown onSelect={handleManufacturerChange}>
        <Dropdown.Toggle variant="primary" id="manufacturer-dropdown">
          {selectedManufacturer || 'Manufacturer'}
        </Dropdown.Toggle>
        <Dropdown.Menu>{manufacturerOptions}</Dropdown.Menu>
      </Dropdown>
      <Dropdown onSelect={handleModelChange}>
        <Dropdown.Toggle
          variant="primary"
          id="model-dropdown"
          disabled={!selectedManufacturer}
        >
          {selectedModel || 'Model'}
        </Dropdown.Toggle>
        <Dropdown.Menu>{modelOptions}</Dropdown.Menu>
      </Dropdown>
    </div>
  );

}

export default Homepage