"""
Flashcard Modules for Learning
"""

FLASHCARD_MODULES = {
    "python-fundamentals": {
        "moduleId": "python-fundamentals",
        "moduleName": "Python Fundamentals",
        "totalCards": 12,
        "cards": [
            {
                "id": 1,
                "topicTitle": "What is Python?",
                "contentText": "Python is a high-level, interpreted programming language known for its simple, readable syntax. It's used for web development, AI, automation, data science, and more.",
                "difficultyLevel": "Basic"
            },
            {
                "id": 2,
                "topicTitle": "Variables in Python",
                "contentText": "Variables in Python are dynamically typed - you don't need to declare their type. Example: name = 'Alice' creates a string variable automatically.",
                "difficultyLevel": "Basic"
            },
            {
                "id": 3,
                "topicTitle": "Python Functions",
                "contentText": "Functions are defined using 'def' keyword. They help organize code into reusable blocks. Example: def greet(name): return f'Hello {name}'",
                "difficultyLevel": "Basic"
            },
            {
                "id": 4,
                "topicTitle": "Lists in Python",
                "contentText": "Lists are ordered, mutable collections that can hold items of different types. Created with square brackets: my_list = [1, 2, 'three', 4.0]",
                "difficultyLevel": "Intermediate"
            },
            {
                "id": 5,
                "topicTitle": "Dictionaries",
                "contentText": "Dictionaries store data as key-value pairs. Created with curly braces: person = {'name': 'Alice', 'age': 25}. Access with person['name']",
                "difficultyLevel": "Intermediate"
            },
            {
                "id": 6,
                "topicTitle": "For Loops",
                "contentText": "For loops iterate over sequences. Syntax: for item in sequence: # do something. Example: for i in range(5): print(i) prints 0 to 4",
                "difficultyLevel": "Intermediate"
            },
            {
                "id": 7,
                "topicTitle": "If-Else Statements",
                "contentText": "Conditional statements control program flow. Syntax: if condition: # code elif other: # code else: # code. Python uses indentation for code blocks.",
                "difficultyLevel": "Basic"
            },
            {
                "id": 8,
                "topicTitle": "String Methods",
                "contentText": "Python strings have built-in methods: .upper(), .lower(), .strip(), .split(), .replace(). Example: 'hello'.upper() returns 'HELLO'",
                "difficultyLevel": "Intermediate"
            },
            {
                "id": 9,
                "topicTitle": "List Comprehensions",
                "contentText": "Concise way to create lists: [expression for item in iterable if condition]. Example: squares = [x**2 for x in range(10)] creates [0, 1, 4, 9, 16...]",
                "difficultyLevel": "Advanced"
            },
            {
                "id": 10,
                "topicTitle": "Try-Except Blocks",
                "contentText": "Handle errors gracefully with try-except. Example: try: result = 10/0 except ZeroDivisionError: print('Cannot divide by zero'). Prevents crashes.",
                "difficultyLevel": "Advanced"
            },
            {
                "id": 11,
                "topicTitle": "Classes and Objects",
                "contentText": "Classes are blueprints for objects. Syntax: class Dog: def __init__(self, name): self.name = name. Create objects: my_dog = Dog('Buddy')",
                "difficultyLevel": "Advanced"
            },
            {
                "id": 12,
                "topicTitle": "Modules and Imports",
                "contentText": "Modules are Python files with functions/classes. Import with: import math or from math import sqrt. Helps organize and reuse code across projects.",
                "difficultyLevel": "Intermediate"
            }
        ]
    }
}

def get_flashcard_module(module_id: str):
    """Get flashcard module by ID"""
    return FLASHCARD_MODULES.get(module_id)

def get_all_modules():
    """Get all available modules"""
    return list(FLASHCARD_MODULES.keys())