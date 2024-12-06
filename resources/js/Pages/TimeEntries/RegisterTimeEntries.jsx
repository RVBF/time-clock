import React from "react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const TimeEntries = () => {
    const handleTimeEntry = async () => {
        try {
            await axios.post("/time-entries/register");
            alert("Ponto registrado com sucesso!");
        } catch (error) {
            alert("Erro ao registrar o ponto.");
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
                        Registrar Ponto
                    </h1>

                    <div className="flex flex-col items-center">
                        <button
                            onClick={handleTimeEntry}
                            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                        >
                            Registrar Ponto
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default TimeEntries;
