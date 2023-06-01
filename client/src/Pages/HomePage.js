import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import "./styleHomePage.scss";
const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all category ===============================================================================
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //  =====================================================================================
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  // get all Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // gety total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by category
  const handleFilter = async (value, id) => {
    let allCat = [...checked];
    if (value) {
      allCat.push(id);
    } else {
      allCat.filter((cat) => cat !== id);
    }
    setChecked(allCat);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // get filtred products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Layout title={"All Products - Best offers"}>
        <div className="container-fluid mt-2 mb-5">
          <div className="row">
            <div className="col-md-3">
              <hr />
              <h4 className="text-center">Filter by Category</h4>
              <hr />
              <div className="d-flex flex-column">
                {categories?.map((cat) => {
                  return (
                    <>
                      <Checkbox
                        key={cat._id}
                        onChange={(e) => {
                          handleFilter(e.target.checked, cat._id);
                        }}
                        className="fs-6"
                      >
                        {cat.name}
                      </Checkbox>
                    </>
                  );
                })}
              </div>
              {/* Price Filter */}
              <hr />
              <h4 className="text-center mt-2">Filter by Prices</h4>
              <hr />
              <div className="d-flex flex-column">
                <Radio.Group
                  onChange={(e) => {
                    setRadio(e.target.value);
                  }}
                  className="fs-6"
                >
                  {Prices?.map((pr) => {
                    return (
                      <>
                        <div key={pr._id}>
                          <Radio value={pr.array}>{pr.name}</Radio>
                        </div>
                      </>
                    );
                  })}
                </Radio.Group>
              </div>

              <div className="d-flex flex-column mt-4">
                <button
                  className="btn btn-danger w-100"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  RESET FILTER
                </button>
              </div>
            </div>
            <div className="col-md-9">
              {/* {JSON.stringify(radio, null, 4)} */}
              <h2 className="text-center">All Products</h2>
              <div className="d-flex flex-wrap">
                {products.length ? (
                  <>
                    {products?.map((p) => {
                      return (
                        <>
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
                              <p className="card-text">
                                {p.description.length < 28
                                  ? p.description
                                  : `${p.description.substring(0, 28)}...`}
                              </p>
                              <p className="card-text">{p.price}</p>

                              <button
                                className="btn btn-primary m-1"
                                onClick={() => {
                                  navigate(`/product/${p.slug}`);
                                }}
                              >
                                More Details
                              </button>
                              <button
                                className="btn btn-warning m-1"
                                onClick={() => {
                                  setCart([...cart, p]);
                                  localStorage.setItem(
                                    "cart",
                                    JSON.stringify([...cart, p])
                                  );
                                  toast.success("Item Added to Cart");
                                }}
                              >
                                Add To Card
                              </button>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <h2 className="text-center text-secondary noteProductTitle">
                      Note Product
                    </h2>
                  </>
                )}
              </div>
              <div className="m-2">
                {products && products.length < total && (
                  <button
                    className="btn text-primary d-block w-25 mx-auto"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loading ? "Loading ..." : "Loadmore"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
