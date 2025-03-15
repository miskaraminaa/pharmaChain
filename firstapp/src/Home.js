import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [clicked, setClicked] = useState(false);

    const redirectTo = (path) => {
        setClicked(true);
        setTimeout(() => {
            setClicked(false);
            navigate(path); // 🔥 Correction : utilise le bon chemin
        }, 500);
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h3>PharmaChain</h3>
                <div style={styles.buttonGroup}>
                    <button className={`fancyButton ${clicked ? 'burst' : ''}`} onClick={() => redirectTo('/supplier')}>
                        Raw Material Supplier
                    </button>
                    <button className={`fancyButton ${clicked ? 'burst' : ''}`} onClick={() => redirectTo('/manufacturer')}>
                        Manufacturer
                    </button>
                    <button className={`fancyButton ${clicked ? 'burst' : ''}`} onClick={() => redirectTo('/distributor')}>
                        Distributor
                    </button>
                    <button className={`fancyButton ${clicked ? 'burst' : ''}`} onClick={() => redirectTo('/retailer')}>
                        Retailer
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url("https://example.com/battery_background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
    },
    content: {
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
        maxWidth: '500px',
        width: '100%',
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginTop: '30px',
    }
};

export default Home;
