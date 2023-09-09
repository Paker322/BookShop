import axios from "axios";
import React, { useEffect, useState,useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from './GlobalStore'
import '../css/Form.css'; 

const Add = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [desc, setDescription] = useState('')
  const [imageFile, setImage] = useState('')
  const [author, setAuthor] = useState('')
  const [quantity, setQuantity] = useState(0)
  
  const navigate = useNavigate();

  
  const { info } = useContext( GlobalContext  )
   
  const { userid } = info;  
 

  const handleClick = async (e) => {
    e.preventDefault();
    
    // Check if any of the required fields are empty
    if (!title || !desc || !author || !price || !quantity || !imageFile) {
      alert("Please fill in all the required fields.");
      return; // Stop the function execution if any field is missing
    }
    
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      
      formData.append("image", imageFile);
      formData.append("price", price);
      formData.append("clikes", 0);
      formData.append("raiting", 0);
      formData.append("author", author);
      formData.append("sellerid", userid);
      formData.append("quantity", quantity);
      
      console.log(formData);
  
      await axios.post("http://localhost:8080/api/Book/addBook", formData);
      
      window.location.assign('/books');
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input
        type="text"
        placeholder="Title"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        rows={5}
        placeholder="Description"
        name="desc"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        name="author"
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        name="price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        name="quantity"
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="file"
        placeholder="Book Cover"
        name="cover_file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={handleClick}>Add</button>
      
      
    </div>
  );
};

export default Add;
