import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Loader, Mic, Volume2 } from 'lucide-react';

const PRIMARY_COLOR = '#0C94CE';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      content: 'Hello! 👋 I\'m the NODALWIRE assistant. You can type or click the microphone to speak!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          setInput(transcript.trim());
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Text-to-Speech function
  const speakMessage = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.cancel(); // Stop any previous speech
      speechSynthesis.speak(utterance);
    }
  };

  // Start voice input
  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Call backend API using relative path
     const response = await fetch(
  '/api/chat',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: input,
    }),
  }
);


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        role: 'bot',
        content: data.reply || 'Sorry, I couldn\'t generate a response.',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setError(err.message);

      const errorMessage = {
        id: Date.now() + 1,
        role: 'bot',
        content: `❌ Error: ${err.message}. Make sure the backend is running.`,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center gap-2 hover:opacity-90"
          style={{ backgroundColor: PRIMARY_COLOR }}
          aria-label="Open chatbot"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-sm font-semibold hidden sm:inline">Chat</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl flex flex-col h-[600px] z-50 border border-gray-200">
          {/* Header */}
          <div className="text-white p-4 rounded-t-lg flex items-center justify-between" style={{ backgroundColor: PRIMARY_COLOR }}>
            <div>
              <h3 className="font-bold text-lg">NODALWIRE Assistant</h3>
              <p className="text-xs opacity-90">Powered by ChatGPT</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
              aria-label="Close chatbot"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg flex items-start gap-2 ${
                    msg.role === 'user'
                      ? 'text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-900 rounded-bl-none'
                  }`}
                  style={msg.role === 'user' ? { backgroundColor: PRIMARY_COLOR } : {}}
                >
                  <p className="text-sm leading-relaxed flex-1">{msg.content}</p>
                  {msg.role === 'bot' && (
                    <button
                      onClick={() => speakMessage(msg.content)}
                      className="hover:bg-gray-300 p-1 rounded transition-colors flex-shrink-0"
                      title="Listen"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex items-center gap-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-start">
                <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg text-xs">
                  {error}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="border-t border-gray-200 p-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type or use mic..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none disabled:bg-gray-100 transition-all"
              style={{ '--tw-ring-color': PRIMARY_COLOR } as React.CSSProperties}
            />
            <button
              type="button"
              onClick={startListening}
              disabled={isLoading || isListening}
              className="px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-white disabled:bg-gray-400"
              style={{ backgroundColor: isListening ? '#ef4444' : PRIMARY_COLOR }}
              title="Click to speak"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
