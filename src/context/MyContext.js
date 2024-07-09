import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const mycontext = createContext();
const API = "http://localhost:3000/api";

export const ContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("token") || null
  ); // Initialize from localStorage if available
  const [loginError, setLoginError] = useState(null);
  const [signupError, setSignupError] = useState(null);
  // const [userID, setUserID] = useState("");
  const [products, setProducts] = useState([]);
  const [storeProducts, setStoreProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [storeCategories, setStoreCategories] = useState([]);
  const userID = localStorage.getItem("userID");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get(API + "/auth/get-all-users");
      setLoading(false);
      setUsers(res.users);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const userSignup = async (email, fullName, password, role) => {
    setLoading(true);
    try {
      const res = await axios.post(API + "/auth/signup", {
        email,
        fullName,
        password,
        role,
      });
      setLoading(false);
      // Handle the successful signup if needed, such as redirecting or showing a success message
    } catch (error) {
      console.log(error);
      setSignupError(error.response?.data?.message || "Signup failed");
      setLoading(false);
    }
  };

  const userLogin = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(API + "/auth/login", { email, password });
      const token = res.token;
      setAuthToken(token);
      localStorage.setItem("token", token); // Store token in localStorage
      localStorage.setItem("userData", JSON.stringify(res.data)); // Store token in localStorage
      localStorage.setItem("userID", res.data._id);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoginError(error.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  const userLogout = () => {
    setAuthToken(null);
    localStorage.removeItem("token");
  };

  const specificUserProducts = async () => {
    try {
      // const res = await axios.get(API + "/products/user/" + userID);
      const res = await axios.get(`${API}/products/user/${userID}`);
      setLoading(false);
      setProducts(res);
    } catch (error) {
      console.log(error);
    }
  };

  const addSpecificUserProduct = async (productData) => {
    try {
      const res = await axios.post(API + "/products/add-products", productData);
      setProducts([...products, res]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleProduct = async (productID) => {
    try {
      const res = await axios.get(
        API + "/products/single-product/" + productID
      );
      setSingleProduct(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const updateProduct = async (productID, productData) => {
    try {
      const res = await axios.put(
        API + "/products/single-product/" + productID,
        productData
      );
      setSingleProduct(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async (productID) => {
    try {
      const res = await axios.delete(
        API + "/products/single-product/" + productID
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await axios.get(API + "/categories/get-categories");
      setCategories(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const addCategory = async (categoryData) => {
    try {
      const res = await axios.post(
        API + "/categories/add-category",
        categoryData,
        config
      );
      setCategories([...categories, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleCategory = async (categoryID) => {
    try {
      const res = await axios.get(
        API + "/categories/get-current-category/" + categoryID
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategory = async (categoryID, categoryData) => {
    try {
      const res = await axios.put(
        API + "/categories/update-category/" + categoryID,
        categoryData
      );
      setCategories([...categories, res.data]);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (categoryID) => {
    try {
      const res = await axios.delete(
        API + "/categories/delete-category/" + categoryID
      );
      setCategories([...categories, res.data]);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllOrders = async () => {
    try {
      const res = await axios.get(API + "/orders/getAllOrders");
      console.log(res.data);
      setOrders(res.data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllStoreCategories = async () => {
    try {
      const res = await axios.get(API + "/storeCategory/all-store-category");
      setStoreCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const addStoreCategory = async (formData) => {
    console.log(formData);
    try {
      const res = await axios.post(
        API + "/storeCategory/add-store-category",
        formData,
        config
      );
      setStoreCategories([...storeCategories, res.data]);
    } catch (error) {
      console.error(error);
    }
  };
  const getSingleStoreCategory = async (id) => {
    try {
      const res = await axios.get(`${API}/storeCategory/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  const updateStoreCategory = async (id, updatedCategory) => {
    try {
      const res = await axios.put(
        `${API}/storeCategory/${id}`,
        updatedCategory,
        config
      );
      setStoreCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === id ? res.data : category
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  const deleteStoreCategory = async (id) => {
    try {
      const res = await axios.delete(`${API}/storeCategory/${id}`);
      if (res.status === 200) {
        setStoreCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  const addSpecificUserStoreProduct = async (productData) => {
    try {
      const res = await axios.post(
        API + "/store-product/add-store-product",
        productData
      );
      setStoreProducts([...storeProducts, res]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserStoreProduct = async () => {
    try {
      // const res = await axios.get(API + "/products/user/" + userID);
      const res = await axios.get(
        `${API}/store-product/all-products/${userID}`
      );
      setLoading(false);
      setStoreProducts(res);
    } catch (error) {
      console.log(error);
    }
  };
  const getSingleStoreProduct = async (productID) => {
    try {
      const res = await axios.get(API + "/store-product/" + productID);
      setLoading(false);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const updateStoreProduct = async (productID, productData) => {
    try {
      const res = await axios.put(
        API + "/store-product/" + productID,
        productData
      );
      setStoreProducts([...storeProducts, res.data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteStoreProduct = async (productID) => {
    try {
      const res = await axios.delete(API + "/store-product/" + productID);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <mycontext.Provider
      value={{
        getAllUsers,
        specificUserProducts,
        addSpecificUserProduct,
        userSignup,
        userLogin,
        userLogout,
        getSingleProduct,
        updateProduct,
        deleteProduct,
        getAllCategories,
        addCategory,
        getSingleCategory,
        updateCategory,
        deleteCategory,
        getAllOrders,
        getAllStoreCategories,
        addStoreCategory,
        getSingleStoreCategory,
        updateStoreCategory,
        deleteStoreCategory,
        addSpecificUserStoreProduct,
        getUserStoreProduct,
        getSingleStoreProduct,
        updateStoreProduct,
        deleteStoreProduct,
        storeProducts,
        storeCategories,
        orders,
        singleProduct,
        users,
        products,
        categories,
        loading,
        authToken,
        signupError,
        loginError,
      }}
    >
      {children}
    </mycontext.Provider>
  );
};

export const useApi = () => useContext(mycontext);
