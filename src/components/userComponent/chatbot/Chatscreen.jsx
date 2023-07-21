import React, { useState, useEffect } from 'react';
import './Chatscreen.css';
import { adminInstance } from '../../../../axios';

const Chatscreen = () => {
  const [currentOption, setCurrentOption] = useState(null);
  const [optionHistory, setOptionHistory] = useState([]);
  const [options, setOptions] = useState([]);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchOptions();
  }, []);

  useEffect(() => {
    if (currentOption) {
      addChatMessage('John', currentOption.text);
      const childOptions = getDirectChildOptions(currentOption.id);
      if (childOptions.length > 0) {
        addChatMessage('Jane', childOptions);
      }
    }
  }, [currentOption]);

  const fetchOptions = async () => {
    try {
      const response = await adminInstance.get('chat-options/');
      setOptions(response.data);
      setCurrentOption(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const addChatMessage = (sender, message) => {
    const newChat = { sender, message };
    setChats(prevChats => [...prevChats, newChat]);
  };

  const handleOptionClick = (option) => {
    setOptionHistory(prevHistory => [...prevHistory, currentOption]);
    setCurrentOption(option);
  };

  const handlePreviousOptionClick = () => {
    const previousOption = optionHistory.pop();
    setCurrentOption(previousOption);
    setOptionHistory([...optionHistory]);
  };

  const getDirectChildOptions = (parentOptionId) => {
    return options.filter(option => option.parent_option === parentOptionId);
  };

  return (
    <div className="chat-screen">
      <div className="chat-header">Chat Room</div>
      <div className="chat-messages">
        {chats.map((chat, index) => (
          <div
            className={`chat-message ${chat.sender === 'John' ? 'sent' : 'received'}`}
            key={index}
          >
            <div className="sender">{chat.sender}</div>
            <div className="message">
              {chat.sender === 'Jane' && Array.isArray(chat.message) && (
                <div className="option-container">
                  {chat.message.map((option) => (
                    <button
                      key={option.id}
                      className="option-button"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              )}
              {chat.sender === 'Jane' && !Array.isArray(chat.message) && (
                <div className="option-message">{chat.message}</div>
              )}
              {chat.sender !== 'Jane' && <div>{chat.message}</div>}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Type a message" />
        <button>Send</button>
      </div>
      {optionHistory.length > 0 && (
        <button className="previous-button" onClick={handlePreviousOptionClick}>
          Previous Option
        </button>
      )}
    </div>
  );
};

export default Chatscreen;
