import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import Landingpage from "./pages/Landingpage";
import {Blog} from "./pages/Blog";
import {Contact} from "./components/Contact";
import {SignUp} from "./components/SignUp";
import {SignIn} from "./components/SignIn";
import NotFoundpage from "./pages/NotFoundpage";
import Partners from "./components/Partners";
import TermsAndConditions from "./pages/TermsAndConditions";
import {About} from "./pages/About";
import {Profile} from "./components";
import MemberProfile from "./components/MemberProfile";
import EmailVerification from "./components/EmailVerification";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import {Events} from "./pages/Events";
import {EventDetail} from "./components/EventDetail";
import {BlogDetail} from "./components/BlogDetail";
import {POTD} from "./components/POTD";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Landingpage />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog-detail/:issue" element={<BlogDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="*" element={<NotFoundpage />} />
      <Route path="partners" element={<Partners />} />
      <Route path="terms" element={<TermsAndConditions />} />
      <Route path="about" element={<About />} />
      <Route path="profile" element={<Profile />} />
      <Route path="/members/:pk" element={<MemberProfile />} />
      <Route path="/email-verification" element={<EmailVerification />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/api/password-reset/:uidb64/:token" element={<PasswordReset />} />
      <Route path="/events" element={<Events />} />
      <Route path="/event-detail/:slug" element={<EventDetail />} />
      <Route path="/potd" element={<POTD />} />
    </Routes>
  );
};

export default Routers;
