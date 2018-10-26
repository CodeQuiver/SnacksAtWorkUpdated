import axios from "axios";

export default {
  // Gets all products
  getProducts: function() {
    return axios.get("/api/getproducts");
  },
  // Gets the product with the given id
  getProduct: function(id) {
    return axios.get("/api/getproducts/" + id);
  },
  // Deletes the product with the given id
  deleteProducts: function(id) {
    return axios.delete("/api/getproducts/" + id);
  },
  // Saves a product to the database
  saveProducts: function(snacksData) {
    return axios.post("/api/getproducts", snacksData);
  }
};
