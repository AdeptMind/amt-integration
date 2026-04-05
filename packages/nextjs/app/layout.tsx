import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Store",
  description: "Simple Next.js store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <a href="/product/example.html" style={{ marginRight: "1rem" }}>Product</a>
          <a href="/category" style={{ marginRight: "1rem" }}>Category</a>
          <a href="/checkout" style={{ marginRight: "1rem" }}>Checkout</a>
          <a href="/orderConfirmation">Order Confirmation</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
