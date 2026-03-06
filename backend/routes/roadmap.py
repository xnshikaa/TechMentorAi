"""
Roadmap Routes
"""
from fastapi import APIRouter, HTTPException
from data.roadmaps_data import get_roadmap_by_interest, get_all_roadmaps
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.get("/roadmap/{interest}")
async def get_roadmap(interest: str):
    """Get roadmap by interest (frontend/backend/fullstack)"""
    try:
        logger.info(f"🗺️ Fetching roadmap: {interest}")
        
        roadmap = get_roadmap_by_interest(interest)
        
        if not roadmap:
            raise HTTPException(status_code=404, detail=f"Roadmap not found: {interest}")
        
        return {
            "success": True,
            "roadmap": roadmap
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Roadmap error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/roadmaps")
async def get_roadmaps():
    """Get all available roadmaps"""
    try:
        roadmaps = get_all_roadmaps()
        return {
            "success": True,
            "roadmaps": roadmaps
        }
    except Exception as e:
        logger.error(f"❌ Error fetching roadmaps: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))