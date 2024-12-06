import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';

export default function EmployeeList() {
    const { employees } = usePage().props; // Props do backend
    const [employeeList, setEmployeeList] = useState(employees || []);

    useEffect(() => {

        setEmployeeList(employees || []);
        console.log(employees);

    }, [employees]);

    const deleteEmployee = async (id) => {
        if (!confirm('Are you sure you want to delete this employee?')) return;
        try {
            await axios.delete(`/employees/${id}`);
            setEmployeeList((prevList) => prevList.filter((employee) => employee.id !== id));
        } catch (error) {
            console.log(error);
            // alert('Error deleting employee.');
        }
    };

    return (
        <div className="container mx-auto px-4">
            <Head title="Manage Employees" />
            <h1 className="text-2xl font-bold mb-6 text-center">Employees</h1>
            <Link
                href="/employees/create"
                className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
            >
                Add Employee
            </Link>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2 text-left">Name</th>
                            <th className="border px-4 py-2 text-left">CPF</th>
                            <th className="border px-4 py-2 text-left">Email</th>
                            <th className="border px-4 py-2 text-left">Aniverśario</th>
                            <th className="border px-4 py-2 text-left">CEP</th>
                            <th className="border px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeList.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center py-4">No employees found.</td>
                            </tr>
                        ) : (
                            employeeList.map((employee) => (
                                <tr key={employee.id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">{employee.user.name}</td>
                                    <td className="border px-4 py-2">{employee.cpf}</td>
                                    <td className="border px-4 py-2">{employee.user.email}</td>
                                    <td className="border px-4 py-2">{employee.birth_date}</td>
                                    <td className="border px-4 py-2">{employee.cep} {employee.address}</td>
                                    <td className="border px-4 py-2">
                                        <Link
                                            href={`/employees/${employee.id}/edit`}
                                            className="text-blue-500 hover:text-blue-700 mr-2"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => deleteEmployee(employee.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Deletar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
