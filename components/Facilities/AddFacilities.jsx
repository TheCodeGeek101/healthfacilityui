import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { facilitiesFieldConfig } from '@/utils/Constants'; // Import facilities field config
import { districtsEndpoint, facilitiesEndpoint, ownersEndpoint } from '@/utils/endpoints';
import { createInitialFormState, validateField, validateForm } from '@/helpers/FormConfigHelper';
import DataContext from '@/context/DataContext';
import Navbar from '../Shared/Navbar';
import toast, { Toaster } from 'react-hot-toast';

const AddFacilities = ({ setAddFacilitiesModalOpen }) => {
    const {setFacilities} = useContext(DataContext);
  const [facilityData, setFacilityData] = useState(
    createInitialFormState(facilitiesFieldConfig),
  );
  const [districts, setDistricts] = useState([]);
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const district = `${districtsEndpoint}/all`;
  const owner = `${ownersEndpoint}/owners`;
  const facility = `${facilitiesEndpoint}/add`;
  const getfacility =`${facilitiesEndpoint}/all`;
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.post('/api/GetData',{endPoint:district});
        if(response.status === 200){
        setDistricts(response.data);

        }
      } catch (error) {
        console.error('Failed to fetch districts:', error);
      }
    };

    const fetchOwners = async () => {
      try {
        const response = await axios.post('/api/GetData',{endPoint:owner});
        if(response.status === 200){
            setOwners(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch owners:', error);
      }
    };

    fetchDistricts();
    fetchOwners();
  }, [district,owner]);

  const handleChange = (e, name) => {
    setFacilityData({ ...facilityData, [name]: e.target.value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleDistrictChange = (selectedOption) => {
    setFacilityData({ ...facilityData, districtId: selectedOption.value });
  };

  const handleOwnerChange = (selectedOption) => {
    setFacilityData({ ...facilityData, ownerId: selectedOption.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const validationErrors = validateForm(facilitiesFieldConfig, facilityData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('client data is:' + JSON.stringify(facilityData));
      const response = await axios.post('/api/PostData', {
        endPoint: facility,
        data: facilityData,
      });

      const result = response.data; // Corrected from response.json() to response.data
      console.log('Post request response:', result);

      if (response.status === 201) {
        toast.success(`facility created successfully!`);
        setFacilityData(createInitialFormState(facilitiesFieldConfig)); // Reset form on successful submission
        setErrors({}); // Clear any errors

        // Fetch the darta from the server to update the context
        const fetchResponse = await axios.post('/api/GetData', {
          endPoint: getfacility,
        });
        console.log('error check:' + fetchResponse.data);
        if (fetchResponse.status === 200) {
          toast.success(`Facility retrieved successfully!`);
         setFacilities(fetchResponse.data);
          console.log('Facilities data retrieved:', fetchResponse.data);
        } else {
          console.error(
            `Failed to fetch client. Status:`,
            fetchResponse.status,
          );
          toast.error(`Failed to fetch clients`);
        }
      } else {
        const errorMessage =
          data && data.message ? data.message : 'An unknown error occurred.';
        toast.error(`Failed to submit client data: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        toast.error(
          `Failed to create facility: ${error.response.data.error || error.message}`,
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        toast.error('No response from server');
      } else {
        // Something else caused an error
        console.log('Error', error.message);
        toast.error('Error encountered: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <Navbar/>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25 p-10 backdrop-blur-lg">
      <div className="py-30 relative mt-20 max-h-[80vh] min-h-fit w-full max-w-4xl overflow-auto rounded-2xl rounded-lg bg-white p-6 pb-2 shadow-xl md:w-4/6">
        <div className="flex justify-between">
          <div>.</div>
          <button
            onClick={() => {
              setAddFacilitiesModalOpen(false);
            }}
            className="text-4xl text-primary"
          >
            &times;
          </button>
        </div>
        
        <div className="flex justify-center">
          {/* Logo or image */}
        </div>
        
        <div className="relative flex flex-col">
          <div className="mb-7 mt-0 w-full text-center font-bold capitalize text-primary md:mt-7 md:text-2xl">
            Facility Registration
          </div>
          <form onSubmit={onSubmit}>

            {/* Facility Name */}
            <div className="my-4">
              <label htmlFor="facilityName" className="block text-sm font-medium text-gray-700">
                Facility Name
              </label>
              <input
                type="text"
                name="facilityName"
                id="facilityName"
                autoComplete="facilityName"
                value={facilityData.facilityName}
                onChange={(e) => handleChange(e, 'facilityName')}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
              />
            </div>
            
            {/* District */}
            <div className="my-4">
              <label htmlFor="districtId" className="block text-sm font-medium text-gray-700">
                District
              </label>
              <Select
                options={districts.map((district) => ({ value: district._id, label: district.name }))}
                onChange={handleDistrictChange}
              />
            </div>
            
            {/* Owner */}
            <div className="my-4">
              <label htmlFor="ownerId" className="block text-sm font-medium text-gray-700">
                Owner
              </label>
              <Select
                options={owners.map((owner) => ({ value: owner._id, label: owner.name }))}
                onChange={handleOwnerChange}
              />
            </div>

            <div className="my-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
        <Toaster position="top-center" />

      </div>
    </div>
    </>

  );
};

export default AddFacilities;
