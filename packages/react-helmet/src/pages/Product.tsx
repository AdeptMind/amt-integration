import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Product() {
  const { product } = useParams<{ product: string }>();
  const name = product?.replace(/\.html$/, "") ?? "";

  return (
    <>
      <Helmet>
        <title>{name} - Store</title>
        <script
          src="https://amt.adeptmind.ai/c9e02494/amt.js"
          async
          fetchPriority="high"
        />
      </Helmet>
      <main style={{ padding: "2rem" }}>
        <h1>Product: {name}</h1>
        <p>This is the product detail page for <strong>{name}</strong>.</p>
      </main>
    </>
  );
}
