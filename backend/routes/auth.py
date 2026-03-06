"""
Authentication Routes
"""
from fastapi import APIRouter, HTTPException
from models.schemas import UserLogin, UserResponse
from services.dynamodb_service import create_user, get_user
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/auth/login", response_model=UserResponse)
async def login(user_data: UserLogin):
    """
    User login/registration
    Creates new user if doesn't exist
    """
    try:
        logger.info(f"🔐 Login request: {user_data.username}")
        
        # Create new user (in production, check if exists first)
        user = create_user(user_data.username)
        
        logger.info(f"✅ User created/logged in: {user['userId']}")
        
        return {
            "userId": user['userId'],
            "username": user['username'],
            "interest": user.get('interest'),
            "skillLevel": user.get('skillLevel', 1),
            "xp": user.get('xp', 0)
        }
        
    except Exception as e:
        logger.error(f"❌ Login error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Login failed: {str(e)}")