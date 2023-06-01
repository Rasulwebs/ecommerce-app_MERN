import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <>
      <Layout>
        <div className="conatiner-fluid p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="card p-1">
                <h2>
                  Admin Name:
                  {auth?.user?.name}
                </h2>
                <h2>
                  Admin Email:
                  {auth?.user?.email}
                </h2>
                <h2>
                  Admin phone:
                  {auth?.user?.phone}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AdminDashboard;
