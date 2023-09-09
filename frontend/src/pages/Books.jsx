import React from "react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GlobalContext } from './GlobalStore';
import '../css/BookCard.css'; 

const Books = () => {
  const { info } = useContext(GlobalContext);
  const { userid, email, memtype } = info;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/book/getBooks");

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

  const handleAddBucket = async (id) => {
    try {
      await axios.post(`http://localhost:8080/api/book/addbuyerbucket`, {
        buyerId: userid,
        bookId: id
      });
      await axios.put(`http://localhost:8080/api/book/updatebookquantity/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="books-container">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <div className="book-content" onClick={() => handleClick(book.id)}>
            {/* Front of the book card */}
            <Link to={`/books/bookdetails/:${book.id}`} className="book-front">
              <img src={`http://localhost:8080/${book.cover}`} alt="" className="book-image" />
            </Link>
  
            {/* Back of the book card */}
            <div className="book-back">
              <Link to={`/books/bookdetails/:${book.id}`}>
                <p>{book.desc}</p>
              </Link>
            </div>
          </div>
          
          {/* Book information */}
          <div className="book-info">
            <div className="book-title" onClick={() => handleClick(book.id)}>
              <Link to={`/books/bookdetails/:${book.id}`} className="book-link">
                {book.title}
              </Link>
              <div className="book-price">
                <span>&#9733;{book.raiting}&nbsp;|&nbsp;</span>
                <span>${book.price}</span>
              </div>
            </div>
            
            {/* Add to Bucket button */}
            {memtype === 'Buyer' && book.quantity > 0 && (
              <button className="btn-main" onClick={() => handleAddBucket(book.id)}>
                Add to Bucket
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};  

export default Books;