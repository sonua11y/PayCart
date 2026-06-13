import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../styles/Products.css";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Products() {
  const [foods, setFoods] = useState([]);
  const { cart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/foods"
      );

      setFoods(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="products-container">
      <div className="header">
        <h1>PayCart 🍔</h1>
        <button onClick={() => navigate("/cart")}>
        Cart ({cart.length})
        </button>
        </div>

      <div className="products-grid">
        {foods.map((food) => (
          <div className="card" key={food._id}>
            <img
              src={food.image}
              alt={food.name}
            />

            <h3>{food.name}</h3>

            <p>₹{food.price}</p>

            <button onClick={() => addToCart(food)}>
                Add To Cart
                </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;