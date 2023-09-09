

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams()
  const navigate = useNavigate();

  
  const { info } = useContext( GlobalContext  )
   
  const { userid } = info;  
 
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const  {data}  = await axios.get(`http://localhost:8080/api/book/${id.substring(1)}`);
        setTitle(data[0].title);
        setDescription(data[0].desc);
        setPrice(data[0].price);
        setAuthor(data[0].author);
        setQuantity(data[0].quantity);
        setLoading(false);
      } catch (err) {
        setError("Error fetching books. Please try again later.");
        setLoading(false);
      }
    };
    fetchAllBooks();
  }, []);
  const handleClick = async (e) => {
    e.preventDefault();
  
    // Check if any of the required fields are empty
    if (title == null || desc == null || price == null || author == null || quantity == null) {
      alert('Please fill in all required fields.');
      return; // Don't proceed with the axios call
    }
  
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      
      if (imageFile) { // Only append image if it exists
        formData.append("image", imageFile);
      }
      
      formData.append("price", price);
      formData.append("author", author);
      formData.append("quantity", quantity);
      
      console.log(imageFile);
     
      await axios.put(`http://localhost:8080/api/book/update/${id.substring(1)}`, formData);
      
      window.location.assign('/books/user/sellerbooks/${userid}');
  
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="form">
      <h1>Update Book</h1>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        rows={5}
        placeholder="Description"
        name="desc"
        value={desc}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        name="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="file"
        placeholder="Book Cover"
        name="cover_file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={handleClick}>Update</button>
      
      
    </div>
  );
};

export default EditBook;
