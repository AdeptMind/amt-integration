# Next.js + GTM AMT Integration

This example loads the AMT script (`https://amt.adeptmind.ai/c9e02494/amt.js`) via Google Tag Manager instead of embedding it directly with `next/script`.

## Setup

1. Replace `GTM-XXXXXXX` in `app/layout.tsx` with your actual GTM container ID.
2. In your GTM workspace, create a **Custom HTML** tag with the following content:

   ```html
   <script src="https://amt.adeptmind.ai/c9e02494/amt.js" async></script>
   ```

3. Set the tag's trigger to fire on **All Pages** (or specific page paths like `/product/*`, `/checkout`, `/orderConfirmation` to match the original integration).
4. Publish the GTM container.

## Running

```bash
npm install
npm run dev
```

The dev server starts on port 3001 (to avoid conflicts with the base nextjs package).
