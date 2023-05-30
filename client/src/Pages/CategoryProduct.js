import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categoryy, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);
  // get products by category
  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title={"Category Products"}>
        <div className="container-fluid mt-2 mb-5">
          <h4 className="text-center my-3">Category - {categoryy?.name}</h4>
          <h5 className="text-center my-3">{products?.length} Result Found</h5>
          <div className="d-flex flex-wrap">
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
                        {p.description.length < 30
                          ? p.description
                          : `${p.description.substring(0, 30)}...`}
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
                      <button className="btn btn-warning m-1">
                        Add To Card
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          {/* <div className="m-2">
                {products && products.length < total && (
                  <button
                    className="btn btn-secondary d-block w-25 mx-auto"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loading ? "Loading ..." : "Loadmore"}
                  </button>
                )}
              </div> */}
        </div>
      </Layout>
    </>
  );
};

export default CategoryProduct;
