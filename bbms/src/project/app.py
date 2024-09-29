from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import openai

# Supabase and OpenAI Configuration
SUPABASE_URL = "https://avxrbyaafllnozptwvaj.supabase.co"
SUPABASE_KEY =   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2eHJieWFhZmxsbm96cHR3dmFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwNDA0OTcsImV4cCI6MjA0MDYxNjQ5N30.K4Zj69JWwzU_jFhoWTulNdQ_LHsVDZfXQOEA88su0OQ";
OPENAI_API_KEY = "sk-dMT6dqa_OCeCmrw88C2iYixDQCxX07vspVMerC5REET3BlbkFJxRePoGR6y9QjEggCYeu0N5e8f6x4O67PDq5f4ewBwA"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
openai.api_key = OPENAI_API_KEY

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Retrieve data from Supabase
def retrieve_data(query):
    response = supabase.table("your_table_name").select("*").eq("column", query).execute()
    return response.data

# Generate a response using GPT-4
def generate_response(context):
    response = openai.Completion.create(
        engine="gpt-4",
        prompt=f"Given the following data: {context}, generate a meaningful response",
        max_tokens=100
    )
    return response.choices[0].text.strip()

# The RAG pipeline that combines retrieval and generation
def rag_pipeline(query):
    # Step 1: Retrieve data from Supabase
    data = retrieve_data(query)
    
    if not data:
        return "No relevant data found."
    
    context = " ".join([str(row) for row in data])
    
    # Step 2: Generate a response based on the retrieved data
    response = generate_response(context)
    
    return response

# API Route for handling POST requests
@app.route("/query", methods=["POST"])
def query():
    data = request.json
    query_text = data.get("query")
    response = rag_pipeline(query_text)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
