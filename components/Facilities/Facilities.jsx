import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import AddFacilities from './AddFacilities'; // Import AddFacilities component
import DataContext from '@/context/DataContext';
import Navbar from '../Shared/Navbar';

const Facilities = () => {
    const { facilities } = useContext(DataContext);
    const [isAddFacilitiesModalOpen, setAddFacilitiesModalOpen] = useState(false); // State variable to control modal visibility

    return (
        <>
            <Navbar />
            <div className="container flex items-center mx-auto p-20 h-screen">
                <div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                        exit: { opacity: 0 },
                    }}
                    className="mb-8 overflow-hidden rounded-lg shadow-lg"
                >
                    <section className="container mx-auto p-6">
                        <div className="mb-8 w-full overflow-hidden rounded-lg shadow-lg">
                            <div className="w-full overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-md bg-primary text-left font-semibold uppercase tracking-wide text-white">
                                            <th className="px-4 py-3">Facility ID</th>
                                            <th className="px-4 py-3">Facility Code</th>
                                            <th className="px-4 py-3">Facility Name</th>
                                            <th className="px-4 py-3">District ID</th>
                                            <th className="px-4 py-3">Owner ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {facilities.map(facility => (
                                            <tr key={facility._id} className="text-sm text-gray-700">
                                                <td className="border px-4 py-3">{facility._id}</td>
                                                <td className="border px-4 py-3">{facility.facility_code}</td>
                                                <td className="border px-4 py-3">{facility.facility_name}</td>
                                                <td className="border px-4 py-3">{facility.district_id}</td>
                                                <td className="border px-4 py-3">{facility.owner_id}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
                {isAddFacilitiesModalOpen && (
                    <AddFacilities setAddFacilitiesModalOpen={setAddFacilitiesModalOpen} />
                )}
                <button
                    onClick={() => setAddFacilitiesModalOpen(true)}
                    className="fixed bottom-10 right-10 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    Add Facilities
                </button>
            </div>
        </>
    );
}

export default Facilities;
