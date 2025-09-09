import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export default function ResetConfirmPage() {
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isPending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return toast({ title: 'Token mancante', description: 'Il token di reset non è presente nella URL', variant: 'destructive' });
    if (!password) return toast({ title: 'Password mancante', description: 'Inserisci una password valida', variant: 'destructive' });
    if (password !== confirm) return toast({ title: 'Password non coincidono', description: 'Le password non corrispondono', variant: 'destructive' });

    setPending(true);
    try {
  const res = await apiRequest('POST', '/api/reset-password', { token, password });
      await res.json();
      toast({ title: 'Password aggiornata', description: 'La tua password è stata aggiornata con successo.' });
  navigate('/auth');
    } catch (err: any) {
      toast({ title: 'Errore', description: err?.message || 'Si è verificato un errore', variant: 'destructive' });
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-card rounded-lg">
        <h2 className="text-xl font-bold mb-4">Imposta nuova password</h2>
        <p className="text-sm text-muted-foreground mb-4">Inserisci la nuova password per il tuo account.</p>
        <label className="block mb-2">Nuova password</label>
        <Input type="password" value={password} onChange={(e) => setPassword((e.target as HTMLInputElement).value)} />
        <label className="block mt-3 mb-2">Conferma password</label>
        <Input type="password" value={confirm} onChange={(e) => setConfirm((e.target as HTMLInputElement).value)} />
        <div className="mt-4 flex gap-2">
          <Button type="submit" disabled={isPending}>{isPending ? 'Invio...' : 'Imposta password'}</Button>
          <Button variant="secondary" onClick={() => navigate('/')} type="button">Annulla</Button>
        </div>
      </form>
    </div>
  );
}
