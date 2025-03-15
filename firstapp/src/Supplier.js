import React from 'react';
import { useNavigate } from "react-router-dom";
import './styles.css';

function Supplier() {
    const navigate = useNavigate();

    const goToAddRawMaterialLot = () => {
        navigate('/addRawMaterialLot'); // Redirection vers la page d'ajout de lot
    };

    return (
        <div className="supplierContainer">
            <div className="supplierContent">
                <h2>Fournisseur de Matières Premières</h2>
                <div className="buttonGroup">
                    <button className="fancyButton" onClick={goToAddRawMaterialLot}>
                        Ajouter un Lot de Matières Premières
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Supplier;
