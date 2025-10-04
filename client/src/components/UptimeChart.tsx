import React, { useEffect, useRef } from 'react';
import { UptimeHistory } from '../types';
import { useSettings } from '../hooks/use-settings';

interface UptimeChartProps {
  history: UptimeHistory[];
  className?: string;
}

const UptimeChart: React.FC<UptimeChartProps> = ({ history, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useSettings();

  // Converte la history reale in una serie per le ultime 24 ore, senza simulazioni
  const buildLast24hSeries = () => {
    const now = new Date();
    const cutoff = now.getTime() - 24 * 60 * 60 * 1000;

    // Filtra solo dati nelle ultime 24h
    const recent = history
      .map(h => ({ ...h, dateObj: new Date(h.date) }))
      .filter(h => h.dateObj.getTime() >= cutoff)
      .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

    // Mappa ai punti del grafico: se più punti nella stessa ora, prendi l'ultimo
    const byHour = new Map<number, { time: Date; uptime: number; status: string }>();
    for (const h of recent) {
      const hourBucket = new Date(h.dateObj);
      hourBucket.setMinutes(0, 0, 0);
      byHour.set(hourBucket.getTime(), {
        time: new Date(hourBucket),
        uptime: h.uptimePercentage,
        status: h.status,
      });
    }

    // Costruisci una serie ordinata per tutte le ore dove abbiamo dati
    const series = Array.from(byHour.values()).sort((a, b) => a.time.getTime() - b.time.getTime());
    return series;
  };

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

  const data = buildLast24hSeries();
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set up colors based on theme
    const backgroundColor = '#1a1a1a';
    const gridColor = '#333333';
    const textColor = '#9ca3af';
    
    // Draw background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight * i) / 4;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Vertical grid lines (every 4 hours)
    for (let i = 0; i <= 6; i++) {
      const x = padding + (chartWidth * i) / 6;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Se non ci sono dati nelle ultime 24h, mostra solo la griglia e un messaggio
    if (!data.length) {
      ctx.fillStyle = textColor;
      ctx.font = '13px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(t.noHistoryAvailable, width / 2, height / 2);
      return;
    }

    // Draw uptime line
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Create gradient for the line
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, '#10b981'); // Success green
    gradient.addColorStop(0.7, '#f59e0b'); // Warning yellow
    gradient.addColorStop(1, '#ef4444'); // Error red

    ctx.strokeStyle = gradient;

    ctx.beginPath();
    data.forEach((point, index) => {
      const x = padding + (chartWidth * index) / (data.length - 1);
      const y = height - padding - (chartHeight * point.uptime) / 100;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw data points with status colors
    data.forEach((point, index) => {
      const x = padding + (chartWidth * index) / (data.length - 1);
      const y = height - padding - (chartHeight * point.uptime) / 100;
      
      // Choose color based on status
      let pointColor = '#10b981'; // Success green
      if (point.status === 'degraded') pointColor = '#f59e0b'; // Warning yellow
      if (point.status === 'down') pointColor = '#ef4444'; // Error red
      
      ctx.fillStyle = pointColor;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
      
      // Add a white border for better visibility
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw Y-axis labels (uptime percentages)
    ctx.fillStyle = textColor;
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight * i) / 4;
      const value = 100 - (i * 25);
      ctx.fillText(value + '%', padding - 10, y);
    }

    // Draw X-axis labels (time)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    for (let i = 0; i <= 6; i++) {
      const x = padding + (chartWidth * i) / 6;
      const dataIndex = Math.floor((data.length - 1) * i / 6);
      const time = data[dataIndex].time;
      const timeString = time.getHours().toString().padStart(2, '0') + ':00';
      ctx.fillText(timeString, x, height - padding + 10);
    }

    // Draw chart title
    ctx.fillStyle = textColor;
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(t.uptimeHistory + ' (24h)', padding, padding - 30);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    drawChart();
  }, [history, t]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-64 rounded-lg bg-gray-900 border border-gray-700"
        style={{ width: '100%', height: '256px' }}
      />
    </div>
  );
};

export default UptimeChart;