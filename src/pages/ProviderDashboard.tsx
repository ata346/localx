import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Search, Settings, Plus } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BookingCard from '@/components/cards/BookingCard';
import { useAuth } from '@/contexts/AuthContext';
import { sampleBookings, Booking, BookingStatus, timeSlots, serviceCategories } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const ProviderDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [bookings, setBookings] = useState<Booking[]>(
    sampleBookings.filter(b => b.providerId.startsWith('PRV')).slice(0, 15)
  );
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedSlots, setSelectedSlots] = useState<string[]>(timeSlots.slice(0, 6));

  React.useEffect(() => {
    if (!user || user.role !== 'provider') {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleAccept = (id: string) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: 'accepted' as BookingStatus } : b
    ));
    toast({ title: 'Booking Accepted', description: 'The customer has been notified.' });
  };

  const handleReject = (id: string) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: 'rejected' as BookingStatus } : b
    ));
    toast({ title: 'Booking Rejected', description: 'The customer has been notified.' });
  };

  const toggleSlot = (slot: string) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter(s => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesSearch = !searchQuery || 
      b.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const todayBookings = bookings.filter(b => 
    b.status === 'accepted' && b.date === new Date().toISOString().split('T')[0]
  );

  const stats = {
    pending: bookings.filter(b => b.status === 'pending').length,
    accepted: bookings.filter(b => b.status === 'accepted').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    totalEarnings: bookings
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + b.amount, 0),
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="bg-muted/50 min-h-screen">
        {/* Header */}
        <div className="bg-card border-b border-border py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                  Provider Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Manage your bookings and availability
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Available</span>
                  <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
                </div>
                <Button variant="outline" onClick={() => setShowSettings(!showSettings)}>
                  <Settings className="w-4 h-4 mr-2" /> Settings
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Approval Notice */}
          {!user.isApproved && (
            <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 mb-6">
              <p className="text-warning font-medium">
                Your account is pending admin approval. You won't receive bookings until approved.
              </p>
            </div>
          )}

          {/* Settings Panel */}
          {showSettings && (
            <div className="bg-card rounded-xl p-6 shadow-card mb-6">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                Availability Settings
              </h2>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-foreground mb-3">Available Time Slots</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => toggleSlot(slot)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        selectedSlots.includes(slot)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <Button onClick={() => {
                setShowSettings(false);
                toast({ title: 'Settings Saved', description: 'Your availability has been updated.' });
              }}>
                Save Changes
              </Button>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-xl p-5 shadow-card">
              <p className="text-muted-foreground text-sm mb-1">Pending</p>
              <p className="font-display text-2xl font-bold text-warning">{stats.pending}</p>
            </div>
            <div className="bg-card rounded-xl p-5 shadow-card">
              <p className="text-muted-foreground text-sm mb-1">Upcoming</p>
              <p className="font-display text-2xl font-bold text-info">{stats.accepted}</p>
            </div>
            <div className="bg-card rounded-xl p-5 shadow-card">
              <p className="text-muted-foreground text-sm mb-1">Completed</p>
              <p className="font-display text-2xl font-bold text-success">{stats.completed}</p>
            </div>
            <div className="bg-card rounded-xl p-5 shadow-card">
              <p className="text-muted-foreground text-sm mb-1">Earnings</p>
              <p className="font-display text-2xl font-bold text-primary">₹{stats.totalEarnings.toLocaleString()}</p>
            </div>
          </div>

          {/* Pending Requests Alert */}
          {pendingBookings.length > 0 && (
            <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 mb-6">
              <p className="text-foreground font-medium">
                You have {pendingBookings.length} pending booking request(s) waiting for your response.
              </p>
            </div>
          )}

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
                    {(['all', 'pending', 'accepted', 'completed', 'rejected'] as const).map((status) => (
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
                <h2 className="font-display text-xl font-semibold text-foreground">Booking Requests</h2>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      userRole="provider"
                      onAccept={handleAccept}
                      onReject={handleReject}
                    />
                  ))
                ) : (
                  <div className="bg-card rounded-xl p-8 shadow-card text-center">
                    <p className="text-muted-foreground">No bookings found.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Today's Schedule */}
              <div className="bg-card rounded-xl p-5 shadow-card">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Today's Schedule
                </h3>
                {todayBookings.length > 0 ? (
                  <div className="space-y-3">
                    {todayBookings.map((booking) => (
                      <div key={booking.id} className="p-3 bg-muted rounded-lg">
                        <p className="font-medium text-foreground text-sm">{booking.service}</p>
                        <p className="text-xs text-muted-foreground">{booking.customerName}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Clock className="w-3 h-3" />
                          {booking.timeSlot}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No appointments today</p>
                )}
              </div>

              {/* Profile Completion */}
              <div className="bg-card rounded-xl p-5 shadow-card">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Profile Tips
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-success">✓</span>
                    <span className="text-muted-foreground">Complete your profile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success">✓</span>
                    <span className="text-muted-foreground">Add your skills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">○</span>
                    <span className="text-muted-foreground">Upload portfolio photos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">○</span>
                    <span className="text-muted-foreground">Get more reviews</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProviderDashboard;
