import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import AddDistricts from './AddDistricts'; // Import AddDistricts component
import DataContext from '@/context/DataContext';
import Navbar from '../Shared/Navbar';

const Districts = () => {
    const { districts } = useContext(DataContext);
    const [isAddDistrictModalOpen, setAddDistrictModalOpen] = useState(false); // State variable to control modal visibility

    return (
        <>
            <Navbar />
            <div className="h-screen container mx-auto p-6">
                <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-md bg-primary text-left font-semibold uppercase tracking-wide text-white">
                                    <th className="px-4 py-3">District ID</th>
                                    <th className="px-4 py-3">District Code</th>
                                    <th className="px-4 py-3">District Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {districts.map(district => (
                                    <tr key={district._id} className="text-sm text-gray-700">
                                        <td className="border px-4 py-3">{district._id}</td>
                                        <td className="border px-4 py-3">{district.code}</td>
                                        <td className="border px-4 py-3">{district.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {isAddDistrictModalOpen && (
                    <AddDistricts setCreateDistrictOpen={setAddDistrictModalOpen} />
                )}
                <button
                    onClick={() => setAddDistrictModalOpen(true)}
                    className="fixed bottom-10 right-10 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 z-10"
                >
                    Add District
                </button>
            </div>
        </>
    );
}

export default Districts;
