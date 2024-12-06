import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListTimeEntries = () => {
    const [timeEntries, setTimeEntries] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchTimeEntries = async () => {
        try {
            const response = await axios.get('/time-entries', { params: { startDate, endDate } });
            setTimeEntries(response.data);
            console.log(timeEntries)
        } catch (error) {
            console.error('Erro ao carregar os registros de ponto:', error);
        }
    };

    useEffect(() => {
        fetchTimeEntries();
    }, []);

    return (
        <div>
            <h1>Registros de Ponto</h1>
            <input type="date" onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" onChange={(e) => setEndDate(e.target.value)} />
            <button onClick={fetchTimeEntries}>Filtrar</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Cargo</th>
                        <th>Idade</th>
                        <th>Gestor</th>
                        <th>Data e Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(timeEntries) && timeEntries.map(point => (
                        <tr key={point.id}>
                            <td>{point.id}</td>
                            <td>{point.name}</td>
                            <td>{point.position}</td>
                            <td>{point.age}</td>
                            <td>{point.manager_name}</td>
                            <td>{point.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListTimeEntries;
