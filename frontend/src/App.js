import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Books from "./pages/Books";
import Update from "./pages/Update";
import BookDetails from "./pages/BookDetails";
import Register from "./pages/Register";
import { GlobalStore } from "./pages/GlobalStore";
import NavBar from "./pages/NavBar";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import SellerBooks from "./pages/SellerBooks";
import BookSearch from "./pages/BookSearch";
import EditBook from "./pages/EditBook";
import BuyerBooks from "./pages/BuyerBooks";
function App() {
  return (
    <div >
      <BrowserRouter>
      <GlobalStore>
      <NavBar />
      <div className="app">
        <Routes>
          <Route path="/books" element={<Books />} />
          <Route path="/books/add" element={<Add />} />
          <Route path="/books/bookdetails/:id" element={<BookDetails />} />
          <Route path="/books/update/:id" element={<EditBook />} />
          <Route path="/books/BookSearch/:title" element={<BookSearch />} />
          <Route path="/books/user/register" element={<Register />} />
          <Route path="/books/user/sellerbooks/:id" element={<SellerBooks />} />
          <Route path="/books/user/buyerbooks/:id" element={<BuyerBooks />} />
          <Route path="/books/user/logout" element={<Logout/>} />
          <Route path="/books/user/login" element={<Login/>} />
        </Routes>
      </div>
        </GlobalStore>
      </BrowserRouter>
      
    </div>
  );
}

export default App;