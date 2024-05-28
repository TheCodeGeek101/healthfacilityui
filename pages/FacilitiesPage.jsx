import Facilities from '@/components/Facilities/Facilities';
import DataContext from '@/context/DataContext';
import useFetchData from '@/helpers/GetDataFromTheApi';
import { facilitiesEndpoint } from '@/utils/endpoints';
// import { districtsEndpoint } from '@/utils/endpoints';
import React, { useContext } from 'react';

const FacilitiesPage = () => {
    const facilities =  `${facilitiesEndpoint}/all`;
    const {setFacilities} = useContext(DataContext);
    const { loading: loadingFacilities, error: errorFacilities } = useFetchData(
        facilities,
        setFacilities,
      );
    if(loadingFacilities){
        return "Loading...."
    }
    else if(errorFacilities){
        return errorFacilities;
    }
    return (
     <>
        <Facilities/>
     </>
    );
}

export default FacilitiesPage;
