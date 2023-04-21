import React, { useState } from "react";
import { carData } from "../data/Appdata";
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


// year, transmission, km, fuel, modal, manufacturer, location, ownership, 

function Homepage() {
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [year, setYear] = useState('');
  const [km, setKm] = useState('');
  const [selectedTransmission, setSelectedTransmission] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedOwnership, setSelectedOwnership] = useState('');
  const [formData, setFormData] = useState({
    manufacturer:"",
    model:"",
    year:"",
    transmission:"",
    fuel:"",
    location:"",
    ownership:"",
    Km:""
  })
  


  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/', formData);
      navigate('/output', { state: {data: response.data} });
    } catch (error) {
      console.log(error);
    }
    setFormData({
      manufacturer: selectedManufacturer,
      model: selectedModel,
      year: year,
      transmission: selectedTransmission,
      fuel: selectedFuel,
      location: selectedLocation,
      ownership: selectedOwnership,
      km: km
    });
  };



  const handleManufacturerSelect = (event) => {
    setSelectedManufacturer(event.target.value);
    setSelectedModel('');
    setSelectedTransmission('');
    setSelectedFuel('');
    setSelectedOwnership('');
  };
  const handleModelSelect = (event) => {
    setSelectedModel(event.target.value);
    setSelectedTransmission('');
    setSelectedFuel('');
    setSelectedOwnership('');
  };
  const handleTransmissionSelect = (event) => {
    setSelectedTransmission(event.target.value);
    setSelectedFuel('');
    setSelectedOwnership('');
  };
  const handleFuelSelect = (event) => {
    setSelectedFuel(event.target.value);
    setSelectedOwnership('');
  }
  const handleOwnershipSelect = (event) => {
    setSelectedOwnership(event.target.value);
  }
  const handleYearInput = (event) => {
    const value = event.target.value.replace(/\D/g, ''); // only allow digits
    setYear(value);
  };
  const handleKmInput = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    setKm(value);
  };
  const handleSelectedLocation = (event) => {
    const value = event.target.value
    setSelectedLocation(value);
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
      <Form method="post" action="/output" onSubmit={handleSubmit}>
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
            <option value={selectedTransmission}>Automatic</option>
            <option value={selectedTransmission}>Manual</option>
          </Form.Select>
        }
        {
          <Form.Select onChange={handleFuelSelect}>
            <option>Select Fuel Type</option>
            <option value={selectedFuel}>Petrol</option>
            <option value={selectedFuel}>Diesel</option>
          </Form.Select>
        }
        {
          <Form.Select onChange={handleOwnershipSelect}>
            <option>Select Ownership</option>
            <option value={selectedOwnership}>1</option>
            <option value={selectedOwnership}>2</option>
            <option value={selectedOwnership}>3</option>
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
            type="text"
            placeholder="Enter Kilmeter driven (integer only)"
            value={km}
            onChange={handleKmInput}
          />
        )}
        {selectedModel && (
          <Form.Control
            type="text"
            placeholder="Location"
            value={selectedLocation}
            onChange={handleSelectedLocation}
          />
        )}
        <Button as="input" type="submit" value="Submit"/>{' '}


      </Form>
    </div>
  );
}

export default Homepage