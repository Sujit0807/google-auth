import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div>
        <h1 className="text-slate-800 text-2xl text-center">
          WELCOME TO MY APP!
        </h1>
      </div>
    </div>
  );
};

export default Home;
