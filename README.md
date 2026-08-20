# Driftloom

A dependency-free, installable color-rhythm tracing puzzle for mobile and desktop.

## Play online

**[Play Driftloom](https://vladvw.github.io/Dots/)**

No download or account is required. The game runs in a browser on mobile and desktop.

## Play locally

Install [Node.js 18+](https://nodejs.org/), then run:

```bash
npm start
```

Open <http://localhost:8080>. To choose another port:

```bash
PORT=3000 npm start
```

On Windows PowerShell, use `$env:PORT=3000; npm start`.

## Develop from any device

Once this repository is on GitHub, open its page and select **Code → Codespaces → Create codespace on main**. Codespaces runs the editor in a browser, so the same project can be edited from a desktop, tablet, or capable mobile browser.

In the Codespaces terminal, run `npm start`. Open the forwarded port when Codespaces offers it; no local setup is required.

## Publish for mobile and desktop

The included GitHub Pages workflow deploys every push to `main`.

1. In the GitHub repository, open **Settings → Pages**.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Push to `main`, or open **Actions → Deploy to GitHub Pages → Run workflow**.
4. Open the URL shown by the completed deployment.

The site is a Progressive Web App. In a supported desktop or Android browser, choose **Install Driftloom**. On iPhone or iPad, open the Share menu and choose **Add to Home Screen**. Once opened successfully, the game assets are cached for offline play.

## Project layout

- `index.html`, `styles.css` — interface and responsive presentation
- `game.js` — gameplay and install prompt
- `manifest.webmanifest`, `service-worker.js`, `icon.svg` — installable/offline app
- `server.mjs` — dependency-free local development server
- `.github/workflows/pages.yml` — automatic public deployment
