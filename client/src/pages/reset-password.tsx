import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const resetSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(6, 'La password deve essere almeno 6 caratteri'),
  confirmPassword: z.string().min(1)
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Le password non corrispondono',
  path: ['confirmPassword']
});

export default function ResetPasswordPage() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split('?')[1] || '');
  const tokenParam = params.get('token') || '';
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: { token: tokenParam, password: '', confirmPassword: '' }
  });

  useEffect(() => {
    if (tokenParam) {
      form.setValue('token', tokenParam);
    }
  }, [tokenParam]);

  const onSubmit = async (data: z.infer<typeof resetSchema>) => {
    setIsLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ token: data.token, password: data.password })
      });
      const payload = await res.json().catch(() => ({}));
      if (res.ok) {
        setMessage('Password aggiornata con successo. Verrai reindirizzato alla schermata di login.');
        setTimeout(() => window.location.href = '/siteprova/auth', 2000);
      } else {
        setMessage(payload?.message || 'Errore durante il reset della password');
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
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Inserisci la nuova password</CardDescription>
          </CardHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <Input type="hidden" {...form.register('token')} />
              <div>
                <label className="block mb-1 text-sm">Nuova password</label>
                <Input type="password" {...form.register('password')} />
                <div className="text-sm text-red-400">{form.formState.errors.password?.message as any}</div>
              </div>
              <div>
                <label className="block mb-1 text-sm">Conferma password</label>
                <Input type="password" {...form.register('confirmPassword')} />
                <div className="text-sm text-red-400">{form.formState.errors.confirmPassword?.message as any}</div>
              </div>
              {message && <div className="text-sm text-gray-300">{message}</div>}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Invio...' : 'Aggiorna Password'}</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

