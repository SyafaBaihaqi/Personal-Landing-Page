# Landing Page — Syafa Baihaqi Portfolio

Personal landing page / portfolio built with plain **HTML5, CSS3, and vanilla JavaScript**. No frameworks, no build tools.

## Run locally

Any static file server works. Examples:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

Then open `http://localhost:8000`.

Opening `index.html` directly in a browser also works — all paths are relative.

## Structure

```
.
├── index.html            # landing page
├── project-ilms.html     # ILMS project detail page
├── project-iot.html      # Electronics & IoT projects detail page
├── service-ets2.html     # ETS2 modding service detail page
├── service-trainz.html   # Trainz modding service detail page
├── style.css             # design system, layout, responsive rules
├── src/
│   └── main.js           # navigation, scroll spy, reveal animations
├── images/               # project and asset images
├── CNAME                 # GitHub Pages custom domain (saiasyap.my.id)
└── _config.yml           # GitHub Pages theme config
```

## External dependencies

| Dependency | Purpose |
| --- | --- |
| Google Fonts (Raleway) | typography |

No CSS/JS frameworks or libraries.

## Features

- Fixed navbar with hamburger menu on mobile
- Light/dark theme toggle (persisted in localStorage, respects `prefers-color-scheme`)
- Smooth scrolling with scroll-spy active states
- Distinct background treatment per section
- Scroll reveal animations (respects `prefers-reduced-motion`)
- Back-to-top button
- Project section with a featured ILMS project and an Electronics & IoT projects card linking to project.saiasyap.my.id
- Service section (ETS2 & Trainz modding) with a detail page per service
- Footer with contact links (WhatsApp, Instagram, Facebook, TikTok)

## Notes

- WhatsApp link: `https://wa.me/6285642615523`.
