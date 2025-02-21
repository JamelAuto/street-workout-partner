import React, { useState } from 'react';
import axios from '../../axios';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, fromUser: true }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('/chat', { 
        message: input,
        sessionId: sessionId 
      });
      setMessages([...newMessages, { text: response.data.reply, fromUser: false }]);
      if (!sessionId) {
        setSessionId(response.data.sessionId);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...newMessages, { text: 'Sorry, an error occurred. Please try again.', fromUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.toggleButton}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div style={styles.chatWrapper}>
          <div className="chat-container" style={styles.container}>
            <div style={styles.header}>
              <h3 style={styles.headerTitle}>Street Workout Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                style={styles.closeButton}
              >
                ✕
              </button>
            </div>
            <div className="messages" style={styles.messages}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    ...styles.message,
                    ...(msg.fromUser ? styles.userMessage : styles.botMessage),
                  }}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div style={styles.inputContainer}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about workout advice..."
                style={styles.input}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                style={styles.button}
              >
                {isLoading ? '...' : '➤'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  chatWrapper: {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    zIndex: 1000,
    boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '500px',
    width: '350px',
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    backgroundColor: '#007bff',
    color: 'white',
  },
  headerTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '500',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '5px',
  },
  toggleButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '50px',
    height: '50px',
    borderRadius: '8px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messages: {
    flex: 1,
    overflow: 'auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
  },
  message: {
    margin: '8px 0',
    padding: '10px 15px',
    borderRadius: '8px',
    maxWidth: '80%',
    wordWrap: 'break-word',
  },
  userMessage: {
    backgroundColor: '#007bff',
    color: 'white',
    marginLeft: 'auto',
  },
  botMessage: {
    backgroundColor: 'white',
    border: '1px solid #e9ecef',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  inputContainer: {
    display: 'flex',
    padding: '15px',
    backgroundColor: 'white',
    borderTop: '1px solid #e9ecef',
  },
  input: {
    flex: 1,
    padding: '10px',
    marginRight: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '14px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default ChatBot;
