import React from 'react';
import './navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div>
                <a href="#home">Home</a>
            </div>
            <div>
                <a href="#about">About</a>
            </div>
            <div>
                <a href="#services">Services</a>
            </div>
            <div>
                <a href="#contact">Contact</a>
            </div>
        </nav>
    );
};

export default Navbar;