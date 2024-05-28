import Owners from '@/components/Owners/Owners';
import DataContext from '@/context/DataContext';
import useFetchData from '@/helpers/GetDataFromTheApi';
import { ownersEndpoint} from '@/utils/endpoints';
import React, { useContext } from 'react';

const OwnersPage = () => {
    const owners =  `${ownersEndpoint}/owners`;
    const {setOwners} = useContext(DataContext);
    const { loading: loadingOwners, error: errorOwners } = useFetchData(
        owners,
        setOwners,
      );
    if(loadingOwners){
        return "Loading...."
    }
    else if(errorOwners){
        return errorOwners;
    }
    return (
       <>
       
            <Owners/> 
       </>
    );
}

export default OwnersPage;
