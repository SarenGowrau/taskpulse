from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="TaskPulse API",
    description="Backend API for TaskPulse - Tiny Task Prioritization App",
    version="0.1.0",
)

# Configure CORS for local frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "name": "TaskPulse API",
        "status": "online",
        "version": "0.1.0",
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "message": "TaskPulse backend is running smoothly.",
    }
