import { Link } from 'react-router-dom';
import { getArchitecturesByCategory } from '../data/architectures';
import FeedforwardPlayground from '../components/InteractiveDemo/FeedforwardPlayground';
import { useProgress } from '../contexts/ProgressContext';

const FeedforwardNetworksPage = () => {
  const feedforwardArchs = getArchitecturesByCategory('feedforward');
  const { progress } = useProgress();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4 flex items-center">
              <span className="text-4xl mr-3">🔄</span>
              Feedforward & Fully Connected Networks
            </h1>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
              The foundation of all neural networks. Information flows in one direction: input → hidden layers → output.
              These are the building blocks you must master before moving to more complex architectures.
            </p>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg">
                <div className="text-sm text-slate-600 dark:text-slate-400">Architectures</div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{feedforwardArchs.length}</div>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg">
                <div className="text-sm text-slate-600 dark:text-slate-400">Your Progress</div>
                <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                  {feedforwardArchs.filter(a => progress.learnedArchitectures.includes(a.id)).length}/{feedforwardArchs.length}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block text-8xl">🧠</div>
        </div>
      </div>

      {/* Key Concepts */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Key Concepts</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-bold mb-2 flex items-center">
              <span className="text-2xl mr-2">➡️</span>
              Feedforward Flow
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Information moves in one direction only: from input, through hidden layers, to output. No loops or feedback connections.
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="font-bold mb-2 flex items-center">
              <span className="text-2xl mr-2">🔗</span>
              Fully Connected
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Every neuron in one layer connects to every neuron in the next layer. Also called "dense" layers.
            </p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h3 className="font-bold mb-2 flex items-center">
              <span className="text-2xl mr-2">⚡</span>
              Activation Functions
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Non-linear functions (ReLU, sigmoid, tanh) that enable learning complex patterns. Without them, the network is just linear algebra.
            </p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <h3 className="font-bold mb-2 flex items-center">
              <span className="text-2xl mr-2">📊</span>
              Universal Approximation
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              With enough neurons, MLPs can approximate any continuous function. This makes them incredibly versatile.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Playground */}
      <FeedforwardPlayground />

      {/* Architecture Cards */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Explore Feedforward Architectures</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {feedforwardArchs.map(arch => {
            const isLearned = progress.learnedArchitectures.includes(arch.id);
            const isBookmarked = progress.bookmarkedArchitectures.includes(arch.id);

            return (
              <Link
                key={arch.id}
                to={`/architecture/${arch.id}`}
                className="card hover:shadow-xl transition-all duration-200 relative overflow-hidden group"
              >
                {/* Status badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {isLearned && (
                    <div className="w-8 h-8 rounded-full bg-secondary-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  {isBookmarked && (
                    <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {arch.name}
                  </h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                      {arch.year}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm">
                      {arch.difficulty}
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                  {arch.plainEnglish}
                </p>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-slate-600 dark:text-slate-400">
                        {arch.architecture.depth} layers
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        {(arch.architecture.parameters / 1000).toFixed(0)}K params
                      </span>
                    </div>
                    <div className="text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform">
                      Learn →
                    </div>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/5 group-hover:to-secondary-500/5 transition-all pointer-events-none" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Learning Path */}
      <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-2 border-primary-200 dark:border-primary-800">
        <h2 className="text-2xl font-bold mb-4">📚 Recommended Learning Path</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
            <div>
              <h3 className="font-bold">Start with the Perceptron</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">Understand the foundation - a single neuron and how it learns.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
            <div>
              <h3 className="font-bold">Move to Multi-Layer Perceptron (MLP)</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">Learn how hidden layers enable non-linear learning (solve XOR!)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
            <div>
              <h3 className="font-bold">Experiment in the Playground</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">Build your own networks and see how architecture affects learning.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
            <div>
              <h3 className="font-bold">Deep Neural Networks & Beyond</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">Scale up to deeper networks and explore specialized architectures.</p>
            </div>
          </div>
        </div>

        <Link to="/learning-paths" className="btn-primary mt-6 inline-block">
          View Full Learning Path
        </Link>
      </div>

      {/* Why These Matter */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Why Feedforward Networks Matter</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-slate-700 dark:text-slate-300">
            Every modern deep learning architecture - from CNNs to Transformers - is built on feedforward principles. Master these concepts and you'll understand:
          </p>
          <ul className="text-slate-700 dark:text-slate-300">
            <li><strong>How neural networks learn</strong> - Backpropagation, gradient descent, weight updates</li>
            <li><strong>Why depth matters</strong> - Each layer learns increasingly abstract features</li>
            <li><strong>The role of activations</strong> - Why non-linearity is essential</li>
            <li><strong>The universal approximation theorem</strong> - Why neural networks are so powerful</li>
            <li><strong>Common challenges</strong> - Overfitting, vanishing gradients, initialization</li>
          </ul>
          <p className="text-slate-700 dark:text-slate-300">
            Even though CNNs and Transformers are specialized, they all use fully-connected layers somewhere in their architecture.
            Understanding feedforward networks is like learning the alphabet before writing novels.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedforwardNetworksPage;
