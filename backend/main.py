

from fastapi import FastAPI
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

# Read the API key from the environment
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware to allow frontend (React) requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development; change in production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Define the request schema for prompt and models
class PromptRequest(BaseModel):
    prompt: str
    models: list[str]  # List of model names

# Define a function to ask the model to generate a rating for a specific response
def get_model_rating_for_response(prompt: str, model: str, response: str):
    # Construct the prompt to rate a specific response
    ratings_request = f"Please rate the following response on a scale of 1 to 10 based on how well it answers the prompt. your response should be in 50 words. In the end just mention [rating: ] for this prompt : '{prompt}'\n"
    ratings_request += f"Response: {response}\n"
    ratings_request += f"Rating for this response:"

    # Ask the model to rate the response from another model
    data = {
        "messages": [{"role": "user", "content": ratings_request}],
        "model": model
    }
    
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",  # Update to the correct API URL
            headers=headers,
            json=data,
            timeout=60
        )
        result = response.json()
        rating = result['choices'][0]['message']['content']
        return rating
    except Exception as e:
        return f"Error calling model: {str(e)}"

# Define the POST endpoint to receive prompt and models
@app.post("/ask")
def call_multiple_models(request: PromptRequest):
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    responses = {}

    # Step 1: Get responses from models
    for model in request.models:
        data = {
            "messages": [{"role": "user", "content": request.prompt}],
            "model": model
        }
        try:
            response = requests.post(
                "https://api.groq.com/openai/v1/chat/completions",  # Update to the correct API URL
                headers=headers,
                json=data,
                timeout=60  # Add timeout for safety
            )
            result = response.json()
            output = result['choices'][0]['message']['content']
        except Exception as e:
            output = f"Error calling model: {str(e)}"
        
        responses[model] = output

    # Step 2: Ask each model to rate responses from all models (including its own)
    ratings = {model: {} for model in request.models}

    for model in request.models:
        for other_model in request.models:
            # Get rating for the response from any model (including its own)
            rating = get_model_rating_for_response(request.prompt, model, responses[other_model])
            ratings[model][other_model] = rating

    # Step 3: Return the responses and the ratings
    return {
        "prompt": request.prompt,
        "responses": responses,
        "ratings": ratings
    }
