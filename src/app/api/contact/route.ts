import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure for static export
export const dynamic = 'force-static';
export const revalidate = false;

// Validate environment variables
const validateEnv = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email configuration is missing. Please check your environment variables.');
  }
};

// Create transporter with better error handling
const createTransporter = () => {
  try {
    validateEnv();
    
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Add timeout and connection settings
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
    });
  } catch (error) {
    console.error('Transporter creation failed:', error);
    throw error;
  }
};

// Validate email format
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function POST(request: Request) {
  try {
    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { error: 'Contact form is currently unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    const { name, email, message } = await request.json();

    // Enhanced input validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 }
      );
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid data types. All fields must be strings' },
        { status: 400 }
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Message is too long. Maximum 1000 characters allowed' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = createTransporter();

    // Enhanced email content with better formatting
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email, // Allow direct reply to sender
      subject: `🚀 New Portfolio Contact: ${name}`,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Date: ${new Date().toLocaleString()}

Message:
${message}

---
This message was sent from your portfolio website contact form.
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background: #6366f1; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { padding: 20px; background: #f8f9fa; border-radius: 0 0 8px 8px; }
    .field { margin: 15px 0; }
    .label { font-weight: bold; color: #6366f1; }
    .message { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #6366f1; }
    .footer { margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h2>🚀 New Portfolio Contact</h2>
  </div>
  <div class="content">
    <div class="field">
      <span class="label">Name:</span> ${name}
    </div>
    <div class="field">
      <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
    </div>
    <div class="field">
      <span class="label">Date:</span> ${new Date().toLocaleString()}
    </div>
    <div class="field">
      <span class="label">Message:</span>
      <div class="message">${message.replace(/\n/g, '<br>')}</div>
    </div>
    <div class="footer">
      This message was sent from your portfolio website contact form.
    </div>
  </div>
</body>
</html>
      `,
    };

    // Send email with timeout
    const sendPromise = transporter.sendMail(mailOptions);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Email send timeout')), 30000)
    );

    await Promise.race([sendPromise, timeoutPromise]);

    // Log successful email (without sensitive data)
    console.log(`Contact form submitted successfully from ${email} at ${new Date().toISOString()}`);

    return NextResponse.json(
      { 
        message: 'Email sent successfully! I\'ll get back to you within 24 hours.',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Provide user-friendly error messages
    let errorMessage = 'Failed to send email. Please try again later.';
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.message.includes('Email configuration')) {
        errorMessage = 'Contact form is temporarily unavailable. Please email me directly.';
        statusCode = 503;
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Email service is slow. Please try again in a few minutes.';
        statusCode = 408;
      } else if (error.message.includes('authentication')) {
        errorMessage = 'Email service authentication failed. Please contact me directly.';
        statusCode = 503;
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
} 