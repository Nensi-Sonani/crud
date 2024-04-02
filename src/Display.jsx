import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const Display = () => {
    const [all, setAll] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1); 
    const navigate =useNavigate()
    const itemsPerPage = 5;
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/contacts');
            setAll(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    const filterResults = all.filter(item => {
        return (
            item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.email.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.number.includes(searchInput)
        );
    });
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        // console.log(pageNumber);
    };
    const last = currentPage * itemsPerPage;
    // console.log(last);//p1-5 //p2-10
    const first = last - itemsPerPage;
    // console.log(first);//p1-0 //p2-5
    const current = filterResults.slice(first, last);
    // console.log(current);
    // Function to handle delete action
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/contacts/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };
    // Function to handle update action
    const handleUpdate = (id) => {
        // console.log("v");
        navigate(`/edit/${id}`)
    };
    return (
        <div className="display-container">
            <h1 className="display-heading">Information</h1>
            <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
            <DisplayItems items={current} handleDelete={handleDelete} handleUpdate={handleUpdate} />
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filterResults.length / itemsPerPage)}
                paginate={paginate}
            />
        </div>
    );
};
const SearchBar = ({ searchInput, setSearchInput }) => {
    console.log(searchInput);
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search by name, email, or phone number"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
        </div>
    );
};
const DisplayItems = ({ items, handleDelete, handleUpdate }) => {
    return (
        <div className="display-items">
            <div className='display-head'>
                <p className='no'>NO</p>
                <p className='img'>IMG</p>
                <p className='dh-name'>NAME</p>
                <p className='dh-email'>EMAIL</p>
                <p className='pn'>PHONE NO</p>
                <p className='edit'>EDIT</p>
                <p className='delete'>DELETE</p>
            </div>
            {items.map((item, id) => (
                <div key={id} className="display-item">
                    <span>{id + 1}</span>
                    {/* <div> */}
                        <img src={item.url} alt="" className='w-14' />
                    {/* </div> */}
                    <p className="name w-14">{item.name}</p>
                    <p className="email w-14">{item.email}</p>
                    <p className="phone w-14">{item.number}</p>
                    {/* FontAwesome icons for delete and update */}
                    <FontAwesomeIcon icon={faPenSquare} onClick={() => handleUpdate(item.id)} style={{cursor:"pointer",color:"#163172"}}/>
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(item.id)} style={{cursor:"pointer",color:"#ff0000"}} />
                </div>
            ))}
        </div>
    );
};
const Pagination = ({ currentPage, totalPages, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className={number === currentPage ? 'active' : null}>
                        <button onClick={() => paginate(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
export default Display;