"""
Questionnaire Routes
"""
from fastapi import APIRouter, HTTPException
from models.schemas import QuestionnaireSubmit
from services.bedrock_service import analyze_questionnaire
from services.dynamodb_service import update_user, create_progress
from services.xp_engine import calculate_xp
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.get("/questionnaire")
async def get_questionnaire():
    """Get questionnaire questions"""
    questions = [
        {
            "id": 1,
            "question": "Do you enjoy designing visual interfaces or building logic systems?",
            "options": ["Visual Interfaces", "Logic Systems", "Both Equally"]
        },
        {
            "id": 2,
            "question": "Do you prefer working on user experience or server-side logic?",
            "options": ["User Experience", "Server-side Logic", "Both"]
        },
        {
            "id": 3,
            "question": "Have you built APIs before?",
            "options": ["Yes, I have", "No, but interested", "Not really interested"]
        },
        {
            "id": 4,
            "question": "Have you styled websites using CSS?",
            "options": ["Yes, I love it", "A little bit", "Not yet"]
        },
        {
            "id": 5,
            "question": "Do you enjoy working with databases?",
            "options": ["Yes, definitely", "Open to learning", "Prefer other things"]
        },
        {
            "id": 6,
            "question": "Would you rather create mobile/web apps or backend services?",
            "options": ["Mobile/Web Apps", "Backend Services", "Both"]
        }
    ]
    
    return {
        "success": True,
        "questions": questions
    }

@router.post("/questionnaire/submit")
async def submit_questionnaire(data: dict):
    """
    Submit questionnaire and get AI-recommended path
    """
    try:
        user_id = data.get('userId')
        responses = data.get('responses', [])
        
        logger.info(f"📝 Questionnaire submission from: {user_id}")
        
        # Analyze with AI
        recommended_path = analyze_questionnaire(responses)
        
        logger.info(f"🎯 Recommended path: {recommended_path}")
        
        # Update user
        update_user(user_id, {
            'interest': recommended_path,
            'onboardingCompleted': True,
            'onboardingResponses': responses
        })
        
        # Create progress
        create_progress(user_id, recommended_path)
        
        xp = calculate_xp('complete_questionnaire')
        
        return {
            "success": True,
            "recommendedPath": recommended_path,
            "xp_gained": xp,
            "message": f"Welcome to the {recommended_path} learning path! 🚀"
        }
        
    except Exception as e:
        logger.error(f"❌ Questionnaire error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))