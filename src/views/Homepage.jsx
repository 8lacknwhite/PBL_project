import React, { useState } from "react";
import { carData } from "../data/Appdata";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
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
    manufacturer: "",
    model: "",
    year: "",
    transmission: "",
    fuel: "",
    location: "",
    ownership: "",
    Km: ""
  })



  const navigate = useNavigate();

  

  const handleSubmit = async (event) => {
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
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000', formData);
      navigate('http://localhost:3000/output', { state: { data: response.data } });
    } catch (error) {
      console.log(error);
    }
  };




  const handleManufacturerSelect = (event) => {
    setSelectedManufacturer(event.target.value);
    setSelectedModel('');
  };
  const handleModelSelect = (event) => {
    setSelectedModel(event.target.value);
  };
  const handleTransmissionSelect = (event) => {
    setSelectedTransmission(event.target.value);
  };
  const handleFuelSelect = (event) => {
    setSelectedFuel(event.target.value);
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
      <Container>
        <Row>
          <Col>
            <Form method="post" action="/output " onSubmit={handleSubmit}>
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
                  <option value={"Automatic"}>Automatic</option>
                  <option value={"Manuel"}>Manual</option>
                </Form.Select>
              }
              {
                <Form.Select onChange={handleFuelSelect}>
                  <option>Select Fuel Type</option>
                  <option value={"Petrol"}>Petrol</option>
                  <option value={"Diesel"}>Diesel</option>
                </Form.Select>
              }
              {
                <Form.Select onChange={handleOwnershipSelect}>
                  <option>Select Ownership</option>
                  <option value={"1"}>1</option>
                  <option value={"2"}>2</option>
                  <option value={"3"}>3</option>
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
              <Button as="input" type="submit" value="Submit" />{' '}

            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Homepage