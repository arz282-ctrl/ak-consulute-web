import Navigation from '@/components/Navigation';
import { HeroSection } from '@/components/ui/hero-section-2';
import About from '@/components/About';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen" style={{ overflowX: 'clip' }}>
      <HeroSection
        id="top"
        slogan="Legal Consultant · In Practice Since 2004"
        title={
          <>
            <span className="md:whitespace-nowrap">
              Experienced <span className="text-primary">&amp;</span> Authorized
            </span>
            <br />
            <span className="text-primary">Legal Mentor</span>
          </>
        }
        subtitle="Personalized, fixed-fee counsel across Immigration, Family Law, Conveyancing and more — treating every case, however big or small, like it matters. Multilingual support in English & Bengali."
        callToAction={{
          text: 'BOOK A CONSULTATION',
          href: '/book',
        }}
        backgroundImage="/images/ak-avatar.png"
        contactInfo={{
          website: 'akconsultant.uk',
          phone: '+44 7459 641859',
          address: '432 Green Street, London, E13 9JJ',
        }}
      />
      <About />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
      <Footer />
      </main>
    </>
  );
}
