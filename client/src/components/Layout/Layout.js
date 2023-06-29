import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
// import "react-toastify/dist/ReactToastify.css";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main>
        <div>{children}</div>
        <Toaster
          toastOptions={{
            success: { style: { background: "green", color: "white" } },
            error: { style: { background: "red", color: "white" } },
          }}
        />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
