(function () {
  "use strict";

  var SIMILAR_PRODUCTS = [
    {
      name: "Trailbreak Windbreaker",
      price: "$129.00",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80",
    },
    {
      name: "Summit Down Vest",
      price: "$189.00",
      image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=400&q=80",
    },
    {
      name: "Ridgeline Parka",
      price: "$349.00",
      image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80",
    },
    {
      name: "Basecamp Fleece",
      price: "$99.00",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80",
    },
  ];

  var SIZES = ["XS", "S", "M", "L", "XL"];
  var selectedSize = "M";

  function buildOverlay() {
    var main = document.querySelector("main");
    if (!main || document.getElementById("amt-overlay")) return;

    // Create overlay that covers the React content without modifying it
    var overlay = document.createElement("div");
    overlay.id = "amt-overlay";
    overlay.style.cssText =
      "position:relative;z-index:10;background:var(--background, #fff);padding:1rem 2rem;max-width:1500px;margin:0 auto;";

    // -- 3-column grid --
    var grid = document.createElement("div");
    grid.style.cssText =
      "display:grid;grid-template-columns:323px 1fr 340px;gap:2rem;align-items:start;";

    // Col 1: Hero image
    var imgCol = document.createElement("div");
    imgCol.style.cssText = "background:#f5f5f5;border-radius:8px;overflow:hidden;position:sticky;top:1rem;";
    imgCol.innerHTML =
      '<img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80" alt="Alpine Summit Jacket" style="width:100%;display:block;">';

    // Col 2: Product details
    var detailsCol = document.createElement("div");
    detailsCol.style.cssText = "display:flex;flex-direction:column;gap:1.5rem;padding-top:1.5rem;";
    detailsCol.innerHTML =
      '<div>' +
        '<p style="color:#666;font-size:0.875rem;margin:0 0 0.25rem 0;">Outerwear</p>' +
        '<h1 style="font-size:2rem;margin:0;">Alpine Summit Jacket</h1>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:0.75rem;">' +
        '<span style="font-size:1.5rem;font-weight:700;">$249.00</span>' +
        '<span style="font-size:1rem;color:#999;text-decoration:line-through;">$320.00</span>' +
        '<span style="background:#e8f5e9;color:#2e7d32;padding:0.25rem 0.5rem;border-radius:4px;font-size:0.875rem;font-weight:600;">22% off</span>' +
      '</div>' +
      '<p style="color:#444;line-height:1.7;margin:0;">3-layer waterproof shell with taped seams and breathable membrane. Built for mountain weather and city rain alike.</p>' +
      '<div style="display:flex;flex-direction:column;gap:0.75rem;" id="amt-color-section">' +
        '<p style="font-weight:600;margin:0;" id="amt-color-label">Color: Black</p>' +
        '<div style="display:flex;gap:0.5rem;" id="amt-color-swatches"></div>' +
      '</div>';

    // Col 3: Size selector + Add to Cart
    var sidebarCol = document.createElement("div");
    sidebarCol.style.cssText =
      "display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;padding:1.5rem;font-size:0.875rem;align-self:stretch;";

    var sizeBlock = document.createElement("div");
    sizeBlock.style.cssText = "width:100%;";
    sizeBlock.innerHTML =
      '<p style="font-weight:600;margin:0 0 0.5rem 0;font-size:1.25rem;">Size</p>' +
      '<div id="amt-size-buttons" style="display:flex;gap:0.75rem;flex-wrap:wrap;"></div>';

    var cartBtn = document.createElement("button");
    cartBtn.textContent = "Add to Cart";
    cartBtn.style.cssText =
      "width:100%;background:#1a1a1a;color:#fff;border:none;padding:1.25rem;border-radius:6px;font-size:1.1rem;font-weight:600;cursor:pointer;";

    sidebarCol.appendChild(sizeBlock);
    sidebarCol.appendChild(cartBtn);

    grid.appendChild(imgCol);
    grid.appendChild(detailsCol);
    grid.appendChild(sidebarCol);
    overlay.appendChild(grid);

    // -- Similar Products --
    var section = document.createElement("section");
    section.style.cssText = "margin-top:3rem;padding-top:2rem;border-top:1px solid #eee;";
    section.innerHTML = '<h2 style="font-size:1.25rem;margin:0 0 1.5rem 0;">Similar Products</h2>';

    var productsGrid = document.createElement("div");
    productsGrid.style.cssText = "display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;";

    for (var i = 0; i < SIMILAR_PRODUCTS.length; i++) {
      var p = SIMILAR_PRODUCTS[i];
      productsGrid.innerHTML +=
        '<div style="cursor:pointer;">' +
          '<div style="background:#f5f5f5;border-radius:8px;overflow:hidden;margin-bottom:0.75rem;aspect-ratio:3/4;">' +
            '<img src="' + p.image + '" alt="' + p.name + '" style="width:100%;height:100%;object-fit:cover;display:block;">' +
          '</div>' +
          '<p style="margin:0 0 0.25rem 0;font-weight:600;font-size:0.9rem;">' + p.name + '</p>' +
          '<p style="margin:0;color:#444;font-size:0.875rem;">' + p.price + '</p>' +
        '</div>';
    }

    section.appendChild(productsGrid);
    overlay.appendChild(section);

    // Hide React content via stylesheet (not inline style) to avoid hydration mismatch
    var style = document.createElement("style");
    style.textContent = "#amt-overlay ~ main, main:has(~ #amt-overlay) { display: none; } main + #amt-overlay { display: block; }";
    document.head.appendChild(style);

    // Insert overlay after main, outside the React root
    main.parentNode.insertBefore(overlay, main.nextSibling);

    // -- Wire up interactive color swatches --
    var colors = [
      { value: "#1a1a1a", name: "Black" },
      { value: "#2d4a3e", name: "Forest" },
      { value: "#3b3a5c", name: "Navy" },
      { value: "#8b6f47", name: "Tan" },
    ];
    var selectedColor = colors[0];
    var swatchContainer = document.getElementById("amt-color-swatches");
    var colorLabel = document.getElementById("amt-color-label");

    function renderSwatches() {
      swatchContainer.innerHTML = "";
      for (var ci = 0; ci < colors.length; ci++) {
        (function (color) {
          var swatch = document.createElement("div");
          swatch.style.cssText =
            "width:32px;height:32px;border-radius:50%;cursor:pointer;background:" +
            color.value + ";border:" +
            (color.value === selectedColor.value ? "2px solid #000" : "2px solid #ddd") + ";";
          swatch.addEventListener("click", function () {
            selectedColor = color;
            colorLabel.textContent = "Color: " + color.name;
            renderSwatches();
          });
          swatchContainer.appendChild(swatch);
        })(colors[ci]);
      }
    }
    renderSwatches();

    // -- Wire up interactive size buttons --
    var sizeBtnContainer = document.getElementById("amt-size-buttons");

    function renderSizes() {
      sizeBtnContainer.innerHTML = "";
      for (var si = 0; si < SIZES.length; si++) {
        (function (size) {
          var btn = document.createElement("div");
          btn.textContent = size;
          btn.style.cssText =
            "padding:0.75rem 1rem;border-radius:4px;cursor:pointer;font-size:1rem;" +
            "flex:1 1 auto;text-align:center;min-width:0;" +
            (size === selectedSize
              ? "border:2px solid #000;font-weight:600;"
              : "border:1px solid #ddd;font-weight:400;");
          btn.addEventListener("click", function () {
            selectedSize = size;
            renderSizes();
          });
          sizeBtnContainer.appendChild(btn);
        })(SIZES[si]);
      }
    }
    renderSizes();
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildOverlay);
  } else {
    var observer = new MutationObserver(function () {
      if (document.querySelector("main")) {
        observer.disconnect();
        buildOverlay();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    buildOverlay();
  }
})();
