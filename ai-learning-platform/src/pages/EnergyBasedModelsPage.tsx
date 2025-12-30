import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import EnergyBasedPlayground from '../components/InteractiveDemo/EnergyBasedPlayground';
import { getArchitecturesByCategory } from '../data/architectures';

export default function EnergyBasedModelsPage() {
  const { progress } = useProgress();
  const architectures = getArchitecturesByCategory('energy-based');

  const getCompletedCount = () => {
    return architectures.filter(arch => progress.learnedArchitectures.includes(arch.id)).length;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-500 to-orange-500 dark:from-blue-900 dark:via-purple-900 dark:to-orange-900 rounded-2xl shadow-xl">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Energy-Based Models</h1>
              <p className="text-purple-100 mt-1">Learning through energy landscapes and probabilistic reasoning</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold text-white">{architectures.length}</div>
              <div className="text-purple-100 text-sm">Architectures</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold text-white">{getCompletedCount()}/{architectures.length}</div>
              <div className="text-purple-100 text-sm">Completed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold text-white">1982-2020</div>
              <div className="text-purple-100 text-sm">Era Span</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
            Energy Minimization
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Models assign low energy to plausible data, high energy to implausible. Training pushes down energy on
            real data (positive phase) and up on model samples (negative phase). Equilibrium = learning.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-2">
            MCMC Sampling
          </h3>
          <p className="text-sm text-purple-700 dark:text-purple-400">
            Generate samples via Markov Chain Monte Carlo (Gibbs sampling, Langevin dynamics). Iteratively refine
            random noise toward low-energy configurations. Slow but theoretically grounded.
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-300 mb-2">
            Partition Function Challenge
          </h3>
          <p className="text-sm text-orange-700 dark:text-orange-400">
            Computing Z = Σ exp(-E(x)) is intractable (sum over all states). Contrastive divergence (CD) and
            noise contrastive estimation (NCE) approximate gradients without computing Z.
          </p>
        </div>
      </div>

      {/* Interactive Playground */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Interactive Energy-Based Playground
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Compare EBM, RBM, and Hopfield networks. Adjust energy landscape parameters and see their impact
            on training dynamics, convergence, and memory capacity.
          </p>
        </div>
        <EnergyBasedPlayground />
      </div>

      {/* Architecture Cards */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Core Energy-Based Architectures</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {architectures.map((arch) => {
            const isCompleted = progress.learnedArchitectures.includes(arch.id);
            return (
              <Link
                key={arch.id}
                to={`/architecture/${arch.id}`}
                className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-slate-200 dark:border-slate-700"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {arch.name}
                    </h3>
                    {isCompleted && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium rounded">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {arch.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {arch.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Evolution of Energy-Based Models</h2>
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
            </div>
            <div className="flex-1 pb-8">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">1982</span>
                  <span className="text-yellow-500">★</span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Hopfield Networks</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  John Hopfield introduces recurrent networks with symmetric weights for associative memory.
                  Energy function guarantees convergence to fixed points (attractors).
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <div className="w-0.5 h-full bg-gradient-to-b from-purple-500 to-pink-500"></div>
            </div>
            <div className="flex-1 pb-8">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">1986-2006</span>
                  <span className="text-yellow-500">★</span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">RBMs & Deep Belief Networks</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Restricted Boltzmann Machines enable efficient training via CD. Hinton's DBNs (2006) use stacked
                  RBMs for pre-training, launching the deep learning revolution.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              <div className="w-0.5 h-full bg-gradient-to-b from-pink-500 to-orange-500"></div>
            </div>
            <div className="flex-1 pb-8">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-pink-600 dark:text-pink-400">2019-2020</span>
                  <span className="text-yellow-500">★</span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Modern EBMs</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  IGEBM (NeurIPS 2019) and JEM (ICLR 2020) revive EBMs with improved MCMC and hybrid
                  classification-generation. Match GAN quality while enabling OOD detection.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            </div>
            <div className="flex-1">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-orange-600 dark:text-orange-400">2020</span>
                  <span className="text-yellow-500">★</span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Hopfield Networks = Attention</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Modern Hopfield networks (Ramsauer et al.) proven equivalent to Transformer attention. Exponential
                  storage capacity enables associative memory at scale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Recommended Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2 mt-2">
              Start with Hopfield Networks
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-400 mb-4">
              Understand energy landscapes, attractors, and associative memory. Hebbian learning is simple and
              intuitive. Visualize convergence to stored patterns.
            </p>
            <Link
              to="/architecture/hopfield"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Start with Hopfield →
            </Link>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-2 mt-2">
              Learn RBMs & Contrastive Divergence
            </h3>
            <p className="text-sm text-purple-700 dark:text-purple-400 mb-4">
              Study bipartite graphs, factorized conditionals, and Gibbs sampling. CD-k makes training practical.
              Historical foundation for deep learning (pre-2012).
            </p>
            <Link
              to="/architecture/rbm"
              className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
            >
              Explore RBMs →
            </Link>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-300 mb-2 mt-2">
              Master Modern EBMs
            </h3>
            <p className="text-sm text-orange-700 dark:text-orange-400 mb-4">
              Deep neural energy functions, Langevin MCMC, score matching. Implement IGEBM/JEM for image
              generation and OOD detection. Cutting-edge research area.
            </p>
            <Link
              to="/architecture/ebm"
              className="text-sm font-medium text-orange-600 dark:text-orange-400 hover:underline"
            >
              Master EBMs →
            </Link>
          </div>
        </div>
      </div>

      {/* Real-World Applications */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Real-World Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Out-of-Distribution Detection</h3>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded">
                Safety
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              EBMs assign high energy to OOD inputs, enabling reliable anomaly detection for safety-critical systems
              (autonomous driving, medical diagnosis). Superior to softmax confidence.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recommender Systems</h3>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded">
                Netflix
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              RBMs powered Netflix Prize (2009) collaborative filtering. Hidden units learn latent user preferences,
              visible units = movie ratings. Handles missing data naturally via probabilistic inference.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Content-Addressable Memory</h3>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded">
                Neuroscience
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Hopfield networks model associative memory in brain. Pattern completion (recall full memory from partial
              cue) used in early OCR, spell checkers, and neural models of cognition.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Hybrid Classification + Generation</h3>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded">
                JEM
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Joint Energy-based Models (JEM) use same network for classification (argmax class) and generation
              (Langevin sampling). Calibrated uncertainty + generative modeling in one model.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison with Other Generative Models */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">vs Other Generative Models</h2>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Model</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Training</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Sampling</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Likelihood</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Quality</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-400">
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="py-3 px-4 font-medium">EBM</td>
                  <td className="py-3 px-4">Slow (MCMC)</td>
                  <td className="py-3 px-4">Slow (Langevin)</td>
                  <td className="py-3 px-4">Intractable</td>
                  <td className="py-3 px-4">Good</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="py-3 px-4 font-medium">VAE</td>
                  <td className="py-3 px-4">Fast</td>
                  <td className="py-3 px-4">Fast (single pass)</td>
                  <td className="py-3 px-4">Tractable (ELBO)</td>
                  <td className="py-3 px-4">Blurry</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="py-3 px-4 font-medium">GAN</td>
                  <td className="py-3 px-4">Unstable</td>
                  <td className="py-3 px-4">Fast (single pass)</td>
                  <td className="py-3 px-4">No likelihood</td>
                  <td className="py-3 px-4">Sharp</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="py-3 px-4 font-medium">Diffusion</td>
                  <td className="py-3 px-4">Slow (1000+ steps)</td>
                  <td className="py-3 px-4">Slow (50-1000 steps)</td>
                  <td className="py-3 px-4">Tractable</td>
                  <td className="py-3 px-4">Excellent</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Flow</td>
                  <td className="py-3 px-4">Fast</td>
                  <td className="py-3 px-4">Fast (invertible)</td>
                  <td className="py-3 px-4">Exact</td>
                  <td className="py-3 px-4">Good</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
            EBMs excel at OOD detection and compositional reasoning but are slow. Modern research combines EBMs with
            diffusion for best of both worlds.
          </p>
        </div>
      </div>
    </div>
  );
}
