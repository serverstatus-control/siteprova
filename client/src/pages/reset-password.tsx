import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useSettings } from '@/hooks/use-settings';

const resetSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(6, 'La password deve essere almeno 6 caratteri'),
  confirmPassword: z.string().min(1)
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Le password non corrispondono',
  path: ['confirmPassword']
});

export default function ResetPasswordPage() {
  const [location, navigate] = useLocation();
  // Leggiamo il token direttamente dalla URL reale per evitare edge con wouter
  const tokenParam = useMemo(() => new URLSearchParams(window.location.search).get('token') || '', []);
  const { t } = useSettings();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
        setMessage(t?.success || 'Password aggiornata con successo. Verrai reindirizzato alla schermata di login.');
        setTimeout(() => navigate('/auth'), 1500);
      } else {
        setMessage(payload?.message || t?.error || 'Errore durante il reset della password');
      }
    } catch (err) {
      setMessage(t?.error || 'Errore di rete');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>{t?.resetPasswordTitle || 'Reset Password'}</CardTitle>
            <CardDescription>{t?.resetPasswordSubtitle || 'Inserisci la nuova password'}</CardDescription>
          </CardHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <Input type="hidden" {...form.register('token')} />
              <div>
                <label className="block mb-1 text-sm">{t?.newPassword || 'Nuova password'}</label>
                <div className="relative">
                  <Input type={showPwd ? 'text' : 'password'} {...form.register('password')} />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPwd((v) => !v)}
                    aria-label={showPwd ? (t?.hidePassword || 'Nascondi password') : (t?.showPassword || 'Mostra password')}
                  >
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-sm text-red-400">{form.formState.errors.password?.message as any}</div>
              </div>
              <div>
                <label className="block mb-1 text-sm">{t?.confirmPassword || 'Conferma password'}</label>
                <div className="relative">
                  <Input type={showConfirm ? 'text' : 'password'} {...form.register('confirmPassword')} />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? (t?.hidePassword || 'Nascondi password') : (t?.showPassword || 'Mostra password')}
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-sm text-red-400">{form.formState.errors.confirmPassword?.message as any}</div>
              </div>
              {!tokenParam && (
                <div className="text-sm text-muted-foreground">
                  {t?.noValidToken || 'Non hai un token valido?'}{' '}
                  <button type="button" className="text-orange-500 hover:underline" onClick={() => navigate('/forgot-password')}>
                    {t?.requestNewReset || 'Richiedi un nuovo link di reset'}
                  </button>
                </div>
              )}
              {message && <div className="text-sm text-gray-300 whitespace-pre-wrap break-words">{message}</div>}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (t?.sending || 'Invio...') : (t?.updatePassword || 'Aggiorna Password')}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

