import { db } from './db';
import { eq, and, sql } from 'drizzle-orm';
import { services, uptimeHistory } from '../shared/schema';
import { type ServiceStatus } from '../client/src/types';

// Funzione per calcolare il downtime giornaliero
export async function calculateDailyDowntime(serviceId: number, date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  // Ottieni tutti i check del servizio per il giorno specificato
  const checks = await db.select()
    .from(uptimeHistory)
    .where(and(
      eq(uptimeHistory.serviceId, serviceId),
      sql`${uptimeHistory.date} >= ${startOfDay}`,
      sql`${uptimeHistory.date} <= ${endOfDay}`
    ))
    .orderBy(uptimeHistory.date);
  
  let totalDowntimeMinutes = 0;
  let lastStatus: ServiceStatus = 'operational';
  let lastCheckTime = startOfDay;
  
  for (const check of checks) {
    const currentCheckTime = new Date(check.date);
    
    // Se il check precedente era DOWN, calcola il downtime fino a questo check
    if (lastStatus === 'down') {
      const downtimeMinutes = (currentCheckTime.getTime() - lastCheckTime.getTime()) / (1000 * 60);
      totalDowntimeMinutes += downtimeMinutes;
    }
    
    lastStatus = check.status as ServiceStatus;
    lastCheckTime = currentCheckTime;
  }
  
  // Se l'ultimo stato era DOWN, calcola il downtime fino a fine giornata
  if (lastStatus === 'down') {
    const downtimeMinutes = (endOfDay.getTime() - lastCheckTime.getTime()) / (1000 * 60);
    totalDowntimeMinutes += downtimeMinutes;
  }
  
  return Math.round(totalDowntimeMinutes);
}

// Funzione per aggiornare il downtime nel database
export async function updateDailyDowntime(serviceId: number, date: Date) {
  const downtimeMinutes = await calculateDailyDowntime(serviceId, date);
  
  await db
    .update(uptimeHistory)
    .set({ downtimeMinutes })
    .where(and(
      eq(uptimeHistory.serviceId, serviceId),
      sql`DATE(${uptimeHistory.date}) = DATE(${date})`
    ));
  
  return downtimeMinutes;
}