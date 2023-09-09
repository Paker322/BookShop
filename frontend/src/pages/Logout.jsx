import React, { useContext } from 'react'

import {GlobalContext } from './GlobalStore'

import { reactLocalStorage } from 'reactjs-localstorage'

const Logout = () => {

    const { updateInfo } = useContext( GlobalContext ); 

    const logoutnow = () => {
        
        const newmem = { 
            userid: null,
            name: null,
            email: null, 
            memtype: null
    }
        updateInfo( newmem ); 

        reactLocalStorage.remove( 'PSInfo' );
        reactLocalStorage.remove( 'PSInfoKey' );

        window.location.assign('/books');
    }




    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Log Out</h1>

        <p style={{ fontSize: '16px' }}>We hope to see you again!</p>
        
        <button 
            className='btn-logout'
            style={{
            backgroundColor: '#2cbb3f',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            marginTop: '10px'
            }}
            onClick={logoutnow}
        >
            Confirm
        </button>
        </div>
    )
}

export default Logout
