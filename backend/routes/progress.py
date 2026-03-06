"""
Progress & XP Routes
"""
from fastapi import APIRouter, HTTPException
from models.schemas import TaskComplete
from services.dynamodb_service import get_progress, update_progress, complete_task, complete_project
from services.xp_engine import calculate_xp
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.get("/progress/{user_id}")
async def get_user_progress(user_id: str):
    """Get user's progress and XP"""
    try:
        logger.info(f"📊 Fetching progress: {user_id}")
        
        progress = get_progress(user_id)
        
        if not progress:
            raise HTTPException(status_code=404, detail="Progress not found")
        
        return {
            "success": True,
            "progress": progress
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Progress error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/task/complete")
async def complete_user_task(data: dict):
    """
    Complete a task and award +5 XP
    """
    try:
        user_id = data.get('userId')
        project_id = data.get('projectId')
        task_id = data.get('taskId')
        
        logger.info(f"✅ Task completion: {user_id} - {project_id} - Task {task_id}")
        
        progress = complete_task(user_id, project_id, task_id)
        
        return {
            "success": True,
            "progress": progress,
            "xp_gained": 5,
            "message": "Task completed! +5 XP 🎉"
        }
        
    except Exception as e:
        logger.error(f"❌ Task completion error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/project/complete")
async def complete_user_project(data: dict):
    """
    Complete entire project and award +25 XP bonus
    """
    try:
        user_id = data.get('userId')
        project_id = data.get('projectId')
        
        logger.info(f"🎊 Project completion: {user_id} - {project_id}")
        
        progress = complete_project(user_id, project_id)
        
        return {
            "success": True,
            "progress": progress,
            "xp_gained": 25,
            "message": "Project completed! +25 XP BONUS! 🏆"
        }
        
    except Exception as e:
        logger.error(f"❌ Project completion error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/progress/update")
async def update_user_progress(data: dict):
    """Update user progress"""
    try:
        user_id = data.get('userId')
        updates = data.get('updates', {})
        
        progress = update_progress(user_id, updates)
        
        return {
            "success": True,
            "progress": progress
        }
        
    except Exception as e:
        logger.error(f"❌ Progress update error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))