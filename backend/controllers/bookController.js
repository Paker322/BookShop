
const   cors =require ('cors');
const   express =require ('express');
const   path =require('path');
const   multer =require('multer');
const   mysql =require ('mysql');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());
// tıklanma ve rating getirilmeli 

const db = mysql.createConnection({
    
});

const getBooks = async (req, res) => {
  const q = "SELECT * FROM books ";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
}
//seller books
const getSellerBooks = async (req, res) => {
  const id = req.params.id
  const q = "SELECT * FROM books WHERE sellerid = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
}

//buyer books
const getBuyerBooks = async (req, res) => {
  const id = req.params.id;
  const q = "SELECT books.*, COUNT(buybucket.bookId) AS bookCount FROM books LEFT JOIN buybucket ON books.id = buybucket.bookId WHERE buybucket.buyerId = ? GROUP BY books.id";
  db.query(q, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};



//seller books
const searchBook = async (req, res) => {
  const title = req.params.title;
  const orderBy = req.query.orderBy || "raiting"; // Default orderBy is "raiting" if not provided
  const asc = req.query.asc === "true"; // Convert the string to a boolean
  let order = asc ? "ASC" : "DESC"; // Use "ASC" for ascending and "DESC" for descending

  const searchTerm = `%${title}%`;
  const q = "SELECT * FROM books WHERE title LIKE ? OR `desc` LIKE ? OR author LIKE ? ORDER BY ?? " + order;
  db.query(q, [searchTerm, searchTerm, searchTerm, orderBy], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};


//get rewievs
const getReview = async (req, res) => {
  const id = req.params.id
  console.log((id))
  const q = "SELECT * FROM review WHERE iditem = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
}
const getBook = async (req, res) => {

  const id = req.params.id
  console.log((id))
  const q = "SELECT * FROM books WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
}
// 1. create product
const addBook = async (req, res) => {
  try {
    const { title, desc, price, raiting, author, sellerid, quantity } = req.body;

    // Check if required fields are provided
    if (!title || !desc || !price || !raiting || !author || !sellerid || !quantity) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    const cover = req.file ? req.file.path : null;

    const q =
      'INSERT INTO books(`title`, `desc`, `cover`, `price`, `clikes`, `raiting`, `author`, `sellerid`, `quantity`) VALUES (?)';

    const values = [title, desc, cover, price, 0, raiting, author, sellerid, quantity];

    db.query(q, [values], (err, data) => {
      if (err) {
        console.error('Error adding book:', err);
        return res.status(500).json({ error: 'An error occurred while adding the book.' });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error('Unexpected error adding book:', error);
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};


const updateBook = async (req, res) => {
  const bookId = req.params.bookId;
  let q = "UPDATE books SET";
  const values = [];

  if (req.body.title) {
    q += " title = ?,";
    values.push(req.body.title);
  }

  if (req.body.desc) {
    q += " `desc` = ?,";
    values.push(req.body.desc);
  }

  if (req.file && req.file.path) {
    q += " cover = ?,";
    values.push(req.file.path);
  }

  if (req.body.price) {
    q += " price = ?,";
    values.push(req.body.price);
  }

  if (req.body.author) {
    q += " author = ?,";
    values.push(req.body.author);
  }

  if (req.body.quantity) {
    q += " quantity = ?,";
    values.push(req.body.quantity);
  }

  q = q.slice(0, -1); // Remove the trailing comma
  q += " WHERE id = ?";
  values.push(bookId); // Book ID for the WHERE condition

  console.log(q); // Check the final query
  console.log(values); // Check the final values array

  db.query(q, values, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};


const updateBookClik = async (req, res) => {
  const bookId = req.params.bookId;
  const q = "UPDATE books SET clikes = clikes + 1 WHERE id = ?";
  
  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};

const updateBookRaiting = async (req, res) => {
  const bookId = req.params.bookId;
  const q = "UPDATE books SET raiting = (SELECT AVG(raiting) FROM test.review WHERE iditem = ?) WHERE id = ?";
  
  db.query(q, [bookId, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};

const updateBookQuantity = async (req, res) => {
  const bookId = req.params.bookId;
  const q = "UPDATE books SET quantity = quantity - 1 WHERE id = ?";
  
  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};
const updateBookQuantityPos = async (req, res) => {
  const bookId = req.params.bookId;
  const q = "UPDATE books SET quantity = quantity + 1 WHERE id = ?";
  
  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};

//add to seller bucket
const addSellerBucket = async (req, res) => {
  const q = "INSERT INTO sellbucket(`sellerid`, `bookid`) VALUES (?)";
  console.log("girdi");
  const values = [
      req.body.sellerid,
      req.body.bookid,

      
    ];
  db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
  });


}

//add to buyer bucket
const addBuyerBucket = async (req, res) => {
  const q = "INSERT INTO buybucket(`buyerId`, `bookId`) VALUES (?)";
  console.log("girdi");
  const values = [
      req.body.buyerId,
      req.body.bookId,

      
    ];
  db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
  });


}
// addReview
const addReview = async (req, res) => {
  const q = "INSERT INTO review (`nameuser`, `iditem`, `content`, `raiting`, `date`) VALUES (?)";
  console.log("girdi");
  const values = [
      req.body.nameuser,
      req.body.iditem,
      req.body.content,
      req.body.raiting,
      req.body.date,
      
    ];
  db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
  });


}
// 5. delete product by id
//resmi silme eklenmeli
const deleteBook = async (req, res) => {

  let id = req.params.id
  const q = " DELETE FROM books WHERE id = ? ";
  db.query(q, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });

}

//add to buyer bucket
const deleteFromBucket = async (req, res) => {
  const q = "DELETE FROM buybucket WHERE buyerId = ? AND bookId = ? LIMIT 1";
  const buyerId = req.body.buyerId; // Use req.body.buyerId instead of req.body.data.buyerId
  const bookId = req.body.bookId;   // Use req.body.bookId instead of req.body.data.bookId

  db.query(q, [buyerId, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });


};
// 8. Upload Image Controller

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'images')
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/
      const mimeType = fileTypes.test(file.mimetype)  
      const extname = fileTypes.test(path.extname(file.originalname))

      if(mimeType && extname) {
          return cb(null, true)
      }
      cb('Give proper files formate to upload')
  }
}).single('image')




//User İşlemleri

const addBuyer = async (req, res) => {
  const q = "INSERT INTO buyer(`BuyerName`, `BuyerPassword`,  `BuyerMail`) VALUES (?)";
  console.log("girdi");
  const hashPassword = await bcrypt.hash( req.body.BuyerPassword, 5);
  const values = [
      req.body.BuyerName,
      hashPassword,
      req.body.BuyerMail,
      
      
    ];
    let sendInfo = {
      name:req.body.BuyerName,
      password:hashPassword,
      mail:req.body.BuyerMail,
      type:"Buyer"
  }
 
  console.log(values);
  db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.status(200).json(  {
        success: true,
        info:  {
          _id:data.insertId,
          name:req.body.BuyerName,
          email:req.body.BuyerMail,
          memtype:"Buyer"
          
          
      }
        ,
        token:createToken( data.insertId),
        message: `Buyer ${ req.body.BuyerName } created`
        
    });
  });

}


const addSeller = async (req, res) => {
  const q = "INSERT INTO seller(`SellerName`, `SellerPasword`,  `SellerMail`) VALUES (?)";
  console.log("girdi");
  const hashPassword = await bcrypt.hash( req.body.SellerPasword, 5);
  const values = [
      req.body.SellerName,
      hashPassword,
      req.body.SellerMail,
      
      
    ];
  
  console.log(values);
  db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      const token = createToken( data.insertId);
      return res.status(200).json(  {
        success: true,
        info:  {
          _id:data.insertId,
          name:req.body.SellerName,
          email:req.body.SellerMail,
          memtype:"Seller"
          
          
      },
      token:token,
      message: `Seller ${ req.body.SellerName } created`
        
    });
  });


}





// 3 day * 24 hr * 60 min * 60 sec * 1000 msec 
const maxAge = 3 * 24 * 60 * 60 * 1000; 

const createToken = ( id ) => {

    return jwt.sign( {id}, "THISISTHEKEYTOENCREPTJWTABC", {
        expiresIn: maxAge 
    })

}


const checkLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const type = req.body.type;
    const passwordFromRequest = req.body.password;

    let tableName;
    let passwordName;
    let idName;
    let nameName;
    let mailName;
    let q="";
    if (type === 'Buyer') {
      tableName = 'buyer';
      q = `SELECT * FROM buyer WHERE BuyerMail = ?`;
      passwordName="BuyerPassword"
      idName="idbuyer"
      nameName="BuyerName"
      mailName="BuyerMail"
    } else if (type === 'Seller') {
      tableName = 'seller';
      q = `SELECT * FROM seller WHERE SellerMail = ?`;
      passwordName="SellerPasword"
      idName="idSeller"
      nameName="SellerName"
      mailName="SellerMail"
    } else {
      return res.status(400).json({ success: false, error: 'Invalid member type.' });
    }

    
    db.query(q, [email], async (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: 'An error occurred while fetching data from the database.' });
      }

      if (data.length === 0) {
        return res.status(400).json({ success: false, error: `Error: email ${email} is not found` });
      }

      const user = data[0];
      const passwordFromDatabase = user[`${passwordName}`];

      // Use bcrypt to compare passwords
      try {
        const match = await bcrypt.compare(passwordFromRequest, passwordFromDatabase);

        if (match) {
          const token = createToken(user[`${idName}`]); // Assuming the primary key column is "userid" in the table

          // Return user information along with the token
          return res.status(201).json({
            success: true,
            data: {
              _id: user[`${idName}`],
              email: user[`${mailName}`],
              name: user[`${nameName}`],
              memtype: type,
            },
            token: token,
          });
        } else {
          return res.status(401).json({ success: false, error: 'Wrong email or password' });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'An error occurred during password comparison.' });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




module.exports = {
  addBook,
  getBooks,
  upload,
  deleteBook,
  addBuyer,
  getBook,
  addSeller,
  checkLogin,
  addReview,
  getReview,
  addSellerBucket,
  getSellerBooks,
  searchBook,
  updateBook,
  updateBookClik,
  updateBookRaiting,
  addBuyerBucket,
  updateBookQuantity,
  getBuyerBooks,
  updateBookQuantityPos,
  deleteFromBucket,
};
