import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

export default function ForgotPasswordPage() {
  const [_, navigate] = useLocation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email })
      });
      const json = await res.json().catch(() => ({}));
      setMessage(json?.message || 'Se l\'email è registrata, riceverai istruzioni per il reset.');
      // In development, the server may return the token for easy testing
      if (json?.token) {
        setMessage((prev) => `${prev}\nToken di test: ${json.token}`);
        // opzionale: mostra link cliccabile
        setTimeout(() => {
          // no-op
        }, 0);
      }
    } catch (err) {
      setMessage('Errore di rete');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Recupero password</CardTitle>
            <CardDescription>Inserisci la tua email per ricevere il link di reset</CardDescription>
          </CardHeader>
          <form onSubmit={submit}>
            <CardContent className="space-y-4">
              <div>
                <label className="block mb-1 text-sm">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail((e.target as HTMLInputElement).value)} />
              </div>
              {message && <div className="text-sm text-gray-300">{message}</div>}
            </CardContent>
            <CardFooter>
              <div className="flex gap-2 w-full">
                <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Invio...' : 'Invia link di reset'}</Button>
                <Button variant="ghost" type="button" onClick={() => navigate('/auth')}>Annulla</Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
