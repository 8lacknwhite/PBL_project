import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';


function Output() {
    const [data, setData] = useState('');
    const { state } = useLocation();


    useEffect(() => {
        const fetchData = async () => {
            try {
                // make a GET request to the backend API
                const response = await axios.get('/output');
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Predicted price of the car</h1>
            <p>{data}</p>
        </div>
    );
}

export default Output