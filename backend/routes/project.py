"""
Project Routes
"""
from fastapi import APIRouter, HTTPException
from data.projects_data import get_project_by_id, get_projects_by_roadmap, get_all_projects
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.get("/project/{project_id}")
async def get_project(project_id: str):
    """Get project details with all 10 daily tasks"""
    try:
        logger.info(f"📚 Fetching project: {project_id}")
        
        # DEBUG: Import and check
        from data.projects_data import PROJECTS_DATA
        logger.info(f"📊 Available projects: {list(PROJECTS_DATA.keys())}")
        logger.info(f"📊 Total projects in data: {len(PROJECTS_DATA)}")
        
        project = get_project_by_id(project_id)
        
        if not project:
            logger.error(f"❌ Project not found: {project_id}")
            logger.error(f"❌ Available: {list(PROJECTS_DATA.keys())}")
            raise HTTPException(
                status_code=404, 
                detail=f"Project not found: {project_id}. Available: {list(PROJECTS_DATA.keys())}"
            )
        
        logger.info(f"✅ Project found: {project['name']}")
        
        return {
            "success": True,
            "project": project
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Project error: {str(e)}")
        import traceback
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/projects/roadmap/{roadmap}")
async def get_projects_for_roadmap(roadmap: str):
    """Get all projects for a roadmap"""
    try:
        projects = get_projects_by_roadmap(roadmap)
        logger.info(f"📊 Found {len(projects)} projects for {roadmap}")
        return {
            "success": True,
            "projects": projects
        }
    except Exception as e:
        logger.error(f"❌ Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/projects")
async def get_projects():
    """Get all projects (9 total)"""
    try:
        from data.projects_data import PROJECTS_DATA
        projects = get_all_projects()
        logger.info(f"📊 Returning {len(projects)} total projects")
        logger.info(f"📊 Project IDs: {[p['id'] for p in projects]}")
        return {
            "success": True,
            "count": len(projects),
            "project_ids": list(PROJECTS_DATA.keys()),
            "projects": projects
        }
    except Exception as e:
        logger.error(f"❌ Error: {str(e)}")
        import traceback
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))