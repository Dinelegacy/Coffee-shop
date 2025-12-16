# Coffee Shop Frontend

Welcome to the Coffee Shop project!  
This is a responsive frontend web application for a coffee shop, including user signup/login, menu, cart, and checkout features.

---

## 🚀 Getting Started

### 1. Open the Project
Open the folder in VS Code or your favorite editor.

### 2. Run a Local Server (Recommended)
To view the site locally, run:
```bash
# Using Python 3
python3 -m http.server 8000

# Or using Node.js
npx http-server -c-1 .
```
Then open your browser to:  
`http://localhost:8000/signup.html`  
(or `login.html`, `cart.html`, etc.)

---

## 📁 Project Structure

```
Coffee-shop/
├── assets/                # Images and icons
├── bag.css
├── cart-page.css
├── index.js
├── login.css
├── login.html
├── menu-cart.js
├── navegationBar.css
├── off-screen-menu.css
├── README.md              # This file
├── signup.css
├── signup.html
└── ... (other files)
```

---

## ✨ Design & Usage Guidelines

- **Responsive:**  
  All pages are mobile-first and scale up for desktop (including very wide screens).
- **Centering:**  
  Use a container with `max-width` (e.g. 402px for mobile, up to 640px for large screens) and center with flexbox.
- **Colors & Fonts:**  
  - Main background: `#ede8e5`
  - Font: Montserrat (Google Fonts)
  - Accent: `#c67500` (orange)
  - Neutral: `#afafaf` (gray)
- **Inputs & Buttons:**  
  - Rounded (`border-radius: 24px`)
  - Responsive width (`width: 100%; max-width: 354px` or larger on desktop)
- **Assets:**  
  Reference images/icons with paths relative to the HTML file (e.g. `assets/logo-horizontal.svg`).

---

## 🛠️ Common Issues & Solutions

| Problem                | Solution                                                      |
|------------------------|--------------------------------------------------------------|
| Logo/image not showing | Check the file path and spelling/case. Use DevTools Network. |
| Not centered           | Use flexbox on body and a max-width container.               |
| Input color off        | Use the autofill CSS fix in each CSS file.                   |
| Layout broken on mobile| Use responsive breakpoints and avoid fixed widths.           |

---

## 📐 Responsive Breakpoints

- **Mobile:** Default styles (`max-width: 420px`)
- **Tablet/Desktop:** `@media (min-width: 1200px)`
- **Large Desktop:** `@media (min-width: 1800px)`

---

## 📝 Contributing

- Keep CSS modular (one file per page/feature).
- Use semantic HTML and accessible labels.
- Test on both mobile and desktop before committing.
- Update this README if you add new features or pages.

---

## 📚 More Help

- Use browser DevTools to inspect and debug.
- Check the CSS files for variable usage and layout patterns.
- For questions, ask the team or open an issue.

---

