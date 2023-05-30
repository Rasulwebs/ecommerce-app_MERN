import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import "./styleAdminPanel.scss"
const { Option } = Select;
const CreateProduct = () => {
  const navigate=useNavigate()
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quanity, setQuanity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
      // console.log(data.category);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  // create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quanity", quanity);
      productData.append("photo", photo);
      productData.append("category", category);

      const { data } = axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message)
      }else{
        toast.success("Product Created Successfuly");
        navigate("/dashboard/admin/products")
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Error");
    }
  };

  return (
    <>
      <Layout title={"Dashboard - Create Product"}>
        <div className="conatiner-fluid p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h2>Product Page</h2>
              <div className="m-1 adminCreateProductSelectForm">
                <Select
                  bordered={false}
                  placeholder="Select a Category"
                  size="large"
                  showSearch
                  className="form-select m-1"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories?.map((cat) => {
                    return (
                      <>
                        <Option key={cat._id} value={cat._id}>
                          {cat.name}
                        </Option>
                      </>
                    );
                  })}
                </Select>
                <div className="mb-2 pt-2">
                  <label className="btn btn-outline-secondary col-md-12">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-2">
                  {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product-photos"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="my-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Write a Name"
                    className="form-control"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="my-3">
                  <textarea
                    value={description}
                    placeholder="Write a Description"
                    className="form-control"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
                <div className="my-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="Write a Price"
                    className="form-control"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
                <div className="my-3">
                  <input
                    type="number"
                    value={quanity}
                    placeholder="Write a Quanity"
                    className="form-control"
                    onChange={(e) => {
                      setQuanity(e.target.value);
                    }}
                  />
                </div>
                <div className="my-3">
                  <Select
                    bordered={false}
                    placeholder="Select Shipping"
                    size="large"
                    className="form-select mb-2"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                  >
                    <Option value="0">NO</Option>
                    <Option value="1">YES</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary w-100" onClick={handleCreate}>
                    CREATE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateProduct;
