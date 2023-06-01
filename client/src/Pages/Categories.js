import React from "react";
import Layout from "./../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <>
      <Layout title={"Categories Page"}>
        <div className="container-fluid mt-2 mb-5">
          <div className="row">
            {categories.map((c) => {
              return (
                <>
                  <div className="col-md-6 gx-1 gy-1" key={c._id}>
                    <Link
                      to={`/category/${c.slug}`}
                      className="btn btn-primary text-light "
                    >
                      {c.name}
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Categories;
