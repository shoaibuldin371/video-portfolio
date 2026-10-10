import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { AIVideoGallery } from './components/AIVideoGallery';
import { Experience } from './components/Experience';
import { Tools } from './components/Tools';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';

export function App() {
  const [activeVideoModal, setActiveVideoModal] = useState<{
    isOpen: boolean;
    video: {
      title: string;
      category?: string;
      description?: string;
      src: string;
      poster?: string | null;
      tags?: string[];
    } | null;
  }>({
    isOpen: false,
    video: null
  });

  const openVideoModal = (video: {
    title: string;
    category?: string;
    description?: string;
    src: string;
    poster?: string | null;
    tags?: string[];
  }) => {
    setActiveVideoModal({
      isOpen: true,
      video
    });
  };

  const closeVideoModal = () => {
    setActiveVideoModal(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Skills & Expertise Section */}
      <Skills />

      {/* Featured Projects Section */}
      <Projects onOpenVideoModal={openVideoModal} />

      {/* Dedicated AI Video Gallery Section */}
      <AIVideoGallery onOpenVideoModal={openVideoModal} />

      {/* Professional Experience Section */}
      <Experience />

      {/* Tools & Technologies Section */}
      <Tools />

      {/* Contact Section */}
      <Contact />

      {/* Footer Section */}
      <Footer />

      {/* Global Video Modal Player */}
      <VideoModal
        isOpen={activeVideoModal.isOpen}
        onClose={closeVideoModal}
        video={activeVideoModal.video}
      />
    </div>
  );
}

export default App;
