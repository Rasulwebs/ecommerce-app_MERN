import React from "react";
import Layout from "../components/Layout/Layout";
import aboutPageImg from "../assets/pageImages/AboutPAgeImg.avif";
import "./styleAboutPage.scss";
const AboutPage = () => {
  return (
    <>
      <Layout title={"About Us - MernStack app"}>
        <section className="about-us">
          <div className="about">
            <img src={aboutPageImg} alt="about-images" className="pic" />
            <div className="text">
              <h2>About Us</h2>

              <h5>
                Front-end Developer &amp; <span>Designer</span>
              </h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Expedita natus ad sed harum itaque ullam enim quas, veniam
                accusantium, quia animi id eos adipisci iusto molestias
                asperiores explicabo cum vero atque amet corporis! Soluta illum
                facere consequuntur magni. Ullam dolorem repudiandae cumque
                voluptate consequatur consectetur, eos provident necessitatibus
                reiciendis corrupti!
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

Layout.defaultProps={
  title:"MernStack app - buy now",
  description:"MernStack project",
  keywords:"MERN, react, scss,node, mongodb",
  author:"Rasulwebs"
}
export default AboutPage;
