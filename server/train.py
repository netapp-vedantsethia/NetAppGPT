from llama_index import SimpleDirectoryReader, GPTListIndex, GPTVectorStoreIndex, LLMPredictor, PromptHelper, ServiceContext, StorageContext, load_index_from_storage
from langchain import OpenAI
import sys
import os


os.environ["OPENAI_API_KEY"] = "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"

def createIndex(path):
  max_input = 4096
  tokens = 200
  chunk_size = 600
  max_chunk_overlap = 20

  prompt_helper = PromptHelper(max_input,tokens,max_chunk_overlap,chunk_size_limit=chunk_size)

  # language model
  llmPredictor = LLMPredictor(llm=OpenAI(temperature=0.5, model_name="text-ada-001", max_tokens=tokens))

  # load data
  documents = SimpleDirectoryReader(path).load_data()

  # create vector index
  service_context = ServiceContext.from_defaults(llm_predictor=llmPredictor, prompt_helper=prompt_helper)
  vectorIndex = GPTVectorStoreIndex.from_documents(documents, service_context=service_context)
  
  # vectorIndex.save_to_disk('vectorIndex.json')
  vectorIndex.storage_context.persist(persist_dir='Store')
  return vectorIndex

createIndex('test_data')

def askAi():
    storage_context = StorageContext.from_defaults(persist_dir='Store')
    index = load_index_from_storage(storage_context)
    query_engine = index.as_query_engine()
    while True: 
        query = input("What do you want to ask? ")
        response = query_engine.query(query)
        print(f"Response: {response}\n")

askAi()