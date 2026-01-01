import { Resend } from 'resend';

// Safely initialize Resend to avoid crashes during development if key is missing
// The key is required only for actual sending
const apiKey = process.env.RESEND_API_KEY || 're_123456789'; // Fallback to dummy key to prevent crash at startup
export const resend = new Resend(apiKey);
