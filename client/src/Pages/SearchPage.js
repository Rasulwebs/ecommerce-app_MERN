import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/Search";

const SearchPage = () => {
  const [values, setValues] = useSearch();
  console.log(values)
  return (
    <>
      <Layout title={"Search Results"}>
        <div className="conatiner-fluid mt-2 mb-5">
          <div className="">
            <h2 className="text-center">Search Results</h2>
            <h6>
              {values?.results.length < 1
                ? "No Product Found"
                : `Found ${values?.results.length}`}
            </h6>
            <div className="d-flex flex-wrap mt-4">
              {values?.results.map((p) => {
                return (
                  <>
                    <div
                      className="card productCardAdmin m-2"
                      style={{ width: "18rem" }}
                    >
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
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

                        <button className="btn btn-primary m-1">
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
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SearchPage;
