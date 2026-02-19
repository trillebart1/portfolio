# Tolgahan Tokatlı - Architectural Portfolio

A cinematic, high-performance portfolio website designed for architects and designers. Built with **Next.js 14**, this project features a custom file-based CMS, an immersive dark-themed UI, and robust security measures to protect intellectual property.

## 🌟 Key Features

### 🎨 Cinematic Experience
*   **Immersive UI:** Dark mode by default, featuring a custom cursor and smooth page transitions.
*   **High-Performance Gallery:** Automatic thumbnail generation using `sharp` ensures fast loading even with high-resolution architectural renders.
*   **Responsive Design:** Fully optimized for desktop, tablet, and mobile devices.

### 🔒 Secure Admin Panel
*   **Built-in CMS:** Manage your projects directly from the website.
*   **Functionality:** Add, Edit, and Delete projects with ease.
*   **Drag & Drop Upload:** Supports multi-image uploads.
*   **Security:** Password-protected admin route (`/admin/login`).

### 🛡️ Anti-Theft Protection
To protect your creative work, the site includes several security layers:
*   **Right-Click Disabled:** Prevents context menu access.
*   **Text Selection Blocked:** Content cannot be highlighted or copied.
*   **Image Dragging Disabled:** Images cannot be dragged to the desktop.
*   **Screenshot Deterrent:** The screen shakes momentarily if a screenshot attempt is detected (experimental).

### 🕵️‍♂️ Privacy & SEO Blocking
Designed to be used as a private CV/Portfolio:
*   **No Indexing:** Blocked from Google and other search engines via `robots.txt`, meta tags, and HTTP headers (`X-Robots-Tag`).
*   **Privacy:** Your images won't appear in Google Images search results.

---

## 🛠️ Tech Stack

*   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Image Processing:** [Sharp](https://sharp.pixelplumbing.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/trillebart1/portfolio.git
cd portfolio
```

### 2. Install Dependencies
```bash
npm install
```
*Note: This project uses `sharp` for image processing. Ensure your environment supports it.*

### 3. Configure Environment Variables (IMPORTANT)
You must create a `.env.local` file in the root directory to set your admin password. This file is **not** committed to GitHub for security reasons.

**Create `.env.local`:**
```bash
ADMIN_PASSWORD=your_secure_password
```
*(Replace `your_secure_password` with the password you want to use for the admin panel)*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 📂 Project Structure

*   **/app:** Next.js App Router pages and API routes.
*   **/components:** Reusable UI components (Navbar, ProjectCard, etc.).
*   **/data:** JSON files acting as the database (`projects.json`, `messages.json`).
*   **/public/projects:** Stores uploaded project images. **(Ensure this folder has write permissions on the server)**.
*   **/lib:** Utility functions and types.

---

## 🌍 Deployment (VDS/VPS)

If deploying to a Virtual Dedicated Server (Ubuntu/Nginx):

1.  **Clone Repo:** `git clone ...`
2.  **Install Config:** Run `npm install`, `npm run build`.
3.  **Permissions:** Give write access to data folders:
    ```bash
    chmod -R 777 data
    chmod -R 777 public/projects
    ```
4.  **Process Manager:** Use PM2 to keep the site running:
    ```bash
    pm2 start npm --name "portfolio" -- start
    ```
