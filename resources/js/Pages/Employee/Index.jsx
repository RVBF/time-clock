import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';

export default function EmployeeList() {
    const { employees } = usePage().props; // Props do backend
    const [employeeList, setEmployeeList] = useState(employees || []);

    useEffect(() => {
        setEmployeeList(employees || []);
    }, [employees]);

    const deleteEmployee = async (id) => {
        if (!confirm('Are you sure you want to delete this employee?')) return;

        try {
            await axios.delete(`/employees/${id}`);
            setEmployeeList((prevList) => prevList.filter((employee) => employee.id !== id));
        } catch (error) {
            alert('Error deleting employee.');
        }
    };

    return (
        <div>
            <Head title="Manage Employees" />
            <h1 className="text-2xl font-bold mb-4">Employees</h1>
            <Link href="/employees/create" className="text-blue-500 hover:text-blue-700">
                Add Employee
            </Link>
            <table className="min-w-full mt-4 bg-white border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeList.map((employee) => (
                        <tr key={employee.id}>
                            <td className="border px-4 py-2">{employee.name}</td>
                            <td className="border px-4 py-2">{employee.email}</td>
                            <td className="border px-4 py-2">
                                <Link
                                    href={`/employees/${employee.id}/edit`}
                                    className="text-blue-500 hover:text-blue-700 mr-2"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteEmployee(employee.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
