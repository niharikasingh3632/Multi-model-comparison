# from fastapi import FastAPI
# from pydantic import BaseModel
# import requests
# import os
# from dotenv import load_dotenv
# from fastapi.middleware.cors import CORSMiddleware

# # Load environment variables
# load_dotenv()

# # Read the API key from the environment
# GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# # Initialize FastAPI app
# app = FastAPI()

# # Add CORS middleware to allow frontend (React) requests
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Allow all origins for development; change in production
#     allow_credentials=True,
#     allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
#     allow_headers=["*"],  # Allow all headers
# )

# # Define the request schema for prompt and models
# class PromptRequest(BaseModel):
#     prompt: str
#     models: list[str]  # List of model names

# # Define the POST endpoint to receive prompt and models
# @app.post("/ask")
# def call_multiple_models(request: PromptRequest):
#     headers = {
#         "Authorization": f"Bearer {GROQ_API_KEY}",
#         "Content-Type": "application/json"
#     }

#     responses = []

#     # Loop through selected models and get responses
#     for model in request.models:
#         data = {
#             "messages": [
#                 {"role": "user", "content": request.prompt}
#             ],
#             "model": model
#         }
#         try:
#             response = requests.post(
#                 "https://api.groq.com/openai/v1/chat/completions",  # Update to the correct API URL
#                 headers=headers,
#                 json=data,
#                 timeout=60  # Add timeout for safety
#             )
#             result = response.json()
#             output = result['choices'][0]['message']['content']
#         except Exception as e:
#             output = f" Error calling model: {str(e)}"
        
#         responses.append({
#             "model": model,
#             "response": output
#         })

#     return {
#         "prompt": request.prompt,
#         "responses": responses
#     }
