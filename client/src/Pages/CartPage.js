import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const navigate = useNavigate();
  const [instance, setInstanse] = useState("");
  const [loading, setLoading] = useState(false);

  // total item
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //   delete item in cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((el) => el._id === pid);
      myCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(myCart));
      setCart(myCart);
    } catch (error) {
      console.log(error);
    }
  };

  // get payment gateway token
  const getToekn = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToekn();
  }, [auth?.token]);

  // handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <Layout title={"Cart Page"}>
        <div className="container-fluid mb-5">
          <div className="row mb-2">
            <div className="col-md-12">
              <h2 className="text-center mb-1">
                {`Hello ${auth?.token && auth?.user?.name}`}
              </h2>
              <h4 className="text-center my-3">
                {cart?.length
                  ? `You Have ${cart.length} items in your Cart ${
                      auth?.token ? "" : "Please login to checkout"
                    }`
                  : "Your Cart is Empty"}
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              {cart?.map((p) => {
                return (
                  <>
                    <div className="row border mb-3">
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top productCardAdminImages2"
                          alt={p.name}
                        />
                      </div>
                      <div className="col-md-8 py-2">
                        <h3>{p.name}</h3>
                        <p>
                          {p.description.length < 30
                            ? p.description
                            : `${p.description.substring(0, 30)}...`}
                        </p>
                        <h4>Price: {p.price}</h4>
                        <button
                          className="btn btn-danger my-1"
                          onClick={() => {
                            removeCartItem(p._id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="col-md-4 ">
              <h2>Cart Summary</h2>
              <p>Totel | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice()}</h4>
              <hr />
              {auth?.user?.address ? (
                <>
                  <div className="mb-2">
                    <h3>Current Adress</h3>
                    <h5 className="mb-4">{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => {
                        navigate("/dashboard/user/profile");
                      }}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-2">
                    {auth?.token ? (
                      <>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => {
                            navigate("/dashboard/user/profile");
                          }}
                        >
                          Update Address
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => {
                            navigate("/login", { state: "/cart" });
                          }}
                        >
                          Please Login to Checkout
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
              <div className="my-2">
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstanse(instance)}
                    />
                    <button
                      className="btn btn-primary w-100 my-2"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing..." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CartPage;
