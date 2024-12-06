import { useForm } from '@inertiajs/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react'; 

export default function EmployeeUpdate({ employee }) {
    
    const { data, setData, put, errors } = useForm({
        name: employee.user.name,
        cpf: employee.cpf,
        email: employee.user.email,
        role: employee.role,
        birth_date: employee.birth_date,
        cep: employee.cep,
        logradouro: employee.logradouro,
        address: employee.address,  
        complemento: employee.complemento,
        bairro: employee.bairro,
        localidade: employee.localidade,
        uf: employee.uf,
        estado: employee.estado,
        regiao: employee.regiao,
        ibge: employee.ibge,
        gia: employee.gia,
        ddd: employee.ddd,
        siafi: employee.siafi
    });

    
    const handleCepChange = async (cep) => {
        const formattedCep = cep.replace('-', ''); 
        setData('cep', formattedCep);

        if (formattedCep.length === 8) {
            try {
                const response = await axios.get(`/api/cep/${formattedCep}`);
                const { logradouro, complemento, bairro, localidade, uf, estado, regiao, ibge, gia, ddd, siafi } = response.data;

                if (response.data.erro) {
                    alert('CEP não encontrado!');
                } else {
                    setData({
                        ...data,
                        logradouro,
                        complemento,
                        bairro,
                        localidade,
                        uf,
                        estado,
                        regiao,
                        ibge,
                        gia,
                        ddd,
                        siafi
                    });
                }
            } catch (error) {
                alert('Erro ao consultar o CEP!');
            }
        }
    };

    useEffect(() => {
        if (data.cep && data.cep.length === 8) {
            handleCepChange(data.cep); 
        }
    }, [data.cep]);

    
    const submit = (e) => {
        e.preventDefault();
        
        const fullAddress = `${data.logradouro}, ${data.complemento}, ${data.bairro}, ${data.localidade} - ${data.uf}, ${data.estado}`;
        
        setData('address', fullAddress);

        put(`/employees/${employee.id}`); 
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">Atualizar Funcionário</h2>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                    <input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Nome completo"
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && <div className="mt-1 text-sm text-red-600">{errors.name}</div>}
                </div>

                <div>
                    <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
                    <input
                        type="text"
                        id="cpf"
                        value={data.cpf}
                        onChange={(e) => setData('cpf', e.target.value)}
                        placeholder="123.456.789-00"
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.cpf && <div className="mt-1 text-sm text-red-600">{errors.cpf}</div>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="exemplo@dominio.com"
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <div className="mt-1 text-sm text-red-600">{errors.email}</div>}
                </div>

                <div>
                    <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700">Data de Aniversário</label>
                    <input
                        type="date"
                        id="birth_date"
                        value={data.birth_date}
                        onChange={(e) => setData('birth_date', e.target.value)}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.birth_date && <div className="mt-1 text-sm text-red-600">{errors.birth_date}</div>}
                </div>

                <div>
                    <label htmlFor="cep" className="block text-sm font-medium text-gray-700">CEP</label>
                    <input
                        type="text"
                        id="cep"
                        value={data.cep}
                        onChange={(e) => handleCepChange(e.target.value)}
                        placeholder="00000-000"
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.cep && <div className="mt-1 text-sm text-red-600">{errors.cep}</div>}
                </div>

                <div>
                    <label htmlFor="logradouro" className="block text-sm font-medium text-gray-700">Endereço</label>
                    <input
                        type="text"
                        id="logradouro"
                        value={data.logradouro}
                        onChange={(e) => setData('logradouro', e.target.value)}
                        placeholder="Endereço completo"
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.address && <div className="mt-1 text-sm text-red-600">{errors.address}</div>}
                </div>

                <div>
                    <label htmlFor="complemento" className="block text-sm font-medium text-gray-700">Complemento</label>
                    <input
                        type="text"
                        id="complemento"
                        value={data.complemento}
                        onChange={(e) => setData('complemento', e.target.value)}
                        placeholder="Complemento"
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="bairro" className="block text-sm font-medium text-gray-700">Bairro</label>
                    <input
                        type="text"
                        id="bairro"
                        value={data.bairro}
                        onChange={(e) => setData('bairro', e.target.value)}
                        placeholder="Bairro"
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>                

                <div>
                    <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">Cidade</label>
                    <input
                        type="text"
                        id="cidade"
                        value={data.localidade}
                        onChange={(e) => setData('localidade', e.target.value)}
                        placeholder="Cidade"
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div> 

                <div>
                    <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
                    <input
                        type="text"
                        id="estado"
                        value={data.estado}
                        onChange={(e) => setData('estado', e.target.value)}
                        placeholder="Estado"
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>          
                
                <div>
                    <label htmlFor="uf" className="block text-sm font-medium text-gray-700">UF</label>
                    <input
                        type="text"
                        id="uf"
                        value={data.uf}
                        onChange={(e) => setData('uf', e.target.value)}
                        placeholder="UF"
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
                        Atualizar Funcionário
                    </button>
                </div>
            </form>
        </div>
    );
}
