from flask import Flask, jsonify, request
from flask_cors import CORS
from llama_index import StorageContext, load_index_from_storage
import json
import os

app = Flask(__name__)
CORS(app , resources={r"/data": {"origins": "*"}})

os.environ["OPENAI_API_KEY"] = "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"
storage_context = StorageContext.from_defaults(persist_dir='Store')
index = load_index_from_storage(storage_context)

# @app.route('/chat', methods=['POST'])
# def ask_netapp():
#     data = request.get_json()
    
#     # Process the data and prepare the response
#     # You can replace this code with your own logic
#     processed_data = {'message': 'Data received successfully!', 'data': data}
    
#     return jsonify(processed_data)
#     data = request.get_json()
#     query_engine = index.as_query_engine()
#     response = query_engine.query(json.dumps(data['message']))
#     res = jsonify({'message': 'Data received successfully!', 'data': response})    
#     # res.headers.add("Access-Control-Allow-Origin", "*")
#     # res.headers.add("Access-Control-Allow-Headers", "*")
#     # res.headers.add("Access-Control-Allow-Methods", "*")
#     return res

@app.route('/data', methods=['POST'])
def get_data():
    data = request.get_json()
    query_engine = index.as_query_engine()
    response = query_engine.query(json.dumps(data['message']))
    print(response)
    # res = jsonify({'message': 'Data received successfully!', 'data': ""})  
    # Process the data and prepare the response
    # You can replace this code with your own logic
    processed_data = {'status': 'Data received successfully!', 'message': response.response}
    
    return jsonify(processed_data)


# api.add_resource(AskNetapp, '/')

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug = True, port=3040)