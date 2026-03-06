"""
Roadmap Data for All Learning Paths
"""

ROADMAPS_DATA = {
    "frontend": {
        "id": "frontend",
        "name": "Frontend Development",
        "description": "Master modern web development with HTML, CSS, JavaScript, and React",
        "stages": [
            {
                "id": 1,
                "name": "Internet Basics",
                "description": "How the web works: HTTP, DNS, browsers",
                "topics": ["HTTP/HTTPS", "DNS", "Browsers", "Web Hosting"]
            },
            {
                "id": 2,
                "name": "HTML",
                "description": "Structure of web pages with semantic HTML5",
                "topics": ["HTML5 Elements", "Forms", "Semantic HTML", "Accessibility"]
            },
            {
                "id": 3,
                "name": "CSS",
                "description": "Styling and layout with modern CSS",
                "topics": ["Box Model", "Flexbox", "Grid", "Responsive Design", "Animations"]
            },
            {
                "id": 4,
                "name": "JavaScript",
                "description": "Programming for the web with modern JavaScript",
                "topics": ["ES6+", "DOM Manipulation", "Events", "Async/Await", "Fetch API"]
            },
            {
                "id": 5,
                "name": "Git & GitHub",
                "description": "Version control and collaboration",
                "topics": ["Git Basics", "Branching", "Pull Requests", "GitHub Pages"]
            },
            {
                "id": 6,
                "name": "React Basics",
                "description": "Modern UI library for building interfaces",
                "topics": ["Components", "Props", "State", "Hooks", "React Router"]
            }
        ],
        "projects": ["fe_1", "fe_2", "fe_3"]
    },
    
    "backend": {
        "id": "backend",
        "name": "Backend Development",
        "description": "Build scalable server-side applications and APIs",
        "stages": [
            {
                "id": 1,
                "name": "Internet Basics",
                "description": "How servers work, protocols, and networks",
                "topics": ["HTTP/HTTPS", "REST", "TCP/IP", "DNS"]
            },
            {
                "id": 2,
                "name": "Programming Fundamentals",
                "description": "Python or Node.js basics for backend",
                "topics": ["Variables", "Functions", "OOP", "Error Handling"]
            },
            {
                "id": 3,
                "name": "Databases",
                "description": "SQL and NoSQL database fundamentals",
                "topics": ["SQL Basics", "PostgreSQL", "MongoDB", "Database Design"]
            },
            {
                "id": 4,
                "name": "APIs",
                "description": "RESTful API design and implementation",
                "topics": ["REST Principles", "HTTP Methods", "Status Codes", "API Documentation"]
            },
            {
                "id": 5,
                "name": "Authentication",
                "description": "User authentication and security",
                "topics": ["JWT", "Password Hashing", "OAuth", "Session Management"]
            },
            {
                "id": 6,
                "name": "Deployment",
                "description": "Hosting and cloud deployment",
                "topics": ["Cloud Platforms", "CI/CD", "Environment Variables", "Monitoring"]
            }
        ],
        "projects": ["be_1", "be_2", "be_3"]
    },
    
    "fullstack": {
        "id": "fullstack",
        "name": "Full Stack Development",
        "description": "Complete web development: frontend + backend + databases",
        "stages": [
            {
                "id": 1,
                "name": "Web Fundamentals",
                "description": "HTML, CSS, and JavaScript foundations",
                "topics": ["HTML5", "CSS3", "JavaScript ES6+", "Responsive Design"]
            },
            {
                "id": 2,
                "name": "Frontend Framework",
                "description": "React for building modern UIs",
                "topics": ["React Basics", "State Management", "React Router", "Hooks"]
            },
            {
                "id": 3,
                "name": "Backend Basics",
                "description": "Node.js and Express for server-side",
                "topics": ["Node.js", "Express", "REST APIs", "Middleware"]
            },
            {
                "id": 4,
                "name": "Databases",
                "description": "Working with MongoDB and PostgreSQL",
                "topics": ["MongoDB", "PostgreSQL", "ORMs", "Database Design"]
            },
            {
                "id": 5,
                "name": "API Integration",
                "description": "Connecting frontend to backend",
                "topics": ["Axios", "Fetch API", "CORS", "Authentication"]
            },
            {
                "id": 6,
                "name": "Deployment",
                "description": "Deploying full stack applications",
                "topics": ["Vercel", "Heroku", "AWS", "Environment Config"]
            }
        ],
        "projects": ["fs_1", "fs_2", "fs_3"]
    }
}

def get_roadmap_by_interest(interest: str):
    """Get roadmap by interest"""
    return ROADMAPS_DATA.get(interest)

def get_all_roadmaps():
    """Get all roadmaps"""
    return list(ROADMAPS_DATA.values())