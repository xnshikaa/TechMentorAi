"""
LinkedIn Generator Routes
"""
from fastapi import APIRouter, HTTPException
from services.bedrock_service import generate_linkedin_post
from services.xp_engine import calculate_xp
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/generate-linkedin")
async def create_linkedin_post(data: dict):
    """
    Generate LinkedIn post using AI
    Uses Amazon Bedrock (Claude 3 Haiku)
    """
    try:
        project_data = data.get('projectData', {})
        
        logger.info(f"💼 LinkedIn post generation request")
        
        # Validate input
        if not project_data:
            raise HTTPException(status_code=400, detail="Project data is required")
        
        # Ensure required fields
        if 'name' not in project_data:
            project_data['name'] = 'My Project'
        if 'description' not in project_data:
            project_data['description'] = 'A learning project'
        if 'techStack' not in project_data:
            project_data['techStack'] = []
        
        # Generate with AI
        try:
            post = generate_linkedin_post(project_data)
        except Exception as e:
            logger.error(f"Bedrock error: {str(e)}")
            # Fallback response if Bedrock fails
            post = f"""🎉 Excited to share my latest project: {project_data['name']}!

{project_data['description']}

💻 Tech Stack: {', '.join(project_data['techStack']) if project_data['techStack'] else 'Various technologies'}

Key Learnings:
✅ Problem-solving skills
✅ Technical implementation
✅ Best practices

This project challenged me to grow as a developer. Always learning, always building! 🚀

#WebDevelopment #Coding #TechLearning #100DaysOfCode"""
        
        xp = calculate_xp('generate_linkedin')
        
        logger.info(f"✅ LinkedIn post generated (+{xp} XP)")
        
        return {
            "success": True,
            "post": post,
            "xp_gained": xp
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ LinkedIn generation error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate LinkedIn post: {str(e)}")