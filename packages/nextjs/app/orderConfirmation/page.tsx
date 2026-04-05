import Script from "next/script";

export default function OrderConfirmationPage() {
  return (
    <>
      <Script
        src="https://amt.adeptmind.ai/c9e02494/amt.js"
        strategy="beforeInteractive"
        fetchPriority="high"
        async={true}
      />
      <main style={{ padding: "2rem" }}>
        <h1>Order Confirmation</h1>
        <p>Thank you for your order!</p>
      </main>
    </>
  );
}
