import axios from "axios";
import React, { useEffect, useState,useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from './GlobalStore'
import { useParams } from 'react-router'
const EditBook = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [desc, setDescription] = useState('')
  const [imageFile, setImage] = useState('')
  const [author, setAuthor] = useState('')
  const [quantity, setQuantity] = useState(0)
  const { id } = useParams()
  const navigate = useNavigate();

  
  const { info } = useContext( GlobalContext  )
   
  const { userid } = info;  
 

  const handleClick = async (e) => {
    e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    
    formData.append("image", imageFile);
    formData.append("price", price);
    formData.append("author", author);
    formData.append("quantity", quantity);
    
    console.log(formData);

    await axios.put(`http://localhost:8080/api/book/update/${id}`, formData);
    

    window.location.assign('/books');
  } catch (err) {
    console.log(err);
  }
  };

  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        placeholder="Title"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Desc"
        name="desc"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        name="price"
        onChange={setPrice}
      />
      <input
        type="text"
        placeholder="Book Cover"
        name="cover"
        onChange={setImage}
      />
      <button onClick={handleClick}>Update</button>
      
      <Link to="/">See all books</Link>
    </div>
  );
};

export default EditBook;
