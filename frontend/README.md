# TechMentor AI - Frontend

A modern, responsive React application for TechMentor AI - your personal learning companion for mastering tech skills through project-based learning.

## 🎨 Design Features

- **Warm and Friendly UI**: Soft colors, rounded elements, smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern Typography**: Inter for body text, Poppins for headings
- **Smooth Interactions**: Thoughtful transitions and hover effects
- **Accessible**: Clear contrast, readable text, intuitive navigation

## 🚀 Tech Stack

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **Framer Motion** - Animation library
- **Vite** - Build tool

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your API Gateway URL
```

## 🛠️ Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

## 🏗️ Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Questionnaire/
│   ├── MentorChat/
│   ├── XPDisplay/
│   ├── Flashcards/
│   ├── READMEGenerator/
│   └── LinkedInGenerator/
├── pages/              # Page components
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── ProjectView.jsx
│   ├── SkillBooster.jsx
│   └── Facts.jsx
├── context/            # React context providers
│   ├── UserContext.jsx
│   └── ProgressContext.jsx
├── services/           # API and auth services
│   ├── apiService.js
│   └── authService.js
├── App.jsx            # Main app with routing
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## 🎯 Key Features

### 1. Intelligent Questionnaire
- Adaptive questions based on user responses
- Determines learning path (Frontend/Backend/Full Stack)
- Smooth animations and progress tracking

### 2. Interactive Dashboard
- Personalized roadmap view
- Project cards with progress tracking
- XP and level display
- Quick access to Skill Booster and Facts

### 3. Project Management
- Daily task breakdown (5 tasks per project)
- Progress tracking with XP rewards
- Floating AI mentor chat
- Completion celebrations

### 4. AI Mentor Chat
- Context-aware guidance
- Hint-based learning (no full solutions)
- Real-time chat interface
- Friendly, supportive tone

### 5. Skill Booster
- Python quiz with explanations
- Text-to-Speech support
- Memory flashcards for revision
- Progress tracking

### 6. Flashcards System
- Sequential learning
- Forward-only progression
- Difficulty levels (Basic/Intermediate/Advanced)
- TTS narration support

### 7. Facts Engine
- Random tech facts
- Curated website recommendations
- Read-aloud feature
- Engaging presentation

### 8. Content Generators
- GitHub README generator
- LinkedIn post generator
- One-click copy and download
- Professional templates

## 🔌 API Integration

The app is set up with placeholder API endpoints. To connect to your AWS backend:

1. Update `VITE_API_URL` in `.env`
2. Ensure API Gateway endpoints match the routes in `apiService.js`
3. Configure CORS on API Gateway
4. Test endpoints individually

### API Endpoints

```javascript
POST /auth/login
GET  /questionnaire
POST /questionnaire/submit
GET  /roadmap/:interest
GET  /project/:projectId
POST /task/complete
POST /mentor/chat
GET  /progress/:userId
POST /skill-booster/evaluate
GET  /flashcards/:moduleId
GET  /facts/random
POST /generate/readme
POST /generate/linkedin
POST /tts/generate
```

## 🎨 Customization

### Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --primary: #FF6B6B;
  --secondary: #4ECDC4;
  --accent: #FFD93D;
  /* ... */
}
```

### Fonts

Change fonts in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont" rel="stylesheet">
```

## 🚀 Deployment

### AWS Amplify

1. Push code to GitHub
2. Connect repository to AWS Amplify
3. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
   ```
4. Add environment variables in Amplify Console
5. Deploy!

### Manual Deployment

```bash
# Build
npm run build

# Deploy dist/ folder to your hosting service
```

## 📝 Notes

- LocalStorage is used for demo purposes (user data, progress)
- In production, sync with backend API
- All API calls have error handling with fallbacks
- TTS integration points are marked with comments
- Mentor chat uses placeholder responses until backend is connected

## 🤝 Contributing

This is a hackathon project. For the full stack:
- Frontend: This repository
- Backend: Python + AWS Lambda
- Infrastructure: DynamoDB, API Gateway, Bedrock, Polly

## 📄 License

MIT License - Built for AWS Cloud Hackathon

---

Built with ❤️ using React, AWS, and lots of ☕
