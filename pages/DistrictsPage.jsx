import Districts from '@/components/Districts/Districts';
import DataContext from '@/context/DataContext';
import useFetchData from '@/helpers/GetDataFromTheApi';
import { districtsEndpoint } from '@/utils/endpoints';
import React, { useContext } from 'react';

const DistrictsPage = () => {
    const districts =  `${districtsEndpoint}/all`;
    const {setDistricts} = useContext(DataContext);
    const { loading: loadingDistricts, error: errorDistricts } = useFetchData(
        districts,
        setDistricts,
      );
    if(loadingDistricts){
        return "Loading...."
    }
    else if(errorDistricts){
        return errorDistricts;
    }
    return (
        <>
            <Districts/>
        </>
    );
}

export default DistrictsPage;
