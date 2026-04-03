# Face Name Trainer

A frontend-only web app for practicing face and name memory with generated faces from This Person Does Not Exist.

## What This Is Now

This project has been simplified to a single React + Vite app.

- No backend server
- No database
- No Docker required
- Local browser storage for user setup state

## Project Structure

```text
.
|- frontend/
|  |- src/
|  |  |- App.jsx
|  |  |- index.css
|  |  |- main.jsx
|  |  |- hooks/
|  |  |- pages/
|  |- index.html
|  |- package.json
|  |- vite.config.js
|- FREE-RESOURCES.md
|- PROJECT-SUMMARY.md
|- QUICKSTART.md
|- README.md
```

## Local Run

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
cd frontend
npm run build
npm run preview
```

## Notes

- Training mode uses generated faces from This Person Does Not Exist.
- Onboarding and session data are handled in the browser.
