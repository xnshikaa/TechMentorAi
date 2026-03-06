"""
DynamoDB Service - Complete database operations
"""
import os
import uuid
import logging
from datetime import datetime
from decimal import Decimal
from typing import Dict, Any, Optional
import boto3
from botocore.exceptions import ClientError

logger = logging.getLogger(__name__)

# Initialize DynamoDB
try:
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    logger.info("✅ DynamoDB client initialized")
except Exception as e:
    logger.error(f"❌ DynamoDB initialization failed: {str(e)}")
    dynamodb = None

# Table names
USERS_TABLE = os.getenv('USERS_TABLE', 'TechMentor-Users')
PROGRESS_TABLE = os.getenv('PROGRESS_TABLE', 'TechMentor-Progress')

# Helper functions
def python_to_dynamo(obj):
    """Convert Python types to DynamoDB compatible types"""
    if isinstance(obj, float):
        return Decimal(str(obj))
    elif isinstance(obj, dict):
        return {k: python_to_dynamo(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [python_to_dynamo(item) for item in obj]
    return obj

def dynamo_to_python(obj):
    """Convert DynamoDB types to Python native types"""
    if isinstance(obj, Decimal):
        return int(obj) if obj % 1 == 0 else float(obj)
    elif isinstance(obj, dict):
        return {k: dynamo_to_python(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [dynamo_to_python(item) for item in obj]
    return obj

# USER OPERATIONS
def create_user(username: str) -> Dict[str, Any]:
    """Create new user"""
    if not dynamodb:
        # Return mock data if DynamoDB not available (for local testing)
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        return {
            'userId': user_id,
            'username': username,
            'interest': None,
            'skillLevel': 1,
            'xp': 0,
            'onboardingCompleted': False
        }
    
    try:
        table = dynamodb.Table(USERS_TABLE)
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        timestamp = datetime.utcnow().isoformat()
        
        user = {
            'userId': user_id,
            'username': username,
            'interest': None,
            'skillLevel': 1,
            'xp': 0,
            'onboardingCompleted': False,
            'createdAt': timestamp,
            'updatedAt': timestamp
        }
        
        table.put_item(Item=python_to_dynamo(user))
        logger.info(f"✅ Created user: {user_id}")
        return user
        
    except Exception as e:
        logger.error(f"❌ Error creating user: {str(e)}")
        raise

def get_user(user_id: str) -> Optional[Dict[str, Any]]:
    """Get user by ID"""
    if not dynamodb:
        return None
    
    try:
        table = dynamodb.Table(USERS_TABLE)
        response = table.get_item(Key={'userId': user_id})
        
        if 'Item' in response:
            return dynamo_to_python(response['Item'])
        return None
        
    except Exception as e:
        logger.error(f"❌ Error getting user: {str(e)}")
        return None

def update_user(user_id: str, updates: Dict[str, Any]) -> Dict[str, Any]:
    """Update user data"""
    if not dynamodb:
        return updates
    
    try:
        table = dynamodb.Table(USERS_TABLE)
        updates['updatedAt'] = datetime.utcnow().isoformat()
        updates = python_to_dynamo(updates)
        
        update_expr = "SET " + ", ".join([f"#{k} = :{k}" for k in updates.keys()])
        expr_attr_names = {f"#{k}": k for k in updates.keys()}
        expr_attr_values = {f":{k}": v for k, v in updates.items()}
        
        response = table.update_item(
            Key={'userId': user_id},
            UpdateExpression=update_expr,
            ExpressionAttributeNames=expr_attr_names,
            ExpressionAttributeValues=expr_attr_values,
            ReturnValues='ALL_NEW'
        )
        
        logger.info(f"✅ Updated user: {user_id}")
        return dynamo_to_python(response['Attributes'])
        
    except Exception as e:
        logger.error(f"❌ Error updating user: {str(e)}")
        raise

# PROGRESS OPERATIONS
def create_progress(user_id: str, roadmap: str) -> Dict[str, Any]:
    """Initialize user progress"""
    if not dynamodb:
        return {
            'userId': user_id,
            'roadmap': roadmap,
            'xp': 0,
            'level': 1,
            'completedTasks': [],
            'completedProjects': []
        }
    
    try:
        table = dynamodb.Table(PROGRESS_TABLE)
        
        progress = {
            'userId': user_id,
            'roadmap': roadmap,
            'xp': 0,
            'level': 1,
            'currentProject': None,
            'completedTasks': [],
            'completedProjects': [],
            'createdAt': datetime.utcnow().isoformat(),
            'updatedAt': datetime.utcnow().isoformat()
        }
        
        table.put_item(Item=python_to_dynamo(progress))
        logger.info(f"✅ Created progress for {user_id}: {roadmap}")
        return progress
        
    except Exception as e:
        logger.error(f"❌ Error creating progress: {str(e)}")
        raise

def get_progress(user_id: str) -> Optional[Dict[str, Any]]:
    """Get user progress"""
    if not dynamodb:
        return None
    
    try:
        table = dynamodb.Table(PROGRESS_TABLE)
        response = table.get_item(Key={'userId': user_id})
        
        if 'Item' in response:
            return dynamo_to_python(response['Item'])
        return None
        
    except Exception as e:
        logger.error(f"❌ Error getting progress: {str(e)}")
        return None

def update_progress(user_id: str, updates: Dict[str, Any]) -> Dict[str, Any]:
    """Update progress"""
    if not dynamodb:
        return updates
    
    try:
        table = dynamodb.Table(PROGRESS_TABLE)
        updates['updatedAt'] = datetime.utcnow().isoformat()
        updates = python_to_dynamo(updates)
        
        update_expr = "SET " + ", ".join([f"#{k} = :{k}" for k in updates.keys()])
        expr_attr_names = {f"#{k}": k for k in updates.keys()}
        expr_attr_values = {f":{k}": v for k, v in updates.items()}
        
        response = table.update_item(
            Key={'userId': user_id},
            UpdateExpression=update_expr,
            ExpressionAttributeNames=expr_attr_names,
            ExpressionAttributeValues=expr_attr_values,
            ReturnValues='ALL_NEW'
        )
        
        logger.info(f"✅ Updated progress: {user_id}")
        return dynamo_to_python(response['Attributes'])
        
    except Exception as e:
        logger.error(f"❌ Error updating progress: {str(e)}")
        raise

def complete_task(user_id: str, project_id: str, task_id: int) -> Dict[str, Any]:
    """Mark task complete and award XP"""
    try:
        current = get_progress(user_id)
        if not current:
            return {'error': 'Progress not found'}
        
        task_key = f"{project_id}_{task_id}"
        
        if task_key in current.get('completedTasks', []):
            logger.info(f"⚠️ Task already completed: {task_key}")
            return current
        
        new_xp = current.get('xp', 0) + 5
        new_level = (new_xp // 100) + 1
        completed_tasks = current.get('completedTasks', []) + [task_key]
        
        updates = {
            'xp': new_xp,
            'level': new_level,
            'completedTasks': completed_tasks
        }
        
        result = update_progress(user_id, updates)
        logger.info(f"✅ Task completed: {task_key} (+5 XP, Total: {new_xp})")
        return result
        
    except Exception as e:
        logger.error(f"❌ Error completing task: {str(e)}")
        raise

def complete_project(user_id: str, project_id: str) -> Dict[str, Any]:
    """Mark project complete and award bonus XP"""
    try:
        current = get_progress(user_id)
        if not current:
            return {'error': 'Progress not found'}
        
        if project_id in current.get('completedProjects', []):
            logger.info(f"⚠️ Project already completed: {project_id}")
            return current
        
        new_xp = current.get('xp', 0) + 25
        new_level = (new_xp // 100) + 1
        completed_projects = current.get('completedProjects', []) + [project_id]
        
        updates = {
            'xp': new_xp,
            'level': new_level,
            'completedProjects': completed_projects
        }
        
        result = update_progress(user_id, updates)
        logger.info(f"✅ Project completed: {project_id} (+25 XP BONUS, Total: {new_xp})")
        return result
        
    except Exception as e:
        logger.error(f"❌ Error completing project: {str(e)}")
        raise