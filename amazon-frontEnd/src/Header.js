import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebaseConfig";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useNavigate();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <>
      <div className="header">
        <Link to="/">
          <img
            className="header__logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="amazon logo"
          />
        </Link>

        <div className="header__place">
          <LocationOnOutlinedIcon />
          <div className="header__placeOption ">
            <span className="header__optionLineOne">Deliver to</span>
            <span className="header__optionLineTwo">Ethiopia</span>
          </div>
        </div>

        <div className="header__search">
          <div>
            <select className="header__dropdown">
              <option value="All">All</option>
              <option value="All">All Departments</option>
              <option value="Alexa">Arts & Crafts</option>
              <option value="Books">Books</option>
              <option value="Baby">Baby</option>
              <option value="Beauty">Beauty</option>
              <option value="Clothes">Clothes</option>
            </select>
          </div>
          <input className="header__searchInput" type="text" />
          <SearchIcon
            className="header__searchIcon"
            onClick={() => history("/addproduct")}
          />
        </div>
        <div className="header__nav">
          <Link to={!user && "/login"}>
            <div onClick={handleAuthenticaton} className="header__option">
              <span className="header__optionLineOne">
                Hello {user ? "Sign Out" : "Sign In"}
              </span>
              <span className="header__optionLineTwo">Accounts & Lists</span>
            </div>
          </Link>
          <Link to={(!user && "/login") || (user && "/order")}>
            <div className="header__option ">
              <span className="header__optionLineOne">Returns</span>
              <span className="header__optionLineTwo">& Orders</span>
            </div>
          </Link>
          <Link to="/checkout">
            <div className="header__optionBasket">
              <div className="header__basket">
                <span className="header__optionLineTwo header__basketCount">
                  {basket?.length}
                </span>
                <ShoppingCartOutlinedIcon />
              </div>
              <span className="header__optionLineTwo cart">Cart</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="header__footer">
        <div className="header__body">
          <div className="header__footer--text">Today's Deals</div>
          <div className="header__footer--text">Customer Service</div>
          <div className="header__footer--text">Registry</div>
          <div className="header__footer--text">Gift Cards</div>
          <div className="header__footer--text">Sell</div>
        </div>
      </div>
    </>
  );
}

export default Header;
