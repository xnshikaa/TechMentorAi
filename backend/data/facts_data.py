"""
Tech Facts and Website Recommendations
"""
import random

FACTS = [
    "The first computer bug was an actual bug – a moth trapped in a Harvard Mark II computer in 1947.",
    "Python was named after the British comedy series 'Monty Python's Flying Circus', not the snake.",
    "The first domain ever registered was Symbolics.com on March 15, 1985.",
    "There are over 700 programming languages in existence today.",
    "The @ symbol in email addresses was chosen by Ray Tomlinson in 1971.",
    "JavaScript was created in just 10 days by Brendan Eich in 1995.",
    "The term 'algorithm' comes from the name of Persian mathematician Al-Khwarizmi.",
    "The first YouTube video was uploaded on April 23, 2005, titled 'Me at the zoo'.",
    "Google was originally called 'Backrub' when first created in 1996.",
    "The QWERTY keyboard was designed to slow down typing to prevent typewriter jams.",
    "The first Apple computer, Apple I, was sold for $666.66 in 1976.",
    "Over 90% of the world's currency exists only on computers.",
    "The first webcam was created to monitor a coffee pot at Cambridge University.",
    "Linux was created by Linus Torvalds when he was just 21 years old.",
    "The first computer mouse was made of wood and had only one button.",
    "WiFi doesn't stand for anything – it's just a catchy name inspired by 'Hi-Fi'.",
    "The word 'robot' comes from the Czech word 'robota', meaning forced labor.",
    "Email existed before the World Wide Web was invented.",
    "The first-ever computer game was created in 1962 and was called Spacewar!",
    "A single Google search uses about 1000 computers in less than 0.2 seconds."
]

WEBSITES = [
    {
        "name": "MDN Web Docs",
        "url": "developer.mozilla.org",
        "description": "Comprehensive web development documentation. Best resource for HTML, CSS, and JavaScript."
    },
    {
        "name": "Stack Overflow",
        "url": "stackoverflow.com",
        "description": "Largest Q&A community for programmers. Find solutions to coding problems."
    },
    {
        "name": "GitHub",
        "url": "github.com",
        "description": "World's largest code hosting platform. Explore open-source projects."
    },
    {
        "name": "freeCodeCamp",
        "url": "freecodecamp.org",
        "description": "Learn to code for free with interactive lessons and projects."
    },
    {
        "name": "CSS-Tricks",
        "url": "css-tricks.com",
        "description": "Daily articles about CSS, HTML, JavaScript, and web design."
    },
    {
        "name": "Dev.to",
        "url": "dev.to",
        "description": "Community of developers sharing articles and insights."
    },
    {
        "name": "Codecademy",
        "url": "codecademy.com",
        "description": "Interactive platform to learn coding through practice."
    },
    {
        "name": "LeetCode",
        "url": "leetcode.com",
        "description": "Practice coding problems and prepare for interviews."
    },
    {
        "name": "Can I Use",
        "url": "caniuse.com",
        "description": "Check browser support for web technologies."
    },
    {
        "name": "JavaScript.info",
        "url": "javascript.info",
        "description": "Modern JavaScript tutorial with clear examples."
    }
]

def get_random_fact():
    """Get random tech fact"""
    return random.choice(FACTS)

def get_random_website():
    """Get random website recommendation"""
    return random.choice(WEBSITES)