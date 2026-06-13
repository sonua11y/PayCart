import { useLocation } from "react-router-dom";

function Success() {
  const { state } = useLocation();

  return (
    <div style={{ padding: "30px" }}>
      <h1>🎉 Payment Successful</h1>

      <p>
        <strong>Order ID:</strong>{" "}
        {state?.orderId}
      </p>

      <p>
        <strong>Payment ID:</strong>{" "}
        {state?.paymentId}
      </p>

      <p>
        <strong>Amount:</strong> ₹
        {state?.amount}
      </p>
    </div>
  );
}

export default Success;