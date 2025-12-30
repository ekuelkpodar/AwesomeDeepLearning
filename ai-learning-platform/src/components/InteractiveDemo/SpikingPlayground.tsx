import { useState } from 'react';

type ModelType = 'snn' | 'lif' | 'stdp';

export default function SpikingPlayground() {
  const [modelType, setModelType] = useState<ModelType>('snn');
  const [numNeurons, setNumNeurons] = useState(128);
  const [numTimesteps, setNumTimesteps] = useState(100);
  const [tauMembrane, setTauMembrane] = useState(20);

  // SNN-specific
  const [numLayers, setNumLayers] = useState(2);
  const [beta, setBeta] = useState(0.95);

  // STDP-specific
  const [learningRatePos, setLearningRatePos] = useState(0.005);
  const [learningRateNeg] = useState(0.00525);

  const getParamCount = () => {
    if (modelType === 'snn') {
      // Feedforward SNN: input(784) -> hidden(numNeurons) -> output(10)
      const inputDim = 784;
      const outputDim = 10;

      if (numLayers === 1) {
        return inputDim * outputDim + outputDim;
      } else if (numLayers === 2) {
        return inputDim * numNeurons + numNeurons + numNeurons * outputDim + outputDim;
      } else {
        // 3 layers: input -> hidden -> hidden -> output
        return inputDim * numNeurons + numNeurons +
               numNeurons * numNeurons + numNeurons +
               numNeurons * outputDim + outputDim;
      }
    } else if (modelType === 'lif') {
      // Single LIF neuron has no trainable parameters (just dynamics)
      // For a layer: weights only
      return 784 * numNeurons + numNeurons;
    } else {
      // STDP: same as SNN but includes eligibility traces (2× memory)
      return 784 * numNeurons + numNeurons;
    }
  };

  const getMemoryUsage = () => {
    const params = getParamCount();
    const modelMemory = (params * 4) / (1024 * 1024); // fp32 in MB

    if (modelType === 'snn' || modelType === 'lif') {
      // Need to store membrane potentials for all neurons over time
      const membraneStates = (numNeurons * numTimesteps * 4) / (1024 * 1024);
      return (modelMemory + membraneStates).toFixed(1);
    } else {
      // STDP: eligibility traces (2 per synapse)
      const traces = (params * 2 * 4) / (1024 * 1024);
      return (modelMemory + traces).toFixed(1);
    }
  };

  const getTrainingTime = () => {
    if (modelType === 'snn') {
      // T timesteps × forward passes
      const stepsPerEpoch = 468; // MNIST batches
      const epochs = 10;
      const msPerTimestep = 0.5;
      const totalMs = numTimesteps * stepsPerEpoch * epochs * msPerTimestep;
      const minutes = totalMs / (1000 * 60);
      return `${minutes.toFixed(0)} min`;
    } else if (modelType === 'lif') {
      // LIF simulation is fast (no backprop)
      return `${(numTimesteps * 0.01).toFixed(1)} ms (simulation only)`;
    } else {
      // STDP: online learning, single pass
      return 'Online (single-pass)';
    }
  };

  const getEnergyEstimate = () => {
    if (modelType === 'snn' || modelType === 'lif') {
      // Energy ∝ number of spikes
      // Assume ~10-30% sparsity (neurons fire 10-30% of timesteps)
      const sparsity = 0.2;
      const totalSpikes = numNeurons * numTimesteps * sparsity;
      const energyPJ = totalSpikes * 5; // 5 pJ/spike

      if (energyPJ < 1000) {
        return `${energyPJ.toFixed(0)} pJ`;
      } else if (energyPJ < 1000000) {
        return `${(energyPJ / 1000).toFixed(1)} nJ`;
      } else {
        return `${(energyPJ / 1000000).toFixed(1)} μJ`;
      }
    } else {
      // STDP: event-driven, very efficient
      const updates = numNeurons * 0.1; // ~10% synapses updated
      return `${(updates * 0.1).toFixed(1)} pJ`;
    }
  };

  const getFiringRate = () => {
    if (modelType === 'snn' || modelType === 'lif') {
      // Depends on input intensity and tau
      // Higher tau = more integration = higher rate
      const baseRate = 20; // Hz
      const tauFactor = tauMembrane / 20; // Normalize to 20ms
      return `${(baseRate * tauFactor).toFixed(1)} Hz`;
    } else {
      return 'N/A (learning rule)';
    }
  };

  const getSparsity = () => {
    if (modelType === 'snn' || modelType === 'lif') {
      // Sparsity = fraction of neurons active
      // Lower tau = sparser (leaks faster)
      const baseSparse = 0.2;
      const sparsity = baseSparse * (20 / tauMembrane);
      return `${(sparsity * 100).toFixed(1)}%`;
    } else {
      return 'N/A';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Controls */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Model Configuration
            </h3>

            {/* Model Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Model Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setModelType('snn')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    modelType === 'snn'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  SNN
                </button>
                <button
                  onClick={() => setModelType('lif')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    modelType === 'lif'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  LIF
                </button>
                <button
                  onClick={() => setModelType('stdp')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    modelType === 'stdp'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  STDP
                </button>
              </div>
            </div>

            {/* Common Parameters */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Number of Neurons: <span className="text-green-600 dark:text-green-400">{numNeurons}</span>
                </label>
                <input
                  type="range"
                  min="32"
                  max="512"
                  step="32"
                  value={numNeurons}
                  onChange={(e) => setNumNeurons(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>32</span>
                  <span>256</span>
                  <span>512</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Timesteps (T): <span className="text-green-600 dark:text-green-400">{numTimesteps}</span>
                </label>
                <input
                  type="range"
                  min="25"
                  max="200"
                  step="25"
                  value={numTimesteps}
                  onChange={(e) => setNumTimesteps(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>25 (fast)</span>
                  <span>100 (typical)</span>
                  <span>200 (accurate)</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Membrane Time Constant (τ_m): <span className="text-green-600 dark:text-green-400">{tauMembrane} ms</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={tauMembrane}
                  onChange={(e) => setTauMembrane(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>5ms (fast)</span>
                  <span>20ms (bio)</span>
                  <span>50ms (temporal)</span>
                </div>
              </div>

              {/* SNN-specific controls */}
              {modelType === 'snn' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Number of Layers: <span className="text-green-600 dark:text-green-400">{numLayers}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="3"
                      step="1"
                      value={numLayers}
                      onChange={(e) => setNumLayers(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Membrane Decay (β): <span className="text-green-600 dark:text-green-400">{beta.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="0.80"
                      max="0.99"
                      step="0.01"
                      value={beta}
                      onChange={(e) => setBeta(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span>0.80 (fast leak)</span>
                      <span>0.95</span>
                      <span>0.99 (slow leak)</span>
                    </div>
                  </div>
                </>
              )}

              {/* STDP-specific controls */}
              {modelType === 'stdp' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    LTP Rate (A+): <span className="text-green-600 dark:text-green-400">{learningRatePos.toFixed(4)}</span>
                  </label>
                  <input
                    type="range"
                    min="0.001"
                    max="0.01"
                    step="0.001"
                    value={learningRatePos}
                    onChange={(e) => setLearningRatePos(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span>0.001</span>
                    <span>0.005</span>
                    <span>0.01</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    LTD Rate (A-): {learningRateNeg.toFixed(4)} (automatically 1.05× A+)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Model Description */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              {modelType === 'snn' && 'Spiking Neural Network (SNN)'}
              {modelType === 'lif' && 'Leaky Integrate-and-Fire (LIF)'}
              {modelType === 'stdp' && 'Spike-Timing-Dependent Plasticity (STDP)'}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {modelType === 'snn' &&
                'Event-driven network with discrete spikes. Processes temporal information with extreme energy efficiency. Uses surrogate gradients for backprop.'}
              {modelType === 'lif' &&
                'Simplified neuron model: integrate input until threshold, spike, reset. RC circuit dynamics with exponential leak. Foundation of neuromorphic chips.'}
              {modelType === 'stdp' &&
                'Hebbian learning with causality: "neurons that fire together, wire together"—but timing matters! Pre→Post strengthens, Post→Pre weakens.'}
            </p>
          </div>
        </div>

        {/* Right Column: Statistics & Visualization */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Model Statistics
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <div className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">Parameters</div>
                <div className="text-2xl font-bold text-green-900 dark:text-green-300">
                  {(getParamCount() / 1000).toFixed(1)}K
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Memory</div>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                  {getMemoryUsage()} MB
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">
                  {modelType === 'stdp' ? 'Learning' : 'Training Time'}
                </div>
                <div className="text-xl font-bold text-purple-900 dark:text-purple-300">
                  {getTrainingTime()}
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                <div className="text-sm text-orange-600 dark:text-orange-400 font-medium mb-1">Energy</div>
                <div className="text-xl font-bold text-orange-900 dark:text-orange-300">
                  {getEnergyEstimate()}
                </div>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 rounded-lg p-4 border border-cyan-200 dark:border-cyan-800">
                <div className="text-sm text-cyan-600 dark:text-cyan-400 font-medium mb-1">Firing Rate</div>
                <div className="text-xl font-bold text-cyan-900 dark:text-cyan-300">
                  {getFiringRate()}
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-lg p-4 border border-pink-200 dark:border-pink-800">
                <div className="text-sm text-pink-600 dark:text-pink-400 font-medium mb-1">Sparsity</div>
                <div className="text-xl font-bold text-pink-900 dark:text-pink-300">
                  {getSparsity()}
                </div>
              </div>
            </div>
          </div>

          {/* Spike Train Visualization */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
              {modelType === 'stdp' ? 'STDP Learning Window' : 'Spike Raster Plot'}
            </h4>
            <div className="relative h-48 bg-white dark:bg-slate-800 rounded-lg overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                {modelType === 'stdp' ? (
                  <>
                    {/* STDP window curve */}
                    <defs>
                      <linearGradient id="stdp-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="50%" stopColor="#64748b" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                    {/* Axes */}
                    <line x1="30" y1="100" x2="370" y2="100" stroke="#cbd5e1" strokeWidth="2" />
                    <line x1="200" y1="20" x2="200" y2="180" stroke="#cbd5e1" strokeWidth="2" />
                    {/* LTP curve (right side) */}
                    <path
                      d="M 200 100 Q 250 40 350 90"
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth="3"
                    />
                    {/* LTD curve (left side) */}
                    <path
                      d="M 50 110 Q 150 160 200 100"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="3"
                    />
                    <text x="320" y="60" fontSize="12" fill="#ec4899" fontWeight="bold">
                      LTP
                    </text>
                    <text x="80" y="140" fontSize="12" fill="#8b5cf6" fontWeight="bold">
                      LTD
                    </text>
                    <text x="200" y="195" fontSize="11" fill="#64748b" textAnchor="middle">
                      Δt (ms)
                    </text>
                    <text x="15" y="105" fontSize="11" fill="#64748b">
                      Δw
                    </text>
                  </>
                ) : (
                  <>
                    {/* Spike raster plot */}
                    {Array.from({ length: 10 }).map((_, neuronIdx) => {
                      // Generate random spike times for visualization
                      const spikeTimes = Array.from({ length: Math.floor(Math.random() * 8 + 2) }).map(
                        () => Math.random() * 380 + 10
                      );
                      const y = 20 + neuronIdx * 16;

                      return (
                        <g key={neuronIdx}>
                          {spikeTimes.map((x, spikeIdx) => (
                            <line
                              key={spikeIdx}
                              x1={x}
                              y1={y - 5}
                              x2={x}
                              y2={y + 5}
                              stroke="#10b981"
                              strokeWidth="2"
                            />
                          ))}
                        </g>
                      );
                    })}
                    <text x="5" y="15" fontSize="11" fill="#64748b">
                      Neuron
                    </text>
                    <text x="200" y="195" fontSize="11" fill="#64748b" textAnchor="middle">
                      Time →
                    </text>
                  </>
                )}
              </svg>
            </div>
          </div>

          {/* Training Tips */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Key Insights</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {modelType === 'snn' && (
                <>
                  <li>• Energy ∝ spikes! {numTimesteps} timesteps × 20% sparsity = huge savings vs ANNs</li>
                  <li>• Higher β ({beta.toFixed(2)}) = longer memory, better for sequences</li>
                  <li>• Use surrogate gradients (fast sigmoid) for backprop through spikes</li>
                  <li>• Neuromorphic chips (Loihi): 1000× more efficient than GPU</li>
                </>
              )}
              {modelType === 'lif' && (
                <>
                  <li>• τ_m = {tauMembrane}ms controls integration window (higher = more temporal memory)</li>
                  <li>• Threshold distance determines gain: v_thresh - v_rest ≈ 1.0 typical</li>
                  <li>• Refractory period (2-5ms) limits max rate, adds bio-realism</li>
                  <li>• LIF is foundation: 130K neurons on Intel Loihi chip!</li>
                </>
              )}
              {modelType === 'stdp' && (
                <>
                  <li>• A- should be ≈1.05× A+ to prevent runaway potentiation</li>
                  <li>• Combine with homeostatic plasticity to stabilize firing rates</li>
                  <li>• Unsupervised feature learning: STDP + supervised readout</li>
                  <li>• Event-driven: only update on spikes (ultra-efficient!)</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
