import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./styleLoginPage.scss";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

  
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      // console.log(email, password);
  
      try {
        const res = await axios.post(`/api/v1/auth/forgot-password`, {
          email,
          newPassword,
          answer
        });
  
        if (res && res.data.success) {
          toast.success(res.data && res.data.message, { duration: 5000 });
          navigate("/login");
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
         <Layout title={"Forgot Password"}>
            <div className="container">
          <div className="loginWrapp mt-5 ">
            <h2 className="mb-4">RESET PASSWORD </h2>
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
              <div className="mb-3 ">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="form-control"
                  id="exampleInputAnswer1"
                  placeholder="Enter Your Favorite Sports"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Your Password"
                  required
                />
              </div>
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

export default ForgotPassword;