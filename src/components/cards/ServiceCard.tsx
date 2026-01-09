import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, Zap, Droplets, Wrench, Monitor, Scissors, Briefcase } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
}

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Droplets,
  Wrench,
  Monitor,
  Scissors,
  Briefcase,
};

const ServiceCard: React.FC<ServiceCardProps> = ({ id, name, icon, description, count }) => {
  const IconComponent = iconMap[icon] || Zap;

  return (
    <Link
      to={`/services/${id}`}
      className="group bg-card rounded-2xl p-6 shadow-card card-hover border border-border"
    >
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        <IconComponent className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
      </div>
      <h3 className="font-display font-semibold text-lg text-foreground mb-2">{name}</h3>
      <p className="text-muted-foreground text-sm mb-3">{description}</p>
      <p className="text-primary text-sm font-medium">{count}+ Providers</p>
    </Link>
  );
};

export default ServiceCard;
