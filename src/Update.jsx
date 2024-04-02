import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Update = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [url, setUrl] = useState("");
    const { id } = useParams();

    useEffect(() => {
        fetchContactDetails();
    }, []);

    const fetchContactDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/contacts/${id}`);
            const info = res.data;
            setName(info.name);
            setEmail(info.email);
            setNumber(info.number);
            setUrl(info.url);
        } catch (error) {
            console.error('Error fetching contact details:', error);
        }
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedinfo = {
            name: name,
            email: email,
            number: number,
            url: url
        };

        try {
            await axios.put(`http://localhost:5000/contacts/${id}`, updatedinfo);
            Swal.fire("Information updated");
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    return (
        <div className="crud-container">
            <h1 className="crud-heading">Update Details</h1>
            <form className="crud-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Enter a name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Enter an email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Phone Number:</label>
                    <input
                        type="number"
                        placeholder="Enter a phone number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Image URL:</label>
                    <input
                        type="url"
                        placeholder="Enter an image URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                </div>
                <input className="submit-button" type="submit" value="Submit" />
            </form>
            <Link to="/display" className="back-link">
                <button className="back-button">Go back to Display</button>
            </Link>
        </div>
    );
};

export default Update;