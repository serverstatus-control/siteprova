import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useLocation } from 'wouter';

export default function ResetPasswordPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isPending, setPending] = useState(false);
  const [, navigate] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast({ title: 'Email mancante', description: 'Inserisci la tua email', variant: 'destructive' });
    setPending(true);
    try {
      const res = await apiRequest('POST', '/api/reset-password', { email });
      await res.json();
      toast({ title: 'Richiesta inviata', description: 'Controlla la tua casella email per le istruzioni.' });
  navigate('/');
    } catch (err: any) {
      toast({ title: 'Errore', description: err?.message || 'Si è verificato un errore', variant: 'destructive' });
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 rounded-lg bg-card">
        <h2 className="mb-4 text-xl font-bold">Recupera password</h2>
        <p className="mb-4 text-sm text-muted-foreground">Inserisci l'email associata al tuo account e ti invieremo le istruzioni.</p>
        <label className="block mb-2">Email</label>
        <Input value={email} onChange={(e) => setEmail((e.target as HTMLInputElement).value)} type="email" />
        <div className="flex gap-2 mt-4">
          <Button type="submit" disabled={isPending}>{isPending ? 'Invio...' : 'Invia istruzioni'}</Button>
          <Button variant="secondary" onClick={() => navigate('/')} type="button">Annulla</Button>
        </div>
      </form>
    </div>
  );
}
