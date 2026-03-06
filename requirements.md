# Requirements Document: TechMentor AI

## Introduction

TechMentor AI is an AI-powered project-based learning accelerator built entirely on AWS serverless infrastructure. The platform converts predefined roadmap knowledge into portfolio-ready projects through AI-guided execution, targeting Tier 2/Tier 3 students, self-learners, early career developers, and job seekers in India (AI for Bharat context). The system emphasizes practical skill development through structured daily tasks, XP-based progression, and context-aware AI mentorship without providing complete code solutions.

## Project Context

- **Project Type**: AWS Serverless AI Learning Platform
- **Core Principle**: Convert roadmap knowledge into portfolio-ready projects through AI-guided execution
- **Target Market**: India (AI for Bharat initiative)
- **MVP Timeline**: Demo-ready within 5 days
- **Budget Constraint**: Under $100 AWS credits
- **Scope**: 3 predefined roadmaps (Frontend, Backend, Full Stack)
- **AI Model**: Amazon Bedrock with Claude 3 Haiku
- **Architecture**: 100% AWS serverless (Amplify, API Gateway, Lambda, DynamoDB, Bedrock, Polly)

## Glossary

- **TechMentor_System**: The complete AWS serverless AI-powered learning platform
- **Learning_Roadmap**: One of three predefined progressive pathways (Frontend, Backend, Full Stack) stored in DynamoDB
- **AI_Mentor**: Context-aware guidance system powered by Amazon Bedrock (Claude 3 Haiku) with guardrails - provides hints and explanations, never full code
- **Skill_Path_Questionnaire**: AI-assisted assessment that assigns users to one of three learning paths
- **Daily_Task**: Individual work unit within a project (+5 XP per completion)
- **Project**: Collection of 5 daily tasks with defined outcome and tech stack (+25 XP per completion, 3 per roadmap: Beginner/Intermediate/Advanced)
- **XP_System**: Experience point-based skill progression tracker (+5 XP per task, +25 XP per project)
- **GitHub_README_Generator**: AI-powered tool for creating professional project documentation
- **LinkedIn_Post_Generator**: AI-powered tool for creating professional learning showcase posts
- **Python_Skill_Booster**: Dedicated module with quiz, AI explanations, and predefined memory flashcards (Python only for MVP)
- **Facts_Engine**: Curated educational content and website recommendations
- **User_Profile**: DynamoDB record of username, assigned path, progress, and XP
- **Polly_TTS**: Optional Amazon Polly text-to-speech for accessibility

## AWS Service Mapping

| Component | AWS Service | Purpose | Cost Optimization |
|-----------|-------------|---------|-------------------|
| Frontend Hosting | AWS Amplify | Static web application hosting and deployment | Free tier: 1000 build minutes/month |
| API Layer | API Gateway | RESTful API endpoints for frontend-backend communication | Free tier: 1M requests/month |
| Business Logic | AWS Lambda | Serverless compute for all backend operations | Free tier: 1M requests/month |
| Database | DynamoDB | NoSQL storage for users, roadmaps, projects, tasks, progress, facts, flashcards | Free tier: 25GB storage, 25 RCU/WCU |
| AI Mentor | Amazon Bedrock (Claude 3 Haiku) | Context-aware AI guidance with guardrails | Cheapest model, ~$0.25/1M input tokens |
| Text-to-Speech | Amazon Polly (Optional) | Accessibility feature for content narration | Pay per character, optional feature |
| Monitoring | CloudWatch | Logging and basic monitoring | Free tier: 5GB logs, 10 metrics |
| Authentication | Lambda + DynamoDB | Simple username-based login (MVP) | No additional cost (uses existing services) |

## Requirements

### Requirement 1: Simple Username-Based Authentication

**User Story:** As a new user, I want to quickly create an account with just a username, so that I can start learning without complex authentication flows.

#### Acceptance Criteria

1. WHEN a new user visits the platform, THE TechMentor_System SHALL provide a simple username-based registration form
2. WHEN a username is submitted, THE TechMentor_System SHALL validate uniqueness and store the user profile in DynamoDB
3. WHEN a returning user enters their username, THE TechMentor_System SHALL retrieve their profile and progress from DynamoDB
4. THE TechMentor_System SHALL NOT implement OAuth or complex authentication for MVP
5. THE User_Profile SHALL be stored with username as primary key in DynamoDB Users table

### Requirement 2: AI-Assisted Path Assignment Questionnaire

**User Story:** As a new user, I want an AI-guided questionnaire that understands my background and assigns me to the right learning path, so that I start with appropriate content.

#### Acceptance Criteria

1. WHEN a new user completes registration, THE TechMentor_System SHALL present an AI-assisted questionnaire powered by Amazon Bedrock
2. WHEN the user answers questions, THE AI_Mentor SHALL analyze responses and assign one of three paths: Frontend, Backend, or Full Stack
3. THE Skill_Path_Questionnaire SHALL ask about prior experience, interests, and career goals
4. WHEN path assignment is complete, THE TechMentor_System SHALL store the assigned path in the user's DynamoDB profile
5. THE TechMentor_System SHALL load the corresponding predefined roadmap from DynamoDB

### Requirement 3: Predefined Roadmaps with Structured Content

**User Story:** As a learner, I want access to a well-structured roadmap for my chosen path, so that I have a clear progression through technologies and projects.

#### Acceptance Criteria

1. THE TechMentor_System SHALL store exactly 3 predefined roadmaps in DynamoDB: Frontend, Backend, and Full Stack
2. WHEN a roadmap is loaded, IT SHALL contain structured stages with clear progression
3. WHEN viewing a roadmap, THE user SHALL see all technologies they will learn in that path
4. EACH roadmap SHALL contain exactly 3 predefined projects: Beginner, Intermediate, and Advanced
5. THE roadmaps SHALL be stored in DynamoDB Roadmaps table with efficient query patterns

### Requirement 4: Project Structure with Daily Tasks

**User Story:** As a learner working on a project, I want it broken down into 5 daily tasks with clear outcomes and tech stack information, so that I can make consistent progress.

#### Acceptance Criteria

1. WHEN a user starts a project, THE TechMentor_System SHALL display exactly 5 daily tasks for that project
2. EACH Daily_Task SHALL have a clear description, expected outcome, and estimated time
3. WHEN viewing a project, THE user SHALL see the complete tech stack required
4. WHEN viewing a project, THE user SHALL see the expected final outcome
5. THE project and task data SHALL be stored in DynamoDB Projects table

### Requirement 5: XP-Based Skill Progression System

**User Story:** As a learner, I want to earn XP for completing tasks and projects, so that I can track my progress and feel motivated.

#### Acceptance Criteria

1. WHEN a user completes a daily task, THE XP_System SHALL award exactly +5 XP
2. WHEN a user completes a full project (all 5 tasks), THE XP_System SHALL award exactly +25 XP
3. THE XP_System SHALL store cumulative XP in the user's DynamoDB profile
4. WHEN viewing progress, THE user SHALL see their current XP total and XP breakdown by project
5. THE XP_System SHALL update in real-time as tasks are marked complete

### Requirement 6: Context-Aware AI Mentor with Guardrails

**User Story:** As a learner stuck on a task, I want an AI mentor that provides hints and explanations without giving me full code, so that I learn by doing.

#### Acceptance Criteria

1. WHEN a user asks for help, THE AI_Mentor SHALL use Amazon Bedrock (Claude 3 Haiku) to provide context-aware guidance
2. THE AI_Mentor SHALL have guardrails enabled to prevent providing complete code solutions
3. WHEN providing assistance, THE AI_Mentor SHALL offer hints, explanations, and learning resources
4. THE AI_Mentor SHALL maintain conversation context for the current task or project
5. THE AI_Mentor SHALL use cost-effective Claude 3 Haiku model to stay within budget constraints

### Requirement 7: GitHub README Generator

**User Story:** As a learner who completed a project, I want AI assistance to generate a professional README for my GitHub repository, so that I can showcase my work effectively.

#### Acceptance Criteria

1. WHEN a user completes a project, THE GitHub_README_Generator SHALL offer to create a professional README
2. THE GitHub_README_Generator SHALL use Amazon Bedrock to generate README content based on project details
3. THE generated README SHALL include project description, tech stack, features, and setup instructions
4. THE user SHALL be able to copy the generated README to their clipboard
5. THE TechMentor_System SHALL NOT automatically push to GitHub (user copies manually)

### Requirement 8: LinkedIn Post Generator

**User Story:** As a learner who achieved a milestone, I want AI-generated LinkedIn post suggestions, so that I can share my learning journey professionally.

#### Acceptance Criteria

1. WHEN a user completes a project or reaches an XP milestone, THE LinkedIn_Post_Generator SHALL offer to create a post
2. THE LinkedIn_Post_Generator SHALL use Amazon Bedrock to generate professional, engaging post content
3. THE generated post SHALL highlight the learning journey, skills gained, and project outcomes
4. THE user SHALL be able to copy the generated post to their clipboard
5. THE TechMentor_System SHALL NOT automatically post to LinkedIn (user copies manually)

### Requirement 9: Python Skill Booster Module

**User Story:** As a learner wanting to strengthen my Python skills, I want a dedicated module with quizzes, AI explanations, and flashcards, so that I can reinforce my knowledge.

#### Acceptance Criteria

1. THE Python_Skill_Booster SHALL be available as a dedicated module in the platform
2. WHEN accessing the module, THE user SHALL see Python quizzes with multiple-choice questions
3. WHEN a user answers incorrectly, THE AI_Mentor SHALL provide detailed explanations using Amazon Bedrock
4. THE Python_Skill_Booster SHALL include predefined memory flashcards for key Python concepts
5. THE Python_Skill_Booster SHALL be Python-only for MVP (no other languages)

### Requirement 10: Facts and Curated Websites Engine

**User Story:** As a learner, I want access to curated educational facts and website recommendations, so that I can explore additional learning resources.

#### Acceptance Criteria

1. THE Facts_Engine SHALL provide curated educational facts related to the user's current learning path
2. WHEN viewing facts, THE user SHALL see relevant, high-quality information about technologies they're learning
3. THE Facts_Engine SHALL recommend curated websites for deeper learning
4. THE facts and website data SHALL be stored in DynamoDB Facts table
5. THE Facts_Engine SHALL be contextual to the user's current roadmap and project

### Requirement 11: Optional Text-to-Speech with Amazon Polly

**User Story:** As a learner with accessibility needs or who prefers audio learning, I want optional text-to-speech for content, so that I can learn in my preferred format.

#### Acceptance Criteria

1. THE TechMentor_System SHALL provide optional text-to-speech using Amazon Polly
2. WHEN enabled, THE Polly_TTS SHALL convert task descriptions, AI mentor responses, and facts to speech
3. THE Polly_TTS SHALL be optional and disabled by default to minimize costs
4. WHEN enabled, THE user SHALL be able to play, pause, and stop audio
5. THE Polly_TTS SHALL use cost-effective voice options to stay within budget

### Requirement 12: Fully Serverless AWS Architecture

**User Story:** As a platform operator, I want a fully serverless architecture, so that the platform scales automatically and stays within budget constraints.

#### Acceptance Criteria

1. THE TechMentor_System SHALL use AWS Amplify for frontend hosting
2. THE TechMentor_System SHALL use API Gateway for all API endpoints
3. THE TechMentor_System SHALL use AWS Lambda for all backend business logic
4. THE TechMentor_System SHALL use DynamoDB for all data storage
5. THE TechMentor_System SHALL use Amazon Bedrock for all AI functionality
6. THE TechMentor_System SHALL use Amazon Polly for optional text-to-speech
7. THE TechMentor_System SHALL use CloudWatch for logging and monitoring
8. THE TechMentor_System SHALL have NO traditional servers or containers

### Requirement 13: Cost Optimization Under $100

**User Story:** As a platform operator, I want to ensure the entire MVP stays under $100 AWS credits, so that it's feasible for hackathon demonstration.

#### Acceptance Criteria

1. THE TechMentor_System SHALL leverage AWS free tier services wherever possible
2. THE TechMentor_System SHALL use Claude 3 Haiku (cheapest Bedrock model) instead of Sonnet or Opus
3. THE TechMentor_System SHALL limit predefined content to 3 roadmaps to minimize storage and compute
4. THE TechMentor_System SHALL make Polly TTS optional to avoid unnecessary costs
5. THE TechMentor_System SHALL implement efficient DynamoDB query patterns to minimize RCU/WCU usage
6. THE estimated total cost for MVP demonstration SHALL be under $100 AWS credits

## User Stories Summary

1. Simple username-based login for quick onboarding
2. AI-assisted questionnaire assigns users to Frontend, Backend, or Full Stack path
3. Access to predefined roadmaps with structured stages and technologies
4. Projects broken into 5 daily tasks with clear outcomes and tech stacks
5. Earn +5 XP per task and +25 XP per project for motivation
6. Context-aware AI mentor provides hints without full code solutions
7. Generate professional GitHub READMEs for completed projects
8. Generate LinkedIn posts to showcase learning milestones
9. Python Skill Booster with quizzes, AI explanations, and flashcards
10. Access curated facts and website recommendations
11. Optional text-to-speech for accessibility
12. Fully serverless AWS architecture for scalability
13. Stay under $100 AWS credits for hackathon feasibility

## Success Metrics

- **User Engagement**: Daily active users completing at least 1 task per day
- **Learning Progression**: Average time to complete each project tier (Beginner/Intermediate/Advanced)
- **XP Distribution**: Average XP earned per user per week
- **AI Mentor Usage**: Number of AI mentor interactions per project
- **Content Generation**: Number of README and LinkedIn posts generated
- **Cost Efficiency**: Actual AWS costs vs $100 budget target
- **Accessibility**: Percentage of users enabling Polly TTS feature
- **Path Distribution**: Distribution of users across Frontend/Backend/Full Stack paths

## Constraints

### Technical Constraints
- Must use only AWS serverless services (no EC2, ECS, or traditional servers)
- Must use Amazon Bedrock with Claude 3 Haiku model
- Must implement guardrails to prevent AI from providing complete code
- Must use DynamoDB for all data storage (no RDS or other databases)
- Must stay within AWS free tier limits wherever possible

### Business Constraints
- Total AWS costs must stay under $100 for MVP demonstration
- MVP must be demo-ready within 5 days
- Only 3 predefined roadmaps for MVP scope
- Python Skill Booster is Python-only (no other languages)
- No OAuth or complex authentication (username-only for MVP)

### Scope Constraints
- Exactly 3 roadmaps: Frontend, Backend, Full Stack
- Exactly 3 projects per roadmap: Beginner, Intermediate, Advanced
- Exactly 5 daily tasks per project
- Fixed XP values: +5 per task, +25 per project
- Predefined flashcards (not dynamically generated)
- Manual copy-paste for GitHub and LinkedIn (no API integration)

## AI Justification

### Why AI is Essential for TechMentor AI

1. **Personalized Path Assignment**: AI analyzes user responses to assign the most appropriate learning path, providing better outcomes than static questionnaires.

2. **Context-Aware Mentorship**: AI understands the user's current task, project, and learning history to provide relevant, timely guidance without spoiling the learning experience.

3. **Adaptive Explanations**: AI tailors explanations to the user's skill level and learning style, making complex concepts more accessible.

4. **Content Generation**: AI generates professional README and LinkedIn content that reflects the user's specific project and learning journey, saving time while maintaining quality.

5. **Interactive Learning**: AI enables Socratic questioning and guided discovery, which research shows is more effective than passive learning or direct answers.

6. **Scalability**: AI mentor can support unlimited concurrent users without requiring human mentors, making quality education accessible to Tier 2/Tier 3 students in India.

### Why Claude 3 Haiku on Amazon Bedrock

1. **Cost Efficiency**: Haiku is the most cost-effective model (~$0.25/1M input tokens), crucial for staying under $100 budget
2. **Sufficient Capability**: Haiku provides adequate reasoning for hints and explanations without needing Sonnet/Opus capabilities
3. **Guardrails Support**: Bedrock provides built-in guardrails to prevent inappropriate responses or complete code solutions
4. **AWS Integration**: Native integration with other AWS services (Lambda, API Gateway) for seamless serverless architecture
5. **Low Latency**: Haiku provides fast responses, improving user experience during interactive mentoring sessions

## Accessibility Justification (Amazon Polly)

### Why Text-to-Speech Matters

1. **Visual Impairment Support**: Enables learners with visual impairments to access all platform content through audio.

2. **Learning Style Diversity**: Some learners retain information better through auditory learning, especially for conceptual explanations.

3. **Multitasking Capability**: Users can listen to task descriptions or AI explanations while coding, improving workflow efficiency.

4. **Fatigue Reduction**: Reduces screen fatigue for users spending long hours on projects, promoting sustainable learning habits.

5. **Language Accessibility**: Audio pronunciation helps non-native English speakers understand technical terms correctly.

6. **AI for Bharat Context**: In India, many Tier 2/Tier 3 students may have varying levels of English reading proficiency; audio support improves accessibility.

### Why Amazon Polly

1. **Natural-Sounding Voices**: Polly provides high-quality, natural-sounding speech that's pleasant for extended listening.
2. **Cost-Effective**: Pay-per-character pricing allows making it optional to control costs.
3. **AWS Integration**: Seamless integration with Lambda and other AWS services.
4. **Multiple Languages**: Future potential to support regional Indian languages for broader accessibility.
5. **Low Latency**: Fast audio generation for real-time text-to-speech conversion.

## Business Feasibility Overview

### Market Opportunity

- **Target Audience**: 10M+ Tier 2/Tier 3 engineering students and self-learners in India
- **Pain Point**: Lack of personalized, project-based learning with mentorship at scale
- **Differentiation**: AI-powered mentorship that teaches problem-solving, not copy-paste solutions
- **AI for Bharat Alignment**: Addresses India's need for scalable, quality tech education

### Cost Structure (Under $100 MVP)

| Service | Estimated Cost | Justification |
|---------|---------------|---------------|
| AWS Amplify | $0 | Free tier: 1000 build minutes, 15GB storage |
| API Gateway | $0 | Free tier: 1M requests/month |
| AWS Lambda | $0 | Free tier: 1M requests, 400K GB-seconds |
| DynamoDB | $0 | Free tier: 25GB storage, 25 RCU/WCU |
| Amazon Bedrock (Haiku) | $30-50 | ~200K AI interactions at $0.25/1M tokens |
| Amazon Polly (Optional) | $10-20 | Optional feature, pay per character |
| CloudWatch | $0 | Free tier: 5GB logs |
| **Total** | **$40-70** | **Well under $100 budget** |

### Revenue Potential (Post-MVP)

1. **Freemium Model**: Free basic roadmaps, premium for advanced paths and unlimited AI interactions
2. **B2B Licensing**: Sell to educational institutions and coding bootcamps
3. **Certification**: Offer verified certificates for completed roadmaps
4. **Job Placement**: Partner with companies for placement opportunities

### Scalability Path

1. **Phase 1 (MVP)**: 3 roadmaps, 100 concurrent users, under $100
2. **Phase 2**: Add 5 more roadmaps, 1000 users, ~$500/month
3. **Phase 3**: Full platform with 20+ roadmaps, 10K users, ~$2K/month
4. **Phase 4**: Enterprise features, unlimited scale with auto-scaling serverless architecture

### Competitive Advantages

1. **Serverless Architecture**: Zero infrastructure management, automatic scaling
2. **AI-Powered Mentorship**: Personalized guidance at scale without human mentors
3. **Project-Based Learning**: Portfolio-ready projects, not just theory
4. **Cost-Effective**: Leverages AWS free tier and cheapest AI model
5. **Accessibility**: Optional TTS for inclusive learning
6. **India-Focused**: Designed for Tier 2/Tier 3 students with AI for Bharat context
