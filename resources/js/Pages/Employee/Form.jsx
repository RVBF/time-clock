import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function EmployeeForm({ employee = null }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: employee?.name || '',
        email: employee?.email || '',
        role: employee?.role || 'employee',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (employee) {
            put(`/employees/${employee.id}`);
        } else {
            post('/employees');
        }
    };

    return (
        <div>
            <Head title={employee ? 'Edit Employee' : 'Add Employee'} />
            <h1 className="text-2xl font-bold">{employee ? 'Edit Employee' : 'Add Employee'}</h1>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm rounded-md"
                    />
                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm rounded-md"
                    />
                    {errors.email && <div className="text-red-500">{errors.email}</div>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm rounded-md"
                    >
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    {employee ? 'Update' : 'Create'}
                </button>
            </form>
        </div>
    );
}
