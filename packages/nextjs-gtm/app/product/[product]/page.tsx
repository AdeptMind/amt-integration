export default async function ProductPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  const name = product.replace(/\.html$/, "");

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Product: {name}</h1>
      <p>This is the product detail page for <strong>{name}</strong>.</p>
    </main>
  );
}
