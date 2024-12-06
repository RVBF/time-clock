import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ userRole }) {
    console.log(userRole);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p>You're logged in as {userRole}!</p>
                            <nav className="mt-4">
                                <ul className="space-y-2">
                                    {userRole === 'adm' && (
                                        <>
                                            <li>
                                                <Link
                                                    href="/employees"
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    Manage Employees
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/time-entries"
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    View Points
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
                                                    Register Point
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/profile"
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    Edit Profile
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
