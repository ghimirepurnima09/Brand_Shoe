import axios from "axios";

const API = "http://localhost:5000/api/products";

// GET PRODUCTS

export const GetProducts = async () => {

  return await axios.get(`${API}/getproducts`);

};