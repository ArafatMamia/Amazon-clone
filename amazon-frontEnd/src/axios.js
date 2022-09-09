import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  baseURL: "https://amazon-clone-challenge1.herokuapp.com/",
});

export default instance;
