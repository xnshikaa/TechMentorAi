"""
XP Calculation Engine
"""

XP_REWARDS = {
    # Tasks & Projects
    'complete_task': 5,
    'complete_project': 25,
    
    # Learning activities
    'generate_flashcards': 20,
    'review_flashcard': 10,
    'read_fact': 5,
    
    # AI features
    'mentor_chat': 10,
    'generate_readme': 15,
    'generate_linkedin': 15,
    'linkedin_optimize': 15,
    
    # Milestones
    'complete_questionnaire': 15,
    'start_project': 10,
}

def calculate_xp(action: str) -> int:
    """Calculate XP for an action"""
    return XP_REWARDS.get(action, 5)  # Default 5 XP

def calculate_level(total_xp: int) -> int:
    """Calculate level from XP (100 XP per level)"""
    return (total_xp // 100) + 1