// Service Categories
export const serviceCategories = [
  {
    id: 'electrician',
    name: 'Electrician',
    icon: 'Zap',
    description: 'Wiring, repairs, installations',
    count: 85,
  },
  {
    id: 'plumber',
    name: 'Plumber',
    icon: 'Droplets',
    description: 'Pipes, leaks, installations',
    count: 72,
  },
  {
    id: 'mechanic',
    name: 'Mechanic',
    icon: 'Wrench',
    description: 'Vehicle repairs & service',
    count: 68,
  },
  {
    id: 'technician',
    name: 'Technician',
    icon: 'Monitor',
    description: 'AC, appliance repairs',
    count: 90,
  },
  {
    id: 'barber',
    name: 'Barber & Salon',
    icon: 'Scissors',
    description: 'Haircuts, styling, grooming',
    count: 65,
  },
  {
    id: 'freelancer',
    name: 'Freelancers',
    icon: 'Briefcase',
    description: 'Photography, design, writing',
    count: 45,
  },
];

// Locations
export const locations = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 
  'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Chandigarh', 'Gurgaon', 'Noida', 'Indore', 'Surat'
];

// First names and last names for generating providers
const firstNames = [
  'Rahul', 'Amit', 'Priya', 'Sunita', 'Vikram', 'Neha', 'Arun', 'Kavita', 
  'Sanjay', 'Pooja', 'Rajesh', 'Anita', 'Deepak', 'Meena', 'Suresh', 'Geeta',
  'Manoj', 'Rekha', 'Vikas', 'Seema', 'Ashok', 'Ritu', 'Mukesh', 'Shweta',
  'Naresh', 'Preeti', 'Rakesh', 'Nisha', 'Dinesh', 'Anjali', 'Sunil', 'Sapna',
  'Anil', 'Kiran', 'Prakash', 'Swati', 'Ramesh', 'Divya', 'Jagdish', 'Komal'
];

const lastNames = [
  'Sharma', 'Verma', 'Singh', 'Kumar', 'Gupta', 'Patel', 'Shah', 'Joshi',
  'Mehta', 'Rao', 'Reddy', 'Nair', 'Pillai', 'Iyer', 'Menon', 'Chatterjee',
  'Banerjee', 'Mukherjee', 'Das', 'Roy', 'Bose', 'Sen', 'Dutta', 'Ghosh',
  'Patil', 'Kulkarni', 'Deshmukh', 'Jadhav', 'More', 'Pawar', 'Sawant', 'Thakur'
];

// Skills by category
const skillsByCategory: Record<string, string[]> = {
  electrician: [
    'Wiring Installation', 'Circuit Repair', 'Switch & Socket Fitting', 
    'MCB Installation', 'Ceiling Fan Installation', 'LED Light Setup',
    'Inverter Installation', 'Generator Repair', 'Smart Home Setup',
    'Earthing Services', 'Electrical Safety Audit', 'Power Backup Solutions'
  ],
  plumber: [
    'Pipe Fitting', 'Leak Repair', 'Toilet Installation', 
    'Tap Repair', 'Water Tank Cleaning', 'Drain Cleaning',
    'Geyser Installation', 'Water Purifier Setup', 'Bathroom Renovation',
    'Sewage Line Repair', 'Pump Installation', 'Kitchen Plumbing'
  ],
  mechanic: [
    'Engine Repair', 'Brake Service', 'Oil Change', 
    'Tire Service', 'Battery Replacement', 'AC Repair',
    'Suspension Work', 'Clutch Repair', 'Transmission Service',
    'Denting & Painting', 'Car Washing', 'Full Vehicle Service'
  ],
  technician: [
    'AC Installation', 'AC Repair', 'Refrigerator Repair', 
    'Washing Machine Service', 'TV Repair', 'Microwave Repair',
    'Laptop Repair', 'Mobile Repair', 'Printer Service',
    'CCTV Installation', 'WiFi Setup', 'Smart Device Setup'
  ],
  barber: [
    'Haircut', 'Beard Styling', 'Hair Coloring', 
    'Facial', 'Head Massage', 'Hair Spa',
    'Bridal Makeup', 'Party Makeup', 'Manicure',
    'Pedicure', 'Threading', 'Waxing'
  ],
  freelancer: [
    'Photography', 'Videography', 'Graphic Design', 
    'Web Development', 'Content Writing', 'Social Media',
    'Event Planning', 'Interior Design', 'Music Production',
    'Translation', 'Tutoring', 'Personal Training'
  ],
};

// Generate random rating between 3.5 and 5
const getRandomRating = () => {
  return Math.round((3.5 + Math.random() * 1.5) * 10) / 10;
};

// Generate random reviews count
const getRandomReviews = () => {
  return Math.floor(10 + Math.random() * 490);
};

// Generate random price range
const getPriceRange = (category: string) => {
  const ranges: Record<string, { min: number; max: number }> = {
    electrician: { min: 200, max: 2000 },
    plumber: { min: 150, max: 1500 },
    mechanic: { min: 300, max: 5000 },
    technician: { min: 200, max: 3000 },
    barber: { min: 100, max: 2000 },
    freelancer: { min: 500, max: 10000 },
  };
  const range = ranges[category] || { min: 200, max: 2000 };
  return `₹${range.min} - ₹${range.max}`;
};

// Generate random experience years
const getRandomExperience = () => {
  return Math.floor(1 + Math.random() * 15);
};

// Time slots
export const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
];

// Generate providers
export interface Provider {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  experience: number;
  skills: string[];
  priceRange: string;
  available: boolean;
  verified: boolean;
  bio: string;
  completedJobs: number;
  responseTime: string;
  avatar: string;
}

const generateProviders = (): Provider[] => {
  const providers: Provider[] = [];
  let id = 1;

  serviceCategories.forEach((category) => {
    // Generate 70-80 providers per category
    const count = 70 + Math.floor(Math.random() * 10);
    
    for (let i = 0; i < count; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const skills = skillsByCategory[category.id];
      const selectedSkills = skills
        .sort(() => Math.random() - 0.5)
        .slice(0, 2 + Math.floor(Math.random() * 3));

      providers.push({
        id: `PRV${String(id).padStart(4, '0')}`,
        name: `${firstName} ${lastName}`,
        category: category.id,
        location,
        rating: getRandomRating(),
        reviews: getRandomReviews(),
        experience: getRandomExperience(),
        skills: selectedSkills,
        priceRange: getPriceRange(category.id),
        available: Math.random() > 0.2,
        verified: Math.random() > 0.3,
        bio: `Experienced ${category.name.toLowerCase()} with ${getRandomExperience()} years of expertise. Committed to quality service and customer satisfaction.`,
        completedJobs: Math.floor(50 + Math.random() * 500),
        responseTime: `${Math.floor(10 + Math.random() * 50)} mins`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}${id}`,
      });
      id++;
    }
  });

  return providers;
};

export const providers = generateProviders();

// Booking Status
export type BookingStatus = 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  providerId: string;
  providerName: string;
  service: string;
  category: string;
  date: string;
  timeSlot: string;
  status: BookingStatus;
  amount: number;
  address: string;
  notes: string;
  rating?: number;
  createdAt: string;
}

// Generate sample bookings
export const generateSampleBookings = (): Booking[] => {
  const statuses: BookingStatus[] = ['pending', 'accepted', 'rejected', 'completed', 'cancelled'];
  const bookings: Booking[] = [];

  for (let i = 1; i <= 50; i++) {
    const provider = providers[Math.floor(Math.random() * providers.length)];
    const category = serviceCategories.find(c => c.id === provider.category);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    bookings.push({
      id: `BKG${String(i).padStart(5, '0')}`,
      customerId: `USR${String(Math.floor(Math.random() * 100)).padStart(4, '0')}`,
      customerName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      providerId: provider.id,
      providerName: provider.name,
      service: provider.skills[0],
      category: category?.name || 'Service',
      date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      timeSlot: timeSlots[Math.floor(Math.random() * timeSlots.length)],
      status,
      amount: Math.floor(500 + Math.random() * 2000),
      address: `${Math.floor(1 + Math.random() * 500)}, Street ${Math.floor(1 + Math.random() * 50)}, ${provider.location}`,
      notes: 'Please bring necessary tools.',
      rating: status === 'completed' ? Math.floor(3 + Math.random() * 3) : undefined,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  return bookings;
};

export const sampleBookings = generateSampleBookings();

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'provider' | 'admin';
  phone?: string;
  location?: string;
  createdAt: string;
  isBlocked: boolean;
  isApproved?: boolean;
}

// Sample users
export const sampleUsers: User[] = [
  {
    id: 'USR0001',
    name: 'Demo Customer',
    email: 'customer@demo.com',
    role: 'customer',
    phone: '+91 9876543210',
    location: 'Mumbai',
    createdAt: '2024-01-15',
    isBlocked: false,
  },
  {
    id: 'PRV0001',
    name: 'Demo Provider',
    email: 'provider@demo.com',
    role: 'provider',
    phone: '+91 9876543211',
    location: 'Delhi',
    createdAt: '2024-01-10',
    isBlocked: false,
    isApproved: true,
  },
  {
    id: 'ADM0001',
    name: 'Admin User',
    email: 'admin@localx.com',
    role: 'admin',
    createdAt: '2024-01-01',
    isBlocked: false,
  },
];

// Analytics data
export const analyticsData = {
  totalUsers: 1250,
  totalProviders: 425,
  totalBookings: 3847,
  completedBookings: 2890,
  pendingBookings: 245,
  revenue: 1847500,
  weeklyBookings: [120, 145, 132, 168, 155, 189, 210],
  categoryDistribution: [
    { name: 'Electrician', value: 85, color: '#0d9488' },
    { name: 'Plumber', value: 72, color: '#f59e0b' },
    { name: 'Mechanic', value: 68, color: '#6366f1' },
    { name: 'Technician', value: 90, color: '#ec4899' },
    { name: 'Barber', value: 65, color: '#8b5cf6' },
    { name: 'Freelancer', value: 45, color: '#14b8a6' },
  ],
};
