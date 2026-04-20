import Script from "next/script";

export default function Home() {
  return (
    <>
      <Script
        src="https://amt.adeptmind.ai/c9e02494/amt.js"
        strategy="beforeInteractive"
        fetchPriority="high"
        async={true}
      />
      <main style={{ padding: "2rem" }}>
        <h1>Home</h1>
        <p>Welcome to the store.</p>
      </main>
    </>
  );
}
