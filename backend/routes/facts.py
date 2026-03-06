"""
Facts & Websites Routes
"""
from fastapi import APIRouter, HTTPException
from data.facts_data import get_random_fact, get_random_website
from services.xp_engine import calculate_xp
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.get("/facts/random")
async def get_fact():
    """Get random tech fact"""
    try:
        fact = get_random_fact()
        xp = calculate_xp('read_fact')
        
        return {
            "success": True,
            "fact": fact,
            "xp_gained": xp
        }
        
    except Exception as e:
        logger.error(f"❌ Facts error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/facts/website")
async def get_website():
    """Get random website recommendation"""
    try:
        website = get_random_website()
        
        return {
            "success": True,
            "website": website
        }
        
    except Exception as e:
        logger.error(f"❌ Website error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))