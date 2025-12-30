import { useState } from 'react';

type ModelType = 'ebm' | 'rbm' | 'hopfield';

export default function EnergyBasedPlayground() {
  const [modelType, setModelType] = useState<ModelType>('ebm');
  const [inputDim, setInputDim] = useState(784); // 28x28 MNIST
  const [hiddenDim, setHiddenDim] = useState(128);
  const [mcmcSteps, setMcmcSteps] = useState(60);
  const [numPatterns, setNumPatterns] = useState(10);

  // EBM-specific
  const [stepSize, setStepSize] = useState(0.01);
  const [noiseScale] = useState(0.005);

  // RBM-specific
  const [cdSteps, setCdSteps] = useState(1);

  const getInputDimLabel = () => {
    if (inputDim === 784) return '28×28 (MNIST)';
    if (inputDim === 3072) return '32×32×3 (CIFAR-10)';
    if (inputDim === 100) return '10×10 Pattern';
    return `${inputDim}D`;
  };

  const getParamCount = () => {
    if (modelType === 'ebm') {
      // Energy network: input -> hidden -> hidden -> 1
      const layer1 = inputDim * hiddenDim + hiddenDim;
      const layer2 = hiddenDim * hiddenDim + hiddenDim;
      const layer3 = hiddenDim * 1 + 1;
      return layer1 + layer2 + layer3;
    } else if (modelType === 'rbm') {
      // W: (n_visible × n_hidden), a: n_visible, b: n_hidden
      return inputDim * hiddenDim + inputDim + hiddenDim;
    } else {
      // Hopfield: W is (N × N) symmetric, no diagonal
      return (inputDim * (inputDim - 1)) / 2;
    }
  };

  const getMemoryUsage = () => {
    const params = getParamCount();
    const modelMemory = (params * 4) / (1024 * 1024); // fp32 in MB

    if (modelType === 'ebm') {
      // MCMC buffer for negative samples
      const batchSize = 128;
      const bufferMemory = (batchSize * inputDim * 4) / (1024 * 1024);
      return (modelMemory + bufferMemory).toFixed(1);
    } else if (modelType === 'rbm') {
      // CD-k requires storing positive and negative phases
      const batchSize = 128;
      const phaseMemory = (2 * batchSize * (inputDim + hiddenDim) * 4) / (1024 * 1024);
      return (modelMemory + phaseMemory).toFixed(1);
    } else {
      // Hopfield stores patterns
      const patternMemory = (numPatterns * inputDim * 4) / (1024 * 1024);
      return (modelMemory + patternMemory).toFixed(1);
    }
  };

  const getTrainingTime = () => {
    if (modelType === 'ebm') {
      // MCMC is slow: ~50ms per batch with 60 Langevin steps
      const stepsPerBatch = mcmcSteps;
      const batchesPerEpoch = 468; // MNIST
      const epochs = 100;
      const timePerStep = 0.8; // ms per Langevin step
      const totalMs = stepsPerBatch * batchesPerEpoch * epochs * timePerStep;
      const hours = totalMs / (1000 * 60 * 60);
      return `${hours.toFixed(1)} hours`;
    } else if (modelType === 'rbm') {
      // CD-k is fast: ~5ms per batch
      const batchesPerEpoch = 468;
      const epochs = 50;
      const timePerBatch = 5 + cdSteps * 2; // ms (overhead + CD steps)
      const totalMs = batchesPerEpoch * epochs * timePerBatch;
      const minutes = totalMs / (1000 * 60);
      return `${minutes.toFixed(0)} min`;
    } else {
      // Hopfield: instant training (Hebbian learning)
      return 'Instant (Hebbian)';
    }
  };

  const getConvergenceSteps = () => {
    if (modelType === 'ebm') {
      return `${mcmcSteps} (Langevin MCMC)`;
    } else if (modelType === 'rbm') {
      return `${cdSteps} (CD-${cdSteps})`;
    } else {
      // Hopfield async updates
      const avgSteps = Math.min(100, inputDim * 0.5);
      return `${avgSteps.toFixed(0)} (async updates)`;
    }
  };

  const getCapacity = () => {
    if (modelType === 'hopfield') {
      const capacity = Math.floor(0.138 * inputDim);
      const isOverCapacity = numPatterns > capacity;
      return (
        <span className={isOverCapacity ? 'text-red-400 font-semibold' : ''}>
          {numPatterns} / {capacity} patterns
          {isOverCapacity && ' ⚠️ Over capacity!'}
        </span>
      );
    }
    return 'N/A';
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
                  onClick={() => setModelType('ebm')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    modelType === 'ebm'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  EBM
                </button>
                <button
                  onClick={() => setModelType('rbm')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    modelType === 'rbm'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  RBM
                </button>
                <button
                  onClick={() => setModelType('hopfield')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    modelType === 'hopfield'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  Hopfield
                </button>
              </div>
            </div>

            {/* Common Parameters */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Input Dimension: <span className="text-blue-600 dark:text-blue-400">{getInputDimLabel()}</span>
                </label>
                <input
                  type="range"
                  min="100"
                  max="3072"
                  step="100"
                  value={inputDim}
                  onChange={(e) => setInputDim(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>100</span>
                  <span>784 (MNIST)</span>
                  <span>3072 (CIFAR)</span>
                </div>
              </div>

              {modelType !== 'hopfield' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Hidden Dimension: <span className="text-blue-600 dark:text-blue-400">{hiddenDim}</span>
                  </label>
                  <input
                    type="range"
                    min="32"
                    max="512"
                    step="32"
                    value={hiddenDim}
                    onChange={(e) => setHiddenDim(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span>32</span>
                    <span>256</span>
                    <span>512</span>
                  </div>
                </div>
              )}

              {/* EBM-specific controls */}
              {modelType === 'ebm' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Langevin Steps: <span className="text-blue-600 dark:text-blue-400">{mcmcSteps}</span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      step="10"
                      value={mcmcSteps}
                      onChange={(e) => setMcmcSteps(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span>10 (fast, biased)</span>
                      <span>60 (typical)</span>
                      <span>200 (slow, unbiased)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Step Size (ε): <span className="text-blue-600 dark:text-blue-400">{stepSize.toFixed(3)}</span>
                    </label>
                    <input
                      type="range"
                      min="0.001"
                      max="0.05"
                      step="0.001"
                      value={stepSize}
                      onChange={(e) => setStepSize(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span>0.001</span>
                      <span>0.01</span>
                      <span>0.05</span>
                    </div>
                  </div>
                </>
              )}

              {/* RBM-specific controls */}
              {modelType === 'rbm' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    CD-k Steps: <span className="text-blue-600 dark:text-blue-400">{cdSteps}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={cdSteps}
                    onChange={(e) => setCdSteps(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span>1 (CD-1, typical)</span>
                    <span>5</span>
                    <span>10</span>
                  </div>
                </div>
              )}

              {/* Hopfield-specific controls */}
              {modelType === 'hopfield' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Stored Patterns: <span className="text-blue-600 dark:text-blue-400">{numPatterns}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={numPatterns}
                    onChange={(e) => setNumPatterns(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span>1</span>
                    <span>25</span>
                    <span>50</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Model Description */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              {modelType === 'ebm' && 'Energy-Based Model (EBM)'}
              {modelType === 'rbm' && 'Restricted Boltzmann Machine (RBM)'}
              {modelType === 'hopfield' && 'Hopfield Network'}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {modelType === 'ebm' &&
                'Learns energy function E(x) via contrastive divergence. Low energy = plausible data. Samples via Langevin MCMC.'}
              {modelType === 'rbm' &&
                'Bipartite graph: visible units (data) ↔ hidden units (features). Trained with CD-k. Factorized conditionals enable efficient sampling.'}
              {modelType === 'hopfield' &&
                'Associative memory with symmetric weights. Stores patterns as energy minima (attractors). Pattern completion via async updates.'}
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
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Parameters</div>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                  {(getParamCount() / 1000).toFixed(1)}K
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">Memory</div>
                <div className="text-2xl font-bold text-purple-900 dark:text-purple-300">
                  {getMemoryUsage()} MB
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                <div className="text-sm text-orange-600 dark:text-orange-400 font-medium mb-1">Training Time</div>
                <div className="text-2xl font-bold text-orange-900 dark:text-orange-300">
                  {getTrainingTime()}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <div className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">
                  {modelType === 'hopfield' ? 'Capacity' : 'Convergence'}
                </div>
                <div className="text-xl font-bold text-green-900 dark:text-green-300">
                  {modelType === 'hopfield' ? getCapacity() : getConvergenceSteps()}
                </div>
              </div>
            </div>
          </div>

          {/* Energy Landscape Visualization */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Energy Landscape</h4>
            <div className="relative h-48 bg-white dark:bg-slate-800 rounded-lg overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* Energy landscape curve */}
                {modelType === 'ebm' && (
                  <>
                    <path
                      d="M 20 180 Q 80 160 100 120 T 150 100 Q 200 80 250 100 T 350 140 Q 370 160 380 180"
                      fill="none"
                      stroke="url(#gradient-ebm)"
                      strokeWidth="3"
                    />
                    <circle cx="100" cy="120" r="6" fill="#3b82f6" />
                    <circle cx="250" cy="100" r="6" fill="#3b82f6" />
                    <text x="100" y="110" fontSize="12" fill="#64748b" textAnchor="middle">
                      Data
                    </text>
                    <text x="250" y="90" fontSize="12" fill="#64748b" textAnchor="middle">
                      Data
                    </text>
                    <defs>
                      <linearGradient id="gradient-ebm" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </>
                )}

                {modelType === 'rbm' && (
                  <>
                    {/* Bipartite graph visualization */}
                    <g>
                      {/* Visible units */}
                      {[0, 1, 2, 3, 4].map((i) => (
                        <circle key={`v-${i}`} cx={80 + i * 50} cy={150} r="8" fill="#a855f7" />
                      ))}
                      {/* Hidden units */}
                      {[0, 1, 2, 3].map((i) => (
                        <circle key={`h-${i}`} cx={105 + i * 50} cy={50} r="8" fill="#ec4899" />
                      ))}
                      {/* Connections */}
                      {[0, 1, 2, 3, 4].map((i) =>
                        [0, 1, 2, 3].map((j) => (
                          <line
                            key={`line-${i}-${j}`}
                            x1={80 + i * 50}
                            y1={150}
                            x2={105 + j * 50}
                            y2={50}
                            stroke="#cbd5e1"
                            strokeWidth="1"
                            opacity="0.3"
                          />
                        ))
                      )}
                      <text x="200" y="180" fontSize="12" fill="#64748b" textAnchor="middle">
                        Visible (data)
                      </text>
                      <text x="200" y="30" fontSize="12" fill="#64748b" textAnchor="middle">
                        Hidden (features)
                      </text>
                    </g>
                  </>
                )}

                {modelType === 'hopfield' && (
                  <>
                    {/* Attractor basins */}
                    <ellipse cx="100" cy="100" rx="60" ry="50" fill="#fb923c" opacity="0.2" />
                    <ellipse cx="300" cy="100" rx="60" ry="50" fill="#f87171" opacity="0.2" />
                    <circle cx="100" cy="100" r="8" fill="#fb923c" />
                    <circle cx="300" cy="100" r="8" fill="#f87171" />
                    <text x="100" y="80" fontSize="12" fill="#64748b" textAnchor="middle">
                      Attractor 1
                    </text>
                    <text x="300" y="80" fontSize="12" fill="#64748b" textAnchor="middle">
                      Attractor 2
                    </text>
                    {/* Trajectory */}
                    <path
                      d="M 200 150 Q 180 130 150 115 T 100 100"
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                      markerEnd="url(#arrowhead)"
                    />
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="10"
                        refX="5"
                        refY="3"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
                      </marker>
                    </defs>
                  </>
                )}
              </svg>
            </div>
          </div>

          {/* Training Tips */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Training Tips</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {modelType === 'ebm' && (
                <>
                  <li>• Use replay buffer: store 95% past negatives, 5% random init</li>
                  <li>• Spectral normalization on energy network prevents mode collapse</li>
                  <li>• Longer chains ({mcmcSteps} &gt; 100) for generation, shorter for training</li>
                  <li>• Add noise σ={noiseScale.toFixed(3)} to smooth energy landscape</li>
                </>
              )}
              {modelType === 'rbm' && (
                <>
                  <li>• CD-1 (k=1) works well despite bias—use it!</li>
                  <li>• Momentum (0.9) + learning rate decay (0.1 → 0.01) for stability</li>
                  <li>• Weight decay (0.0001) prevents overfitting</li>
                  <li>• For real data: Gaussian-Bernoulli RBM with fixed σ=1</li>
                </>
              )}
              {modelType === 'hopfield' && (
                <>
                  <li>
                    • Capacity limit: ≤{Math.floor(0.138 * inputDim)} patterns (13.8% of {inputDim})
                  </li>
                  <li>• Use orthogonal/sparse patterns for better retrieval</li>
                  <li>• Async updates (one neuron/time) guaranteed to converge</li>
                  <li>• Modern Hopfield has exponential capacity (use for large-scale)</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
