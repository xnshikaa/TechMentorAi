"""
Flashcards Routes
"""
from fastapi import APIRouter, HTTPException
from data.flashcards_data import get_flashcard_module, get_all_modules
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.get("/flashcards/{module_id}")
async def get_flashcards(module_id: str):
    """Get flashcard module (e.g., 'python-fundamentals')"""
    try:
        logger.info(f"🗂️ Fetching flashcards: {module_id}")
        
        flashcards = get_flashcard_module(module_id)
        
        if not flashcards:
            raise HTTPException(status_code=404, detail=f"Module not found: {module_id}")
        
        return {
            "success": True,
            "flashcards": flashcards
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Flashcards error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/flashcards")
async def get_all_flashcard_modules():
    """Get all available flashcard modules"""
    try:
        modules = get_all_modules()
        return {
            "success": True,
            "modules": modules
        }
    except Exception as e:
        logger.error(f"❌ Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))