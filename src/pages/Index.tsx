import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Shield, Clock, Star, Users } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ServiceCard from '@/components/cards/ServiceCard';
import ProviderCard from '@/components/cards/ProviderCard';
import { serviceCategories, providers, locations } from '@/data/mockData';

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedLocation, setSelectedLocation] = React.useState('');

  const topProviders = providers.filter(p => p.verified && p.rating >= 4.5).slice(0, 6);

  const features = [
    {
      icon: Shield,
      title: 'Verified Professionals',
      description: 'All providers are verified and background-checked for your safety.',
    },
    {
      icon: Clock,
      title: 'Quick Booking',
      description: 'Book services in under 2 minutes with our streamlined process.',
    },
    {
      icon: Star,
      title: 'Quality Guaranteed',
      description: 'Rated and reviewed by thousands of satisfied customers.',
    },
    {
      icon: Users,
      title: '400+ Providers',
      description: 'Choose from a wide network of skilled professionals near you.',
    },
  ];

  const stats = [
    { value: '425+', label: 'Service Providers' },
    { value: '3.8K+', label: 'Completed Bookings' },
    { value: '15+', label: 'Cities' },
    { value: '4.8', label: 'Avg Rating' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative gradient-hero text-card overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Book Local Services
              <span className="block text-accent">In Minutes</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Connect with verified electricians, plumbers, mechanics, and more. Fast, reliable, and trusted by thousands.
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto bg-card rounded-2xl p-4 shadow-elevated animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="What service do you need?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-muted border-0 text-foreground"
                />
              </div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="h-12 px-4 rounded-lg bg-muted border-0 text-foreground focus:ring-2 focus:ring-primary"
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <Link to={`/services${searchQuery ? `?q=${searchQuery}` : ''}${selectedLocation ? `&loc=${selectedLocation}` : ''}`}>
                <Button size="lg" className="w-full md:w-auto h-12 px-8">
                  Search
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-y border-border py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through our wide range of professional services. All providers are verified and rated by customers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose LOCAL X?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best local service experience with trust, quality, and convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-card rounded-2xl p-6 shadow-card text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Providers */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Top Rated Providers
              </h2>
              <p className="text-muted-foreground">
                Our highest-rated professionals with excellent customer reviews
              </p>
            </div>
            <Link to="/services" className="hidden md:flex items-center gap-2 text-primary font-medium hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link to="/services">
              <Button variant="outline" className="gap-2">
                View All Providers <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 gradient-hero text-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust LOCAL X for their service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth?mode=register">
              <Button size="xl" variant="accent" className="w-full sm:w-auto">
                Book a Service
              </Button>
            </Link>
            <Link to="/auth?mode=register&role=provider">
              <Button size="xl" variant="heroOutline" className="w-full sm:w-auto">
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
