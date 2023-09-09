import React, { useContext,useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { GlobalContext } from './GlobalStore'
import { reactLocalStorage }  from 'reactjs-localstorage'
import '../css/Form.css'; 

const Register = () => {

    const { errors, register, handleSubmit, reset } = useForm();

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [type, setType] = useState('')
    const navigate = useNavigate();
    const { info,updateInfo }  = useContext( GlobalContext )
    const onSubmit = ( data ) => {
        console.log(password)
        if((type)===('Buyer')){
            axios.post(`http://localhost:8080/api/book/userAdd/buyer`,{     
                BuyerName: name,
                BuyerPassword: password,
                BuyerMail: email
                }).then( response => {

                    const { success, token } = response.data;
        
                    console.log(' res data ', response.data )
        
                    if ( success === false ) {
                        console.log( ' Add failed response ');
                        
                        return null; 
        
                    }
                    
                    const { _id, name, email, memtype  } = response.data.info; 
                    
        
                    const newmem = {
                        userid: _id,
                        name: name, 
                        email: email, 
                        memtype:memtype 
        
                    }
                    console.log(newmem);
                    updateInfo( newmem ); 
        
                    reactLocalStorage.setObject('PSInfo', newmem  )
        
                    reactLocalStorage.set('PSInfoKey', token )
        
                    reset();
        
        
        
                    
        
                })
                .catch( err => {
        
                    console.log('error in Add ', err)
                } )
        }else if((type) === ('Seller')) {
            axios.post(`http://localhost:8080/api/book/userAdd/seller`,{     
                SellerName: name,
                SellerPasword:password,
                SellerMail: email
                }).then( response => {

                    const { success, token } = response.data;
        
                    console.log(' res data ', response.data )
        
                    if ( success === false ) {
                        console.log( ' Add failed response ');
                        
                        return null; 
        
                    }
                    
                    const { _id, name, email, memtype  } = response.data.info; 
                    
        
                    const newmem = {
                        userid: _id,
                        name, email, memtype 
        
                    }
                    
                    updateInfo( newmem ); 
        
                    reactLocalStorage.setObject('PSInfo', newmem  )
        
                    reactLocalStorage.set('PSInfoKey', token )
        
                    reset();
        
        
        
                    
        
                })
                .catch( err => {
        
                    console.log('error in Add ', err)
                } )
                .catch( err => {
        
                    console.log('error in Add ', err)
                } )
        }else {
            console.log('error')
        }
    }



    return (
        <div className="form">
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            name="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            name="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
         <label>Membership</label  >
                <select name='memtype' onChange={(e) => setType(e.target.value)} >
                    <option value='Seller'>Seller</option>
                    <option value='Buyer'>Buyer</option>

                </select>
          <button onClick={onSubmit}>Register</button>
          
          
        </div>
      );
}


export default Register
