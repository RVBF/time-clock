import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ userRole }) {
    console.log(userRole);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white-1000">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p>Seja bem vindo!</p>
                            <nav className="mt-4">
                                <ul className="space-y-2">
                                    {userRole === 'manager' && (
                                        <>
                                            <li>
                                                <Link
                                                    href="/employees"
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    Gerenciar Funcionários
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/time-entries"
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    Visualizar Marcação de ponto
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                    {userRole === 'employee' && (
                                        <>
                                            <li>
                                                <Link
                                                    href="/time-entries/register"
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    Registrar Ponto
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/profile"
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    Editar Perfil
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
