# CSS Gallery - Content Contribution Guide

Welcome to the CSS Gallery! This project is a curated collection of CSS elements hosted as a static site. Here shows how you can manage the content.

## 🌟 How to Add or Remove Content

The gallery's data is stored in static TypeScript files in the `src/data/` directory.

### Step 1: Open the Data File
Locate the file for the category you want to edit:
- **Loaders**: `src/data/loaders.ts`
- **Buttons**: `src/data/buttons.ts`
- **Profile Cards**: `src/data/cards.ts`
- **Hamburger Menus**: `src/data/menus.ts`
- **UI Cards**: `src/data/uiCards.ts`
- **Global Sidebars**: `src/data/sidebars.ts`

### Step 2: Edit the Data
The data format is a simple list of objects:

```typescript
export const categoryData = [
  { 
    "title": "Your Cool Design Title", 
    "codepen_url": "https://codepen.io/username/pen/xxxxxx" // Must use /pen/, not /embed/ or /full/
  },
  // ... more items
];
```

- **To Add**: Append a new line at the end of the array (before the closing `];`).
- **To Remove**: Simply delete the line corresponding to the item you want to remove.
- **To Edit**: Change the `title` or `codepen_url`.

### Step 3: Verify
Run `npm run dev` locally to see your changes instantly.

### Step 4: Commit and Push
Once satisfied, commit the changes to Git and push to your repository. GitHub Pages (if configured) will automatically deploy the updated gallery.

---

## ⭐ How to 'Star' (Favorite) Items

Currently, the "Favorites" feature is stored in your browser's **Local Storage**. This means:
- Favorites are private to you and the specific browser/device you are using.
- They persist even if you close the browser.
- **Note**: Marking an item as a favorite does **not** update the GitHub repository or share it with others. It is a personal bookmarking tool.

## 🚀 Pro Tip: Bulk Adding
If you have a list of URLs, you can use an AI agent (like me!) to fetch the titles and format them into the JSON structure for you, saving time on manual entry.
