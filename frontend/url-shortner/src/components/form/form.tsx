import * as React from 'react';
import axios from "axios";
import { serverUrl } from '../../util/constants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IFormProps {
    updateReloadState: () => void;
}

const Form: React.FunctionComponent<IFormProps> = (props) => {
    const { updateReloadState } = props;
    const [fullUrl, setFullUrl] = React.useState<string>("");
    const [isValidUrl, setIsValidUrl] = React.useState(true);
    //const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
   // const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateUrl(fullUrl)) {
            // URL is valid, proceed with shortening logic
            setIsValidUrl(true);
            //setErrorMessage(null); // Reset error message
            try {
                await axios.post(`${serverUrl}/shortUrl`, {
                    fullUrl: fullUrl
                });
                setFullUrl("");
                updateReloadState();
                toast.success('URL successfully shortened. Please check below!', {
                    position: 'top-right',
                  });
                //setSuccessMessage('URL successfully shortened. Please check below!');
            } catch (error:any) {
                if (error.response && error.response.status === 409) {
                    // HTTP status 409 (Conflict) - Handle conflict error
                    setIsValidUrl(false);
                    //setSuccessMessage(null);
                    toast.error('URL conflict. This URL has already been shortened.', {
                        position: 'top-right',
                      });
                   // setErrorMessage('URL conflict. This URL has already been shortened.');
                } else if(error.response && error.response.status === 429){
                    //rate limiter 
                    setIsValidUrl(false);
                    //setSuccessMessage(null);
                    toast.error('Too many requests from this IP, please try again after 15 minutes.', {
                        position: 'top-right',
                      });
                    //setErrorMessage('Too many requests from this IP, please try again after 15 minutes.');

                }else {
                    // Other errors
                    setIsValidUrl(false);
                    //setSuccessMessage(null);
                    toast.error('Failed to shorten URL. Please try again.', {
                        position: 'top-right',
                      });                    
                      //setErrorMessage('Failed to shorten URL. Please try again.');
                }          }
        } else {
            // URL is not valid
            setIsValidUrl(false);
            toast.error('Please enter a valid URL.', {
                position: 'top-right',
              });
            //setErrorMessage('Please enter a valid URL.');
        }
    };


    const validateUrl = (url: string) => {
        // Regular expression to validate URL
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(url);
    };

   
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Reset isValidUrl when the input changes
        setIsValidUrl(true);
        setFullUrl(e.target.value);
    };

    return (
        <div className='container mx-auto py-2'>
            <div className='bg-banner my-8 rounded-xl bg-cover bg-center'>
                <div className='w-full h-full rounded-xl p-20 backdrop-brightness-100'>
                    <h2 className='text-center text-4xl pb-4'>URL Shortening Service</h2>
                    <p className='text-center pb-2 text-xl font-extralight'>Share your URL for a shorter link!</p>
                    <p className='text-center pb-4 text-sm font-thin'>Effortlessly shrink your URL or condense links for free with our user-friendly URL shortening service.</p>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='flex'>
                            <div className='relative w-full'>
                            <input
                                    type="text"
                                    placeholder='Enter the URL you want to shorten'
                                    required
                                    className={`block w-full p-4 text-sm text-gray-900 border ${isValidUrl ? 'border-gray-300' : 'border-red-500'} rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500`}
                                    value={fullUrl}
                                    onChange={handleChange}
                                />
                                <button
                                    type="submit"
                                    className={`absolute top-0 right-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 ${isValidUrl ? '' : 'cursor-not-allowed'}`}
                                    disabled={!isValidUrl}
                                >
                                    Shorten
                                </button>
                            </div>
                        </div>
                       
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;
