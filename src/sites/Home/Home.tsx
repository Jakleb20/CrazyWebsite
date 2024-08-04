// import React from 'react';

import {useNavigate} from "react-router-dom";
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    
    return (
        <div className="container">
            <header className="header">
                <h1>Crazy things</h1>
            </header>
            <main className="main-content">
                <button onClick={() => navigate("/phoneNumber")}>Input Your Phone Number</button>
                <button onClick={() => navigate("/matrix")}>Matrix</button>
                <button onClick={() => navigate("/stellung")}>Stellung</button>
                <button></button>
                <button></button>
                <button></button>
            </main>
            <footer className="footer">
                <p>&copy; 2024 Meine Webseite</p>
            </footer>
        </div>
    );
};

export default Home;