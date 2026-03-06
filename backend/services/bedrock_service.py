"""
Amazon Bedrock Service - Claude 3 Haiku with Guardrails
CRITICAL: AI Mentor NEVER provides full code solutions
"""
import json
import logging
import boto3
from botocore.exceptions import ClientError

logger = logging.getLogger(__name__)

# Initialize Bedrock Runtime
try:
    bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-east-1')
    logger.info("✅ Bedrock client initialized")
except Exception as e:
    logger.error(f"❌ Bedrock initialization failed: {str(e)}")
    bedrock_runtime = None

# Model Configuration
MODEL_ID = 'anthropic.claude-3-haiku-20240307-v1:0'
MAX_TOKENS = 2000
TEMPERATURE = 0.7

def invoke_claude(system_prompt: str, user_message: str, max_tokens: int = MAX_TOKENS) -> str:
    """
    Invoke Claude 3 Haiku via Bedrock
    
    Args:
        system_prompt: System instructions
        user_message: User's message
        max_tokens: Maximum response tokens
        
    Returns:
        AI response text
    """
    if not bedrock_runtime:
        raise Exception("Bedrock client not initialized. Check AWS credentials and region.")
    
    try:
        payload = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": max_tokens,
            "temperature": TEMPERATURE,
            "system": system_prompt,
            "messages": [
                {
                    "role": "user",
                    "content": user_message
                }
            ]
        }
        
        logger.info(f"🤖 Invoking Bedrock: {MODEL_ID}")
        
        response = bedrock_runtime.invoke_model(
            modelId=MODEL_ID,
            contentType="application/json",
            accept="application/json",
            body=json.dumps(payload)
        )
        
        response_body = json.loads(response['body'].read())
        
        if 'content' in response_body and len(response_body['content']) > 0:
            result = response_body['content'][0]['text']
            logger.info(f"✅ Bedrock response received ({len(result)} chars)")
            return result
        
        logger.error(f"❌ Unexpected Bedrock response: {response_body}")
        return "I apologize, but I couldn't generate a response. Please try again."
        
    except ClientError as e:
        error_code = e.response['Error']['Code']
        logger.error(f"❌ Bedrock ClientError: {error_code}")
        
        if error_code == 'AccessDeniedException':
            raise Exception("⚠️ Bedrock Access Denied! Enable Claude 3 Haiku in AWS Console → Bedrock → Model Access")
        elif error_code == 'ThrottlingException':
            raise Exception("Too many requests. Please try again in a moment.")
        else:
            raise Exception(f"Bedrock error: {str(e)}")
    
    except Exception as e:
        logger.error(f"❌ Unexpected error: {str(e)}")
        raise


def get_mentor_guidance(user_question: str, context: dict) -> str:
    """
    AI Mentor with STRICT GUARDRAILS - NO full code solutions
    """
    system_prompt = """You are TechMentor AI, a supportive coding mentor. Your mission is to guide learners with HINTS and conceptual explanations, NEVER provide complete solutions.

⚠️ CRITICAL GUARDRAILS - NEVER VIOLATE:
1. NEVER write more than 3-4 lines of code at once
2. NEVER provide complete function implementations
3. NEVER give copy-paste ready solutions
4. ALWAYS ask guiding questions to make students think
5. Focus on teaching problem-solving approach, not answers

Your Role:
✅ Provide conceptual guidance and hints
✅ Break down problems into smaller steps
✅ Ask clarifying questions to guide thinking
✅ Encourage experimentation and learning from mistakes
✅ Use analogies and examples to explain concepts
✅ Keep responses concise (2-3 paragraphs maximum)

Tone: Warm, encouraging, conversational - like a friendly "mentor next door"

Remember: Your goal is to teach HOW to think and approach problems, not WHAT code to write."""

    project_name = context.get('project', 'your current project')
    tech_stack = ', '.join(context.get('techStack', ['general development']))
    current_task = context.get('currentTask', 'this task')
    
    user_message = f"""Student's Question: {user_question}

Context:
- Working on: {project_name}
- Technologies: {tech_stack}
- Current Task: {current_task}

Provide helpful guidance that teaches them HOW to approach this problem, without giving the complete solution. Help them learn by thinking!"""

    return invoke_claude(system_prompt, user_message)


def generate_readme(project_data: dict) -> str:
    """Generate GitHub README"""
    system_prompt = """You are a technical documentation expert creating professional GitHub README files.

Create comprehensive, well-structured README with these sections:
- Clear project title with description
- Features list (use emojis for visual appeal)
- Tech stack with badges
- Installation/setup instructions (step-by-step)
- Usage examples
- Learning outcomes section
- Screenshots placeholder section
- Contributing guidelines
- License information

Format: Use clean Markdown with proper headers, code blocks, lists, and formatting.
Quality: Make it professional, portfolio-ready, and impressive to recruiters."""

    name = project_data.get('name', 'Project')
    description = project_data.get('description', 'A learning project')
    tech_stack = ', '.join(project_data.get('techStack', ['HTML', 'CSS', 'JavaScript']))
    features = project_data.get('features', ['Core functionality', 'User-friendly interface'])
    
    user_message = f"""Generate a professional GitHub README for:

Project Name: {name}
Description: {description}
Tech Stack: {tech_stack}
Key Features: {', '.join(features)}

Create a complete, impressive README that showcases this project professionally."""

    return invoke_claude(system_prompt, user_message, max_tokens=3000)


def generate_linkedin_post(project_data: dict) -> str:
    """Generate LinkedIn achievement post"""
    system_prompt = """You are a career coach helping developers share achievements on LinkedIn.

Create engaging posts that:
✅ Start with attention-grabbing opening (emoji optional)
✅ Highlight key learnings and skills gained
✅ Show enthusiasm and authenticity
✅ Include relevant hashtags (#WebDevelopment #100DaysOfCode etc.)
✅ End with engaging call-to-action or question
✅ Length: 150-200 words
✅ Use line breaks for readability

Tone: Professional yet relatable, humble yet confident."""

    name = project_data.get('name', 'my latest project')
    description = project_data.get('description', 'a web application')
    tech_stack = ', '.join(project_data.get('techStack', []))
    
    user_message = f"""Create an engaging LinkedIn post celebrating:

Project: {name}
What it is: {description}
Tech Stack: {tech_stack}

Make it professional, authentic, and engaging!"""

    return invoke_claude(system_prompt, user_message, max_tokens=500)


def analyze_questionnaire(responses: list) -> str:
    """Analyze questionnaire responses to recommend learning path"""
    system_prompt = """You are a tech career advisor analyzing a learner's interests and background.

Based on their responses, recommend ONE learning path:
- frontend: Best for those interested in UI/UX, visual design, user experience, CSS, React
- backend: Best for those interested in databases, APIs, server logic, data management
- fullstack: Best for those wanting comprehensive skills or interested in both areas

Respond with ONLY ONE WORD: either "frontend", "backend", or "fullstack" - nothing else."""

    user_message = f"""Analyze these questionnaire responses and recommend the best learning path:

{json.dumps(responses, indent=2)}

Your recommendation (one word only - frontend, backend, or fullstack):"""

    try:
        response = invoke_claude(system_prompt, user_message, max_tokens=50)
        path = response.strip().lower()
        
        if path in ['frontend', 'backend', 'fullstack']:
            logger.info(f"✅ Recommended path: {path}")
            return path
        
        logger.warning(f"⚠️ Invalid recommendation '{path}', defaulting to fullstack")
        return 'fullstack'
        
    except Exception as e:
        logger.error(f"❌ Questionnaire analysis failed: {str(e)}")
        return 'fullstack'  # Safe fallback