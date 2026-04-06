import { Helmet } from "react-helmet-async";

export default function Checkout() {
  return (
    <>
      <Helmet>
        <title>Checkout - Store</title>
        <script
          src="https://amt.adeptmind.ai/c9e02494/amt.js"
          async
          fetchPriority="high"
        />
      </Helmet>
      <main style={{ padding: "2rem" }}>
        <h1>Checkout</h1>
        <p>Complete your purchase.</p>
      </main>
    </>
  );
}
