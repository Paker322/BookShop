import React, { useState, createContext, useEffect  } from 'react'

import { reactLocalStorage } from 'reactjs-localstorage'

let initialInfo = {
    userid: null, 
    name: null,
    email: null, 
    memtype: null
     
}

const checklocal = reactLocalStorage.getObject( 'PSInfo' );

console.log('local ', checklocal )

if ( Object.entries( checklocal ).length > 0  ) {

    initialInfo = { ...checklocal }

}

export const GlobalContext = createContext( initialInfo  ); 

export const GlobalStore = ( { children }   ) => {

    const [info, setInfo] = useState( initialInfo );


    const updateInfo = ( newInfo ) => {

        console.log('in global ', newInfo );

        setInfo( newInfo  )
    } 


    useEffect(() => {

        updateInfo( initialInfo ); 
        // eslint-disable-next-line
    }, [])

    return (
        <GlobalContext.Provider  value={ { info, updateInfo }    }   >
            
            { children }

        </GlobalContext.Provider>
    )
}
