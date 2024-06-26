import axios from "axios";
import React, { useState } from "react";
import Swal from 'sweetalert2'
import "./App.css"; 
import { useNavigate } from "react-router-dom";

const Crud = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [url, setUrl] = useState("");
  const naviget=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj = {
      name: name,
      email: email,
      number: number,
      url: url,
    };

    try {
      await axios.post("http://localhost:5000/contacts", obj);
      Swal.fire({
        text: "Information Added Successfully",
        icon: "success"
      });
      naviget("/display")
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="crud-container">
      <h1 className="crud-heading">Add Details</h1>
      <form className="crud-form" action="" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter a name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter an email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Phone Number:</label>
          <input
            type="number"
            placeholder="Enter a phone number"
            required
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Image URL:</label>
          <input
            type="url"
            placeholder="Enter an image URL"
            required
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <input className="submit-button" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Crud;
