// ✅ EXAMPLE: Updated API calls for unified deployment
// Use relative `/api/...` paths instead of localhost

// OLD (localhost - DO NOT USE)
// const response = await fetch('http://localhost:5000/chat', ...)
// const response = await fetch('http://localhost:5000/contact', ...)

// ✅ NEW (relative paths - works on localhost AND Render)

export const apiChat = async (message: string) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });
  
  if (!response.ok) throw new Error('Chat failed');
  return response.json();
};

export const apiContact = async (data: {
  name: string;
  email: string;
  phone?: string;
  serviceType?: string;
  message: string;
}) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) throw new Error('Contact form failed');
  return response.json();
};

export const apiHealth = async () => {
  const response = await fetch('/api/health');
  if (!response.ok) throw new Error('Health check failed');
  return response.json();
};

// Usage in components:
/*
import { apiChat, apiContact } from '@/lib/api';

function ChatComponent() {
  const handleSend = async (message: string) => {
    try {
      const { reply } = await apiChat(message);
      console.log('Bot:', reply);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <input 
      onKeyPress={(e) => {
        if (e.key === 'Enter') handleSend(e.currentTarget.value);
      }}
    />
  );
}

function ContactForm() {
  const handleSubmit = async (formData) => {
    try {
      const result = await apiContact(formData);
      console.log('Email sent:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
*/
