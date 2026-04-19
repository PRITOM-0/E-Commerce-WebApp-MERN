import React, { use } from "react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import api from "../api/axios";

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/delete/${id}`);
      loadProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };
  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.Products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);

  if (products.length === 0) {
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-indigo-100">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>

          {/* Text */}
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text animate-pulse">
            Loading...
          </h2>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto my-8 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold mb-4">Product List</h2>
            <div>
              <Link
                to={"/admin/addProduct"}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Product
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto my-8 p-4">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Stock</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{product.title}</td>
                  <td className="py-2 px-4 border-b">{product.description}</td>
                  <td className="py-2 px-4 border-b">{product.stock}</td>
                  <td className="py-2 px-4 border-b">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Link
                      to={`/admin/editProduct/${product._id}`}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
