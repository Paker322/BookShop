import React from "react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GlobalContext } from './GlobalStore';
import '../css/BookCard.css'; 

const SellerBooks = () => {
  const { info } = useContext(GlobalContext);
  const { userid, email, memtype } = info;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/book/getSellerBooks/${userid}`);

        setBooks(res.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching books. Please try again later.");
        setLoading(false);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/book/bookDelete/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/book/updateclik/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

 

  return (
    <div className="books-container"> {/* Removed unnecessary <div> */}
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <div className="book-content" onClick={() => handleClick(book.id)}>
            <div className="book-front"> {/* Removed duplicate onClick event */}
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
            <div className="book-title" onClick={() => handleClick(book.id)}>
              <Link to={`/books/bookdetails/:${book.id}`} className="book-link">
                {book.title}
              </Link>
              <div className="book-price">
                <span>&#9733;{book.raiting}&nbsp;|&nbsp;</span>
                <span>${book.price}|</span>
                <span>{book.clikes}</span>
              </div>
            </div>
            <div className="buttons">
              <button className="btn-update">
                <Link to={`/books/update/:${book.id}`} style={{ color: "inherit"}}>
                  Update
                </Link>
              </button>
              <button className="btn-delete" onClick={() => handleDelete(book.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );  
};

export default SellerBooks;