import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Sidebar from './components/Navigation/Sidebar';
import HomePage from './pages/HomePage';
import ArchitectureDetailPage from './pages/ArchitectureDetailPage';
import ComparisonPage from './pages/ComparisonPage';
import LearningPathsPage from './pages/LearningPathsPage';
import SearchPage from './pages/SearchPage';
import FeedforwardNetworksPage from './pages/FeedforwardNetworksPage';
import ConvolutionalNetworksPage from './pages/ConvolutionalNetworksPage';
import RecurrentNetworksPage from './pages/RecurrentNetworksPage';
import TransformersPage from './pages/TransformersPage';
import AutoencodersPage from './pages/AutoencodersPage';
import GenerativeModelsPage from './pages/GenerativeModelsPage';
import GraphNeuralNetworksPage from './pages/GraphNeuralNetworksPage';
import ReinforcementLearningPage from './pages/ReinforcementLearningPage';
import EnergyBasedModelsPage from './pages/EnergyBasedModelsPage';
import SpikingNeuromorphicPage from './pages/SpikingNeuromorphicPage';
import HybridSpecializedPage from './pages/HybridSpecializedPage';
import SelfSupervisedPage from './pages/SelfSupervisedPage';
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
                    <Route path="/category/feedforward" element={<FeedforwardNetworksPage />} />
                    <Route path="/category/cnn" element={<ConvolutionalNetworksPage />} />
                    <Route path="/category/rnn" element={<RecurrentNetworksPage />} />
                    <Route path="/category/transformer" element={<TransformersPage />} />
                    <Route path="/category/autoencoder" element={<AutoencodersPage />} />
                    <Route path="/category/generative" element={<GenerativeModelsPage />} />
                    <Route path="/category/graph" element={<GraphNeuralNetworksPage />} />
                    <Route path="/category/reinforcement-learning" element={<ReinforcementLearningPage />} />
                    <Route path="/category/energy-based" element={<EnergyBasedModelsPage />} />
                    <Route path="/category/spiking" element={<SpikingNeuromorphicPage />} />
                    <Route path="/category/hybrid" element={<HybridSpecializedPage />} />
                    <Route path="/category/self-supervised" element={<SelfSupervisedPage />} />
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
