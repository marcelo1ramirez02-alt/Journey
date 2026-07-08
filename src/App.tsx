import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OnboardingForm from './components/OnboardingForm';
import RoadmapView from './components/RoadmapView';
import ComparisonCards from './components/ComparisonCards';
import ValueProps from './components/ValueProps';
import BetaForm from './components/BetaForm';
import Footer from './components/Footer';
import { OnboardingData, BetaUserLead } from './types';
import { Sparkles, Compass, Map, UserCheck } from 'lucide-react';

export default function App() {
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [onboardingActive, setOnboardingActive] = useState<boolean>(false);
  const [registeredCount, setRegisteredCount] = useState<number>(148);

  // Sync count on mount from localStorage
  useEffect(() => {
    const savedLeads = localStorage.getItem('journey_beta_leads');
    if (savedLeads) {
      try {
        const leads = JSON.parse(savedLeads);
        if (Array.isArray(leads)) {
          setRegisteredCount(148 + leads.length);
        }
      } catch (e) {
        console.error(e);
      }
    }
    
    // Check if user already completed onboarding previously to keep state
    const savedProfile = localStorage.getItem('journey_user_profile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setOnboardingData(profile);
        setOnboardingCompleted(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleStartOnboarding = () => {
    setOnboardingActive(true);
    // Smooth scroll down to form container
    const element = document.getElementById('onboarding-anchor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      setTimeout(() => {
        const retryElement = document.getElementById('onboarding-anchor');
        retryElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handleOnboardingSubmit = (data: OnboardingData) => {
    setOnboardingData(data);
    setOnboardingCompleted(true);
    setOnboardingActive(false);
    localStorage.setItem('journey_user_profile', JSON.stringify(data));
    
    // Save onboarding user as a beta lead too if they aren't already
    const savedLeadsRaw = localStorage.getItem('journey_beta_leads');
    let leads: BetaUserLead[] = [];
    if (savedLeadsRaw) {
      try {
        leads = JSON.parse(savedLeadsRaw);
      } catch (e) {}
    }
    
    const exists = leads.some(l => l.email.toLowerCase() === data.email.toLowerCase());
    if (!exists) {
      const newLead: BetaUserLead = {
        fullName: data.fullName,
        email: data.email,
        career: data.career,
        registeredAt: new Date().toISOString()
      };
      leads.push(newLead);
      localStorage.setItem('journey_beta_leads', JSON.stringify(leads));
      setRegisteredCount(148 + leads.length);
    }

    // Smooth scroll to top to see their roadmap immediately
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetProfile = () => {
    setOnboardingCompleted(false);
    setOnboardingActive(true);
    setOnboardingData(null);
    localStorage.removeItem('journey_user_profile');
    setTimeout(() => {
      document.getElementById('onboarding-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleJoinBetaSuccess = (newLead: BetaUserLead) => {
    const savedLeadsRaw = localStorage.getItem('journey_beta_leads');
    let leads: BetaUserLead[] = [];
    if (savedLeadsRaw) {
      try {
        leads = JSON.parse(savedLeadsRaw);
      } catch (e) {}
    }

    const exists = leads.some(l => l.email.toLowerCase() === newLead.email.toLowerCase());
    if (!exists) {
      leads.push(newLead);
      localStorage.setItem('journey_beta_leads', JSON.stringify(leads));
      setRegisteredCount(148 + leads.length);
    }
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-[#F3F4F6] font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Navbar header */}
      <Navbar 
        onStartOnboarding={handleStartOnboarding} 
        onScrollToSection={handleScrollToSection}
        registeredCount={registeredCount}
      />

      {/* Main Container */}
      <main className="pb-12">
        
        {/* Dynamic upper viewport switcher */}
        {!onboardingCompleted ? (
          <>
            {/* Standard Landing Hero view */}
            <Hero 
              onStartOnboarding={handleStartOnboarding} 
              onExploreCaminos={() => handleScrollToSection('comparador')}
            />

            {/* Onboarding Wizard Portal */}
            <div id="onboarding-anchor" className="scroll-mt-20 py-8 px-4 max-w-7xl mx-auto">
              {onboardingActive && (
                <div className="py-8">
                  <div className="text-center max-w-2xl mx-auto mb-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/40 border border-indigo-800/30 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '3s' }} />
                      Configurador Inteligente
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
                      Estás a un paso de estructurar tu futuro
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm mt-2">
                      Ingresa tus datos básicos para poder guardar tu progreso y personalizar las métricas del árbol de carrera.
                    </p>
                  </div>

                  <OnboardingForm 
                    onSubmit={handleOnboardingSubmit} 
                    onCancel={() => setOnboardingActive(false)}
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          /* Roadmap Interactive Visualization View */
          <div className="pt-20 scroll-mt-20">
            <RoadmapView 
              onboardingData={onboardingData!} 
              onReset={handleResetProfile}
            />
          </div>
        )}

        {/* Section 4: Tarjetas comparativas */}
        <ComparisonCards />

        {/* Section 5: Propuesta de valor */}
        <ValueProps />

        {/* Section 6: Sección de validación CTA */}
        <BetaForm 
          onGenerateRoadmap={handleStartOnboarding} 
          registeredCount={registeredCount}
        />

      </main>

      {/* Section 7: Footer */}
      <Footer 
        onScrollToSection={handleScrollToSection} 
        onStartOnboarding={handleStartOnboarding}
      />

    </div>
  );
}
