# TaskPulse

TaskPulse is a tiny full-stack task prioritization application built with React (TypeScript + Tailwind CSS) and FastAPI.

## Project Structure

```
taskpulse/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py          # FastAPI application & endpoints
│   ├── requirements.txt      # Python dependencies
│   └── .venv/                # Virtual environment
├── frontend/
│   ├── src/
│   │   ├── App.tsx           # React UI
│   │   ├── main.tsx          # React root entry
│   │   └── index.css         # Tailwind styles
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── postcss.config.js
├── .gitignore
└── README.md
```

## Getting Started

### 1. Backend (FastAPI)

```bash
# Navigate to backend
cd backend

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
# source .venv/bin/activate

# Install dependencies (if not already installed)
pip install -r requirements.txt

# Run FastAPI development server
uvicorn app.main:app --reload --port 8000
```
Backend will be live at: [http://127.0.0.1:8000](http://127.0.0.1:8000)  
Interactive API Docs (Swagger): [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

### 2. Frontend (React + Vite + Tailwind CSS)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
Frontend will be live at: [http://localhost:5173](http://localhost:5173)
