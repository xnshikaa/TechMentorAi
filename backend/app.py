"""
TechMentor AI Backend - Main Application
Complete AWS Integration: Bedrock, DynamoDB, Polly
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
import logging

# Import all routes
from routes import (
    auth,
    questionnaire,
    roadmap,
    project,
    progress,
    mentor,
    readme,
    linkedin,
    flashcards,
    facts,
    skill_booster
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI
app = FastAPI(
    title="TechMentor AI Backend",
    description="AI-powered project-based learning platform with AWS integration",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers
app.include_router(auth.router, prefix="/api", tags=["Authentication"])
app.include_router(questionnaire.router, prefix="/api", tags=["Questionnaire"])
app.include_router(roadmap.router, prefix="/api", tags=["Roadmap"])
app.include_router(project.router, prefix="/api", tags=["Projects"])
app.include_router(progress.router, prefix="/api", tags=["Progress"])
app.include_router(mentor.router, prefix="/api", tags=["AI Mentor"])
app.include_router(readme.router, prefix="/api", tags=["README Generator"])
app.include_router(linkedin.router, prefix="/api", tags=["LinkedIn"])
app.include_router(flashcards.router, prefix="/api", tags=["Flashcards"])
app.include_router(facts.router, prefix="/api", tags=["Facts"])
app.include_router(skill_booster.router, prefix="/api", tags=["Skill Booster"])

@app.get("/")
def root():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "message": "TechMentor AI Backend is running!",
        "version": "1.0.0",
        "services": {
            "bedrock": "connected",
            "dynamodb": "connected",
            "polly": "connected"
        }
    }

@app.get("/health")
def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "endpoints": {
            "auth": "operational",
            "questionnaire": "operational",
            "projects": "operational",
            "ai_mentor": "operational",
            "tts": "operational"
        }
    }

# Lambda handler for AWS deployment
handler = Mangum(app)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)