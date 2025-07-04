import { NextRequest, NextResponse } from 'next/server';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { questionData, userReport, userEmail } = body;

    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const messageData = {
      from: `Flag Game <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: process.env.REPORT_EMAIL || 'bojana@bitcraft.ing',
      subject: 'Flag Game - Error Report',
      text: `
Error Report from Flag Guessing Game

Question Data:
- Flag Image: ${questionData.flagImage}
- Correct Answer: ${questionData.correctAnswer}
- Country Code: ${questionData.countryCode}
- Options: ${questionData.options.join(', ')}

User Report:
${userReport}

User Email: ${userEmail || 'Not provided'}

Timestamp: ${new Date().toISOString()}
      `,
      html: `
        <h2>Error Report from Flag Guessing Game</h2>
        
        <h3>Question Data:</h3>
        <ul>
          <li><strong>Flag Image:</strong> ${questionData.flagImage}</li>
          <li><strong>Correct Answer:</strong> ${questionData.correctAnswer}</li>
          <li><strong>Country Code:</strong> ${questionData.countryCode}</li>
          <li><strong>Options:</strong> ${questionData.options.join(', ')}</li>
        </ul>
        
        <h3>User Report:</h3>
        <p>${userReport.replace(/\n/g, '<br>')}</p>
        
        <p><strong>User Email:</strong> ${userEmail || 'Not provided'}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `,
    };

    await mg.messages.create(process.env.MAILGUN_DOMAIN, messageData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending report:', error);
    return NextResponse.json(
      { error: 'Failed to send report' },
      { status: 500 }
    );
  }
} 