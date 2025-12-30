import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import GNNPlayground from '../components/InteractiveDemo/GNNPlayground';
import { getArchitecturesByCategory } from '../data/architectures';

export default function GraphNeuralNetworksPage() {
  const { progress } = useProgress();
  const architectures = getArchitecturesByCategory('graph');

  const getCompletedCount = () => {
    return architectures.filter(arch => progress.learnedArchitectures.includes(arch.id)).length;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 dark:from-blue-900 dark:via-cyan-900 dark:to-teal-900 rounded-2xl shadow-xl">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Graph Neural Networks</h1>
              <p className="text-cyan-100 mt-1">Learning on graph-structured data</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold text-white">{architectures.length}</div>
              <div className="text-cyan-100 text-sm">Architectures</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold text-white">{getCompletedCount()}/{architectures.length}</div>
              <div className="text-cyan-100 text-sm">Completed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold text-white">2016-2017</div>
              <div className="text-cyan-100 text-sm">Era Span</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
            Message Passing
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            GNNs aggregate information from neighbors through message passing. Each node receives "messages"
            (features) from connected nodes, combines them, and updates its representation iteratively.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-2">
            Permutation Invariance
          </h3>
          <p className="text-sm text-purple-700 dark:text-purple-400">
            Graph nodes are unordered sets. GNN aggregation functions (mean, max, attention) are permutation
            invariant—the order of neighbors doesn't affect the output, respecting graph structure.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-2">
            Inductive Learning
          </h3>
          <p className="text-sm text-green-700 dark:text-green-400">
            Modern GNNs (GAT, GraphSAGE) learn aggregation functions, not node embeddings. This enables
            generalization to unseen nodes and graphs without retraining—critical for dynamic networks.
          </p>
        </div>
      </div>

      {/* Interactive Playground */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Interactive Playground
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Compare GNN architectures and explore how they scale
          </p>
        </div>
        <GNNPlayground />
      </div>

      {/* Architecture Cards */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            GNN Architectures
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            From spectral convolutions to scalable sampling
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {architectures.map((arch) => {
            const isLearned = progress.learnedArchitectures.includes(arch.id);
            const isBookmarked = progress.bookmarkedArchitectures.includes(arch.id);

            return (
              <Link
                key={arch.id}
                to={`/architecture/${arch.id}`}
                className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700"
              >
                {isLearned && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}

                {isBookmarked && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {arch.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full">
                          {arch.year}
                        </span>
                        <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full">
                          {arch.subcategory}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                    {arch.plainEnglish}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>{arch.architecture.parameters >= 1000000
                          ? `${(arch.architecture.parameters / 1000000).toFixed(1)}M`
                          : `${(arch.architecture.parameters / 1000).toFixed(0)}K`} params
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span>{arch.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Timeline & Evolution */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Evolution Timeline
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            From spectral theory to scalable industrial applications
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"></div>

          <div className="space-y-8">
            {/* GCN Era */}
            <div className="relative pl-20">
              <div className="absolute left-5 top-2 w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg"></div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">2016</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">GCN: Spectral Foundation</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Kipf & Welling introduced Graph Convolutional Networks with efficient spectral convolution via
                  first-order approximation. Symmetric normalization and semi-supervised learning on graphs.
                  Simple, elegant, and effective for node classification on small-medium graphs.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                    Spectral Convolution
                  </span>
                  <span className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                    Semi-Supervised
                  </span>
                  <span className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                    O(|E|) Complexity
                  </span>
                </div>
              </div>
            </div>

            {/* GAT Era */}
            <div className="relative pl-20">
              <div className="absolute left-5 top-2 w-6 h-6 bg-purple-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg"></div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">2017</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">GAT: Attention Mechanisms</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Graph Attention Networks brought attention to graphs—learning which neighbors are important.
                  Multi-head attention enables diverse patterns. Inductive learning capability and interpretable
                  attention weights. Works better on noisy or heterogeneous graphs.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                    Attention Mechanism
                  </span>
                  <span className="text-xs px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                    Multi-Head
                  </span>
                  <span className="text-xs px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                    Inductive
                  </span>
                  <span className="text-xs px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                    Interpretable
                  </span>
                </div>
              </div>
            </div>

            {/* GraphSAGE Era */}
            <div className="relative pl-20">
              <div className="absolute left-5 top-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg"></div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">2017</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">GraphSAGE: Industrial Scale</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  GraphSAGE solved scalability with neighborhood sampling. Fixed-size samples enable constant
                  memory per node and minibatch training. Multiple aggregators (mean, pool, LSTM). Inductive
                  learning for dynamic graphs. Foundation for billion-scale GNNs (Pinterest, Alibaba, Google).
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                    Sampling
                  </span>
                  <span className="text-xs px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                    Scalable
                  </span>
                  <span className="text-xs px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                    Inductive
                  </span>
                  <span className="text-xs px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                    Industrial
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Recommended Learning Path
        </h2>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Start with GCN
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-3">
                Understand the foundations: spectral graph theory, message passing, symmetric normalization,
                and semi-supervised learning. Learn how GCN differs from CNNs and why graph structure matters.
              </p>
              <Link
                to="/architecture/gcn"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Learn GCN
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Explore GAT for Attention
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-3">
                Learn how attention mechanisms apply to graphs. Understand multi-head attention, interpretability,
                and when GAT outperforms GCN. See how attention weights reveal important graph structures.
              </p>
              <Link
                to="/architecture/gat"
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
              >
                Learn GAT
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Master GraphSAGE for Scale
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-3">
                Learn how sampling enables billion-scale GNNs. Understand different aggregators, minibatch
                training, and inductive learning. Essential for industrial applications and dynamic graphs.
              </p>
              <Link
                to="/architecture/graphsage"
                className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
              >
                Learn GraphSAGE
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Applications */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Real-World Applications
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            How GNNs are transforming industries with graph data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Recommendation Systems
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Pinterest's PinSAGE uses GraphSAGE on 3B nodes for pin recommendations (150% engagement increase).
              Amazon, Alibaba, Netflix use GNNs for user-item graphs. E-commerce product graphs with billions
              of nodes scale with sampling-based GNNs.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Pinterest
              </span>
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Amazon
              </span>
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Alibaba
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Fraud Detection
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Financial networks use GNNs to detect fraud rings and money laundering. Ant Financial (Alipay)
              uses GraphSAGE on 1B+ user graphs (30% fraud reduction). Insurance companies detect claim fraud
              via device-user-transaction graphs.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Alipay
              </span>
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Banking
              </span>
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Insurance
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Drug Discovery
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Molecules as graphs (atoms=nodes, bonds=edges). GNNs predict toxicity, solubility, binding affinity.
              Google's AlphaFold uses graph networks for protein structure. Insilico Medicine, Atomwise use
              GNNs for drug design (novel compounds, property prediction).
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                AlphaFold
              </span>
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Insilico
              </span>
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Atomwise
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Social Network Analysis
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Facebook (3B users), Twitter, LinkedIn use GNNs for bot detection, influence prediction, community
              detection. Homophily: friends share attributes. GCN/GAT propagate labels through network. Twitter
              bot detection achieves 95%+ accuracy with GNNs.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Facebook
              </span>
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Twitter
              </span>
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                LinkedIn
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
