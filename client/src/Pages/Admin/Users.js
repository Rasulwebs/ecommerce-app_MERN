import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const Users = () => {
  return (
    <>
      <Layout title={"Dashboard - All Users"}>
        <div className="conatiner-fluid p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h2>Users Page</h2>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Users;
