import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./styleLoginPage.scss";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password);

    try {
      const res = await axios.post(`/api/v1/auth/login`, {
        email,
        password,
      });

      if (res && res.data.success) {
        toast.success(res.data && res.data.message, { duration: 5000 });
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somenthing want wrong");
    }
  };
  return (
    <>
      <Layout title={"Login"}>
        <div className="container">
          <div className="loginWrapp mt-5 ">
            <h2 className="mb-4"> Login Page </h2>
            <form className="fs-5 loginForms" onSubmit={handleSubmit}>
              <div className="mb-3 ">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <div className="mb-1">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Your Password"
                  required
                />
              </div>
              <button
                type="button"
                className="btn  w-100 text-primary mb-2"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot Password
              </button>
              <button type="submit" className="btn btn-primary w-100">
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
