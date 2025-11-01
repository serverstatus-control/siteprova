import React from 'react';
import { Server, Cloud, Globe, Users, Database, Shield, Monitor, Activity, Wifi, ShoppingCart, Music, Film, Gamepad, Mail, Bot, Star, Wrench, AlertTriangle, Tv, CreditCard, Layers, Coins } from 'lucide-react';

export const getCategoryIconComponent = (categoryName: string, className = 'w-5 h-5'): React.ReactNode => {
  const name = (categoryName || '').toLowerCase();

  const icons: Record<string, React.ReactNode> = {
    server: <Server className={className} />,
    cloud: <Cloud className={className} />,
    web: <Globe className={className} />,
    social: <Users className={className} />,
    database: <Database className={className} />,
    security: <Shield className={className} />,
    monitoring: <Monitor className={className} />,
    performance: <Activity className={className} />,
    network: <Wifi className={className} />,
    shop: <ShoppingCart className={className} />,
    music: <Music className={className} />,
    video: <Film className={className} />,
  streaming: <Tv className={className} />,
    game: <Gamepad className={className} />,
    mail: <Mail className={className} />,
  bank: <CreditCard className={className} />,
    betting: <Coins className={className} />,
    ai: <Bot className={className} />,
    star: <Star className={className} />,
  various: <Layers className={className} />,
    tool: <Wrench className={className} />,
    alert: <AlertTriangle className={className} />,
  };

  // Try exact key first
  if (icons[name]) return icons[name];

  // Try to find a match by partial name
  for (const key of Object.keys(icons)) {
    if (name.includes(key)) return icons[key];
  }

  // Fallback
  return <Server className={className} />;
};

export default getCategoryIconComponent;
