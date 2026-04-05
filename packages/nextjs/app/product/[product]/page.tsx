import Script from "next/script";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  const name = product.replace(/\.html$/, "");

  return (
    <>
      <Script
        src="https://amt.adeptmind.ai/c9e02494/amt.js"
        strategy="beforeInteractive"
        fetchPriority="high"
        async={true}
      />
      <main style={{ padding: "2rem" }}>
        <h1>Product: {name}</h1>
        <p>This is the product detail page for <strong>{name}</strong>.</p>
      </main>
    </>
  );
}
