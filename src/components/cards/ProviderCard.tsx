import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, BadgeCheck } from 'lucide-react';
import { Provider } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  return (
    <Link
      to={`/provider/${provider.id}`}
      className="group bg-card rounded-2xl overflow-hidden shadow-card card-hover border border-border"
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <img
            src={provider.avatar}
            alt={provider.name}
            className="w-16 h-16 rounded-xl bg-muted object-cover"
          />
          
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display font-semibold text-foreground truncate">
                {provider.name}
              </h3>
              {provider.verified && (
                <BadgeCheck className="w-5 h-5 text-primary flex-shrink-0" />
              )}
            </div>
            
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-accent fill-accent" />
                {provider.rating}
              </span>
              <span>({provider.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {provider.location}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {provider.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {provider.responseTime}
          </div>
          <span className="text-primary font-semibold">{provider.priceRange}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProviderCard;
