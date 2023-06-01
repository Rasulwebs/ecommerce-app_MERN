import React from "react";
import Layout from "../../components/Layout/Layout";
import "./styleDashboardPage.scss";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
const Dashboard = () => {
  const [auth] = useAuth();
  console.log(auth);
  return (
    <>
      <Layout title={"Daashboard - Mern Stack App"}>
        <div className="conatiner-fluid p-1">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-75 px-3">
                <h2>{auth?.user?.name}</h2>
                <h2>{auth?.user?.email}</h2>
                <h2>{auth?.user?.address}</h2>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
