import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import Landingpage from "./pages/Landingpage";
import {Projects} from "./pages/Projects";
import {Blog} from "./pages/Blog";
import {Contact} from "./components/Contact";
import {SignUp} from "./components/SignUp";
import {SignIn} from "./components/SignIn";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/landingpage" />} />
      <Route path="/landingpage" element={<Landingpage />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="sigin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
};

export default Routers;
