import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./styleRegisterPage.scss";
const Register = () => {
  //register info===================================================
  const [name, setNmae] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form send function ===========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name, email, phone, address, password);

    try {
      const res = await axios.post(`/api/v1/auth/register`, {
        name,
        email,
        phone,
        address,
        password,
        answer,
      });
      // console.log(res.data.success)

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
  // console.log(process.env.REACT_APP_API)

  return (
    <>
      <Layout title={"Register"}>
        <div className="container-fluid">
          <div className="registerWrapp my-5 ">
            <h2 className="mb-4"> Register Page </h2>
            <form className="fs-5 registerForm" onSubmit={handleSubmit}>
              <div className="mb-3 ">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setNmae(e.target.value)}
                  className="form-control"
                  id="exampleInputName1"
                  placeholder="Enter Your Name"
                  required
                />
              </div>
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
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  id="exampleInputPhone1"
                  placeholder="Enter Your Phone"
                  required
                />
              </div>
              <div className="mb-3 ">
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="exampleInputAddress1"
                  placeholder="Enter Your Address"
                  required
                />
              </div>
              <div className="mb-3">
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
              <div className="mb-3">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="form-control"
                  id="exampleInputAnswer1"
                  placeholder="What is Your Favorite Sports"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                REGISTER
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Register;
