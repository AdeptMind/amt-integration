"use client";

import { useState } from "react";

const COLORS = [
  { value: "#1a1a1a", name: "Black" },
  { value: "#2d4a3e", name: "Forest" },
  { value: "#3b3a5c", name: "Navy" },
  { value: "#8b6f47", name: "Tan" },
];

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <main style={{ padding: "1rem 2rem", maxWidth: "1500px", margin: "0 auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "start",
        }}
      >
        <div
          style={{
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80"
            alt="Alpine Summit Jacket"
            style={{ width: "100%", display: "block" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", paddingTop: "1.5rem" }}>
          <div>
            <p style={{ color: "#666", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
              Outerwear
            </p>
            <h1 style={{ fontSize: "2rem", margin: 0 }}>Alpine Summit Jacket</h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "1.5rem", fontWeight: 700 }}>$249.00</span>
            <span
              style={{
                fontSize: "1rem",
                color: "#999",
                textDecoration: "line-through",
              }}
            >
              $320.00
            </span>
            <span
              style={{
                backgroundColor: "#e8f5e9",
                color: "#2e7d32",
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              22% off
            </span>
          </div>

          <p style={{ color: "#444", lineHeight: 1.7 }}>
            3-layer waterproof shell with taped seams and breathable membrane.
            Built for mountain weather and city rain alike.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <p style={{ fontWeight: 600, margin: 0 }}>Color: {selectedColor.name}</p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {COLORS.map((color) => (
                <div
                  key={color.value}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: color.value,
                    border: color.value === selectedColor.value ? "2px solid #000" : "2px solid #ddd",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <p style={{ fontWeight: 600, margin: 0 }}>Size</p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {SIZES.map((size) => (
                <div
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: "0.5rem 1rem",
                    border: size === selectedSize ? "2px solid #000" : "1px solid #ddd",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: size === selectedSize ? 600 : 400,
                    fontSize: "0.875rem",
                  }}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <button
            style={{
              backgroundColor: "#1a1a1a",
              color: "#fff",
              border: "none",
              padding: "1rem",
              borderRadius: "6px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              marginTop: "0.5rem",
            }}
          >
            Add to Cart
          </button>

          <div
            style={{
              borderTop: "1px solid #eee",
              paddingTop: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              fontSize: "0.875rem",
              color: "#666",
            }}
          >
            <p style={{ margin: 0 }}>Free shipping on orders over $100</p>
            <p style={{ margin: 0 }}>Free 30-day returns</p>
            <p style={{ margin: 0 }}>2-year warranty included</p>
          </div>
        </div>
      </div>
    </main>
  );
}
