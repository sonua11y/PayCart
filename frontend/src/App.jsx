import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Failure from "./pages/Failure";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;