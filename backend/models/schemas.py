"""
Pydantic Models for Request/Response Validation
"""
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

# Auth Models
class UserLogin(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)

class UserResponse(BaseModel):
    userId: str
    username: str
    interest: Optional[str] = None
    skillLevel: int
    xp: int

# Questionnaire Models
class QuestionnaireSubmit(BaseModel):
    responses: List[Dict[str, Any]]

# Progress Models
class TaskComplete(BaseModel):
    projectId: str
    taskId: int

# Mentor Models
class MentorRequest(BaseModel):
    message: str
    context: Dict[str, Any] = Field(default_factory=dict)

# Generator Models
class GenerateREADME(BaseModel):
    projectData: Dict[str, Any]

class GenerateLinkedIn(BaseModel):
    projectData: Dict[str, Any]

class OptimizeLinkedIn(BaseModel):
    section: str
    content: str

# Flashcard Models
class FlashcardProgress(BaseModel):
    moduleId: str
    progress: Dict[str, Any]

# TTS Models
class TTSRequest(BaseModel):
    text: str = Field(..., max_length=3000)
    voiceId: Optional[str] = "Joanna"

# Skill Booster Models
class EvaluateAnswer(BaseModel):
    questionId: str
    answer: str
    correctAnswer: str