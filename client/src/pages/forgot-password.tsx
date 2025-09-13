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
      <div className="w-full max-w-sm">
        <Card className="border-border/40 shadow-lg">
          <CardHeader className="space-y-3">
            <CardTitle className="text-2xl text-center font-semibold">Recupero Password</CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Inserisci la tua email per ricevere il link di reset. Ti invieremo una email con le istruzioni per reimpostare la password.
            </CardDescription>
          </CardHeader>
          <form onSubmit={submit}>
            <CardContent className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/90">Email</label>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                  placeholder="La tua email"
                  className="h-10"
                  required
                />
              </div>
              {message && (
                <div className={`p-3 rounded-md text-sm ${
                  message.includes('error') ? 
                    'bg-destructive/10 text-destructive border border-destructive/20' : 
                    'bg-muted/50 text-muted-foreground border border-border/50'
                }`}>
                  {message}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex-col space-y-2">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <i className="fas fa-spinner fa-spin" />
                    <span>Invio in corso...</span>
                  </div>
                ) : (
                  'Invia link di reset'
                )}
              </Button>
              <Button 
                variant="ghost" 
                type="button" 
                onClick={() => navigate('/auth')}
                className="w-full"
              >
                Torna al login
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
