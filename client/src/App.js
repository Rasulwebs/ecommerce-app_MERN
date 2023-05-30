import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage.js";
import AboutPage from "./Pages/AboutPage.js";
import Contact from "./Pages/Contact.js";
import Policy from "./Pages/Policy.js";
import NotFoundPage from "./Pages/NotFoundPage.js";
import Register from "./Pages/Auth/Register.js";
import Login from "./Pages/Auth/Login.js";
import Dashboard from "./Pages/user/Dashboard.js";
import PrivateRoute from "./components/Routes/Private.js";
import ForgotPassword from "./Pages/Auth/ForgotPassword.js";
import AdminRoute from "./components/Routes/AdminRoute.js";
import AdminDashboard from "./Pages/Admin/AdminDashboard.js";
import CreateCategory from "./Pages/Admin/CreateCategory.js";
import CreateProduct from "./Pages/Admin/CreateProduct.js";
import Users from "./Pages/Admin/Users.js";
import Orders from "./Pages/user/Orders.js";
import Profile from "./Pages/user/Profile.js";
import Products from "./Pages/Admin/Products.js";
import UpdateProduct from "./Pages/Admin/UpdateProduct.js";
import SearchPage from "./Pages/SearchPage";
import ProductDetails from "./Pages/ProductDetails";
import Categories from "./Pages/Categories";
import CategoryProduct from "./Pages/CategoryProduct";
import CartPage from "./Pages/CartPage";
import AdminOrders from "./Pages/Admin/AdminOrders";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<SearchPage />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
