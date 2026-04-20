import { Helmet } from "react-helmet-async";

export default function Checkout() {
  return (
    <>
      <Helmet>
        <title>Checkout - Store</title>
      </Helmet>
      <main style={{ padding: "2rem" }}>
        <h1>Checkout</h1>
        <p>Complete your purchase.</p>
      </main>
    </>
  );
}
