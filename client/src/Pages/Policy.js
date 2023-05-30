import React from "react";
import Layout from "../components/Layout/Layout";
import privacyPoliceImg from "../assets/pageImages/privacyPolicyImg.avif";
import "./stylePrivacyPolicy.scss";
const Policy = () => {
  return (
    <>
      <Layout title={"Privacy Policy"}>
        <section className="about-us">
          <div className="about">
            <img src={privacyPoliceImg} alt="about-images" className="pic" />
            <div className="text">
              <h2>Privacy-Policy</h2>

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

export default Policy;
