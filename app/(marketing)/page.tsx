import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import AIShowcase from '@/components/sections/AIShowcase';
import Categories from '@/components/sections/Categories';
import FeaturedPackages from '@/components/sections/FeaturedPackages';
import HowItWorks from '@/components/sections/HowItWorks';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <AIShowcase />
      <Categories />
      <FeaturedPackages />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
