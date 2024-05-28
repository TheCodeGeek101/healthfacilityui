import DataContext from '@/context/DataContext';
import { createInitialFormState, validateForm } from '@/helpers/FormConfigHelper';
import { dropIn, fieldConfig } from '@/utils/Constants';
import { ownersEndpoint } from '@/utils/endpoints';
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AddOwners = ({setAddOwnersModalOpen}) => {
    // Defining state variables
  const [isSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [ownerData, setOwnerData] = useState(
    createInitialFormState(fieldConfig),
  );
  const { setOwners } = useContext(DataContext);
  const owner = `${ownersEndpoint}/create`;
  const getOwner = `${ownersEndpoint}/owners`;
  const [loading, setLoading] = useState(false);
  const handleChange = (e, name) => {
    setOwnerData({ ...ownerData, [name]: e.target.value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };
  const handleSelectedChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    const value = selectedOption ? selectedOption.value : '';
    setOwnerData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

    // Modify the onSubmit function in CreateClient component
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const validationErrors = validateForm(fieldConfig, ownerData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('client data is:' + JSON.stringify(ownerData));
      const response = await axios.post('/api/PostData', {
        endPoint: owner,
        data: ownerData,
      });

      const result = response.data; // Corrected from response.json() to response.data
      console.log('Post request response:', result);

      if (response.status === 201) {
        toast.success(`owner created successfully!`);
        setOwnerData(createInitialFormState(fieldConfig)); // Reset form on successful submission
        setErrors({}); // Clear any errors

        // Fetch the data from the server to update the context
        const fetchResponse = await axios.post('/api/GetData', {
          endPoint: getOwner,
        });
        console.log('error check:' + fetchResponse.data);
        if (fetchResponse.status === 200) {
          toast.success(`Owners retrieved successfully!`);
          setOwners(fetchResponse.data); // Replace existing clients with new list
          console.log('Client data retrieved:', fetchResponse.data);
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
          `Failed to create client: ${error.response.data.error || error.message}`,
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
    <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25 p-10 backdrop-blur-lg">
            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                drag={false}
                variants={dropIn}
                className="py-30 relative mt-20 max-h-[80vh] min-h-fit w-full max-w-4xl overflow-auto rounded-2xl rounded-lg bg-white p-6 pb-2 shadow-xl md:w-4/6"
            >
                <div className="flex justify-between">
                    <div>.</div>
                    <button
                        onClick={() => {
                            setAddOwnersModalOpen(false);
                        }}
                        className="text-4xl text-primary"
                    >
                        &times;
                    </button>
                </div>

                <div className="relative flex flex-col">
                    <div className="mb-7 mt-0 w-full text-center font-bold  capitalize text-primary md:mt-7 md:text-2xl">
                        Owner Registration
                    </div>
                    <form onSubmit={onSubmit}>
                        {fieldConfig.map(({ label, name, placeholder, type }) => (
                            <div key={name} className="mx-2 w-full flex-1">
                                <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                                    {label}
                                </div>
                                <input
                                    className="my-2 w-full appearance-none rounded border border-gray-200 bg-white p-1 px-2 text-sm text-gray-800 outline-none"
                                    type={type || 'text'}
                                    onChange={(e) => handleChange(e, name)}
                                    value={ownerData[name] || ''}
                                    name={name}
                                    required
                                    placeholder={placeholder}
                                />
                                {errors[name] && (
                                    <div className="text-xs italic text-red-500">
                                        {errors[name]}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="container bottom-1 mb-4 mt-4 flex justify-around">
                            <button
                                onClick={() => {
                                    setAddOwnersModalOpen(false);
                                }}
                                className={`border-slate-300 text-slate-400 cursor-pointer rounded-[5px] border-2 bg-white p-1 py-2 font-semibold uppercase transition duration-200 ease-in-out hover:bg-opacity-50 hover:text-primary md:w-28 md:w-40`}
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                disabled={Object.keys(errors).length > 0 || loading}
                                className={`w-28 py-2 font-semibold uppercase transition ${
                                    loading
                                        ? 'cursor-not-allowed bg-primary text-white opacity-70'
                                        : 'bg-primary text-white hover:border-2 hover:bg-white hover:text-primary'
                                } md:w-40`}
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
            <Toaster position="top-center" />
        </div>

    </div>
);
}

export default AddOwners;