import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProviderCard from '@/components/cards/ProviderCard';
import ServiceCard from '@/components/cards/ServiceCard';
import { providers, serviceCategories, locations } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

const Services: React.FC = () => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('loc') || '');
  const [selectedCategory, setSelectedCategory] = useState(categoryId || '');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'experience'>('rating');
  const [showFilters, setShowFilters] = useState(false);

  const currentCategory = serviceCategories.find(c => c.id === selectedCategory);

  const filteredProviders = useMemo(() => {
    let result = [...providers];

    // Filter by category
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by location
    if (selectedLocation) {
      result = result.filter(p => p.location === selectedLocation);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.skills.some(s => s.toLowerCase().includes(query))
      );
    }

    // Only show available & verified
    result = result.filter(p => p.available);

    // Sort
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'experience':
        result.sort((a, b) => b.experience - a.experience);
        break;
    }

    return result;
  }, [selectedCategory, selectedLocation, searchQuery, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('');
    setSelectedCategory('');
  };

  const hasActiveFilters = searchQuery || selectedLocation || selectedCategory;

  return (
    <Layout>
      <div className="bg-muted/50 min-h-screen">
        {/* Header */}
        <div className="bg-card border-b border-border py-8">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {currentCategory ? currentCategory.name : 'All Services'}
            </h1>
            <p className="text-muted-foreground">
              {filteredProviders.length} providers available
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search & Filters */}
          <div className="bg-card rounded-xl p-4 shadow-card mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name or skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="h-10 px-4 rounded-lg bg-background border border-input text-foreground focus:ring-2 focus:ring-ring"
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2 md:hidden"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </div>

            {/* Category & Sort (Desktop) */}
            <div className={`mt-4 pt-4 border-t border-border ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={!selectedCategory ? 'default' : 'secondary'}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory('')}
                  >
                    All
                  </Badge>
                  {serviceCategories.map((cat) => (
                    <Badge
                      key={cat.id}
                      variant={selectedCategory === cat.id ? 'default' : 'secondary'}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.name}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 md:ml-auto">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="h-9 px-3 rounded-md bg-background border border-input text-sm"
                  >
                    <option value="rating">Top Rated</option>
                    <option value="reviews">Most Reviews</option>
                    <option value="experience">Experience</option>
                  </select>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-destructive">
                    <X className="w-4 h-4" /> Clear all
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* No Category Selected - Show Categories */}
          {!selectedCategory && !searchQuery && !selectedLocation && (
            <div className="mb-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Browse by Category</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {serviceCategories.map((service) => (
                  <div key={service.id} onClick={() => setSelectedCategory(service.id)} className="cursor-pointer">
                    <ServiceCard {...service} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Providers Grid */}
          {(selectedCategory || searchQuery || selectedLocation) && (
            <>
              {filteredProviders.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProviders.map((provider) => (
                    <ProviderCard key={provider.id} provider={provider} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg mb-4">No providers found matching your criteria.</p>
                  <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Services;
