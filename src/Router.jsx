import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import Landingpage from "./pages/Landingpage";
import {Projects} from "./pages/Projects";
import {Blog} from "./pages/Blog";
import {Contact} from "./components/Contact";
import {SignUp} from "./components/SignUp";
import {SignIn} from "./components/SignIn";
import NotFoundpage from "./pages/NotFoundpage";
import Partners from "./components/Partners";
import TermsAndConditions from "./pages/TermsAndConditions";
import {About} from "./pages/About";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/landingpage" />} />
      <Route path="/landingpage" element={<Landingpage />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="*" element={<NotFoundpage />} />
      <Route path="partners" element={<Partners />} />
      <Route path="terms" element={<TermsAndConditions />} />
      <Route path="about" element={<About />} />
    </Routes>
  );
};

export default Routers;
