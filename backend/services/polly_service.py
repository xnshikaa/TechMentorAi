"""
Amazon Polly Service - Text-to-Speech
"""
import logging
import base64
import boto3
from botocore.exceptions import ClientError

logger = logging.getLogger(__name__)

# Initialize Polly
try:
    polly = boto3.client('polly', region_name='us-east-1')
    logger.info("✅ Polly client initialized")
except Exception as e:
    logger.error(f"❌ Polly initialization failed: {str(e)}")
    polly = None

def generate_speech(text: str, voice_id: str = 'Joanna') -> dict:
    """
    Generate speech audio from text using Amazon Polly
    
    Args:
        text: Text to convert to speech (max 3000 chars)
        voice_id: Polly voice (Joanna, Matthew, etc.)
        
    Returns:
        Dict with audio data in base64 format
    """
    if not polly:
        raise Exception("Polly client not initialized. Check AWS credentials.")
    
    try:
        # Limit text length
        if len(text) > 3000:
            text = text[:2997] + "..."
            logger.warning("⚠️ Text truncated to 3000 characters")
        
        logger.info(f"🎤 Generating speech ({len(text)} chars, voice: {voice_id})")
        
        response = polly.synthesize_speech(
            Text=text,
            OutputFormat='mp3',
            VoiceId=voice_id,
            Engine='neural'  # Neural voices sound more natural
        )
        
        # Read audio stream
        audio_stream = response['AudioStream'].read()
        
        # Convert to base64
        audio_base64 = base64.b64encode(audio_stream).decode('utf-8')
        
        logger.info(f"✅ Speech generated ({len(audio_base64)} bytes)")
        
        return {
            "success": True,
            "audioData": f"data:audio/mp3;base64,{audio_base64}",
            "format": "mp3",
            "voice": voice_id,
            "textLength": len(text)
        }
        
    except ClientError as e:
        error_code = e.response['Error']['Code']
        logger.error(f"❌ Polly error: {error_code}")
        
        if error_code == 'TextLengthExceededException':
            raise Exception("Text too long. Maximum 3000 characters for neural voices.")
        else:
            raise Exception(f"Speech generation failed: {str(e)}")
    
    except Exception as e:
        logger.error(f"❌ Unexpected Polly error: {str(e)}")
        raise