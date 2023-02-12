import openai
import flask
import json
from transformers import AutoTokenizer, AutoModel, pipeline
from flask_cors import CORS

app = flask.Flask(__name__)
cors = CORS(app)

# Load the GPT-3 language model
openai.api_key = "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"
model_name = "openai-gpt"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)


def match_text_to_keywords(input_text, keyword_tokens):
    # Tokenize the input text
    input_tokens = tokenizer.tokenize(input_text)

    # Calculate the match score
    match_score = 0
    for keyword_tok in keyword_tokens:
        if all(token in input_tokens for token in keyword_tok):
            match_score+=1
    
    return match_score > 0


def is_related(input_text, keywords, cache):
    if input_text in cache:
        return cache[input_text]

    # Query OpenAI's language model for related keywords
    response = model.engine.execute(
        f"related to {input_text}", max_tokens=1024, n=1)
    related_keywords = response["choices"][0]["text"].strip().split("\n")

    # Check if any of the related keywords match the filter keywords
    result = any(
        related_keyword in keywords for related_keyword in related_keywords)
    cache[input_text] = result
    return result


@app.route("/filter_content", methods=["POST"])
def filter_content_endpoint():
   #print("hello?1")
    # Parse the incoming JSON data
    received_data = flask.request.data.decode()
    #print(received_data)
    data = json.loads(received_data)
    keywords = data["keywords"]
    #print("hello?2")
    # Tokenize the keywords
    keyword_tokens = [tokenizer.tokenize(
        keyword) for keyword in keywords]

    # Create a cache for the results of is_related
    
    cache = {}
    # Filter the input text
    for input_text in data["input_texts"]:
        if match_text_to_keywords(input_text, keyword_tokens) or is_related(input_text, keywords, cache):
            response = json.dumps(False), 200, {"Content-Type": "application/json"}
    

    response = json.dumps(True) , 200, {"Content-Type": "application/json"}
    print("Response:", response)
    return response


if __name__ == "__main__":
    app.run()
