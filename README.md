# ✈️ Wanderlust Explorer — Travel & Tourism Destination Explorer

> AIIP Task 1 Submission · Built with **React + Tailwind CSS** · Glassmorphism / Liquid Glass UI

---

## 🚀 Quick Start

```bash
cd travel-explorer
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## 🖼️ How to Change Images

All images are managed in **one file**: `src/data/packages.json`

Each package has an `"image"` field. To swap an image:

```json
{
  "id": "munnar-mist-3d",
  "image": "YOUR_NEW_IMAGE_URL_HERE",
  ...
}
```

### Using Unsplash (Recommended)
Go to [unsplash.com](https://unsplash.com), find a photo, copy the URL and append:
```
?auto=format&fit=crop&w=900&q=80
```

### Using Local Images
1. Drop your image into `public/images/` (create the folder)
2. Set the path as: `"/images/your-photo.jpg"`

### Hero Background (Home page)
The hero background is a **single constant** at the top of `src/pages/Home.jsx`:

```js
// Hero background images – easy to swap
const HERO_IMAGE = 'https://your-new-image-url.jpg'
```

---

## 📁 Project Structure

```
travel-explorer/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation with saved count badge
│   │   └── PackageCard.jsx     # Reusable destination card
│   ├── context/
│   │   └── SavedContext.jsx    # localStorage wishlist state
│   ├── data/
│   │   └── packages.json       # ALL IMAGES LIVE HERE — edit to swap
│   ├── pages/
│   │   ├── Home.jsx            # / — Explore page with filters
│   │   ├── PackageDetail.jsx   # /package/:id — Full trip detail
│   │   ├── BookingPage.jsx     # /book/:id — Booking + cost calculation
│   │   └── SavedTrips.jsx      # /saved — Wishlist
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               # Glassmorphism utilities & animations
├── index.html
├── vite.config.js
└── README.md
```

---

## Features

| Feature | Details |
|---|---|
| **4 Pages** | Home, Package Detail, Booking, Saved Trips |
| **Search** | Real-time filter by title or location |
| **Category Filters** | All, Hill Station, Beach, Heritage, Adventure |
| **Sort** | Top Rated, Price Low to High, Price High to Low |
| **Bookmarks** | Heart icon on every card, persisted in localStorage |
| **Cost Calculator** | Travelers counter + date picker, Subtotal + GST(5%) + Grand Total |
| **Booking Confirmation** | Auto-generated reference ID after submission |
| **Responsive** | Mobile (375px), Tablet (768px), Desktop (1280px) |
| **Glassmorphism UI** | Liquid glass cards, blur effects, gradient text, orb decorations |

---

## Stack

- React 18 (Vite)
- Tailwind CSS v4 (via @tailwindcss/vite)
- React Router DOM v6
- Lucide React (icons)

---

## Routes

| Route | Page |
|---|---|
| `/` | Home and Explore |
| `/package/:id` | Package Detail |
| `/book/:id` | Trip Booking and Confirmation |
| `/saved` | Saved Trips Wishlist |
