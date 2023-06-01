import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <>
      <Layout title={"Dashboard - Orders"}>
        <div className="conatiner-fluid p-1">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <h2 className="text-center text-success mb-3">All Orders</h2>
              <div className="border shadow">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quanity</th>
                    </tr>
                  </thead>
                  {orders?.map((o, i) => {
                    return (
                      <>
                        <tbody>
                          <tr>
                            <th scope="row">{i + 1}</th>
                            <td>{o?.status}</td>
                            <td>{o?.buyer?.name}</td>
                            <td>{moment(o?.createdAt).fromNow()}</td>
                            <td>{o?.payment.success ? "Success" : "Failed"}</td>
                            <td>{o?.products?.length}</td>
                          </tr>
                        </tbody>
                      </>
                    );
                  })}
                </table>
                {orders?.map((o) => {
                  return (
                    <>
                      <div>
                        {o?.products?.map((p, i) => {
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
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
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

export default Orders;
