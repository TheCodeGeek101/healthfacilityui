import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import AddOwners from './AddOwners'; // Import AddOwners component
import DataContext from '@/context/DataContext';
import Navbar from '../Shared/Navbar';

const Owners = () => {
    const { owners } = useContext(DataContext);
    const [isAddOwnersModalOpen, setAddOwnersModalOpen] = useState(false); // State variable to control modal visibility

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-20 h-screen">
                <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-md bg-primary text-left font-semibold uppercase tracking-wide text-white">
                                    <th className="px-4 py-3">Owner ID</th>
                                    <th className="px-4 py-3">Owner Name</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {owners.map(owner => (
                                    <tr key={owner._id} className="text-sm text-gray-700">
                                        <td className="border px-4 py-3">{owner._id}</td>
                                        <td className="border px-4 py-3">{owner.name}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {isAddOwnersModalOpen && (
                    <AddOwners setAddOwnersModalOpen={setAddOwnersModalOpen} />
                )}
                <button
                    onClick={() => setAddOwnersModalOpen(true)}
                    className="fixed bottom-10 right-10 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 z-10"
                >
                    Add Owners
                </button>
            </div>
        </>
    );
}

export default Owners;
