"""
COMPLETE Projects Data - All 9 Projects Working
3 Frontend + 3 Backend + 3 Full Stack = 9 Total
Each with 10 days of tasks
"""

PROJECTS_DATA = {
    # ============= FRONTEND PROJECTS =============
    
    "fe_1": {
        "id": "fe_1",
        "name": "Personal Portfolio Website",
        "level": "beginner",
        "roadmap": "frontend",
        "description": "Build a stunning portfolio website to showcase your projects and skills",
        "techStack": ["HTML5", "CSS3", "JavaScript", "Git", "GitHub Pages"],
        "expectedOutcome": "A fully responsive, professional portfolio website deployed online",
        "duration": "10 days",
        "learningObjectives": [
            "Master semantic HTML5 structure",
            "Advanced CSS layouts with Flexbox and Grid",
            "Vanilla JavaScript DOM manipulation",
            "Responsive design principles"
        ],
        "dailyTasks": [
            {
                "id": 1,
                "day": 1,
                "title": "Project Planning & Setup",
                "description": "Plan portfolio structure, set up development environment, initialize Git",
                "estimatedTime": "2-3 hours",
                "hints": [
                    "Sketch wireframe on paper first",
                    "Create folders: css/, js/, images/",
                    "Initialize Git repository",
                    "Create index.html with HTML5 boilerplate"
                ]
            },
            {
                "id": 2,
                "day": 2,
                "title": "HTML Structure - Header & Hero",
                "description": "Build header with navigation and hero section",
                "estimatedTime": "3-4 hours",
                "hints": [
                    "Use semantic HTML: <header>, <nav>, <section>",
                    "Create sticky navigation bar",
                    "Add your name, title, tagline"
                ]
            },
            {
                "id": 3,
                "day": 3,
                "title": "HTML Structure - About & Skills",
                "description": "Create About section and Skills showcase",
                "estimatedTime": "2-3 hours",
                "hints": [
                    "Write 2-3 paragraph bio",
                    "List technical skills",
                    "Add professional photo"
                ]
            },
            {
                "id": 4,
                "day": 4,
                "title": "HTML Structure - Projects & Contact",
                "description": "Build projects showcase and contact form",
                "estimatedTime": "3-4 hours",
                "hints": [
                    "Create project cards",
                    "Add contact form",
                    "Include social media links"
                ]
            },
            {
                "id": 5,
                "day": 5,
                "title": "CSS Styling - Base & Typography",
                "description": "Set up CSS variables, reset styles, typography",
                "estimatedTime": "3-4 hours",
                "hints": [
                    "Use CSS custom properties",
                    "Choose 2-3 fonts from Google Fonts",
                    "Define color palette"
                ]
            },
            {
                "id": 6,
                "day": 6,
                "title": "CSS Styling - Layout & Components",
                "description": "Style all components with modern design",
                "estimatedTime": "4-5 hours",
                "hints": [
                    "Use Flexbox for navigation",
                    "Add hover effects",
                    "Style buttons with transitions"
                ]
            },
            {
                "id": 7,
                "day": 7,
                "title": "Responsive Design",
                "description": "Make portfolio responsive for all devices",
                "estimatedTime": "4-5 hours",
                "hints": [
                    "Mobile-first approach",
                    "Use media queries",
                    "Test on multiple screen sizes"
                ]
            },
            {
                "id": 8,
                "day": 8,
                "title": "JavaScript Interactivity",
                "description": "Add smooth scrolling, menu toggle, animations",
                "estimatedTime": "3-4 hours",
                "hints": [
                    "Smooth scroll for navigation",
                    "Mobile menu toggle",
                    "Form validation"
                ]
            },
            {
                "id": 9,
                "day": 9,
                "title": "Testing & Optimization",
                "description": "Test across browsers, optimize performance",
                "estimatedTime": "3-4 hours",
                "hints": [
                    "Test on Chrome, Firefox, Safari",
                    "Compress images",
                    "Run Lighthouse audit"
                ]
            },
            {
                "id": 10,
                "day": 10,
                "title": "Deployment",
                "description": "Deploy to GitHub Pages and celebrate!",
                "estimatedTime": "2-3 hours",
                "hints": [
                    "Push to GitHub",
                    "Enable GitHub Pages",
                    "Write README"
                ]
            }
        ]
    },
    
    "fe_2": {
        "id": "fe_2",
        "name": "Interactive Todo Application",
        "level": "intermediate",
        "roadmap": "frontend",
        "description": "Create a feature-rich todo app with local storage and filters",
        "techStack": ["HTML5", "CSS3", "JavaScript ES6+", "Local Storage API"],
        "expectedOutcome": "A fully functional todo app with CRUD operations and persistence",
        "duration": "10 days",
        "learningObjectives": [
            "Advanced JavaScript ES6+ features",
            "Browser Local Storage API",
            "State management patterns",
            "CSS animations and transitions"
        ],
        "dailyTasks": [
            {"id": 1, "day": 1, "title": "Project Architecture", "description": "Plan app structure and data model", "estimatedTime": "2-3 hours", "hints": ["Design todo object structure", "Plan state management"]},
            {"id": 2, "day": 2, "title": "UI Design & HTML", "description": "Create complete UI layout", "estimatedTime": "3-4 hours", "hints": ["Input field with add button", "Todo list container"]},
            {"id": 3, "day": 3, "title": "CSS Styling", "description": "Style with modern design and animations", "estimatedTime": "4-5 hours", "hints": ["Use CSS Grid or Flexbox", "Add transition effects"]},
            {"id": 4, "day": 4, "title": "Add & Display Todos", "description": "Implement adding and displaying todos", "estimatedTime": "3-4 hours", "hints": ["Create Todo class", "Handle form submission"]},
            {"id": 5, "day": 5, "title": "Delete & Edit", "description": "Add delete and edit functionality", "estimatedTime": "4-5 hours", "hints": ["Event listeners for delete", "Inline editing mode"]},
            {"id": 6, "day": 6, "title": "Toggle & Filters", "description": "Checkbox and filtering system", "estimatedTime": "3-4 hours", "hints": ["Toggle completed state", "Filter logic"]},
            {"id": 7, "day": 7, "title": "Local Storage", "description": "Persist todos to browser storage", "estimatedTime": "3-4 hours", "hints": ["Save on every change", "Load on page load"]},
            {"id": 8, "day": 8, "title": "Advanced Features", "description": "Priority levels, due dates, search", "estimatedTime": "4-5 hours", "hints": ["Add priority dropdown", "Date picker"]},
            {"id": 9, "day": 9, "title": "Polish & Animations", "description": "Micro-interactions and smooth transitions", "estimatedTime": "3-4 hours", "hints": ["Fade-in animations", "Toast notifications"]},
            {"id": 10, "day": 10, "title": "Deploy & Document", "description": "Test, document, deploy", "estimatedTime": "2-3 hours", "hints": ["Test all features", "Write README"]}
        ]
    },
    
    "fe_3": {
        "id": "fe_3",
        "name": "Weather Dashboard with API",
        "level": "advanced",
        "roadmap": "frontend",
        "description": "Build weather dashboard using real-time API data with forecasts",
        "techStack": ["HTML5", "CSS3", "JavaScript ES6+", "Fetch API", "OpenWeatherMap API", "Chart.js"],
        "expectedOutcome": "A production-ready weather app with live data and charts",
        "duration": "10 days",
        "learningObjectives": [
            "REST API integration",
            "Async/await and promises",
            "Data visualization with charts",
            "Geolocation API usage"
        ],
        "dailyTasks": [
            {"id": 1, "day": 1, "title": "API Setup & Planning", "description": "Get OpenWeatherMap API key, plan architecture", "estimatedTime": "2-3 hours", "hints": ["Create account", "Test API with Postman"]},
            {"id": 2, "day": 2, "title": "HTML Structure", "description": "Build dashboard layout", "estimatedTime": "3-4 hours", "hints": ["Search bar", "Weather display sections"]},
            {"id": 3, "day": 3, "title": "CSS Styling", "description": "Beautiful UI with glassmorphism", "estimatedTime": "4-5 hours", "hints": ["Dynamic backgrounds", "Glassmorphism effects"]},
            {"id": 4, "day": 4, "title": "Fetch Current Weather", "description": "API call for current weather", "estimatedTime": "3-4 hours", "hints": ["Use fetch with async/await", "Display data"]},
            {"id": 5, "day": 5, "title": "Error Handling", "description": "Search functionality and error handling", "estimatedTime": "3-4 hours", "hints": ["Validate city input", "Handle 404 errors"]},
            {"id": 6, "day": 6, "title": "5-Day Forecast", "description": "Display weather forecast", "estimatedTime": "4-5 hours", "hints": ["Use forecast endpoint", "Parse data by day"]},
            {"id": 7, "day": 7, "title": "Geolocation", "description": "Current location and saved cities", "estimatedTime": "3-4 hours", "hints": ["Geolocation API", "LocalStorage for favorites"]},
            {"id": 8, "day": 8, "title": "Charts", "description": "Add temperature charts with Chart.js", "estimatedTime": "4-5 hours", "hints": ["Install Chart.js", "Line chart for temperature"]},
            {"id": 9, "day": 9, "title": "Advanced Features", "description": "Weather alerts, animations, unit toggle", "estimatedTime": "4-5 hours", "hints": ["Celsius/Fahrenheit toggle", "Auto-refresh"]},
            {"id": 10, "day": 10, "title": "Deploy & Optimize", "description": "Test, optimize, deploy", "estimatedTime": "3-4 hours", "hints": ["Test edge cases", "Deploy to Netlify"]}
        ]
    },
    
    # ============= BACKEND PROJECTS =============
    
    "be_1": {
        "id": "be_1",
        "name": "RESTful Task Management API",
        "level": "beginner",
        "roadmap": "backend",
        "description": "Build complete REST API with CRUD operations and documentation",
        "techStack": ["Python", "Flask/FastAPI", "SQLite", "Swagger"],
        "expectedOutcome": "A production-ready REST API with proper error handling",
        "duration": "10 days",
        "learningObjectives": [
            "REST API design principles",
            "HTTP methods and status codes",
            "Database integration",
            "API documentation"
        ],
        "dailyTasks": [
            {"id": 1, "day": 1, "title": "Environment Setup", "description": "Setup Python environment and project structure", "estimatedTime": "2-3 hours", "hints": ["Create virtual environment", "Install Flask/FastAPI"]},
            {"id": 2, "day": 2, "title": "Database Design", "description": "Design schema and setup SQLAlchemy", "estimatedTime": "3-4 hours", "hints": ["Design Task model", "Setup database"]},
            {"id": 3, "day": 3, "title": "Create & Read", "description": "POST and GET endpoints", "estimatedTime": "3-4 hours", "hints": ["POST /api/tasks", "GET /api/tasks"]},
            {"id": 4, "day": 4, "title": "Update & Delete", "description": "PUT/PATCH and DELETE endpoints", "estimatedTime": "3-4 hours", "hints": ["PUT /api/tasks/:id", "Handle 404 errors"]},
            {"id": 5, "day": 5, "title": "Query Parameters", "description": "Filtering, sorting, pagination", "estimatedTime": "3-4 hours", "hints": ["Add query params", "Implement pagination"]},
            {"id": 6, "day": 6, "title": "Validation", "description": "Input validation and error handling", "estimatedTime": "3-4 hours", "hints": ["Use Pydantic", "Validate required fields"]},
            {"id": 7, "day": 7, "title": "API Documentation", "description": "Add Swagger/OpenAPI docs", "estimatedTime": "2-3 hours", "hints": ["FastAPI has built-in Swagger", "Document endpoints"]},
            {"id": 8, "day": 8, "title": "Testing", "description": "Write tests with pytest", "estimatedTime": "4-5 hours", "hints": ["Install pytest", "Test all endpoints"]},
            {"id": 9, "day": 9, "title": "Security", "description": "CORS, environment variables, security", "estimatedTime": "3-4 hours", "hints": ["Enable CORS", "Add rate limiting"]},
            {"id": 10, "day": 10, "title": "Deploy", "description": "Deploy API to cloud", "estimatedTime": "3-4 hours", "hints": ["Deploy to Heroku", "Write README"]}
        ]
    },
    
    "be_2": {
        "id": "be_2",
        "name": "User Authentication System with JWT",
        "level": "intermediate",
        "roadmap": "backend",
        "description": "Build secure authentication system with JWT and refresh tokens",
        "techStack": ["Python", "FastAPI", "PostgreSQL", "JWT", "bcrypt", "Redis"],
        "expectedOutcome": "Production-grade authentication system with role-based access",
        "duration": "10 days",
        "learningObjectives": [
            "User authentication and authorization",
            "JWT token generation and validation",
            "Password hashing with bcrypt",
            "Refresh token mechanism"
        ],
        "dailyTasks": [
            {"id": 1, "day": 1, "title": "Project Setup", "description": "Setup PostgreSQL and project", "estimatedTime": "3-4 hours", "hints": ["Install FastAPI", "Setup PostgreSQL"]},
            {"id": 2, "day": 2, "title": "User Model", "description": "Create User model with password hashing", "estimatedTime": "3-4 hours", "hints": ["Use bcrypt", "Create hash_password function"]},
            {"id": 3, "day": 3, "title": "Registration", "description": "User registration endpoint", "estimatedTime": "3-4 hours", "hints": ["POST /register", "Validate email"]},
            {"id": 4, "day": 4, "title": "JWT Generation", "description": "Access and refresh token generation", "estimatedTime": "4-5 hours", "hints": ["Install python-jose", "Create tokens"]},
            {"id": 5, "day": 5, "title": "Login", "description": "Login endpoint and token validation", "estimatedTime": "4-5 hours", "hints": ["POST /login", "Verify credentials"]},
            {"id": 6, "day": 6, "title": "Refresh Tokens", "description": "Token refresh with Redis", "estimatedTime": "4-5 hours", "hints": ["Install Redis", "Store refresh tokens"]},
            {"id": 7, "day": 7, "title": "Protected Routes", "description": "Role-based access control", "estimatedTime": "3-4 hours", "hints": ["Create @require_auth", "Check roles"]},
            {"id": 8, "day": 8, "title": "Password Reset", "description": "Logout and password reset", "estimatedTime": "4-5 hours", "hints": ["POST /logout", "Generate reset tokens"]},
            {"id": 9, "day": 9, "title": "Security & Testing", "description": "Rate limiting and tests", "estimatedTime": "4-5 hours", "hints": ["Add rate limiting", "Write tests"]},
            {"id": 10, "day": 10, "title": "Deploy", "description": "Production deployment", "estimatedTime": "3-4 hours", "hints": ["Deploy to cloud", "Secure environment"]}
        ]
    },
    
    "be_3": {
        "id": "be_3",
        "name": "Blog API with PostgreSQL",
        "level": "advanced",
        "roadmap": "backend",
        "description": "Feature-rich blog API with posts, comments, likes, and search",
        "techStack": ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Elasticsearch"],
        "expectedOutcome": "Scalable blog platform API with advanced features",
        "duration": "10 days",
        "learningObjectives": [
            "Complex database relationships",
            "Full-text search implementation",
            "File upload handling",
            "Query optimization"
        ],
        "dailyTasks": [
            {"id": 1, "day": 1, "title": "Database Design", "description": "Design complete schema with relationships", "estimatedTime": "4-5 hours", "hints": ["Design tables", "Create ER diagram"]},
            {"id": 2, "day": 2, "title": "Models", "description": "SQLAlchemy models with relationships", "estimatedTime": "4-5 hours", "hints": ["Define relationships", "Add timestamps"]},
            {"id": 3, "day": 3, "title": "Post CRUD", "description": "Complete post endpoints", "estimatedTime": "4-5 hours", "hints": ["POST /posts", "GET with pagination"]},
            {"id": 4, "day": 4, "title": "Comments", "description": "Nested comments system", "estimatedTime": "4-5 hours", "hints": ["POST comments", "Support threading"]},
            {"id": 5, "day": 5, "title": "Likes", "description": "Like/unlike functionality", "estimatedTime": "3-4 hours", "hints": ["POST like", "Prevent duplicates"]},
            {"id": 6, "day": 6, "title": "Tags", "description": "Tagging system and filters", "estimatedTime": "3-4 hours", "hints": ["Many-to-many relationship", "Filter by tags"]},
            {"id": 7, "day": 7, "title": "Search", "description": "Full-text search with Elasticsearch", "estimatedTime": "5-6 hours", "hints": ["Setup Elasticsearch", "Index posts"]},
            {"id": 8, "day": 8, "title": "File Uploads", "description": "Image upload with S3", "estimatedTime": "4-5 hours", "hints": ["Setup S3", "Upload images"]},
            {"id": 9, "day": 9, "title": "Optimization", "description": "Caching and query optimization", "estimatedTime": "4-5 hours", "hints": ["Setup Redis", "Optimize queries"]},
            {"id": 10, "day": 10, "title": "Deploy", "description": "Test, document, deploy", "estimatedTime": "5-6 hours", "hints": ["Write tests", "Deploy to AWS"]}
        ]
    },
    
    # ============= FULL STACK PROJECTS =============
    
    "fs_1": {
        "id": "fs_1",
        "name": "Task Manager Full Stack App",
        "level": "beginner",
        "roadmap": "fullstack",
        "description": "Complete task manager with React frontend and Node.js backend",
        "techStack": ["React", "Node.js", "Express", "MongoDB", "JWT"],
        "expectedOutcome": "Fully functional task manager with authentication",
        "duration": "10 days",
        "learningObjectives": [
            "Full stack application architecture",
            "Frontend-Backend communication",
            "User authentication flow",
            "State management in React"
        ],
        "dailyTasks": [
            {"id": 1, "day": 1, "title": "Project Setup", "description": "Setup React and Node.js projects", "estimatedTime": "3-4 hours", "hints": ["Create React app", "Setup Express"]},
            {"id": 2, "day": 2, "title": "Backend Database", "description": "MongoDB setup and models", "estimatedTime": "3-4 hours", "hints": ["Connect MongoDB", "Create models"]},
            {"id": 3, "day": 3, "title": "Authentication API", "description": "Register, login, JWT", "estimatedTime": "4-5 hours", "hints": ["POST /auth/register", "Generate JWT"]},
            {"id": 4, "day": 4, "title": "Tasks API", "description": "CRUD API for tasks", "estimatedTime": "4-5 hours", "hints": ["POST /api/tasks", "Associate with user"]},
            {"id": 5, "day": 5, "title": "Frontend UI", "description": "React components and routing", "estimatedTime": "4-5 hours", "hints": ["Create components", "Setup React Router"]},
            {"id": 6, "day": 6, "title": "Auth Flow", "description": "Login/register forms", "estimatedTime": "4-5 hours", "hints": ["Create AuthContext", "Build forms"]},
            {"id": 7, "day": 7, "title": "Task Management UI", "description": "Task list and CRUD operations", "estimatedTime": "5-6 hours", "hints": ["Display tasks", "Add task creation"]},
            {"id": 8, "day": 8, "title": "State Management", "description": "React Query/SWR integration", "estimatedTime": "4-5 hours", "hints": ["Install React Query", "Data caching"]},
            {"id": 9, "day": 9, "title": "Integration", "description": "Connect frontend to backend", "estimatedTime": "4-5 hours", "hints": ["Test auth flow", "Test CRUD"]},
            {"id": 10, "day": 10, "title": "Deploy", "description": "Deploy both frontend and backend", "estimatedTime": "4-5 hours", "hints": ["Deploy backend", "Deploy frontend"]}
        ]
    },
    
    "fs_2": {
        "id": "fs_2",
        "name": "Social Media Dashboard",
        "level": "intermediate",
        "roadmap": "fullstack",
        "description": "Social platform with posts, comments, likes, and real-time notifications",
        "techStack": ["React", "Node.js", "PostgreSQL", "Socket.io", "Redux"],
        "expectedOutcome": "Feature-rich social platform with real-time updates",
        "duration": "10 days",
        "learningObjectives": [
            "Real-time communication with WebSockets",
            "Complex state management",
            "File upload and storage",
            "SQL database relationships"
        ],
        "dailyTasks": [
            {"id": 1, "day": 1, "title": "Architecture", "description": "Plan and setup monorepo", "estimatedTime": "4-5 hours", "hints": ["Design architecture", "Setup projects"]},
            {"id": 2, "day": 2, "title": "Database Schema", "description": "Complete schema with relationships", "estimatedTime": "4-5 hours", "hints": ["Design tables", "Define relationships"]},
            {"id": 3, "day": 3, "title": "Auth System", "description": "Complete authentication", "estimatedTime": "4-5 hours", "hints": ["JWT auth", "User profiles"]},
            {"id": 4, "day": 4, "title": "Posts API", "description": "Posts with image upload", "estimatedTime": "5-6 hours", "hints": ["POST /posts", "Image upload"]},
            {"id": 5, "day": 5, "title": "Comments & Likes", "description": "Comments and likes system", "estimatedTime": "4-5 hours", "hints": ["POST comments", "Toggle likes"]},
            {"id": 6, "day": 6, "title": "Real-time", "description": "Socket.io for notifications", "estimatedTime": "5-6 hours", "hints": ["Setup Socket.io", "Emit events"]},
            {"id": 7, "day": 7, "title": "Frontend UI", "description": "React components with Redux", "estimatedTime": "5-6 hours", "hints": ["Setup Redux", "Create components"]},
            {"id": 8, "day": 8, "title": "Feed & Posts", "description": "Post feed and interactions", "estimatedTime": "5-6 hours", "hints": ["Infinite scroll", "Like animations"]},
            {"id": 9, "day": 9, "title": "Notifications", "description": "Real-time notification system", "estimatedTime": "4-5 hours", "hints": ["Connect Socket.io", "Show notifications"]},
            {"id": 10, "day": 10, "title": "Deploy", "description": "Test, optimize, deploy", "estimatedTime": "5-6 hours", "hints": ["Test features", "Deploy both apps"]}
        ]
    },
    
    "fs_3": {
        "id": "fs_3",
        "name": "E-commerce Platform",
        "level": "advanced",
        "roadmap": "fullstack",
        "description": "Complete e-commerce with cart, checkout, Stripe payments, admin panel",
        "techStack": ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis", "Docker"],
        "expectedOutcome": "Production-ready e-commerce platform with payment processing",
        "duration": "10 days",
        "learningObjectives": [
            "E-commerce architecture patterns",
            "Payment gateway integration",
            "Shopping cart implementation",
            "Order management system"
        ],
        "dailyTasks": [
            {"id": 1, "day": 1, "title": "System Design", "description": "Design architecture, setup Next.js", "estimatedTime": "5-6 hours", "hints": ["Design schema", "Setup Next.js"]},
            {"id": 2, "day": 2, "title": "Database Models", "description": "Complete e-commerce schema", "estimatedTime": "4-5 hours", "hints": ["Products, Orders, Cart", "Relationships"]},
            {"id": 3, "day": 3, "title": "Product API", "description": "Product catalog with search", "estimatedTime": "5-6 hours", "hints": ["CRUD products", "Search functionality"]},
            {"id": 4, "day": 4, "title": "Shopping Cart", "description": "Cart with Redis", "estimatedTime": "4-5 hours", "hints": ["POST /cart", "Redis storage"]},
            {"id": 5, "day": 5, "title": "Checkout", "description": "Checkout flow and orders", "estimatedTime": "5-6 hours", "hints": ["Validate cart", "Create order"]},
            {"id": 6, "day": 6, "title": "Stripe", "description": "Payment processing", "estimatedTime": "5-6 hours", "hints": ["Setup Stripe", "Payment intent"]},
            {"id": 7, "day": 7, "title": "Frontend - Products", "description": "Product pages and cart UI", "estimatedTime": "6-7 hours", "hints": ["Product grid", "Cart page"]},
            {"id": 8, "day": 8, "title": "Frontend - Checkout", "description": "Checkout and payment UI", "estimatedTime": "5-6 hours", "hints": ["Checkout steps", "Stripe Elements"]},
            {"id": 9, "day": 9, "title": "Admin Dashboard", "description": "Admin panel", "estimatedTime": "6-7 hours", "hints": ["Dashboard metrics", "Manage products"]},
            {"id": 10, "day": 10, "title": "Deploy", "description": "Test, optimize, deploy", "estimatedTime": "6-7 hours", "hints": ["Docker setup", "Deploy to cloud"]}
        ]
    }
}

def get_project_by_id(project_id: str):
    """Get project by ID"""
    project = PROJECTS_DATA.get(project_id)
    if not project:
        return None
    return project

def get_projects_by_roadmap(roadmap: str):
    """Get all projects for a roadmap"""
    projects = [p for p in PROJECTS_DATA.values() if p.get('roadmap') == roadmap]
    return projects

def get_all_projects():
    """Get all 9 projects"""
    return list(PROJECTS_DATA.values())