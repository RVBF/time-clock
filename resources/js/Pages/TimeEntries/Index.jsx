import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';

export default function TimeEntriesList() {
    const { timeEntries } = usePage().props; // Props do backend
    const [timeEntriesList, setTimeEntriesList] = useState(timeEntries || []);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Função para carregar os registros de ponto com base nas datas
    const fetchTimeEntries = async () => {
        setIsLoading(true);
        try {
            // Passa startDate e endDate como parâmetros para o backend
            const response = await axios.get('/time-entries/filter/'+startDate+'/'+ endDate);
            const entries = Array.isArray(response.data) ? response.data : [];
            console.log(response.data);
            setTimeEntriesList(entries);
        } catch (error) {
            console.log('Erro ao carregar os registros de ponto:', error);
            setTimeEntriesList([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Função para deletar o registro de ponto
    const deleteTimeEntry = async (id) => {
        if (!confirm('Are you sure you want to delete this time entry?')) return;
        try {
            await axios.delete(`/time-entries/${id}`);
            setTimeEntriesList((prevList) => prevList.filter((entry) => entry.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    // UseEffect para inicializar as datas no carregamento da página
    useEffect(() => {
        const today = new Date();
        const thirtyDaysAgo = new Date();
        today.setDate(today.getDate()+ 15);
        thirtyDaysAgo.setDate(today.getDate() - 30); // 30 dias atrás
        setStartDate(thirtyDaysAgo.toISOString().split('T')[0]); // Ajuste para formato YYYY-MM-DD
        setEndDate(today.toISOString().split('T')[0]); // Ajuste para formato YYYY-MM-DD
    }, []);

    // UseEffect para carregar os dados após a inicialização das datas
    useEffect(() => {
        if (startDate && endDate) {
            fetchTimeEntries();
        }
    }, [startDate, endDate]);

    return (
        <div className="container mx-auto px-4">
            <Head title="Manage Time Entries" />
            <h1 className="text-2xl font-bold mb-6 text-center">Time Entries</h1>
            <Link
                href="/time-entries/create"
                className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
            >
                Add Time Entry
            </Link>

            <div className="mb-4 flex justify-between items-center">
                <div className="flex space-x-4">
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                            Data Inicial
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                            Data Final
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                <button
                    onClick={fetchTimeEntries}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Filtrar
                </button>
            </div>

            {isLoading ? (
                <div className="text-center text-gray-600">Carregando registros...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2 text-left">ID</th>
                                <th className="border px-4 py-2 text-left">Employee Name</th>
                                <th className="border px-4 py-2 text-left">Position</th>
                                <th className="border px-4 py-2 text-left">Timestamp</th>
                                <th className="border px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timeEntriesList.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">No time entries found.</td>
                                </tr>
                            ) : (
                                timeEntriesList.map((entry) => (
                                    <tr key={entry.id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{entry.id}</td>
                                        <td className="border px-4 py-2">{entry.id}</td>
                                        <td className="border px-4 py-2">{entry.id}</td>
                                        <td className="border px-4 py-2">{entry.timestamp}</td>
                                        <td className="border px-4 py-2">
                                            <Link
                                                href={`/time-entries/${entry.id}/edit`}
                                                className="text-blue-500 hover:text-blue-700 mr-2"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => deleteTimeEntry(entry.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
