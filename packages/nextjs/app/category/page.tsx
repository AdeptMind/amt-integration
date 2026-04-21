import Script from "next/script";

export default function CategoryPage() {
  return (
    <>
      <Script
        src="https://amt.adeptmind.ai/d1h7j8l9/amt.js"
        strategy="beforeInteractive"
        fetchPriority="high"
        async={true}
      />
      <main style={{ padding: "2rem" }}>
        <h1>Category</h1>
        <p>Browse products by category.</p>
      </main>
    </>
  );
}
