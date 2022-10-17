import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { CompatRouter } from "react-router-dom-v5-compat";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import { useLayoutEffect } from "react";
// import {AnimatePresence} from "framer-motion/dist/framer-motion";


const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };

  return (
    // <AnimatePresence>
    <Wrapper>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        {/* stripe data is required to use the success */}
        <Route path="/success" element={<Success />} />

        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </Wrapper>
    // {/* </AnimatePresence> */}
  );
};

export default App;
