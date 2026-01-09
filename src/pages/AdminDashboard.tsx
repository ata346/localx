import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Briefcase, Calendar, DollarSign, Search, 
  CheckCircle, XCircle, Ban, UserCheck, BarChart3, TrendingUp 
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { 
  sampleBookings, providers, sampleUsers, analyticsData, 
  serviceCategories, User, Provider, Booking 
} from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [providersList, setProvidersList] = useState<Provider[]>(providers.slice(0, 50));
  const [bookings] = useState<Booking[]>(sampleBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleApproveProvider = (id: string) => {
    setProvidersList(providersList.map(p => 
      p.id === id ? { ...p, verified: true } : p
    ));
    toast({ title: 'Provider Approved', description: 'The provider can now receive bookings.' });
  };

  const handleRejectProvider = (id: string) => {
    setProvidersList(providersList.filter(p => p.id !== id));
    toast({ title: 'Provider Rejected', description: 'The provider has been removed.' });
  };

  const handleBlockUser = (id: string) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, isBlocked: !u.isBlocked } : u
    ));
    toast({ title: 'User Updated', description: 'User status has been changed.' });
  };

  const pendingProviders = providersList.filter(p => !p.verified);

  const filteredProviders = providersList.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) return null;

  return (
    <Layout>
      <div className="bg-muted/50 min-h-screen">
        {/* Header */}
        <div className="bg-card border-b border-border py-8">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage users, providers, and platform analytics
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-xl p-5 shadow-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm">Total Users</p>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{analyticsData.totalUsers}</p>
            </div>
            <div className="bg-card rounded-xl p-5 shadow-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-info" />
                </div>
                <p className="text-muted-foreground text-sm">Providers</p>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{analyticsData.totalProviders}</p>
            </div>
            <div className="bg-card rounded-xl p-5 shadow-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-success" />
                </div>
                <p className="text-muted-foreground text-sm">Total Bookings</p>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{analyticsData.totalBookings}</p>
            </div>
            <div className="bg-card rounded-xl p-5 shadow-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-warning" />
                </div>
                <p className="text-muted-foreground text-sm">Revenue</p>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">₹{(analyticsData.revenue / 1000).toFixed(0)}K</p>
            </div>
          </div>

          {/* Pending Approvals Alert */}
          {pendingProviders.length > 0 && (
            <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 mb-6">
              <p className="text-foreground font-medium">
                {pendingProviders.length} provider(s) are waiting for approval.
              </p>
            </div>
          )}

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-card p-1 h-auto flex flex-wrap gap-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Overview
              </TabsTrigger>
              <TabsTrigger value="providers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Providers
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Users
              </TabsTrigger>
              <TabsTrigger value="bookings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Bookings
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Category Distribution */}
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Providers by Category
                  </h3>
                  <div className="space-y-3">
                    {analyticsData.categoryDistribution.map((cat) => (
                      <div key={cat.name} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-foreground">{cat.name}</span>
                            <span className="text-muted-foreground">{cat.value}</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full" 
                              style={{ 
                                width: `${(cat.value / 100) * 100}%`,
                                backgroundColor: cat.color 
                              }} 
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly Trend */}
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Weekly Bookings
                  </h3>
                  <div className="flex items-end gap-2 h-40">
                    {analyticsData.weeklyBookings.map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-primary/20 rounded-t transition-all hover:bg-primary/40"
                          style={{ height: `${(value / Math.max(...analyticsData.weeklyBookings)) * 100}%` }}
                        />
                        <span className="text-xs text-muted-foreground mt-2">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-card rounded-xl p-6 shadow-card md:col-span-2">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Recent Bookings
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 text-sm font-medium text-muted-foreground">ID</th>
                          <th className="text-left py-3 text-sm font-medium text-muted-foreground">Customer</th>
                          <th className="text-left py-3 text-sm font-medium text-muted-foreground">Service</th>
                          <th className="text-left py-3 text-sm font-medium text-muted-foreground">Date</th>
                          <th className="text-left py-3 text-sm font-medium text-muted-foreground">Status</th>
                          <th className="text-left py-3 text-sm font-medium text-muted-foreground">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.slice(0, 5).map((booking) => (
                          <tr key={booking.id} className="border-b border-border/50">
                            <td className="py-3 text-sm text-foreground">{booking.id}</td>
                            <td className="py-3 text-sm text-foreground">{booking.customerName}</td>
                            <td className="py-3 text-sm text-foreground">{booking.service}</td>
                            <td className="py-3 text-sm text-muted-foreground">{booking.date}</td>
                            <td className="py-3">
                              <Badge variant="secondary" className="capitalize">{booking.status}</Badge>
                            </td>
                            <td className="py-3 text-sm font-medium text-primary">₹{booking.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Providers Tab */}
            <TabsContent value="providers" className="space-y-6">
              <div className="bg-card rounded-xl p-4 shadow-card">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search providers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {pendingProviders.length > 0 && (
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Pending Approvals ({pendingProviders.length})
                  </h3>
                  <div className="space-y-3">
                    {pendingProviders.slice(0, 5).map((provider) => (
                      <div key={provider.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <img src={provider.avatar} alt="" className="w-10 h-10 rounded-lg" />
                          <div>
                            <p className="font-medium text-foreground">{provider.name}</p>
                            <p className="text-sm text-muted-foreground">{provider.location} • {serviceCategories.find(c => c.id === provider.category)?.name}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="success" onClick={() => handleApproveProvider(provider.id)}>
                            <CheckCircle className="w-4 h-4 mr-1" /> Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleRejectProvider(provider.id)}>
                            <XCircle className="w-4 h-4 mr-1" /> Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-card rounded-xl p-6 shadow-card">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  All Providers ({filteredProviders.length})
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Provider</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Category</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Location</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Rating</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProviders.slice(0, 10).map((provider) => (
                        <tr key={provider.id} className="border-b border-border/50">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <img src={provider.avatar} alt="" className="w-8 h-8 rounded-lg" />
                              <span className="text-sm text-foreground">{provider.name}</span>
                            </div>
                          </td>
                          <td className="py-3 text-sm text-muted-foreground">
                            {serviceCategories.find(c => c.id === provider.category)?.name}
                          </td>
                          <td className="py-3 text-sm text-muted-foreground">{provider.location}</td>
                          <td className="py-3 text-sm text-foreground">⭐ {provider.rating}</td>
                          <td className="py-3">
                            <Badge variant={provider.verified ? 'default' : 'secondary'}>
                              {provider.verified ? 'Verified' : 'Pending'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <div className="bg-card rounded-xl p-4 shadow-card">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-card">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  User Management
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Name</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Email</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Role</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="border-b border-border/50">
                          <td className="py-3 text-sm text-foreground">{u.name}</td>
                          <td className="py-3 text-sm text-muted-foreground">{u.email}</td>
                          <td className="py-3">
                            <Badge variant="secondary" className="capitalize">{u.role}</Badge>
                          </td>
                          <td className="py-3">
                            <Badge variant={u.isBlocked ? 'destructive' : 'default'}>
                              {u.isBlocked ? 'Blocked' : 'Active'}
                            </Badge>
                          </td>
                          <td className="py-3">
                            {u.role !== 'admin' && (
                              <Button 
                                size="sm" 
                                variant={u.isBlocked ? 'success' : 'destructive'}
                                onClick={() => handleBlockUser(u.id)}
                              >
                                {u.isBlocked ? <UserCheck className="w-4 h-4 mr-1" /> : <Ban className="w-4 h-4 mr-1" />}
                                {u.isBlocked ? 'Unblock' : 'Block'}
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              <div className="bg-card rounded-xl p-6 shadow-card">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  All Bookings
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">ID</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Customer</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Provider</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Service</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-border/50">
                          <td className="py-3 text-sm text-foreground">{booking.id}</td>
                          <td className="py-3 text-sm text-foreground">{booking.customerName}</td>
                          <td className="py-3 text-sm text-foreground">{booking.providerName}</td>
                          <td className="py-3 text-sm text-muted-foreground">{booking.service}</td>
                          <td className="py-3 text-sm text-muted-foreground">{booking.date}</td>
                          <td className="py-3">
                            <Badge variant="secondary" className="capitalize">{booking.status}</Badge>
                          </td>
                          <td className="py-3 text-sm font-medium text-primary">₹{booking.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
