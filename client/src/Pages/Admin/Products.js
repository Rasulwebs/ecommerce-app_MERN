import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styleAdminPanel.scss";
const Products = () => {
  const [products, setProduct] = useState([]);

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProduct(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <Layout title="All Products">
        <div className="container-fluid my-5">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h2 className="text-center">All Products List</h2>
              <div className="d-flex align-items-center flex-wrap">
                {products?.map((p) => {
                  return (
                    <>
                      <Link
                        to={`/dashboard/admin/product/${p.slug}`}
                        key={p._id}
                        className="product-link"
                      >
                        <div
                          className="card productCardAdmin m-2"
                          style={{ width: "18rem" }}
                        >
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top productCardAdminImages2"
                            alt={p.name}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description}</p>
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Products;
