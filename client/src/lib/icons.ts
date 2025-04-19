export const getServiceIcon = (serviceName: string): string => {
  const name = serviceName.toLowerCase();
  
  // Common brand icons
  if (name.includes('steam')) return 'fab fa-steam';
  if (name.includes('google')) return 'fab fa-google';
  if (name.includes('youtube')) return 'fab fa-youtube';
  if (name.includes('facebook') || name.includes('meta')) return 'fab fa-facebook';
  if (name.includes('twitter') || name.includes('x')) return 'fab fa-twitter';
  if (name.includes('apple')) return 'fab fa-apple';
  if (name.includes('android')) return 'fab fa-android';
  if (name.includes('windows') || name.includes('microsoft')) return 'fab fa-microsoft';
  if (name.includes('amazon')) return 'fab fa-amazon';
  if (name.includes('playstation')) return 'fab fa-playstation';
  if (name.includes('xbox')) return 'fab fa-xbox';
  if (name.includes('instagram')) return 'fab fa-instagram';
  if (name.includes('discord')) return 'fab fa-discord';
  if (name.includes('telegram')) return 'fab fa-telegram';
  if (name.includes('tiktok')) return 'fab fa-tiktok';
  if (name.includes('twitch')) return 'fab fa-twitch';
  if (name.includes('reddit')) return 'fab fa-reddit';
  if (name.includes('github')) return 'fab fa-github';
  if (name.includes('linkedin')) return 'fab fa-linkedin';
  if (name.includes('chrome')) return 'fab fa-chrome';
  if (name.includes('firefox')) return 'fab fa-firefox';
  if (name.includes('safari')) return 'fab fa-safari';
  if (name.includes('edge')) return 'fab fa-edge';
  if (name.includes('paypal')) return 'fab fa-paypal';
  if (name.includes('spotify')) return 'fab fa-spotify';
  if (name.includes('snapchat')) return 'fab fa-snapchat';
  if (name.includes('whatsapp')) return 'fab fa-whatsapp';
  if (name.includes('slack')) return 'fab fa-slack';
  if (name.includes('dropbox')) return 'fab fa-dropbox';
  
  // Generic icons based on service type
  if (name.includes('cloud')) return 'fas fa-cloud text-blue-400';
  if (name.includes('mail') || name.includes('gmail') || name.includes('outlook')) return 'fas fa-envelope text-yellow-400';
  if (name.includes('ai') || name.includes('openai')) return 'fas fa-robot';
  if (name.includes('game') || name.includes('play')) return 'fas fa-gamepad';
  if (name.includes('video') || name.includes('movie') || name.includes('film') || name.includes('netflix')) return 'fas fa-film';
  if (name.includes('music')) return 'fas fa-music';
  if (name.includes('bank') || name.includes('finance') || name.includes('pay')) return 'fas fa-landmark';
  if (name.includes('shop') || name.includes('store') || name.includes('cart')) return 'fas fa-shopping-cart';
  if (name.includes('wifi') || name.includes('network') || name.includes('connection')) return 'fas fa-wifi';
  if (name.includes('database') || name.includes('server')) return 'fas fa-database';
  if (name.includes('phone')) return 'fas fa-phone';
  if (name.includes('camera')) return 'fas fa-camera';
  if (name.includes('car')) return 'fas fa-car';
  if (name.includes('plane') || name.includes('flight')) return 'fas fa-plane';
  if (name.includes('train')) return 'fas fa-train';
  if (name.includes('ship')) return 'fas fa-ship';
  if (name.includes('hotel')) return 'fas fa-hotel';
  
  // Default icon if no match
  return 'fas fa-server';
};

export const getCategoryIcon = (categoryName: string): string => {
  const name = categoryName.toLowerCase();
  
  if (name.includes('game')) return 'fas fa-gamepad';
  if (name.includes('browser') || name.includes('web')) return 'fas fa-globe';
  if (name.includes('social')) return 'fas fa-users';
  if (name.includes('connection') || name.includes('network')) return 'fas fa-wifi';
  if (name.includes('bank') || name.includes('finance')) return 'fas fa-landmark';
  if (name.includes('stream') || name.includes('video')) return 'fas fa-play';
  if (name.includes('mail') || name.includes('email')) return 'fas fa-envelope';
  if (name.includes('shop')) return 'fas fa-shopping-cart';
  if (name.includes('ai')) return 'fas fa-robot';
  
  // Default icon
  return 'fas fa-ellipsis-h';
};
