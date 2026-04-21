# Next.js + GTM AMT Integration

This example loads the AMT script (`https://amt.adeptmind.ai/d1h7j8l9/amt.js`) via Google Tag Manager instead of embedding it directly with `next/script`.

## Setup

1. Replace `GTM-XXXXXXX` in `app/layout.tsx` with your actual GTM container ID.
2. In your GTM workspace, create a **Custom HTML** tag with the following content:

   ```html
   <script src="https://amt.adeptmind.ai/d1h7j8l9/amt.js" async></script>
   ```

3. Set the tag's trigger to fire on **All Pages** (or specific page paths like `/product/*`, `/checkout`, `/orderConfirmation` to match the original integration).
4. Publish the GTM container.

## Optional: preload for lowest latency

When loading via GTM, the script is injected dynamically after GTM itself loads, which means the browser does not know about the AMT origin until late in the page lifecycle. Adding an HTTP `Link` header with `preconnect` (and optionally `preload`) shaves 200–400ms off the visible delay before AMT runs.

Add this to your origin or edge server response for the pages where AMT should run:

```
Link: <https://amt.adeptmind.ai>; rel=preconnect,
      <https://amt.adeptmind.ai/<your-tag-id>/amt.js>; rel=preload; as=script
```

**Use preconnect only** (drop the preload line) if any of the following apply:

- The tag is behind consent and some users will never trigger it (preloading fetches bytes before consent).
- Your GTM setup frequently versions or swaps the tag URL — a stale preload becomes a wasted fetch.
- Your privacy review disallows third-party bytes before user interaction.

Preconnect by itself is safe in all cases and still eliminates DNS + TLS setup time from the critical path.

## Running

```bash
npm install
npm run dev
```

The dev server starts on port 3001 (to avoid conflicts with the base nextjs package).
