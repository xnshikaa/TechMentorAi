"""
Skill Booster Routes
"""
from fastapi import APIRouter, HTTPException
from models.schemas import TTSRequest
from services.polly_service import generate_speech
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/tts/generate")
async def text_to_speech(request: TTSRequest):
    """
    Generate speech audio from text
    Uses Amazon Polly
    """
    try:
        logger.info(f"🎤 TTS request: {len(request.text)} characters")
        
        # Generate audio
        audio_data = generate_speech(request.text, request.voiceId)
        
        logger.info(f"✅ TTS audio generated")
        
        return audio_data
        
    except Exception as e:
        logger.error(f"❌ TTS error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/skill-booster/evaluate")
async def evaluate_answer(data: dict):
    """Evaluate Python quiz answer (placeholder)"""
    try:
        question_id = data.get('questionId')
        answer = data.get('answer')
        correct_answer = data.get('correctAnswer')
        
        is_correct = answer == correct_answer
        
        return {
            "success": True,
            "is_correct": is_correct,
            "explanation": "Great job!" if is_correct else "Not quite. Try reviewing the concept again."
        }
        
    except Exception as e:
        logger.error(f"❌ Evaluation error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))