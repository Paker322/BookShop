
import React,  { useContext,useState   } from 'react';
import axios from 'axios'

import { GlobalContext } from './GlobalStore'
import { Link } from 'react-router-dom'

import { reactLocalStorage } from 'reactjs-localstorage'

import { useForm} from 'react-hook-form'; 
import '../css/Form.css'; 


const Login = () => {

    const { register, handleSubmit, errors, reset  } = useForm();

    const {  updateInfo  } = useContext( GlobalContext ); 
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [type, setType] = useState('')
      
    const onSubmitForm = (data) => {
  
      console.log( data );
      //eklem gerek
      axios.post( `http://localhost:8080/api/book/userChek`, 
      {
        email: email,
        type:type,
        password: password
      })
      .then (response => {
  
        const { _id, name, email, memtype } = response.data.data;
        const { token } = response.data;
        
        const newmem = { 
            userid:_id,
            name: name,
            email: email,
            memtype: memtype
          }
          console.log(newmem)
          updateInfo( newmem ); 

          reactLocalStorage.setObject('PSInfo', newmem   )
          reactLocalStorage.set('PSInfoKey', token )
        
          
    
          reset();
  
  
          
         
  
      } )
      .catch (err => {
        console.error( 'error in Login >', err);
  
        
      })
      window.location.assign('/books');
  
    }
  
    return (
<div className="form">
          
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
          <button onClick={onSubmitForm}>Log In</button>
          
          <Link to="/">See all books</Link>
        </div>
    );
  }
  

export default Login
