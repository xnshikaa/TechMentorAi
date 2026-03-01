# TechMentor AI 🚀

> **AI-Powered Project-Based Learning Accelerator Built on AWS Serverless Infrastructure**

TechMentor AI converts predefined roadmaps into portfolio-ready projects through AI-guided execution. Designed for Tier 2/Tier 3 students, self-learners, and early career developers in India (AI for Bharat initiative).

[![AWS](https://img.shields.io/badge/AWS-Serverless-orange)](https://aws.amazon.com/)
[![Bedrock](https://img.shields.io/badge/Amazon-Bedrock-blue)](https://aws.amazon.com/bedrock/)
[![Python](https://img.shields.io/badge/Python-3.11-green)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🎯 Problem Statement

Millions of students in India struggle with:
- Lack of personalized, project-based learning at scale
- No access to affordable mentorship
- Difficulty converting theoretical knowledge into practical skills
- Limited portfolio-ready projects for job applications

**TechMentor AI solves this by providing AI-powered mentorship that teaches problem-solving, not copy-paste solutions.**

---

## ✨ Key Features

### 🧠 AI-Powered Learning
- **AI-Assisted Questionnaire**: Assigns users to Frontend, Backend, or Full Stack paths
- **Context-Aware AI Mentor**: Provides hints and explanations using Amazon Bedrock (Claude 3 Haiku)
- **Guardrails Enabled**: Never provides complete code solutions, focuses on learning
- **Content Generation**: AI-powered GitHub README and LinkedIn post generators

### 📚 Structured Learning Paths
- **3 Predefined Roadmaps**: Frontend, Backend, Full Stack
- **9 Portfolio Projects**: 3 per roadmap (Beginner, Intermediate, Advanced)
- **45 Daily Tasks**: 5 tasks per project for consistent progress
- **Clear Tech Stacks**: Each project specifies required technologies

### 🎮 Gamified Progression
- **XP System**: +5 XP per task, +25 XP per project
- **Progress Tracking**: Visual progress bars and milestone celebrations
- **Skill Development**: Track skills gained across projects

### 🐍 Python Skill Booster
- **Interactive Quizzes**: Test Python knowledge
- **AI Explanations**: Detailed explanations for incorrect answers
- **30 Flashcards**: Predefined memory cards for key concepts

### 🎤 Accessibility (Optional)
- **Text-to-Speech**: Amazon Polly integration for audio learning
- **Indian English Voice**: Aditi voice for better accessibility

### 📊 Additional Features
- **Facts Engine**: Curated educational content and website recommendations
- **Contextual Learning**: Facts filtered by current learning path
- **Portfolio Building**: Professional README templates for GitHub

---

## 🏗️ Architecture

### AWS Serverless Stack

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    AWS Amplify (Frontend)                    │
│                  React SPA with HTTPS/CDN                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   API Gateway (REST API)                     │
│              Rate Limiting | CORS | Validation               │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│Auth Lambda  │  │Roadmap      │  │Project      │
│             │  │Lambda       │  │Lambda       │
└─────────────┘  └─────────────┘  └─────────────┘
         │               │               │
         ▼               ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│AI Mentor    │  │Content Gen  │  │Skill Booster│
│Lambda       │  │Lambda       │  │Lambda       │
└─────────────┘  └─────────────┘  └─────────────┘
         │               │               │
         └───────────────┼───────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  DynamoDB   │  │   Bedrock   │  │    Polly    │
│  (6 Tables) │  │(Claude Haiku)│  │    (TTS)    │
└─────────────┘  └─────────────┘  └─────────────┘
         │               │               │
         └───────────────┼───────────────┘
                         │
                         ▼
                 ┌─────────────┐
                 │ CloudWatch  │
                 │   Logging   │
                 └─────────────┘
```

### Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + TypeScript | User interface |
| **Hosting** | AWS Amplify | Static hosting with CDN |
| **API** | API Gateway | RESTful endpoints |
| **Compute** | AWS Lambda (Python 3.11) | Serverless business logic |
| **Database** | DynamoDB | NoSQL data storage |
| **AI** | Amazon Bedrock (Claude 3 Haiku) | AI mentorship |
| **TTS** | Amazon Polly | Text-to-speech |
| **Monitoring** | CloudWatch | Logs and metrics |

---

## 💰 Cost Optimization

**Target**: Under $100 AWS credits for MVP

| Service | Free Tier | Expected Usage | Estimated Cost |
|---------|-----------|----------------|----------------|
| AWS Amplify | 1000 build min, 15GB | 10 builds, 500MB | $0 |
| API Gateway | 1M requests/month | 100K requests | $0 |
| Lambda | 1M requests, 400K GB-sec | 100K invocations | $0 |
| DynamoDB | 25GB, 25 RCU/WCU | 10GB, 10 RCU/WCU | $0 |
| Bedrock (Haiku) | None | 200K interactions | $30-40 |
| Polly (Optional) | 5M chars/month | 500K characters | $2-8 |
| CloudWatch | 5GB logs | 2GB logs | $0 |
| **Total** | | | **$32-48** |

**Why So Cheap?**
- Serverless = pay only for usage
- Predefined roadmaps = no AI generation cost
- Claude 3 Haiku = cheapest model ($0.25/1M tokens)
- Free tier coverage for most services

---

## 🚀 Quick Start

### Prerequisites
- AWS Account with Bedrock access
- Node.js 18+ and Python 3.11+
- AWS CLI configured

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/techmentor-ai.git
cd techmentor-ai
```

### 2. Deploy Infrastructure
```bash
# Create DynamoDB tables
python scripts/create_tables.py

# Deploy Lambda functions
cd backend
./deploy.sh

# Deploy API Gateway
aws apigateway create-rest-api --name TechMentorAPI
```

### 3. Seed Data
```bash
# Seed roadmaps, projects, facts, flashcards
python scripts/seed_data.py
```

### 4. Deploy Frontend
```bash
cd frontend
npm install
npm run build
amplify publish
```

### 5. Configure Environment Variables
```bash
# Set in Lambda environment
BEDROCK_MODEL_ID=anthropic.claude-3-haiku-20240307-v1:0
DYNAMODB_REGION=us-east-1
POLLY_VOICE_ID=Aditi
```

---

## 📖 Documentation

Comprehensive documentation available in `.kiro/specs/tech-mentor-ai/`:

- **[requirements.md](.kiro/specs/tech-mentor-ai/requirements.md)**: 13 detailed requirements with acceptance criteria
- **[design.md](.kiro/specs/tech-mentor-ai/design.md)**: Complete system architecture with diagrams
- **[tasks.md](.kiro/specs/tech-mentor-ai/tasks.md)**: 5-day implementation plan for hackathon

---

## 🎯 API Endpoints

### Authentication
```
POST /auth/register    - Register new user
POST /auth/login       - Login existing user
```

### Questionnaire
```
POST /questionnaire/start   - Start AI questionnaire
POST /questionnaire/answer  - Submit answers and get path
```

### Roadmaps & Projects
```
GET  /roadmaps              - Get all roadmaps
GET  /roadmaps/{id}         - Get specific roadmap
GET  /projects/{id}         - Get project details
POST /tasks/complete        - Mark task complete (+5 XP)
GET  /progress/{userId}     - Get user progress
```

### AI Mentor
```
POST /mentor/ask            - Ask AI mentor for help
POST /mentor/feedback       - Get feedback on code
```

### Content Generators
```
POST /generate/readme       - Generate GitHub README
POST /generate/linkedin     - Generate LinkedIn post
```

### Skill Booster
```
GET  /booster/quiz          - Get Python quiz
POST /booster/answer        - Submit quiz answer
GET  /booster/flashcards    - Get flashcards
```

### Facts & TTS
```
GET  /facts                 - Get contextual facts
POST /tts/convert           - Convert text to speech
```

---

## 🎮 User Journey

1. **Register**: Simple username-based registration
2. **Questionnaire**: AI asks about experience and interests
3. **Path Assignment**: Assigned to Frontend, Backend, or Full Stack
4. **Roadmap View**: See 3 projects (Beginner → Intermediate → Advanced)
5. **Start Project**: View 5 daily tasks with tech stack
6. **Complete Tasks**: Earn +5 XP per task
7. **AI Mentor**: Ask for hints when stuck (no full code!)
8. **Complete Project**: Earn +25 XP total
9. **Generate README**: AI creates professional GitHub README
10. **Generate LinkedIn Post**: AI creates showcase post
11. **Skill Booster**: Practice Python with quizzes and flashcards
12. **Repeat**: Move to next project and continue learning

---

## 🔒 Security & Guardrails

### AI Guardrails
- **Content Filters**: Block complete code solutions (> 10 lines)
- **Topic Filters**: Allow hints/explanations, block implementations
- **Response Validation**: Reject responses with function/class definitions
- **Regeneration**: Automatically retry with stricter prompts if violations detected

### Security Measures
- **IAM Roles**: Least-privilege access for all services
- **No Direct DB Access**: All access through Lambda
- **HTTPS Only**: Amplify provides automatic SSL
- **Input Validation**: API Gateway validates all requests
- **Encryption**: DynamoDB encrypts data at rest

---

## 📊 Success Metrics

- **User Engagement**: Daily active users completing ≥1 task/day
- **Learning Progression**: Average time per project tier
- **XP Distribution**: Average XP earned per user per week
- **AI Mentor Usage**: Interactions per project
- **Content Generation**: README/LinkedIn posts generated
- **Cost Efficiency**: Actual costs vs $100 budget
- **Accessibility**: % of users enabling TTS

---

## 🌟 Future Enhancements

### Phase 2 (Month 2-3)
- Add 5 more roadmaps (Mobile, DevOps, Data Science, Cloud, Cybersecurity)
- Support 1,000 concurrent users
- Cost: ~$200-300/month

### Phase 3 (Month 4-6)
- Code review AI (analyze user submissions)
- Peer collaboration features
- Video tutorial integration
- Certificate generation

### Phase 4 (Year 2)
- RAG integration for dynamic content
- Custom roadmap generation
- Multi-language support (Hindi, Tamil, Telugu)
- Mobile app (React Native)

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend
cd frontend
npm install
npm run dev
```

---

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 👥 Team

Built with ❤️ for the AI for Bharat initiative

- **Infrastructure**: AWS serverless architecture
- **Backend**: Python Lambda functions
- **Frontend**: React TypeScript
- **AI**: Amazon Bedrock integration

---

## 🙏 Acknowledgments

- **AWS**: For providing serverless infrastructure
- **Anthropic**: For Claude 3 Haiku model
- **AI for Bharat**: For inspiring this project
- **Kiro**: For generating requirements.md, design.md, and tasks.md

---

## 📞 Contact

For questions or feedback:
- GitHub Issues: [Create an issue](https://github.com/yourusername/techmentor-ai/issues)
- Email: your.email@example.com

---

## 🎓 Educational Purpose

This project was built as part of a hackathon submission to demonstrate:
- AWS serverless architecture best practices
- AI integration with guardrails
- Cost-effective cloud solutions
- Scalable learning platforms

**Demo-ready in 5 days | Under $100 AWS credits | 100% Serverless**
