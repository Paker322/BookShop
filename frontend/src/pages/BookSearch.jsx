import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GlobalContext } from "./GlobalStore";
import { useParams } from "react-router-dom";
import '../css/BookCard.css'; 

const BookSearch = () => {
  const [books, setBooks] = useState([]);
  const { info } = useContext(GlobalContext);
  const { userid,memtype } = info;
  const { title } = useParams();
  const [orderBy, setOrderBy] = useState("raiting");
  const [asc, setAsc] = useState(true); // true for ascending, false for descending

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        console.log(memtype);
        const res = await axios.get(
          `http://localhost:8080/api/book/searchBook/${title}`,
          {
            params: {
              orderBy: orderBy,
              asc: asc,
            },
          }
        );

        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, [title, orderBy, asc]);

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
    <div className="allsearch">
    <div className="book-container-search">
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
            </div>
          </div>
          {memtype === 'Buyer' && book.quantity > 0 && (
            <button className="btn-main" onClick={() => handleAddBucket(book.id)}>
              Add to Bucket
            </button>
          )}
        </div>
      </div>
    ))}    
  </div>  

  <div className="order-buttons">
        <button className="btn-order" onClick={() => setOrderBy("raiting")}>Order by Rating</button>
        <button className="btn-order" onClick={() => setOrderBy("clikes")}>Order by Clicks</button>
        <button className="btn-order" onClick={() => setOrderBy("price")}>Order by Price</button>
        <button className="btn-order" onClick={() => setAsc(!asc)}>
        {asc ? "Ascending" : "Descending"}
        </button>
    </div>
  </div>
  );
};

export default BookSearch;