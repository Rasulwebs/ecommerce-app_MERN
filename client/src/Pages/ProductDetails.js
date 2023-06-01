import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./styleProductDetailsPage.scss";
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [productCatName, setProductCatName] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  // initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProductCatName(data?.product.category.name);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
      // console.log(data)
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(relatedProducts)

  return (
    <>
      <Layout title={"Product Details"}>
        <div className="container-fluid mt-2 mb-5">
          <div className="row mb-2">
            <div className="col-md-6">
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                className="card-img-top detailImages"
                alt={product.name}
              />
            </div>
            <div className="col-md-6">
              <div className="">
                <h2 className="text-center my-3">Product Details</h2>

                <h5> Name: {product.name}</h5>
                <h5> Description: {product.description}</h5>
                <h5> Price: {product.price}</h5>
                <h5> Category: {productCatName}</h5>
                <button className="btn btn-info my-3">ADD TO CARD</button>
              </div>
            </div>
          </div>
          <hr className="mt-5 mb-1" />
          <div className="row my-2"></div>
          <h5 className=" text-center text-primary">SIMILIAR PRODUCT</h5>
          {relatedProducts.length < 1 && (
            <h3 className="text-secondary text-center my-5">
              No Similar Products Found
            </h3>
          )}
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => {
              return (
                <>
                  <div
                    className="card productCardAdmin m-2"
                    style={{ width: "18rem" }}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top productCardAdminImages"
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
                      <button className="btn btn-warning ">Add To Card</button>
                    </div>
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

export default ProductDetails;
