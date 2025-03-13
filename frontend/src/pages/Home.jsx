import React from 'react';
import Header from '../components/Header';

function Home(){
    return (
        <>
            <Header/>
            <h1 className='text-3xl justify-center items-center flex'>This is the home page</h1>
        </>
    );
}

export default Home;