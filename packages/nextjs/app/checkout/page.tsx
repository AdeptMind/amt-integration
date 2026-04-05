import Script from "next/script";

export default function CheckoutPage() {
  return (
    <>
      <Script
        src="https://amt.adeptmind.ai/c9e02494/amt.js"
        strategy="beforeInteractive"
        fetchPriority="high"
        async={true}
      />
      <main style={{ padding: "2rem" }}>
        <h1>Checkout</h1>
        <p>Complete your purchase.</p>
      </main>
    </>
  );
}
