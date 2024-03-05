import * as React from 'react';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/header/header";
import Footer from './components/footer/footer';
import Container from './components/container/container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = () => {
    return (
       
            <>
                <Header />
                
                <Container />
                <ToastContainer />
                <Footer />
            </>
       
    );
};

export default App;
