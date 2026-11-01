import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AIAssistantChat } from './components/AIAssistantChat';
import { Home } from './pages/Home';
import { PlanEvent } from './pages/PlanEvent';
import { AIEventPlanner } from './pages/AIEventPlanner';
import { BudgetPlanner } from './pages/BudgetPlanner';
import { EventTimeline } from './pages/EventTimeline';
import { VendorChecklist } from './pages/VendorChecklist';
import { MyEvents } from './pages/MyEvents';
import { AboutUs } from './pages/AboutUs';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-navy-900 selection:bg-lavender-200 selection:text-lavender-900">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={<PlanEvent />} />
          <Route path="/ai-planner" element={<AIEventPlanner />} />
          <Route path="/budget" element={<BudgetPlanner />} />
          <Route path="/timeline" element={<EventTimeline />} />
          <Route path="/vendors" element={<VendorChecklist />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/about" element={<AboutUs />} />
          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      {/* Floating AI Chat Assistant */}
      <AIAssistantChat />
    </div>
  );
};

