import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import HybridPlayground from '../components/InteractiveDemo/HybridPlayground';
import { getArchitecturesByCategory } from '../data/architectures';

export default function HybridSpecializedPage() {
  const { progress } = useProgress();
  const architectures = getArchitecturesByCategory('hybrid');

  const getCompletedCount = () => {
    return architectures.filter(arch => progress.learnedArchitectures.includes(arch.id)).length;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-500 to-green-500 dark:from-purple-900 dark:via-blue-900 dark:to-green-900 rounded-2xl shadow-xl">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Hybrid & Specialized Models</h1>
              <p className="text-purple-100 mt-1">Memory-augmented networks, equivariant representations, and continuous-time dynamics</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Your Progress</span>
              <span className="text-white/90">{getCompletedCount()}/{architectures.length} completed</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${(getCompletedCount() / architectures.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Key Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Memory-Augmented Networks</h3>
            <p className="text-slate-600 dark:text-slate-300">
              External memory modules enable networks to perform algorithmic tasks like copying, sorting, and associative recall.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Equivariant Representations</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Capsule networks preserve spatial hierarchies and viewpoint information through vector-valued neurons and dynamic routing.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Continuous-Time Dynamics</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Neural ODEs replace discrete layers with continuous differential equations, enabling adaptive computation and memory efficiency.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Playground */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Interactive Playground</h2>
        <HybridPlayground />
      </div>

      {/* Architectures */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Architectures ({architectures.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {architectures.map((arch) => (
            <Link
              key={arch.id}
              to={`/architecture/${arch.id}`}
              className="group bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {arch.name}
                  </h3>
                  {arch.year && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Introduced: {arch.year}
                    </p>
                  )}
                </div>
                {progress.learnedArchitectures.includes(arch.id) && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">
                {arch.description}
              </p>
              {arch.tags && (
                <div className="flex flex-wrap gap-2">
                  {arch.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Historical Timeline</h2>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-md border border-slate-200 dark:border-slate-700">
          <div className="space-y-6">
            {[
              { year: 2014, event: 'Neural Turing Machines', description: 'Differentiable external memory with attention mechanisms' },
              { year: 2016, event: 'Differentiable Neural Computer', description: 'Extended NTM with memory linkage for complex reasoning' },
              { year: 2017, event: 'Capsule Networks', description: 'Dynamic routing between capsules for part-whole relationships' },
              { year: 2018, event: 'Neural ODEs', description: 'Continuous-depth networks (NeurIPS Best Paper)' },
              { year: 2019, event: 'FFJORD', description: 'Free-form continuous normalizing flows' },
              { year: 2020, event: 'Modern Hopfield Networks', description: 'Connection to Transformer attention discovered' }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">{item.year}</span>
                  </div>
                  {idx < 5 && <div className="w-0.5 h-full bg-purple-200 dark:bg-purple-800 mt-2" />}
                </div>
                <div className="flex-1 pb-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.event}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Resources */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <span className="text-green-600 dark:text-green-400 font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Beginner</h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Understand attention mechanisms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Review RNN/LSTM fundamentals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Study basic calculus of variations</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Intermediate</h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Neural Turing Machines paper</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Capsule Networks paper</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>ODE solvers (Runge-Kutta)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Advanced</h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Implement NTM from scratch</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Dynamic routing algorithms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Adjoint sensitivity method</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
