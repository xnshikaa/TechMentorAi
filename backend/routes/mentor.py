"""
AI Mentor Routes - WITH GUARDRAILS
"""
from fastapi import APIRouter, HTTPException
from models.schemas import MentorRequest
from services.bedrock_service import get_mentor_guidance
from services.xp_engine import calculate_xp
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/mentor")
async def mentor_chat(data: dict):
    """
    AI Mentor Chat - Provides HINTS only, NO full solutions
    Uses Amazon Bedrock (Claude 3 Haiku) with strict guardrails
    """
    try:
        message = data.get('message', '')
        context = data.get('context', {})
        
        logger.info(f"🤖 Mentor request: '{message[:50]}...'")
        
        if not message:
            raise HTTPException(status_code=400, detail="Message is required")
        
        # Get AI response with guardrails
        response = get_mentor_guidance(message, context)
        
        xp = calculate_xp('mentor_chat')
        
        logger.info(f"✅ Mentor response sent (+{xp} XP)")
        
        return {
            "success": True,
            "response": response,
            "xp_gained": xp
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Mentor error: {str(e)}")
        
        # Check if it's a Bedrock access error
        if "Access Denied" in str(e) or "AccessDeniedException" in str(e):
            raise HTTPException(
                status_code=403,
                detail="⚠️ Bedrock access not enabled! Go to AWS Console → Bedrock → Model Access → Enable Claude 3 Haiku"
            )
        
        raise HTTPException(status_code=500, detail=str(e))