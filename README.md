# Tarek Mahmoud Ali — Portfolio

A responsive, interactive personal portfolio built with plain HTML, CSS, and JavaScript.

## Features
- Intro boot sequence: terminal-style progress animation that simulates the interface being assembled on entry.
- Animated role typing effect.
- GitHub profile avatar and live public profile/repository stats fetched from GitHub's public REST API.
- Responsive project grid with filters for public repositories and independent projects.
- English / Arabic toggle with RTL layout.
- Dark / light theme toggle.
- Mobile navigation and scroll-reveal animations.
- Contact links for email, WhatsApp, GitHub, and LinkedIn.
- Respects `prefers-reduced-motion`.

## Run locally
No build tools or dependencies required. Open `index.html` in a browser, or use a local static server:

```bash
python -m http.server 5500
```

Then visit `http://localhost:5500`.

## Deploy
Upload the three files (`index.html`, `style.css`, `script.js`) to GitHub Pages, Netlify, Vercel, or any static hosting provider.

## Live GitHub integration
The site requests:
- `https://api.github.com/users/tarekali000`
- `https://api.github.com/users/tarekali000/repos?per_page=100&sort=updated`

The avatar URL is also loaded from the returned profile response. If the API is rate-limited or offline, the site keeps the manually verified project links visible and shows a clear fallback message.

## Accuracy notes
The three public repositories linked as public work are:
- `auth-backend`
- `url-short-backend`
- `nestjs-file-storage-api`

Other projects are marked as independent projects based on information supplied by the developer; they are not presented as public repositories. The education entry is intentionally limited to `EST · Student` because the specific program/department was not confirmed.

## Contact details
- Email: tarekmahmoudalimail@gmail.com
- WhatsApp: +201115489186
- GitHub: https://github.com/tarekali000
- LinkedIn: https://www.linkedin.com/in/tarek-ali-0ab895253/
