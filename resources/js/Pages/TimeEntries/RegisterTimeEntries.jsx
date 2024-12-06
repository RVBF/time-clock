import React from 'react';
import axios from 'axios';

const TimeEntries = () => {
    const TimeEntries = async () => {
        try {
            await axios.post('/points/register');
            alert('Ponto registrado com sucesso!');
        } catch (error) {
            alert('Erro ao registrar o ponto.');
        }
    };

    return (
        <div>
            <h1>Registrar Ponto</h1>
            <button onClick={TimeEntries}>Registrar</button>
        </div>
    );
};

export default TimeEntries;
