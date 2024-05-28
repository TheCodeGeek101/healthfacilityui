import { createContext, useState } from 'react';

// Creating the context
const DataContext = createContext({
  districts: [],
  setDistricts: () => {}, // Initialize with a noop function
  owners: [],
  setOwners: () => {}, // Initialize with a noop function
  facilities: [],
  setFacilities: () => {}, // Initialize with a noop function
});

export const DataProvider = ({ children }) => {
  // Initialize state for districts, owners, and facilities
  const [districts, setDistricts] = useState([]);
  const [owners, setOwners] = useState([]);
  const [facilities, setFacilities] = useState([]);

  // Context value that will be provided to any component consuming this context
  const value = {
    districts,
    setDistricts,
    owners,
    setOwners,
    facilities,
    setFacilities,
  };

  return (
    <DataContext.Provider value={value}>{children}</DataContext.Provider>
  );
};

export default DataContext;
