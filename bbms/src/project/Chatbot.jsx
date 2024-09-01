import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessage = { type: 'text', content: input };
    setMessages([...messages, newMessage]);

    // Simulate a response from the bot
    const botResponse = generateBotResponse(input);
    setMessages((prevMessages) => [...prevMessages, botResponse]);

    setInput('');
  };

  const generateBotResponse = (input) => {
    // Example: if the bot needs to show a graph based on input
    if (input.toLowerCase().includes('show graph')) {
      return {
        type: 'graph',
        content: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              label: 'Sample Data',
              data: [65, 59, 80, 81, 56, 55],
              fill: false,
              backgroundColor: 'rgb(75, 192, 192)',
              borderColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        },
      };
    }

    // Default text response
    return { type: 'text', content: `You said: ${input}` };
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className="chatbot-message">
            {message.type === 'text' && <p>{message.content}</p>}
            {message.type === 'graph' && (
              <div className="chatbot-graph">
                <Line data={message.content} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;








/*
import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './Chatbot.css';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    // Replace this with the actual endpoint of the Gemini API
     const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
    const GEMINI_API_KEY = 'YOUR_ACTUAL_API_KEY'.split('').reverse().join(''); // Reverse the key (less secure)

    const handleSend = async () => {
        if (input.trim() === '') return;

        const newMessage = { text: input, sender: 'user' };
        setMessages([...messages, newMessage]);

        try {
            const response = await axios.get(GEMINI_API_URL, {
                headers: {
          'Authorization': `Bearer ${GEMINI_API_KEY.split('').reverse().join('')}`, // Reverse key again for use
                },
                params: {
                    // Add any necessary parameters for the API call
                    query: input,
                }
            });

            const botResponse = { text: response.data.message, sender: 'bot' };
            setMessages([...messages, newMessage, botResponse]);

        } catch (error) {
            console.error('Error fetching data from Gemini API:', error);
            const botErrorResponse = { text: 'Sorry, something went wrong.', sender: 'bot' };
            setMessages([...messages, newMessage, botErrorResponse]);
        }

        setInput('');
    };

    const renderMessage = (message, index) => (
        <div key={index} className={`message ${message.sender}`}>
            {message.text}
        </div>
    );

    return (
        <div className="chatbot">
            <div className="chatbot-responses">
                {messages.map(renderMessage)}
            </div>
            <div className="chatbot-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default Chatbot;
*/