# Face Name Trainer - Frontend-Only Summary

## Completed Simplification

The project now runs as a standalone web app.

- Backend removed
- Docker stack removed
- PostgreSQL dependency removed
- Frontend config no longer proxies API requests

## Current Runtime Model

- React + Vite app
- Browser localStorage for onboarding state
- Training sessions handled fully on client
- Face images loaded directly from This Person Does Not Exist

## Run

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.
