import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "./axios";
import Product from "./Product";
import AddProduct from "./AddProducts";
function Home() {
  const [products, setProducts] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      const data = await axios.get("/products/get");
      setProducts(data);
    };
    fetchdata();
  }, []);
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg"
          alt=""
        />
        <div className="home__row">
          {products &&
            products?.data.map(
              (product) =>
                product.rating === 4 && (
                  <Product
                    id={product._id}
                    title={product.title}
                    price={product.price}
                    image={product.imageURL}
                    rating={product.rating}
                  />
                )
            )}
        </div>
        <div className="home__row">
          {products &&
            products?.data.map(
              (product) =>
                product.rating === 5 && (
                  <Product
                    id={product._id}
                    title={product.title}
                    price={product.price}
                    image={product.imageURL}
                    rating={product.rating}
                  />
                )
            )}
        </div>
        <div className="home__row">
          {products &&
            products?.data.map(
              (product) =>
                product.rating === 3 && (
                  <Product
                    id={product._id}
                    title={product.title}
                    price={product.price}
                    image={product.imageURL}
                    rating={product.rating}
                  />
                )
            )}
        </div>
        <div className="home__row">
          {products &&
            products?.data.map(
              (product) =>
                product.rating === 2 && (
                  <Product
                    id={product._id}
                    title={product.title}
                    price={product.price}
                    image={product.imageURL}
                    rating={product.rating}
                  />
                )
            )}
        </div>
        <div className="home__row">
          {products &&
            products?.data.map(
              (product) =>
                product.rating === 1 && (
                  <Product
                    id={product._id}
                    title={product.title}
                    price={product.price}
                    image={product.imageURL}
                    rating={product.rating}
                  />
                )
            )}
        </div>
      </div>
    </div>
  );
}

export default Home;
