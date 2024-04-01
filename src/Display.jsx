import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

const Display = () => {
    const [all, setAll] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
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

    const paginate = (pagenumber) => {
        setCurrentPage(pagenumber);
    };

    const last = currentPage * itemsPerPage;
    const first = last - itemsPerPage;
    const current = filterResults.slice(first, last);

    return (
        <div className="display-container">
            <h1 className="display-heading">Contacts</h1>
            <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
            <DisplayItems items={current} />
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filterResults.length / itemsPerPage)}
                paginate={paginate}
            />
        </div>
    );
}

const SearchBar = ({ searchInput, setSearchInput }) => {
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

const DisplayItems = ({ items }) => {
    return (
        <div className="display-items">
            {items.map((item, id) => (
                <div key={id} className="display-item">
                    <span>{id+1}</span>
                    <img src={item.url} alt="" />
                    <p className="name">{item.name}</p>
                    <p className="email">{item.email}</p>
                    <p className="phone">{item.number}</p>
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
