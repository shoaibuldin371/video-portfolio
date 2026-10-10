import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LinkedInIcon, FacebookIcon, InstagramIcon, TikTokIcon } from './SocialIcons';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className = "w-5 h-5", size = 20 }) => {
  const iconName = name.trim();
  const lowerName = iconName.toLowerCase();

  if (lowerName === 'linkedin') return <LinkedInIcon className={className} size={size} />;
  if (lowerName === 'facebook') return <FacebookIcon className={className} size={size} />;
  if (lowerName === 'instagram') return <InstagramIcon className={className} size={size} />;
  if (lowerName === 'tiktok') return <TikTokIcon className={className} size={size} />;

  const LucideIconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[iconName];

  if (LucideIconComponent) {
    return <LucideIconComponent className={className} size={size} />;
  }

  return <LucideIcons.Sparkles className={className} size={size} />;
};
