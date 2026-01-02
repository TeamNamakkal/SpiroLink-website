import React from 'react';
import { Chatbot } from './components/Chatbot';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">SPIROLINK Chatbot Demo</h1>
        <p className="text-gray-300 mb-8">
          Click the green chat button in the bottom-right corner to start
          chatting with our AI assistant powered by ChatGPT.
        </p>

        <div className="bg-gray-800 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold">Features</h2>
          <ul className="space-y-2 text-gray-300">
            <li>✅ Real-time chat with ChatGPT</li>
            <li>✅ Secure backend API</li>
            <li>✅ Beautiful modern UI</li>
            <li>✅ Auto-scrolling messages</li>
            <li>✅ Error handling & loading states</li>
            <li>✅ Responsive design</li>
          </ul>
        </div>

        <div className="bg-blue-900 rounded-lg p-6 mt-8 text-sm">
          <h3 className="font-bold mb-2">Backend Status</h3>
          <p className="text-blue-200">
            Backend should be running on http://localhost:5000
          </p>
          <p className="text-blue-200 mt-2">
            Make sure you've added your OpenAI API key to
            <code className="bg-blue-800 px-2 py-1 rounded">
              chatbot-backend/.env
            </code>
          </p>
        </div>
      </div>

      <Chatbot />
    </div>
  );
}

export default App;
