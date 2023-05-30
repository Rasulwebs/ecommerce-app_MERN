import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  // get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);
  // form send function ===========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name, email, phone, address, password);

    try {
      const {data} = await axios.put(`/api/v1/auth/profile`, {
        name,
        email,
        phone,
        address,
        password,
      });
      console.log(data)
      if(data?.error){
        toast.error(data?.error)
      }else{
        setAuth({...auth,user:data?.updatedUser})
        let ls=localStorage.getItem("auth")
        ls=JSON.parse(ls)
        ls.user=data.updatedUser
        localStorage.setItem("auth", JSON.stringify(ls))
        toast.success("Profile Updated Successfully")
      }
      // console.log(res.data.success)
    } catch (error) {
      console.log(error);
      toast.error("Somenthing want wrong");
    }
  };
  return (
    <>
      <Layout title={"Dashboard - Profile"}>
        <div className="container-fluid p-1">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <h2>Your Profile</h2>
              <div className="registerWrapp my-5 ">
                <h2 className="mb-4"> USER PROFILE </h2>
                <form className="fs-5 registerForm" onSubmit={handleSubmit}>
                  <div className="mb-3 ">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      id="exampleInputName1"
                      placeholder="Enter Your Name"
                      
                      autoFocus
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
                      
                      disabled
                    />
                  </div>
                  <div className="mb-3 ">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control"
                      id="exampleInputPhone1"
                      placeholder="Enter Your Phone"
                      
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
                      
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    UPDATE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
