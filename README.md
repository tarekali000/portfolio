# Tarek Mahmoud Ali — Portfolio

A responsive, interactive personal portfolio built with plain HTML, CSS, and modern JavaScript.

## Features
- **Certificates & Verified Credentials**: Dedicated section displaying professional certificates loaded dynamically from JSON with credential IDs and verification links.
- **Dynamic Projects & Interactive Modal**: Project cards display a clean short description; clicking any card opens a modal popup with full architecture details, features list, image gallery, and video support.
- **JSON-Driven Content**: Both projects and certificates are fetched dynamically from `data/projects.json` and `data/certificates.json` with bilingual (English/Arabic) support.
- **Rich Animation Suite**:
  - Interactive constellation particle canvas in the background.
  - Smooth cursor spotlight follower.
  - 3D perspective tilt on cards (`perspective`, `rotateX`, `rotateY`).
  - Animated counting numbers for statistics (`repoCount`, `followerCount`, etc.).
  - Terminal-style intro boot sequence with simulated module loading.
  - Animated role typing effect in hero section.
  - Smooth modal spring scale-in and staggered reveal animations.
- **GitHub Live API Integration**: Fetches public profile avatar, repository count, and followers.
- **Bilingual & RTL**: One-click switch between English (LTR) and Arabic (RTL).
- **Dark & Light Mode**: Seamless theme toggling with custom color palettes.
- **Accessible & Responsive**: Keyboard accessible (ESC closes modal), responsive layout down to mobile devices, and respects `prefers-reduced-motion`.

## Project Structure
```
├── index.html            # Main markup with modal and sections
├── style.css             # Theme, animations, 3D tilt, and responsive layout
├── script.js             # Dynamic JSON loaders, animations, and modal engine
├── data/
│   ├── projects.json     # Projects database (short/full desc, stack, media, features)
│   └── certificates.json # Certificates database (issuer, date, credentials, skills)
└── README.md
```

## Run Locally
No build tools or dependencies required. Open `index.html` directly in a browser, or run a local static server:

```bash
python -m http.server 5500
```

Then visit `http://localhost:5500`.

## Contact Details
- **Email**: [tarekmahmoudalimail@gmail.com](mailto:tarekmahmoudalimail@gmail.com)
- **WhatsApp**: [+20 111 548 9186](https://wa.me/201115489186)
- **GitHub**: [github.com/tarekali000](https://github.com/tarekali000)
- **LinkedIn**: [linkedin.com/in/tarek-ali-0ab895253/](https://www.linkedin.com/in/tarek-ali-0ab895253/)
