import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import  { useContext } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { GlobalContext } from './GlobalStore'
import '../css/BookCard.css'; 
const BuyerBooks = () => {
  const [books, setBooks] = useState([]);
  const { info } = useContext( GlobalContext  )
   
  const { userid } = info; 
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        console.log(userid);
        const res = await axios.get(`http://localhost:8080/api/book/getbuyerbooks/${userid}`);
        
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  console.log(books);
  
const handleClick = async (id) => {
  try {
    await axios.put(`http://localhost:8080/api/book/updateclik/${id}`)
    
  } catch (err) {
    console.log(err);
  }
};

// sepetten çıkarma ile düzenlencek
  const handleDelete = async (id) => {
    try {
      
      
      const c = {
        buyerId: userid,
        bookId: id
      }
      console.log(c)
      await axios.delete("http://localhost:8080/api/book/bucketdelete",  { data: c } )
      await axios.put(`http://localhost:8080/api/book/updatebookquantityp/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="books-container">
      {books.map((book) => (
        <div key={book.id} className="book-card" onClick={() => handleClick(book.id)}>
          <div className="book-content">
            <div className="book-front">
              <Link to={`/books/bookdetails/:${book.id}`}>
                <img src={`http://localhost:8080/${book.cover}`} alt="" className="book-image" />
              </Link>
            </div>
            <div className="book-back">
              <Link to={`/books/bookdetails/:${book.id}`}>
                <div>
                  <p className="book-description">{book.desc}</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="book-info">
            <div className="book-title">
              <Link to={`/books/bookdetails/:${book.id}`} className="book-link">
                {book.title}
              </Link>
              <div className="book-price">
                <span>&#9733;{book.raiting}&nbsp;|&nbsp;</span>
                <span>${book.price}</span>
                <span>&nbsp;|&nbsp;{book.bookCount }x</span>
              </div>
            </div>
            <button className="btn-bucket" onClick={() => handleDelete(book.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};  

export default BuyerBooks;
