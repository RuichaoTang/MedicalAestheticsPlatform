import React from 'react';
import Header from '../components/Header';
import HeaderSection from '../components/HeaderSection';

function Home(){
    return (
        <>
            <Header/>
            <HeaderSection/>
            <h1 className='text-3xl justify-center items-center flex'>This is the home page</h1>
        </>
    );
}

export default Home;