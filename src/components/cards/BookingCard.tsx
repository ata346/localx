import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Booking, BookingStatus } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface BookingCardProps {
  booking: Booking;
  userRole: 'customer' | 'provider' | 'admin';
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onCancel?: (id: string) => void;
  onRate?: (id: string, rating: number) => void;
}

const statusStyles: Record<BookingStatus, string> = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  accepted: 'bg-info/10 text-info border-info/20',
  rejected: 'bg-destructive/10 text-destructive border-destructive/20',
  completed: 'bg-success/10 text-success border-success/20',
  cancelled: 'bg-muted text-muted-foreground border-muted',
};

const statusLabels: Record<BookingStatus, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  rejected: 'Rejected',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  userRole,
  onAccept,
  onReject,
  onCancel,
  onRate,
}) => {
  const [showRating, setShowRating] = React.useState(false);
  const [rating, setRating] = React.useState(0);

  const handleRate = () => {
    if (rating > 0 && onRate) {
      onRate(booking.id, rating);
      setShowRating(false);
    }
  };

  return (
    <div className="bg-card rounded-xl p-5 shadow-card border border-border">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display font-semibold text-foreground mb-1">
            {booking.service}
          </h3>
          <p className="text-sm text-muted-foreground">{booking.category}</p>
        </div>
        <Badge className={statusStyles[booking.status]}>
          {statusLabels[booking.status]}
        </Badge>
      </div>

      <div className="space-y-2 text-sm text-muted-foreground mb-4">
        {userRole === 'customer' && (
          <p className="font-medium text-foreground">Provider: {booking.providerName}</p>
        )}
        {userRole === 'provider' && (
          <p className="font-medium text-foreground">Customer: {booking.customerName}</p>
        )}
        
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {booking.date}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {booking.timeSlot}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {booking.address}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="font-semibold text-primary">₹{booking.amount}</span>
        
        <div className="flex gap-2">
          {/* Customer actions */}
          {userRole === 'customer' && booking.status === 'pending' && onCancel && (
            <Button variant="destructive" size="sm" onClick={() => onCancel(booking.id)}>
              Cancel
            </Button>
          )}
          
          {userRole === 'customer' && booking.status === 'completed' && !booking.rating && (
            <>
              {!showRating ? (
                <Button variant="accent" size="sm" onClick={() => setShowRating(true)}>
                  Rate Service
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-xl ${star <= rating ? 'text-accent' : 'text-muted'}`}
                    >
                      ★
                    </button>
                  ))}
                  <Button size="sm" onClick={handleRate}>Submit</Button>
                </div>
              )}
            </>
          )}

          {booking.rating && (
            <div className="flex items-center gap-1 text-accent">
              {[...Array(booking.rating)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          )}

          {/* Provider actions */}
          {userRole === 'provider' && booking.status === 'pending' && (
            <>
              {onAccept && (
                <Button variant="success" size="sm" onClick={() => onAccept(booking.id)}>
                  Accept
                </Button>
              )}
              {onReject && (
                <Button variant="destructive" size="sm" onClick={() => onReject(booking.id)}>
                  Reject
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
