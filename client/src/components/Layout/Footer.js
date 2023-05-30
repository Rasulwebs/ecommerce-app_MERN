import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className="footer bg-dark text-light p-3">
        <h4 className="text-center">All Right Reserved &copy; TechInfo </h4>
        <p className="text-center mt-3">
          <Link to="/about">About</Link>&nbsp;|&nbsp;
          <Link to="/policy">Privacy Policy</Link>&nbsp;|&nbsp;
          <Link to="/contact">Contact</Link>
        </p>
      </footer>
    </>
  );
};

export default Footer;
