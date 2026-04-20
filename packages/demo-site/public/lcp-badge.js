(function () {
  var pathname = window.location.pathname;
  if (
    pathname === "/hpdp" ||
    pathname === "/hpdp-gtm" ||
    pathname.startsWith("/product/")
  ) {
    var expanded = false;

    var observer = new PerformanceObserver(function (list) {
      var entries = list.getEntries();
      var last = entries[entries.length - 1];
      if (!last) return;

      var ms = Math.round(last.startTime);
      var container = document.getElementById("lcp-widget");

      if (!container) {
        container = document.createElement("div");
        container.id = "lcp-widget";
        container.style.cssText =
          "position:fixed;top:60px;right:16px;z-index:9999;background:#111;padding:16px 20px;border-radius:10px;font-family:monospace;color:#fff;width:320px;max-width:calc(100vw - 32px);border:2px solid #333;transition:border-color 0.3s ease;overflow:hidden;";

        var label = document.createElement("div");
        label.id = "lcp-label";
        label.style.cssText = "margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;font-size:16px;";
        container.appendChild(label);

        var track = document.createElement("div");
        track.style.cssText =
          "height:10px;border-radius:5px;background:linear-gradient(to right, #22c55e, #eab308, #ef4444);position:relative;";

        var thumb = document.createElement("div");
        thumb.id = "lcp-thumb";
        thumb.style.cssText =
          "width:14px;height:14px;border-radius:50%;background:#fff;border:2px solid #111;position:absolute;top:-2px;transition:left 0.3s ease;";
        track.appendChild(thumb);
        container.appendChild(track);

        var toggle = document.createElement("button");
        toggle.id = "lcp-toggle";
        toggle.textContent = "Show Details";
        toggle.style.cssText =
          "margin-top:12px;background:none;border:1px solid #555;color:#ccc;padding:6px 12px;border-radius:4px;font-size:12px;cursor:pointer;font-family:sans-serif;width:100%;";
        toggle.addEventListener("click", function () {
          expanded = !expanded;
          var blurbEl = document.getElementById("lcp-blurb");
          if (expanded) {
            blurbEl.style.display = "block";
            toggle.textContent = "Hide Details";
          } else {
            blurbEl.style.display = "none";
            toggle.textContent = "Show Details";
          }
        });
        container.appendChild(toggle);
        container.style.pointerEvents = "auto";

        var blurb = document.createElement("div");
        blurb.id = "lcp-blurb";
        blurb.style.cssText = "margin-top:12px;padding-top:12px;border-top:1px solid #333;font-family:sans-serif;font-size:13px;color:#bbb;line-height:1.6;display:none;";
        container.appendChild(blurb);

        document.body.appendChild(container);
      }

      var pct = Math.min(ms / 4000, 1) * 100;

      var rating;
      var ratingColor;
      var borderColor;
      if (ms <= 400) {
        rating = "Excellent";
        ratingColor = "#16a34a";
        borderColor = "#ffd700";
      } else if (ms <= 700) {
        rating = "Good";
        ratingColor = "#22c55e";
        borderColor = "#22c55e";
      } else if (ms <= 1500) {
        rating = "Fair";
        ratingColor = "#eab308";
        borderColor = "#eab308";
      } else if (ms <= 2000) {
        rating = "Needs Improvement";
        ratingColor = "#f97316";
        borderColor = "#f97316";
      } else {
        rating = "Poor";
        ratingColor = "#ef4444";
        borderColor = "#ef4444";
      }

      container.style.borderColor = borderColor;

      var shimmerStyle = document.getElementById("lcp-shimmer");
      if (ms <= 400) {
        if (!shimmerStyle) {
          shimmerStyle = document.createElement("style");
          shimmerStyle.id = "lcp-shimmer";
          shimmerStyle.textContent =
            "@keyframes lcp-gold-shimmer {" +
              "0% { border-color: #ffd700; box-shadow: 0 0 6px #ffd70066; }" +
              "50% { border-color: #fff0a0; box-shadow: 0 0 12px #ffd70099; }" +
              "100% { border-color: #ffd700; box-shadow: 0 0 6px #ffd70066; }" +
            "}";
          document.head.appendChild(shimmerStyle);
        }
        container.style.animation = "lcp-gold-shimmer 2s ease-in-out infinite";
      } else {
        container.style.animation = "none";
        container.style.boxShadow = "none";
        if (shimmerStyle) shimmerStyle.remove();
      }

      var labelEl = document.getElementById("lcp-label");
      labelEl.innerHTML =
        "<span>LCP: <strong>" + ms + "ms</strong></span>" +
        '<span style="color:' + ratingColor + ';font-weight:bold;font-size:14px;">' + rating + "</span>";

      var thumbEl = document.getElementById("lcp-thumb");
      thumbEl.style.left = "calc(" + pct + "% - 7px)";
      thumbEl.style.background = ratingColor;

      var blurbEl = document.getElementById("lcp-blurb");
      var blurbText;
      var sourceUrl;
      if (ms <= 400) {
        blurbText = "Exceptional LCP. Users with a 2s LCP convert at 2x the rate of those with a 5s LCP. You're well ahead of the curve.";
        sourceUrl = "https://bluetriangle.com/blog/web-vitals-impact-lcp";
      } else if (ms <= 700) {
        blurbText = "Strong LCP. Vodafone improved LCP by 31% and saw 8% more sales and a 15% higher lead-to-visit rate.";
        sourceUrl = "https://web.dev/case-studies/vodafone";
      } else if (ms <= 1500) {
        blurbText = "LCP is slipping. Product pages see 40-50% lower conversion rates at 4-5s LCP vs 2s LCP. Bounce rates more than double.";
        sourceUrl = "https://bluetriangle.com/blog/web-vitals-impact-lcp";
      } else if (ms <= 2000) {
        blurbText = "LCP needs work. At this speed, bounce rates more than double compared to a 2s LCP. Users with faster LCP convert 2x more often.";
        sourceUrl = "https://bluetriangle.com/blog/web-vitals-impact-lcp";
      } else {
        blurbText = "LCP is critically slow. Pages with 4-5s LCP see 40-50% fewer conversions than 2s LCP pages. Bounce rates more than double at this range.";
        sourceUrl = "https://bluetriangle.com/blog/web-vitals-impact-lcp";
      }
      blurbEl.innerHTML = blurbText +
        ' <a href="' + sourceUrl + '" target="_blank" style="color:#6bf;text-decoration:underline;">Source</a>';
    });
    observer.observe({ type: "largest-contentful-paint", buffered: true });
  }
})();
