import React from "react";
import Form from "./Form";
import Data from "./Data";

const Home = () => {
  return (
    <>
      <section className="continer mt-5">
        <div className="container">
          <div className="col-12">
            <Form />
          </div>
          <div className="col-12 mt-5">
            <Data />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
