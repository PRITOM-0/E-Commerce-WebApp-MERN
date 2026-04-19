
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddProduct from "./admin/Addproduct";
import { ProductList } from "./admin/ProductList";
import EditProduct from "./admin/EditProduct";
import ProductDetails from "./pages/ProductDetails";
 

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/admin/addproduct", element: <AddProduct /> },
  { path: "/admin/productList", element: <ProductList /> },
  { path: "/admin/editProduct/:id", element: <EditProduct /> },
  { path: "/product/:id", element: <ProductDetails /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
