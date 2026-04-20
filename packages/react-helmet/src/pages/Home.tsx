import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Store</title>
        <meta name="description" content="Simple React store" />
        <script
          src="https://amt.adeptmind.ai/c9e02494/amt.js"
          async
          fetchPriority="high"
        />
      </Helmet>
      <main style={{ padding: "2rem" }}>
        <h1>Home</h1>
        <p>Welcome to the store.</p>
      </main>
    </>
  );
}
