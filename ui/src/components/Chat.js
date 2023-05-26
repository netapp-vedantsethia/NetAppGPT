import React, { useState } from 'react';
import axios from 'axios';
import bot from "../static/images/bot.png";
import chatgpt from "../static/images/chatgpt.png";
import user from "../static/images/me.png";
import {ReactComponent as SendIcon} from "../static/images/send.svg";
import loading from "../static/images/loading.gif";

const serverIP = "localhost";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [load, setLoad] = useState(false);

  const handleUserMessage = async (userMessage) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: userMessage, sender: 'user' },
    ]);

    try {
      const response = await axios.post(`http://${serverIP}:3040/data`, {
        message: userMessage,
      });

      const chatbotResponse = response.data.message;

      setMessages((prevMessages) => [
        ...prevMessages,
        { content: chatbotResponse, sender: 'chatbot' },
      ]);
      setLoad(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = (event) => {
    setLoad(true);
    event.preventDefault();
    handleUserMessage(event.target.elements.message.value);
    event.target.reset();
  };

  return (
    <div>
      <div className='row'>
        <div className='col-2'>
          <img style={{height: "40vh"}} src={bot} alt="beta" className='p-5'/>
        </div>
        <div className='col-10'>
          <div className="chat-window">
            {messages && messages.length > 0  ? messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === 'user' ? 'user' : 'chatbot'} input-field`}
              >
                <div className='row'>
                  <div className='col-auto'>
                    <img style={{height: "35px"}} src={message.sender === 'user' ? user : chatgpt} alt="beta" className='d-inline'/>
                  </div>
                  <div className='col'>
                    {message.content}
                  </div>
                </div>
              </div>
            )) : <div class="card p-5 m-5">
                <div class="card-body text-center">
                  <h5 class="card-title">Hello!!</h5>
                  <p class="card-text">Welcome to NetAppGPT! I'm your friendly neighborhood chatbot. <br/>I'm here to help you with anything you need. <br/>Just ask me a question and I'll do my best to answer it.</p>
                </div>
              </div>
            }
          {load && <center><img className="img_loading" src={loading} alt="loading..." width="300px" /></center>}
          </div>
          <div className='row chat-box'>
            <form className="message-input" onSubmit={handleSubmit}>
              <div className="row">
                <div className='col-10'>
                  <input
                    type="text"
                    name="message"
                    class="form-control d-inline me-2" aria-label="message…"
                    placeholder="Write message…"
                    autocomplete="off"
                  />
                </div>
                <div className="col-2">
                  <button 
                    type="submit" 
                    className='btn btn-primary send-button d-inline'
                    disabled={load}
                  >
                    <SendIcon /> Ask NetApp
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Chat;