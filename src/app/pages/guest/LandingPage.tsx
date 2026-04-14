import { useState } from 'react';
import { useScroll, useTransform } from 'motion/react';
import { Navbar } from '../../components/Navbar';
import { Hero } from '../../components/Hero';
import { Story } from '../../components/Story';
import { WhyKhurpatal } from '../../components/WhyKhurpatal';
import { Rooms } from '../../components/Rooms';
import { Amenities } from '../../components/Amenities';
import { Gallery } from '../../components/Gallery';
import { Testimonials } from '../../components/Testimonials';
import { Experiences } from '../../components/Experiences';
import { FinalCTA } from '../../components/FinalCTA';
import { HighlightsSection } from '../../components/HighlightsSection';
import { EssentialsSection } from '../../components/EssentialsSection';
import { DiningSection } from '../../components/DiningSection';
import { WellnessSection } from '../../components/WellnessSection';
import { LocationSection } from '../../components/LocationSection';
import { FAQSection } from '../../components/FAQSection';
import { Footer } from '../../components/Footer';
import { MyBookingsModal } from '../../components/MyBookingsModal';
import { useBookingFlow } from '../../hooks/useBookingFlow';
import { BookingFlowModal } from '../../components/booking/BookingFlowModal';
import { AIChatAssistant } from '../../components/AIChatAssistant';
import { StoryMode } from '../../components/StoryMode';
import { PlanStaySection } from '../../components/PlanStaySection';

export function LandingPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const bookingFlow = useBookingFlow();
  const { openFlow, closeFlow, isOpen, checkAvailability } = bookingFlow;

  const handleBookNow = async (data?: any) => {
    if (data && data.checkIn) {
      // If data comes from Hero, pre-check availability
      await checkAvailability(data);
      openFlow(data, 'rooms');
    } else {
      openFlow();
    }
  };

  return (
    <div className="size-full bg-[#FBF6EE] overflow-x-hidden">
      <Navbar 
        onMyBookingsClick={() => setIsMyBookingsOpen(true)} 
        onBookNow={() => handleBookNow()}
      />
      <div id="home">
        <Hero 
          flow={bookingFlow} 
          onBookNow={handleBookNow}
        />
      </div>
      <HighlightsSection />
      <PlanStaySection 
        flow={bookingFlow}
        onStartConversation={() => setIsChatOpen(true)}
      />
      <Story />
      <WhyKhurpatal />
      <EssentialsSection />
      <div id="rooms">
        <Rooms onBookRoom={(room) => openFlow({ selectedRoom: room }, 'dates')} />
      </div>
      <DiningSection />
      <WellnessSection />
      <Amenities />
      <LocationSection />
      <Experiences />
      <Gallery />
      <Testimonials />
      <FAQSection onContactConcierge={() => setIsChatOpen(true)} />
      <div id="contact">
        <FinalCTA onBookNow={() => openFlow()} />
      </div>
      <Footer onContactConcierge={() => setIsChatOpen(true)} />

      {/* Global Interactive Overlays */}
      <AIChatAssistant 
        flow={bookingFlow}
        isOpen={isChatOpen}
        setIsOpen={setIsChatOpen}
      />
      <StoryMode />

      {/* Modals */}
      <BookingFlowModal 
        isOpen={isOpen}
        onClose={closeFlow}
        flow={bookingFlow}
      />

      <MyBookingsModal 
        isOpen={isMyBookingsOpen} 
        onClose={() => setIsMyBookingsOpen(false)} 
      />
    </div>
  );
}