import { db } from './db';
import crypto from 'crypto';
import { sendMail, generatePasswordResetEmail } from './email';
import { eq } from 'drizzle-orm';
import { users, passwordResets } from '../shared/schema';

// Durata del token di reset (1 ora)
const RESET_TOKEN_EXPIRY = 60 * 60 * 1000;

export async function handleForgotPassword(email: string, baseUrl: string) {
  try {
    // Cerca l'utente nel database
    const [user] = await db.select().from(users).where(eq(users.email, email));
    
    if (!user) {
      // Non rivelare se l'email esiste o meno per sicurezza
      return { success: true, message: 'Se l\'email è registrata, riceverai istruzioni per il reset.' };
    }

    // Genera un token casuale
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + RESET_TOKEN_EXPIRY);

    // Salva il token nel database
    await db.insert(passwordResets).values({
      userId: user.id,
      token: token,
      expiresAt: expiry
    });

    // Invia l'email con il link di reset
    await sendMail({
      to: email,
      subject: 'Reset Password - Server Status',
      html: generatePasswordResetEmail(token, baseUrl),
    });

    return { success: true, message: 'Se l\'email è registrata, riceverai istruzioni per il reset.' };
  } catch (error) {
    console.error('Errore nella gestione del reset password:', error);
    throw new Error('Errore nella gestione del reset password');
  }
}