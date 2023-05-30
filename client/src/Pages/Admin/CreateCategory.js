import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../form/CategoryForm";
import { Modal } from "antd";
import "./styleAdminPanel.scss";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // handle from =========================================================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name}  is Created`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input from");
    }
  };

  //get all category ===============================================================================
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
      // console.log(data.category);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  //  =====================================================================================
  useEffect(() => {
    getAllCategory();
  }, []);

  // update category ========================================================================
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is Updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  // Delete category ========================================================================
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`Category is Deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Layout title={"Dashboard - Create Category"}>
        <div className="conatiner-fluid p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>

            <div className="col-md-9">
              <h2>Category Manage</h2>
              <div className="p-1 mb-3 adminCategoryCreateForm">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>
              <div className="">
                <table className="table table-hover border adminCategoryListTable">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((cat) => {
                      return (
                        <>
                          <tr>
                            <td key={cat._id}>{cat.name}</td>
                            <td>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  setVisible(true);
                                  setUpdatedName(cat.name);
                                  setSelected(cat);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger ms-2"
                                onClick={() => {
                                  handleDelete(cat._id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <Modal
                onCancel={() => {
                  setVisible(false);
                }}
                footer={null}
                visible={visible}
              >
                <div className="categoryNameEditFormInput">
                  <CategoryForm
                    value={updatedName}
                    setValue={setUpdatedName}
                    handleSubmit={handleUpdate}
                  />
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateCategory;
