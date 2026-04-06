import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";

function App() {
  return (
    <>
      <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <Link to="/product/example.html" style={{ marginRight: "1rem" }}>Product</Link>
        <Link to="/category" style={{ marginRight: "1rem" }}>Category</Link>
        <Link to="/checkout" style={{ marginRight: "1rem" }}>Checkout</Link>
        <Link to="/orderConfirmation">Order Confirmation</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/product/:product" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderConfirmation" element={<OrderConfirmation />} />
      </Routes>
    </>
  );
}

export default App;
