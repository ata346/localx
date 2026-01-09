import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Search, Filter } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BookingCard from '@/components/cards/BookingCard';
import { useAuth } from '@/contexts/AuthContext';
import { sampleBookings, Booking, BookingStatus } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [bookings, setBookings] = useState<Booking[]>(
    sampleBookings.filter(b => b.customerId.startsWith('USR')).slice(0, 15)
  );
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    if (!user || user.role !== 'customer') {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleCancel = (id: string) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: 'cancelled' as BookingStatus } : b
    ));
    toast({ title: 'Booking Cancelled', description: 'Your booking has been cancelled.' });
  };

  const handleRate = (id: string, rating: number) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, rating } : b
    ));
    toast({ title: 'Thank you!', description: `You rated this service ${rating} stars.` });
  };

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesSearch = !searchQuery || 
      b.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.providerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const upcomingBookings = bookings.filter(b => 
    ['pending', 'accepted'].includes(b.status)
  ).slice(0, 3);

  const stats = {
    total: bookings.length,
    completed: bookings.filter(b => b.status === 'completed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    upcoming: bookings.filter(b => b.status === 'accepted').length,
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="bg-muted/50 min-h-screen">
        {/* Header */}
        <div className="bg-card border-b border-border py-8">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-muted-foreground">
              Manage your bookings and find new services
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-xl p-5 shadow-card">
              <p className="text-muted-foreground text-sm mb-1">Total Bookings</p>
              <p className="font-display text-2xl font-bold text-foreground">{stats.total}</p>
            </div>
            <div className="bg-card rounded-xl p-5 shadow-card">
              <p className="text-muted-foreground text-sm mb-1">Completed</p>
              <p className="font-display text-2xl font-bold text-success">{stats.completed}</p>
            </div>
            <div className="bg-card rounded-xl p-5 shadow-card">
              <p className="text-muted-foreground text-sm mb-1">Pending</p>
              <p className="font-display text-2xl font-bold text-warning">{stats.pending}</p>
            </div>
            <div className="bg-card rounded-xl p-5 shadow-card">
              <p className="text-muted-foreground text-sm mb-1">Upcoming</p>
              <p className="font-display text-2xl font-bold text-info">{stats.upcoming}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Filters */}
              <div className="bg-card rounded-xl p-4 shadow-card">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Search bookings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {(['all', 'pending', 'accepted', 'completed', 'cancelled'] as const).map((status) => (
                      <Badge
                        key={status}
                        variant={statusFilter === status ? 'default' : 'secondary'}
                        className="cursor-pointer capitalize"
                        onClick={() => setStatusFilter(status)}
                      >
                        {status}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bookings List */}
              <div className="space-y-4">
                <h2 className="font-display text-xl font-semibold text-foreground">Your Bookings</h2>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      userRole="customer"
                      onCancel={handleCancel}
                      onRate={handleRate}
                    />
                  ))
                ) : (
                  <div className="bg-card rounded-xl p-8 shadow-card text-center">
                    <p className="text-muted-foreground mb-4">No bookings found.</p>
                    <Button onClick={() => navigate('/services')}>Browse Services</Button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming */}
              <div className="bg-card rounded-xl p-5 shadow-card">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Upcoming Bookings
                </h3>
                {upcomingBookings.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingBookings.map((booking) => (
                      <div key={booking.id} className="p-3 bg-muted rounded-lg">
                        <p className="font-medium text-foreground text-sm">{booking.service}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Calendar className="w-3 h-3" />
                          {booking.date}
                          <Clock className="w-3 h-3 ml-2" />
                          {booking.timeSlot}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No upcoming bookings</p>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-card rounded-xl p-5 shadow-card">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button className="w-full" onClick={() => navigate('/services')}>
                    Book New Service
                  </Button>
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDashboard;
