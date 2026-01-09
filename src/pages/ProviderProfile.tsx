import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Star, MapPin, Clock, BadgeCheck, Calendar, ArrowLeft, 
  Phone, MessageCircle, Briefcase, CheckCircle 
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { providers, timeSlots, serviceCategories } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const ProviderProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const provider = providers.find(p => p.id === id);
  const category = serviceCategories.find(c => c.id === provider?.category);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);

  if (!provider) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Provider Not Found</h1>
          <Link to="/services">
            <Button>Browse Services</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleBooking = () => {
    if (!user) {
      toast({ title: 'Please login', description: 'You need to be logged in to book a service.', variant: 'destructive' });
      navigate('/auth');
      return;
    }

    if (!selectedDate || !selectedTime || !selectedService || !address) {
      toast({ title: 'Missing information', description: 'Please fill in all booking details.', variant: 'destructive' });
      return;
    }

    // In a real app, this would create a booking in the database
    toast({ 
      title: 'Booking Confirmed!', 
      description: `Your booking with ${provider.name} on ${selectedDate.toLocaleDateString()} at ${selectedTime} has been submitted.` 
    });
    
    navigate('/dashboard');
  };

  const reviews = [
    { id: 1, name: 'Amit S.', rating: 5, comment: 'Excellent work! Very professional and timely.', date: '2 days ago' },
    { id: 2, name: 'Priya M.', rating: 4, comment: 'Good service, completed the job well.', date: '1 week ago' },
    { id: 3, name: 'Rahul K.', rating: 5, comment: 'Highly recommended! Will hire again.', date: '2 weeks ago' },
  ];

  return (
    <Layout>
      <div className="bg-muted/50 min-h-screen">
        {/* Back Button */}
        <div className="bg-card border-b border-border py-4">
          <div className="container mx-auto px-4">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to services
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Provider Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Header */}
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <div className="flex flex-col sm:flex-row gap-6">
                  <img
                    src={provider.avatar}
                    alt={provider.name}
                    className="w-24 h-24 rounded-2xl bg-muted object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="font-display text-2xl font-bold text-foreground">{provider.name}</h1>
                      {provider.verified && <BadgeCheck className="w-6 h-6 text-primary" />}
                    </div>
                    <p className="text-muted-foreground mb-3">{category?.name}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-accent fill-accent" />
                        <strong>{provider.rating}</strong>
                        <span className="text-muted-foreground">({provider.reviews} reviews)</span>
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {provider.location}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Briefcase className="w-4 h-4" />
                        {provider.experience} years exp.
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-primary font-semibold text-xl">{provider.priceRange}</p>
                    <p className="text-sm text-muted-foreground">starting price</p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                  <div className="text-center">
                    <p className="font-display text-2xl font-bold text-foreground">{provider.completedJobs}</p>
                    <p className="text-sm text-muted-foreground">Jobs Done</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-2xl font-bold text-foreground">{provider.responseTime}</p>
                    <p className="text-sm text-muted-foreground">Response Time</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-2xl font-bold text-foreground">{provider.experience}+</p>
                    <p className="text-sm text-muted-foreground">Years Exp.</p>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">About</h2>
                <p className="text-muted-foreground">{provider.bio}</p>
              </div>

              {/* Skills */}
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">Services Offered</h2>
                <div className="flex flex-wrap gap-2">
                  {provider.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="py-2 px-4">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">Recent Reviews</h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="pb-4 border-b border-border last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{review.name}</span>
                          <div className="flex text-accent">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 shadow-card sticky top-24">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">Book This Provider</h2>
                
                {!provider.available ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">This provider is currently unavailable.</p>
                    <Button variant="outline" onClick={() => navigate('/services')}>
                      Find Other Providers
                    </Button>
                  </div>
                ) : !showBookingForm ? (
                  <div className="space-y-4">
                    <Button className="w-full" size="lg" onClick={() => setShowBookingForm(true)}>
                      Book Now
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <Phone className="w-4 h-4" /> Call Provider
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Service Selection */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Select Service *</label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full h-10 px-3 rounded-lg bg-background border border-input text-foreground"
                      >
                        <option value="">Choose a service</option>
                        {provider.skills.map((skill) => (
                          <option key={skill} value={skill}>{skill}</option>
                        ))}
                      </select>
                    </div>

                    {/* Calendar */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Select Date *</label>
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-lg border border-border"
                      />
                    </div>

                    {/* Time Slots */}
                    {selectedDate && (
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Select Time *</label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                                selectedTime === time
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Service Address *</label>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your complete address"
                        className="w-full h-20 px-3 py-2 rounded-lg bg-background border border-input text-foreground resize-none"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Additional Notes</label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any specific requirements?"
                        className="w-full h-16 px-3 py-2 rounded-lg bg-background border border-input text-foreground resize-none"
                      />
                    </div>

                    <div className="pt-4 border-t border-border space-y-3">
                      <Button className="w-full" size="lg" onClick={handleBooking}>
                        Confirm Booking
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full" 
                        onClick={() => setShowBookingForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProviderProfile;
