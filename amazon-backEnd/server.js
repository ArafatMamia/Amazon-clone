const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Products = require("./Products");
const Orders = require("./orders");
const stripe = require("stripe")(
  "sk_test_51LexR1GiMqd07wDPG23CYkivyXXamdR8Fs7iIhweYhssdGYpyuBSjcpcGJo2lDgXjZj76VV3BRBylhpFVizMSz1i00krlZmddZ"
);
const app = express();
const port = process.env.PORT || 8000;

//Middlewares
app.use(express.json());
app.use(cors());

//database
const URL =
  "mongodb+srv://Arafat:y4C-38ikhkv9DeK@cluster0.h7ccedd.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//API
app.get("/", (req, res) => {
  res.status(200).send("amazon backend");
});

//add product
app.post("/products/add", (req, res) => {
  const productDetail = req.body;

  console.log("Product Detail >>>>", productDetail);

  Products.create(productDetail, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
      console.log(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//get the product
app.get("/products/get", (req, res) => {
  Products.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//api for payment
app.post("/payment/create", async (req, res) => {
  const total = req.body.amount;
  console.log("Payment Request recieved for this in dolar", total);

  const payment = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: "USD",
  });

  res.status(201).send({
    clientSecret: payment.client_secret,
  });
});

// API  to add order details

app.post("/orders/add", (req, res) => {
  const products = req.body.basket;
  const price = req.body.price;
  const email = req.body.email;
  const address = req.body.address;

  const orderDetail = {
    products: products,
    price: price,
    address: address,
    email: email,
  };

  Orders.create(orderDetail, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("order added to database >> ", result);
    }
  });
});

//api for orders details from database
app.post("/orders/get", (req, res) => {
  const email = req.body.email;

  Orders.find((err, result) => {
    if (err) {
      console.log(err);
    } else {
      const userOrders = result.filter((order) => order.email === email);
      res.send(userOrders);
    }
  });
});
app.listen(port, () => {
  console.log("listening on the port", port);
});
