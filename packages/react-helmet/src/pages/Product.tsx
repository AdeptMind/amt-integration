import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const EXPERIMENT_SETUP = `
  (function() {
    var inExp = SimpleAbTesting.getBucketedValue('ab-tests', 'am_hpdp', 50);
    if (inExp) {
      window.adeptmind = window.adeptmind || {};
      window.adeptmind.hpdp = window.adeptmind.hpdp || {};
      window.adeptmind.hpdp.isEnabled = true;
      if (window.adeptmind.hpdp.enable) {
        window.adeptmind.hpdp.enable();
      }
    }
  })();
`;

export default function Product() {
  const { product } = useParams<{ product: string }>();
  const name = product?.replace(/\.html$/, "") ?? "";

  return (
    <>
      <Helmet>
        <title>{name} - Store</title>
        <script
          src="https://amt.adeptmind.ai/simple-ab-testing/index.global.js"
          async
        />
        <script>{EXPERIMENT_SETUP}</script>
        <script
          src="https://amt.adeptmind.ai/d1h7j8l9/amt.js"
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
