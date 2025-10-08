import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

export default function ResetSuccess() {
  const [_, navigate] = useLocation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card p-6 rounded">
          <h2 className="text-xl font-semibold mb-2">Password aggiornata</h2>
          <p className="mb-4">La tua password è stata aggiornata con successo. Ora puoi effettuare il login.</p>
          <Button onClick={() => navigate('/auth')}>Vai al login</Button>
        </div>
      </div>
    </div>
  );
}
