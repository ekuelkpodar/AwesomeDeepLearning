import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import SelfSupervisedPlayground from '../components/InteractiveDemo/SelfSupervisedPlayground';
import { getArchitecturesByCategory } from '../data/architectures';

export default function SelfSupervisedPage() {
  const { progress } = useProgress();
  const architectures = getArchitecturesByCategory('self-supervised');

  const getCompletedCount = () => {
    return architectures.filter(arch => progress.learnedArchitectures.includes(arch.id)).length;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 rounded-2xl shadow-xl">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Self-Supervised & Contrastive Learning</h1>
              <p className="text-purple-100 mt-1">Learning powerful representations without labels using data augmentation and contrastive objectives</p>
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
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Contrastive Learning</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Learn by pulling augmented views of the same image together while pushing different images apart in embedding space.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Data Augmentation</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Strong augmentations (crop, color jitter, blur) create diverse views of the same image that should have similar representations.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Labels Required</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Learn powerful visual representations from unlabeled data, then transfer to downstream tasks with minimal labeled data.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Playground */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Interactive Playground</h2>
        <SelfSupervisedPlayground />
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
              className="group bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
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
              { year: 2018, event: 'InstDisc & InvaSpread', description: 'Instance discrimination and invariance spreading' },
              { year: 2019, event: 'MoCo v1', description: 'Momentum encoder with queue-based dictionary' },
              { year: 2020, event: 'SimCLR', description: 'Simple framework with large batches and NT-Xent loss' },
              { year: 2020, event: 'MoCo v2', description: 'MoCo + SimCLR improvements (MLP, augmentation)' },
              { year: 2020, event: 'BYOL', description: 'Bootstrap learning without negative samples' },
              { year: 2021, event: 'SimCLR v2', description: 'Improved with larger models and distillation' }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">{item.year}</span>
                  </div>
                  {idx < 5 && <div className="w-0.5 h-full bg-blue-200 dark:bg-blue-800 mt-2" />}
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
                <span className="text-blue-500 mt-1">•</span>
                <span>Understand supervised vs unsupervised learning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Learn common data augmentations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Study embedding spaces and similarity metrics</span>
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
                <span className="text-blue-500 mt-1">•</span>
                <span>SimCLR paper and implementation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>MoCo paper and queue mechanism</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>InfoNCE and NT-Xent loss functions</span>
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
                <span className="text-blue-500 mt-1">•</span>
                <span>BYOL and collapse prevention mechanisms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Implement from scratch with large-scale training</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Transfer learning and downstream evaluation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Method Comparison</h2>
        <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Feature</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600 dark:text-blue-400">SimCLR</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-600 dark:text-purple-400">BYOL</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-600 dark:text-green-400">MoCo v2</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr>
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-300">Negative Samples</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Yes (large batch)</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">No</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Yes (queue)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-300">Batch Size</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">4096-8192</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">256-512</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">256</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-300">Momentum Encoder</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">No</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Yes</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Yes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-300">ImageNet Top-1</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">76.5%</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">74.3%</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">71.1%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-300">Key Innovation</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Simple + large batches</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">No negatives needed</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Queue mechanism</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
