import nodemailer from 'nodemailer';

// Configura il trasportatore email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendMail({ to, subject, html }: SendMailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"Server Status" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    
    console.log('Email inviata:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Errore nell\'invio dell\'email:', error);
    throw new Error('Errore nell\'invio dell\'email');
  }
}

export function generatePasswordResetEmail(token: string, baseUrl: string) {
  const resetLink = `${baseUrl}/reset-password?token=${token}`;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333; text-align: center;">Reset Password</h1>
      <p style="color: #666; font-size: 16px; line-height: 1.5;">
        Hai richiesto il reset della password per il tuo account Server Status.
        Clicca sul pulsante qui sotto per procedere al reset:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}"
           style="background-color: #0066cc; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 5px; font-weight: bold;">
          Reset Password
        </a>
      </div>
      <p style="color: #666; font-size: 14px;">
        Se non hai richiesto tu il reset della password, ignora questa email.
        Il link scadrà tra 1 ora.
      </p>
      <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
        Server Status - Sistema di Monitoraggio
      </p>
    </div>
  `;
}