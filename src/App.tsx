import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingAsk } from '@/components/FloatingAsk';
import Velaris from '@/components/ui/velaris';
import { HomePage } from '@/pages/HomePage';
import { StandardsPage } from '@/pages/StandardsPage';
import { StandardDetailPage } from '@/pages/StandardDetailPage';
import { AskPage } from '@/pages/AskPage';
import { BISServicesPage } from '@/pages/BISServicesPage';
import { TestingLabsPage } from '@/pages/TestingLabsPage';
import { CompliancePage } from '@/pages/CompliancePage';
import { ResourcesPage } from '@/pages/ResourcesPage';

function NotFoundPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
      <h1 className="font-display text-4xl font-bold text-white mb-3">404</h1>
      <p className="muted mb-6">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn-primary">Go home</a>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="relative min-h-screen overflow-x-hidden">
          <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -20 }}>
            <Velaris
              bg="#020617"
              colors={['#0f172a', '#1d4ed8', '#2563eb', '#06b6d4']}
              speed={3}
              grain={0.15}
              height="100vh"
            />
          </div>
          <div className="fixed inset-0 pointer-events-none bg-slate-950/30" style={{ zIndex: -10 }} />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/standards" element={<StandardsPage />} />
                <Route path="/standards/:id" element={<StandardDetailPage />} />
                <Route path="/ask" element={<AskPage />} />
                <Route path="/bis-services" element={<BISServicesPage />} />
                <Route path="/testing-labs" element={<TestingLabsPage />} />
                <Route path="/compliance" element={<CompliancePage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
            <FloatingAsk />
          </div>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
