import { Helmet } from "react-helmet-async";

export default function OrderConfirmation() {
  return (
    <>
      <Helmet>
        <title>Order Confirmation - Store</title>
        <script
          src="https://amt.adeptmind.ai/c9e02494/amt.js"
          async
          fetchPriority="high"
        />
      </Helmet>
      <main style={{ padding: "2rem" }}>
        <h1>Order Confirmation</h1>
        <p>Thank you for your order!</p>
      </main>
    </>
  );
}
