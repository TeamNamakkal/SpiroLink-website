/**
 * API Client for NODALWIRE Unified Service
 * Uses relative paths: /api/...
 * Works on localhost AND production (Render)
 */

const API_BASE = '/api';

// Chat API
export const chatAPI = {
  send: async (message: string) => {
    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Chat request failed');
    }

    return response.json();
  },
};

// Contact Form API
export const contactAPI = {
  submit: async (data: {
    name: string;
    email: string;
    phone?: string;
    serviceType?: string;
    message: string;
  }) => {
    const response = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Contact form submission failed');
    }

    return response.json();
  },
};

// Health Check API
export const healthAPI = {
  check: async () => {
    const response = await fetch(`${API_BASE}/health`);

    if (!response.ok) {
      throw new Error('Health check failed');
    }

    return response.json();
  },
};

export default {
  chat: chatAPI,
  contact: contactAPI,
  health: healthAPI,
};
