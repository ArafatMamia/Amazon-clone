import axios from "./axios";
import React, { useState } from "react";
import "./AddProducts.css";
function AddProduct() {
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);

  const addProduct = (e) => {
    e.preventDefault();

    axios
      .post("/products/add", { title, imageURL, price, rating })
      .then(() => {
        setTitle("");
        setImageURL("");
        setPrice(0);
        setRating(0);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="addProduct">
      <div className="addProduct__container">
        <img
          className="container__Logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="amazon logo"
        />

        <div className="container__formContainer">
          <h3>Add Product</h3>

          <div className="container__inputContainer">
            <p>Title</p>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="container__inputContainer">
            <p>ImageURL</p>
            <input
              type="text"
              onChange={(e) => setImageURL(e.target.value)}
              value={imageURL}
            />
          </div>
          <div className="container__inputContainer">
            <p>Price</p>
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
          <div className="container__inputContainer">
            <p>Rating</p>
            <input
              type="number"
              onChange={(e) => setRating(e.target.value)}
              value={rating}
            />
          </div>

          <button onClick={addProduct}>Add Product</button>
        </div>
      </div>
    </div>
  );
}
export default AddProduct;
