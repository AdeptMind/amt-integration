"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

const GTM_ID = "GTM-KBK25ZLL";

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

export default function GtmScripts() {
  const pathname = usePathname();
  const isHpdp = pathname === "/hpdp";
  const isHpdpGtm = pathname === "/hpdp-gtm" || pathname === "/hpdp-gtm-optimized";
  const runExperiment = isHpdp || isHpdpGtm;

  return (
    <>
      {runExperiment && (
        <Script
          src="https://amt.adeptmind.ai/simple-ab-testing/index.global.js"
          strategy="beforeInteractive"
        />
      )}
      {runExperiment && (
        <Script id="amt-hpdp-experiment" strategy="beforeInteractive">
          {EXPERIMENT_SETUP}
        </Script>
      )}
      {!isHpdp && (
        <Script id="gtm-script" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}
      {isHpdp && (
        <Script
          src={
            process.env.NODE_ENV === "production"
              ? "https://amt.adeptmind.ai/d1h7j8l9/amt.js"
              : "/amt.js"
          }
          strategy="beforeInteractive"
          fetchPriority="high"
        />
      )}
      {!isHpdp && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      )}
    </>
  );
}
