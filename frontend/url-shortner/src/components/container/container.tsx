import * as React from 'react';
import Form from '../form/form';
import { URLData } from '../../interface/URLData';
import { serverUrl } from '../../util/constants';
import axios from "axios";
import Data from '../data/data';

interface IContainerProps { 
}

const Container: React.FunctionComponent<IContainerProps> = () => {
    const [data, setData]= React.useState<URLData[]>([]);
    const [reload, setReload]= React.useState<boolean>(false);
    const updateReloadState=():void=>{
      setReload(true);
    }
    const fetchTableData =async () => {
        const response = await axios.get(`${serverUrl}/shortUrl`);
        console.log("Response from the server: ", response);
        setData(response.data);
        setReload(false);

    };

    React.useEffect(()=>{
        fetchTableData();
    }, [reload]);
  return(
    <>
    <Form updateReloadState={updateReloadState}/>
    <Data updateReloadState={updateReloadState} data={data}/>
    </>
  ) ;
};

export default Container;
