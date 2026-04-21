import Script from "next/script";

const EXPERIMENT_SETUP = `
  (function() {
    var inExp = SimpleAbTesting.getBucketedValue('ab-tests', 'am_hpdp', 100);
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
        src="https://amt.adeptmind.ai/simple-ab-testing/index.global.js"
        strategy="beforeInteractive"
      />
      <Script id="amt-hpdp-experiment" strategy="beforeInteractive">
        {EXPERIMENT_SETUP}
      </Script>
      <Script
        src="https://amt.adeptmind.ai/d1h7j8l9/amt.js"
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
