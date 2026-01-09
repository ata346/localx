import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Target, Users, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Every provider is verified and background-checked for your peace of mind.',
    },
    {
      icon: Target,
      title: 'Quality First',
      description: 'We maintain high standards and only work with skilled professionals.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Building strong relationships between customers and local service providers.',
    },
    {
      icon: Heart,
      title: 'Customer Focused',
      description: 'Your satisfaction is our priority. We\'re here to help 24/7.',
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero text-card py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            About LOCAL X
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Connecting communities with trusted local service professionals. Making everyday services simple, reliable, and affordable.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              LOCAL X was founded with a simple mission: to make quality local services accessible to everyone. 
              We believe that finding a reliable electrician, plumber, or mechanic shouldn't be a hassle. 
              Our platform connects you with verified professionals in your area, ensuring quality service 
              at fair prices.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-card rounded-2xl p-6 shadow-card text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of satisfied customers who trust LOCAL X for their service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services">
              <Button size="lg">Browse Services</Button>
            </Link>
            <Link to="/auth?mode=register&role=provider">
              <Button size="lg" variant="outline">Become a Provider</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
