import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import SpikingPlayground from '../components/InteractiveDemo/SpikingPlayground';
import { getArchitecturesByCategory } from '../data/architectures';

export default function SpikingNeuromorphicPage() {
  const { progress } = useProgress();
  const architectures = getArchitecturesByCategory('spiking');

  const getCompletedCount = () => {
    return architectures.filter(arch => progress.learnedArchitectures.includes(arch.id)).length;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-500 to-cyan-500 dark:from-green-900 dark:via-emerald-900 dark:to-cyan-900 rounded-2xl shadow-xl">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Spiking & Neuromorphic Networks</h1>
              <p className="text-emerald-100 mt-1">Brain-inspired computing with event-driven spikes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold text-white">{architectures.length}</div>
              <div className="text-emerald-100 text-sm">Architectures</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold text-white">{getCompletedCount()}/{architectures.length}</div>
              <div className="text-emerald-100 text-sm">Completed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold text-white">1000×</div>
              <div className="text-emerald-100 text-sm">Energy Efficiency</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-2">
            Event-Driven Spikes
          </h3>
          <p className="text-sm text-green-700 dark:text-green-400">
            Neurons communicate via discrete binary spikes (action potentials), not continuous activations. Energy is consumed only when spikes occur—enabling 1000× efficiency vs traditional ANNs.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
            Temporal Dynamics
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Spike timing encodes information (temporal coding). Leaky integrate-and-fire neurons have membrane dynamics with time constants—enabling natural temporal processing without recurrence.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-2">
            Bio-Inspired Learning
          </h3>
          <p className="text-sm text-purple-700 dark:text-purple-400">
            STDP (Spike-Timing-Dependent Plasticity) mirrors biological synaptic plasticity. Unsupervised Hebbian learning: "neurons that fire together, wire together"—but causality (timing) matters.
          </p>
        </div>
      </div>

      {/* Interactive Playground */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Interactive Spiking Playground
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Explore SNNs, LIF neurons, and STDP learning. Adjust membrane time constants, network depth, and see real-time energy estimates and spike dynamics.
          </p>
        </div>
        <SpikingPlayground />
      </div>

      {/* Architecture Cards */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Core Spiking Architectures</h2>
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
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
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
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Evolution of Spiking Networks</h2>
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="w-0.5 h-full bg-gradient-to-b from-green-500 to-blue-500"></div>
            </div>
            <div className="flex-1 pb-8">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">1907-1952</span>
                  <span className="text-yellow-500">★</span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">LIF & Hodgkin-Huxley Models</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Lapicque's integrate-and-fire (1907). Hodgkin-Huxley detailed ion channel model (1952, Nobel Prize). Foundation of computational neuroscience.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
            </div>
            <div className="flex-1 pb-8">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">1997-2000</span>
                  <span className="text-yellow-500">★</span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">STDP Discovery</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Experimental discovery of spike-timing-dependent plasticity in biological neurons (Bi & Poo 1998). Asymmetric Hebbian learning window: causality matters!
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <div className="w-0.5 h-full bg-gradient-to-b from-purple-500 to-cyan-500"></div>
            </div>
            <div className="flex-1 pb-8">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">2014-2018</span>
                  <span className="text-yellow-500">★</span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Neuromorphic Chips (IBM TrueNorth, Intel Loihi)</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  IBM TrueNorth (2014): 1M neurons, 256M synapses, 70mW. Intel Loihi (2018): 130K LIF neurons, on-chip STDP learning, 60mW. Hardware 1000× more efficient than GPU.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
            </div>
            <div className="flex-1">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-cyan-600 dark:text-cyan-400">2019-Present</span>
                  <span className="text-yellow-500">★</span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Surrogate Gradients & Deep SNNs</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Backprop for SNNs via surrogate gradients (Neftci 2019). snnTorch, Norse libraries enable PyTorch training. Match ANN accuracy with 1000× lower energy on neuromorphic chips.
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
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-2 mt-2">
              Start with LIF Neuron
            </h3>
            <p className="text-sm text-green-700 dark:text-green-400 mb-4">
              Understand membrane dynamics, threshold crossing, and spike generation. Implement LIF simulation in Python. Explore F-I curves and refractory periods.
            </p>
            <Link
              to="/architecture/lif"
              className="text-sm font-medium text-green-600 dark:text-green-400 hover:underline"
            >
              Start with LIF →
            </Link>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2 mt-2">
              Learn STDP Plasticity
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-400 mb-4">
              Study Hebbian learning with spike timing. Implement additive and multiplicative STDP. Explore unsupervised feature learning and competitive dynamics.
            </p>
            <Link
              to="/architecture/stdp"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Explore STDP →
            </Link>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-2 mt-2">
              Build Deep SNNs
            </h3>
            <p className="text-sm text-purple-700 dark:text-purple-400 mb-4">
              Construct multi-layer SNNs with snnTorch. Train with surrogate gradients and backprop. Deploy on neuromorphic hardware (Loihi) for 1000× energy savings.
            </p>
            <Link
              to="/architecture/snn"
              className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
            >
              Master SNNs →
            </Link>
          </div>
        </div>
      </div>

      {/* Real-World Applications */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Real-World Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Event-Based Vision (DVS)</h3>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded">
                Neuromorphic
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Dynamic Vision Sensors output spikes on brightness changes. SNNs process asynchronous events at 10,000+ fps with 10mW power. Applications: high-speed tracking, low-light vision, autonomous drones.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Ultra-Low-Power IoT</h3>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded">
                Edge AI
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Intel Loihi enables always-on inference at 30μJ per classification (MNIST). Battery-powered devices: keyword spotting, gesture recognition, anomaly detection. Years of operation on coin cell battery.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Neuromorphic Audio</h3>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded">
                Speech
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Silicon cochlea + SNN for keyword spotting at 50μW power. STDP learns frequency-selective filters. 90% accuracy on 12-word vocabulary. Always-listening voice interfaces without draining battery.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Robotics & Control</h3>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded">
                Real-Time
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              SpiNNaker neuromorphic chip: real-time sensorimotor control with 1ms reaction time at 1W power. STDP enables online learning without supervision. Bio-inspired obstacle avoidance and navigation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
