"""
README Generator Routes
"""
from fastapi import APIRouter, HTTPException
from models.schemas import GenerateREADME
from services.bedrock_service import generate_readme
from services.xp_engine import calculate_xp
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/generate-readme")
async def create_readme(data: dict):
    """
    Generate GitHub README using AI
    Uses Amazon Bedrock (Claude 3 Haiku)
    """
    try:
        project_data = data.get('projectData', {})
        
        logger.info(f"📝 README generation request")
        
        if not project_data:
            raise HTTPException(status_code=400, detail="Project data is required")
        
        # Generate with AI
        readme = generate_readme(project_data)
        
        xp = calculate_xp('generate_readme')
        
        logger.info(f"✅ README generated (+{xp} XP)")
        
        return {
            "success": True,
            "readme": readme,
            "xp_gained": xp
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ README generation error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))