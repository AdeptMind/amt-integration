import type { Metadata } from "next";
import Script from "next/script";
import GtmScripts from "./components/GtmScripts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Store",
  description: "Simple Next.js store with GTM integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.location.pathname === '/hpdp-gtm' || window.location.pathname === '/hpdp') {
                var s = document.createElement('style');
                s.id = 'amt-whiteout';
                s.textContent = 'main { visibility: hidden !important; }';
                document.head.appendChild(s);
                (function() {
                  function reveal() {
                    var el = document.getElementById('amt-whiteout');
                    if (el) el.remove();
                  }
                  if (document.getElementById('amt-overlay')) { reveal(); return; }
                  var obs = new MutationObserver(function() {
                    if (document.getElementById('amt-overlay')) {
                      obs.disconnect();
                      reveal();
                    }
                  });
                  obs.observe(document.documentElement, { childList: true, subtree: true });
                  setTimeout(function() { obs.disconnect(); reveal(); }, 5000);
                })();
              }
            `,
          }}
        />
        <Script src="/lcp-badge.js" strategy="beforeInteractive" />
      </head>
      <body>
        <GtmScripts />
        <header
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#1a1a1a",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a href="/" style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "0.05em" }}>
            SUMMIT SUPPLY CO.
          </a>
          <nav style={{ display: "flex", gap: "1.5rem", fontSize: "0.875rem" }}>
            <a href="/product/example.html">PDP</a>
            <a href="/hpdp">HPDP</a>
            <a href="/hpdp-gtm">HPDP-GTM</a>
            <a href="/category">Category</a>
            <a href="/checkout">Checkout</a>
            <a href="/orderConfirmation">Order Confirmation</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
