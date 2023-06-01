import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
const { Option } = Select;
const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Deliverd",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      //   console.log(data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      console.log("orderid", orderId);
      console.log(`value; ${value}`);
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      console.log(`data; ${data}`);
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout title={"Orders Page"}>
        <div className="container-fluid mb-5">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h2>All Orders</h2>
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
                    console.log(o);
                    console.log("o._id" + o._id);

                    return (
                      <>
                        <tbody>
                          <tr>
                            <th scope="row">{i + 1}</th>
                            <td>
                              <Select
                                bordered={false}
                                onChange={(value) => {
                                  handleChange(o._id, value);
                                }}
                                defaultValue={o?.status}
                              >
                                {status.map((s, i) => {
                                  return (
                                    <>
                                      <Option key={i} value={s}>
                                        {s}
                                      </Option>
                                    </>
                                  );
                                })}
                              </Select>
                            </td>
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

export default AdminOrders;
