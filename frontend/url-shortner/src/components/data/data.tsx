import * as React from 'react';
import { URLData } from '../../interface/URLData';
import { Link } from 'react-router-dom';
import { serverUrl } from '../../util/constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IDataProps {
    data:URLData[]; 
    updateReloadState:()=>void;
}

const Data: React.FunctionComponent<IDataProps> = (props) => {
    const {data, updateReloadState}= props;
   // const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    //const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

    console.log("Data is data: ", data);
    const renderTableData =()=>{
        return data.map((item)=>{
            return(
                <tr key={item._id} className='border-b text-black bg-gray-100 hover:bg-black hover:text-gray-100'>
                <td className='px-6 py-3 break-words'> 
                <Link to={item.fullUrl} target='_blank' rel='noreferer noopener'>
                        {item.fullUrl}
                </Link>              
                </td>

                <td className='px-6 py-3 break-words'> 
                <Link to={`${serverUrl}/shortUrl/${item.shortUrl}`} target='_blank' rel='noreferer noopener'>
                        http://localhost:3000/${item.shortUrl}
                </Link>              
                </td>

                <td className='px-6 py-3'> 
                        {item.clicks}
                </td>

                <td className='px-6 py-3 '> 
                <div className='flex content-center'>
                    <div className='cursor-pointer px-2' onClick={()=>copyToClipboard(item.shortUrl)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                        </svg>
                    </div>

                    <div className='cursor-pointer px-2' onClick={()=>deleteUrl(item._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 fill-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                    </div>

                </div>
                
                </td>
            </tr>
            )
        }
        )
    };
    const copyToClipboard=async (url:string) => {
        try{
            await navigator.clipboard.writeText(`${serverUrl}/shortUrl/${url}`);
            toast.success(`URL Copied: ${serverUrl}/shortUrl/${url}`, {
                position: 'top-right',
              });
        }catch(error){
            console.log(error);
            toast.error('Error copying URL. Please try again.', {
                position: 'top-right',
              });
        }
        
    };
    const deleteUrl= async (id:string) => {
        try{
            const response = await axios.delete(`${serverUrl}/shortUrl/${id}`);
            console.log(response);
            updateReloadState();
            toast.success('URL has been deleted successfully', {
                position: 'top-right',
              });
            //setSuccessMessage('URL has been deleted successfully');
        }catch(error:any){
            if(error.response && error.response.status === 429){
                //rate limiter 
                //setSuccessMessage(null);
                toast.success('Too many requests from this IP, please try again after 15 minutes.', {
                    position: 'top-right',
                  });
                //setErrorMessage('Too many requests from this IP, please try again after 15 minutes.');

            }else {
                // Other errors
                //setSuccessMessage(null);
                toast.error('Failed to shorten URL. Please try again.', {
                    position: 'top-right',
                  });
                //setErrorMessage('Failed to shorten URL. Please try again.');
            } 

        }
        
    }
  return (
    <div className='container mx-auto pt-2 pb-10 '>
        <div className='relative overflow-auto shadow-sm sm:rounded-lg'>
     
            <table className='w-full table-fixed text-sm text-left rtl:text-right text-gray-500'>
            <thead className='text-md uppercase text-gray-50 bg-gray-700'>
                <tr>
                    <th scope='col' className='px-6 py-3 w-6/12'>Full Url</th>
                    <th scope='col' className='px-6 py-3 w-3/12'>Short Url</th>
                    <th scope='col' className='px-6 py-3'>Clicks</th>
                    <th scope='col' className='px-6 py-3'>Action</th>
                </tr>
            </thead>
            <tbody>
                     
                {renderTableData()}
            </tbody>
            </table>
        </div>

    </div>
  );
};

export default Data;
