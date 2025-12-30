import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Sidebar from './components/Navigation/Sidebar';
import HomePage from './pages/HomePage';
import ArchitectureDetailPage from './pages/ArchitectureDetailPage';
import ComparisonPage from './pages/ComparisonPage';
import LearningPathsPage from './pages/LearningPathsPage';
import SearchPage from './pages/SearchPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProgressProvider } from './contexts/ProgressContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider>
      <ProgressProvider>
        <Router>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <Navigation onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

            <div className="flex">
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

              <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
                <div className="container mx-auto px-4 py-6 max-w-7xl">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/architecture/:id" element={<ArchitectureDetailPage />} />
                    <Route path="/compare" element={<ComparisonPage />} />
                    <Route path="/learning-paths" element={<LearningPathsPage />} />
                    <Route path="/search" element={<SearchPage />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
        </Router>
      </ProgressProvider>
    </ThemeProvider>
  );
}

export default App;
