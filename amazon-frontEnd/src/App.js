import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Address from "./Address";
import Order from "./Order";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebaseConfig";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AddProduct from "./AddProducts";

const promise = loadStripe(
  "pk_test_51LexR1GiMqd07wDPe37lKXL7OwESbn5YAmtcfkmo2oe7IhfLuJL2FJWCRAHGvn0SNngP5KKCJSXPT3QEkDe7VX7S00W4NIaS8Z"
);
function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    //BEM
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={[<Header />, <Home />]} />
          <Route path="/checkout" element={[<Header />, <Checkout />]} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/payment"
            element={[
              <Elements stripe={promise}>
                <Payment />
              </Elements>,
            ]}
          />
          <Route path="/order" element={[<Header />, <Order />]} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/address" element={[<Header />, <Address />]} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
