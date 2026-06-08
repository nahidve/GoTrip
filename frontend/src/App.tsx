/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useAppStore } from './store';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import FloatingDock from './components/FloatingDock';
import { motion, AnimatePresence } from 'motion/react';

// Import pages
import Home from './pages/Home';
import Amalfi from './pages/Amalfi';
import Itinerary from './pages/Itinerary';
import Stays from './pages/Stays';
import Hotel from './pages/Hotel';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import Dispatch from './pages/Dispatch';
import About from './pages/About';
import Support from './pages/Support';

export default function App() {
  const activePage = useAppStore((state) => state.activePage);
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Set initial scroll restoration
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  // Render current active subpage
  const renderPageComponent = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'amalfi':
        return <Amalfi />;
      case 'itinerary':
        return <Itinerary />;
      case 'stays':
        return <Stays />;
      case 'hotel':
        return <Hotel />;
      case 'checkout':
        return <Checkout />;
      case 'dashboard':
        return <Dashboard />;
      case 'dispatch':
        return <Dispatch />;
      case 'about':
        return <About />;
      case 'support':
        return <Support />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] dark:bg-[#0A0A09] text-black dark:text-[#FDFBF7] selection:bg-[#E2FF00] selection:text-black transition-colors duration-500">
      {/* Branded Loading sequence */}
      <AnimatePresence>
        {isAppLoading && <Loader onComplete={() => setIsAppLoading(false)} />}
      </AnimatePresence>

      {!isAppLoading && (
        <>
          {/* Immersive Custom Cursor */}
          <CustomCursor />

          {/* Common Navigation Header */}
          <Header />

          {/* Interactive Floating Dock Navigation */}
          <FloatingDock />

          {/* Cinematic Page Transitions */}
          <main className="min-h-[75vh] relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, filter: 'blur(8px)', y: 15 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, filter: 'blur(6px)', y: -15 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {renderPageComponent()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Common Brand Footer (Hidden on dual-pane maps search for optimal layout spacing) */}
          {activePage !== 'stays' && <Footer />}
        </>
      )}
    </div>
  );
}

