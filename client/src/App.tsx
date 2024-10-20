import { Outlet, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import ErrorPage from "./components/common/ErrorPage";
import Signup from "./components/Signup";
import SignupSuccess from "./components/SignupSuccess";
import Login from "./components/Login";
import Auctions from "./components/Auctions";
import './App.css';
import Biddings from "./components/Biddings";
import { useEffect } from "react";
import { useAppDispatch, useSetHeaderBgColor } from "./components/common/hooks";
import AboutUs from "./components/AboutUs";
import LanguagesSelection from "./components/LanguagesSelection";
import { getBiddingItems } from "./components/store/biddingsSlice";

import { io } from "socket.io-client";
import useAuthorize from "./components/common/useAuthorize";

export const socket = io('http://localhost:5100', {withCredentials: true});

function App() {
    useAuthorize();
    const headerColor = useSetHeaderBgColor();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getBiddingItems());
    }, []);
  return (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/signupsuccess" element={<SignupSuccess />}></Route>
            <Route path="/auctions" element={<Auctions />}></Route>
            <Route path="/biddings/:id" element={<Biddings />}></Route>
            <Route path="/aboutus" element={<AboutUs />}></Route>
            <Route path="/language" element={<LanguagesSelection />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
        <Outlet />
        {headerColor != 'white' && <Footer />}
    </>
  )
}

export default App;
