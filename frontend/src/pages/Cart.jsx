import { useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const handlePayment = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      {
        amount: total,
      }
    );

    const order = response.data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: order.amount,
      currency: order.currency,
      name: "PayCart",
      description: "Food Order Payment",

      order_id: order.id,

       method: {
    upi: true,
    card: true,
    netbanking: true,
    wallet: true,
  },

      handler: async function (response) {
  try {
    const verifyResponse = await axios.post(
      "http://localhost:5000/api/payment/verify-payment",
      {
        ...response,
        amount: total,
      }
    );

    console.log(verifyResponse.data);

    navigate("/success", {
  state: {
    orderId: response.razorpay_order_id,
    paymentId: response.razorpay_payment_id,
    amount: total,
  },
});
  } catch (error) {
    console.log(error);
  }
},

      prefill: {
        name: "Sri Pranathi",
        email: "test@example.com",
        contact: "9999999999",
      },

      theme: {
        color: "#3399cc",
      },

      modal: {
    ondismiss: function () {
      navigate("/failure");
    },
    },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div style={{ padding: "30px" }}>
      <h1>Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index}>
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <hr />
            </div>
          ))}

          <h2>Total: ₹{total}</h2>

          <button onClick={handlePayment}>
            Proceed To Payment
            </button>
        </>
      )}
    </div>
  );
}

export default Cart;