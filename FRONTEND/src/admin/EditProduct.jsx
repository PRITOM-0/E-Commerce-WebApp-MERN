import React, { use } from "react";
import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useParams } from "react-router";

const EditProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    catagory: "",
    image: "",
    stock: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setFormData(res.data.product);
      } catch (err) {
        setMsg({
          error:
            err.response?.data?.message ||
            "An error occurred. Please try again.",
          success: "",
        });
      }
    };
    loadProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/products/update/${id}`, formData);
      navigate("/admin/productList");
    } catch (err) {
      alert(
        err.response?.data?.message || "An error occurred. Please try again.",
      );
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMsg({ error: "", success: "" });
  };
  const handleClear = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      catagory: "",
      image: "",
      stock: "",
    });
    setMsg({
      error: "",
      success: "",
    });
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="text-2xl text-center font-bold mb-6  bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200">
            <Link to={"/admin/productList"}>View All Products</Link>
          </div>
          <hr />
          <div className="mb-4 w-50 mx-auto">
            <img src={formData.image} alt={formData.title} />
          </div>
          <h2 className="text-2xl font-bold mt-5 mb-6 text-center text-blue-500">
            Edit Product
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="title">
                Title
              </label>
              <input
                className="w-full px-3 py-2 border border-blue-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                type="text"
                name="title"
                placeholder="Enter product title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="description">
                Description
              </label>
              <input
                className="w-full px-3 py-2 border border-blue-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                type="text"
                name="description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="price">
                Price
              </label>
              <input
                className="w-full px-3 py-2 border border-blue-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                type="text"
                name="price"
                placeholder="Enter your price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="catagory">
                Catagory
              </label>
              <input
                className="w-full px-3 py-2 border border-blue-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                type="text"
                name="catagory"
                placeholder="Enter product catagory"
                value={formData.catagory}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="image">
                Image
              </label>
              <input
                className="w-full px-3 py-2 border border-blue-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                type="text"
                name="image"
                placeholder="Enter product image url"
                value={formData.image}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="stock">
                Stock
              </label>
              <input
                className="w-full px-3 py-2 border border-blue-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                type="text"
                name="stock"
                placeholder="Enter product stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200"
                onClick={handleClear}
              >
                Clear
              </button>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
