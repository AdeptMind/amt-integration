import { Helmet } from "react-helmet-async";

export default function Category() {
  return (
    <>
      <Helmet>
        <title>Category - Store</title>
      </Helmet>
      <main style={{ padding: "2rem" }}>
        <h1>Category</h1>
        <p>Browse products by category.</p>
      </main>
    </>
  );
}
