import React, { useEffect, useState,useContext } from 'react';
import { GlobalContext } from './GlobalStore';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/BookDetails.css'; 

const BookDetails = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [raiting, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [desc, setDescription] = useState('');
  const [cover, setImage] = useState('');
  const { info } = useContext( GlobalContext  )
  const { email ,name, memtype} = info; 
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getSingleBookData = async () => {
      try {
        console.log(`http://localhost:8080/api/book/${id.substring(1)}`)
        const  {data}  = await axios.get(`http://localhost:8080/api/book/${id.substring(1)}`);
        const  Rdata  = await axios.get(`http://localhost:8080/api/book/getReview/${id.substring(1)}`)
        
        setTitle(data[0].title);
        setDescription(data[0].desc);
        setImage(data[0].cover);
        setPrice(data[0].price);
        setReviews(Rdata.data);
        console.log(Rdata.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleBookData();
  },[id]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/book/bookDelete/${id}`);
      window.location.assign('/books');
    } catch (err) {
      console.log(err);
    }
  };
  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };
  const handlereview = async (id) => {
    try {
      const date = new Date();
      console.log(date)
      await axios.post(`http://localhost:8080/api/book/addReview`,{
        nameuser:name,
        iditem:id.substring(1),
        content: review,
        raiting:raiting,
        date:date
      })
      await axios.put(`http://localhost:8080/api/book/updateraiting/${id.substring(1)}`)
      window.location.reload();
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
        <div className="displayed-book">
          <div className="book">
            <h2>{title}</h2>
            <img src={`http://localhost:8080/${cover}`} alt="" />
            <p>{desc}</p>
            <span>${price}</span>
            <textarea
              rows={5}
              placeholder="Review"
              name="desc"
              onChange={(e) => setReview(e.target.value)}
            />
            <div>
              <input
                type="range"
                min="0"
                max="5"
                value={raiting}
                onChange={handleRatingChange}
              />
              <p>Selected Rating: {raiting}</p>
              <button className="btn-review" onClick={() => handlereview(id)}>Add Review</button>
            </div>
          </div>
        </div>      
      <div>
        {reviews.map((review) => (
          <div key={review.date}>
            <table className="reviews">
              <tbody> {/* Added tbody for semantic correctness */}
                <tr>
                  <td><h2>{review.nameuser}</h2></td>
                  <td><span>&#9733;{review.raiting}</span></td>
                </tr>
                <tr className="comment">
                  <td colSpan={2}><p>{review.content}</p></td>
                </tr>
                <tr className="date">
                  <td><p>{new Date(review.date).toLocaleDateString()}</p></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default BookDetails;
