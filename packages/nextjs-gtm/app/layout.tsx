import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GTM_ID = "GTM-KBK25ZLL";

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
        <Script id="gtm-script" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
            <a href="/product/example.html">Product</a>
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
