import React, { useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function TimeEntriesList() {
    const { timeEntries } = usePage().props;
    const [timeEntriesList, setTimeEntriesList] = useState(timeEntries || []);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isLoading, setIsLoading] = useState(true);

   
    const fetchTimeEntries = async () => {
        setIsLoading(true);
        try {
           
            const response = await axios.get(
                "/time-entries/filter/" + startDate + "/" + endDate
            );
            const entries = Array.isArray(response.data) ? response.data : [];
            console.log(entries);
            setTimeEntriesList(entries);
        } catch (error) {
            console.log("Erro ao carregar os registros de ponto:", error);
            setTimeEntriesList([]);
        } finally {
            setIsLoading(false);
        }
    };

   
    useEffect(() => {
        const today = new Date();
        const thirtyDaysAgo = new Date();
        today.setDate(today.getDate() + 15);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        setStartDate(thirtyDaysAgo.toISOString().split("T")[0]);
        setEndDate(today.toISOString().split("T")[0]);
    }, []);

   
    useEffect(() => {
        if (startDate && endDate) {
            fetchTimeEntries();
        }
    }, [startDate, endDate]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Relógio de ponto
                </h2>
            }
        >
            <div className="container mx-auto px-4">
                <Head title="Manage Time Entries" />
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Time Entries
                </h1>
                <Link
                    href="/time-entries/create"
                    className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
                >
                    Relógio de ponto
                    </Link>

                <div className="mb-4 flex justify-between items-center">
                    <div className="flex space-x-4">
                        <div>
                            <label
                                htmlFor="startDate"
                                className="block text-sm font-medium text-gray-700"
                            >
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
                            <label
                                htmlFor="endDate"
                                className="block text-sm font-medium text-gray-700"
                            >
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
                    <div className="text-center text-gray-600">
                        Carregando registros...
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2 text-left">
                                        ID
                                    </th>
                                    <th className="border px-4 py-2 text-left">
                                        Nome
                                    </th>
                                    <th className="border px-4 py-2 text-left">
                                        Cargo
                                    </th>
                                    <th className="border px-4 py-2 text-left">
                                        Nome do Gestor
                                    </th>                                
                                    <th className="border px-4 py-2 text-left">
                                        Registro
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {timeEntriesList.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center py-4"
                                        >
                                            Nenhum registro encontrado.
                                        </td>
                                    </tr>
                                ) : (
                                    timeEntriesList.map((entry) => (
                                        <tr
                                            key={entry.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="border px-4 py-2">
                                                {entry.employee.name}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {entry.employee.position}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {entry.employee.birth_date}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {entry.employee.manager.name || ''}
                                            </td>     
                                            <td className="border px-4 py-2">
                                                {entry.registered_at}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
