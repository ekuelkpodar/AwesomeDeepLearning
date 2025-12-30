import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import RLPlayground from '../components/InteractiveDemo/RLPlayground';
import { getArchitecturesByCategory } from '../data/architectures';

export default function ReinforcementLearningPage() {
  const { progress } = useProgress();
  const architectures = getArchitecturesByCategory('reinforcement-learning');

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
              <h1 className="text-4xl font-bold text-white">Reinforcement Learning</h1>
              <p className="text-purple-100 mt-1">Learning through interaction and trial-and-error</p>
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
              <div className="text-3xl font-bold text-white">2013-2017</div>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
            Value-Based vs Policy Gradient
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            DQN learns Q-values (expected return) and acts greedily. PPO/A3C directly learn stochastic policies.
            Value-based excels in discrete actions, policy gradient in continuous control.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-2">
            Exploration-Exploitation
          </h3>
          <p className="text-sm text-purple-700 dark:text-purple-400">
            ε-greedy (DQN) explores randomly with probability ε. Policy gradient methods use entropy regularization
            to encourage exploration. Balance is critical for discovering optimal strategies.
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-300 mb-2">
            Credit Assignment
          </h3>
          <p className="text-sm text-orange-700 dark:text-orange-400">
            Temporal credit assignment: which action led to reward? N-step returns and GAE (Generalized Advantage
            Estimation) provide better credit assignment than single-step TD learning.
          </p>
        </div>
      </div>

      {/* Interactive Playground */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Interactive RL Playground
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Compare DQN, PPO, and A3C across different environments. Adjust hyperparameters and see their impact
            on model complexity, memory usage, and training dynamics.
          </p>
        </div>
        <RLPlayground />
      </div>

      {/* Architecture Cards */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Core RL Architectures</h2>
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
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Evolution of Deep RL</h2>
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
            </div>
            <div className="flex-1 pb-8">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">2013</span>
                  <span className="text-yellow-500">★</span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">DQN Playing Atari</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  DeepMind's DQN achieves human-level performance on Atari games using only raw pixels as input.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <div className="w-0.5 h-full bg-gradient-to-b from-purple-500 to-orange-500"></div>
            </div>
            <div className="flex-1 pb-8">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">2016</span>
                  <span className="text-yellow-500">★</span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">A3C & Asynchronous Methods</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  DeepMind introduces A3C, training on CPU with parallel workers. Makes RL accessible without expensive GPUs.
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
                  <span className="text-lg font-bold text-orange-600 dark:text-orange-400">2017</span>
                  <span className="text-yellow-500">★</span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">PPO Introduced</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  OpenAI proposes PPO with clipped objective. Becomes the most widely used RL algorithm due to stability and simplicity.
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
              Master Value-Based RL
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-400 mb-4">
              Start with DQN on discrete action spaces (CartPole, Atari). Understand Q-learning, experience replay,
              target networks, and ε-greedy exploration.
            </p>
            <Link
              to="/architecture/dqn"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Start with DQN →
            </Link>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-2 mt-2">
              Learn Actor-Critic Methods
            </h3>
            <p className="text-sm text-purple-700 dark:text-purple-400 mb-4">
              Move to A3C for understanding actor-critic architecture, advantage estimation, and asynchronous training.
              Build intuition for policy gradients.
            </p>
            <Link
              to="/architecture/a3c"
              className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
            >
              Explore A3C →
            </Link>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-300 mb-2 mt-2">
              Deploy PPO for Real Tasks
            </h3>
            <p className="text-sm text-orange-700 dark:text-orange-400 mb-4">
              Master PPO for production RL. Implement for continuous control (robotics), RLHF, or game AI.
              Tune clip ratio, GAE lambda, and entropy coefficient.
            </p>
            <Link
              to="/architecture/ppo"
              className="text-sm font-medium text-orange-600 dark:text-orange-400 hover:underline"
            >
              Master PPO →
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Game AI</h3>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded">
                DeepMind
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              AlphaGo defeats world champion Lee Sedol using value networks and policy networks trained via self-play.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Robotics Control</h3>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded">
                OpenAI
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              OpenAI Dactyl robot hand manipulates physical objects using PPO trained in simulation with domain randomization.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">RLHF for LLMs</h3>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded">
                OpenAI
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              ChatGPT & GPT-4 use PPO to fine-tune language models using human feedback to align responses with user preferences.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Resource Optimization</h3>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded">
                Google DeepMind
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Google Datacenters use RL to reduce cooling costs by 40% through dynamic control of cooling systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
